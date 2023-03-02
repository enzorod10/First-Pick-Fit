import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { spawn } from 'child_process';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import firestore from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import Workout from '../../../interfaces/Workout';

export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Day'], 
    endpoints: (builder) => ({
        getUserMonthWorkouts: builder.query<{ [key: number]: { date: number, workout: Workout } }, { userId: string | undefined, monthAndYear: string, arrayOfMonth: number[] | undefined}>({
            async queryFn( { userId, monthAndYear, arrayOfMonth }){
                if (userId){
                    const snapshot = await getDocs(collection(db, `user/${userId}/${monthAndYear}`))
                    const initialData = snapshot.docs.map(snap => {
                        return snap.data()
                    })

                    const data = initialData.reduce((a, v) => ({ ...a, [v.date]: v }), {})

                    return { data }
                } else return { error: 'Error' }
            },
            providesTags: (result, error, { arrayOfMonth }):any => arrayOfMonth ? arrayOfMonth.map(elem => ({ type: 'Day', id: elem })) : ['Day']
        }),
        getUserNextWorkout: builder.query<any, { userId: string | undefined, monthAndYear: string, currentDate: number, currentMonth: number, monthSelected: number | null, currentYear: number }>({
            async queryFn( { userId, monthAndYear, currentDate, currentMonth, monthSelected, currentYear }){
                if (userId){
                    const snapshot = await getDocs(collection(db, `user/${userId}/${monthAndYear}`))

                    let data: any;

                    if ((Number(monthAndYear.split('_')[1])  > currentYear) || ((Number(monthAndYear.split('_')[1]) === currentYear) && (monthSelected && monthSelected > currentMonth))){
                        data = snapshot.docs.filter(snap => {
                            return snap.data()
                        })[0]
                    } else {
                        data = snapshot.docs.filter(snap => {
                            return snap.data().date >= currentDate 
                        })[0]
                    }

                    if (!data) return { error: 'No upcoming workout for this month' }
                    
                    return { data: data.data() }
                } else return { error: 'UserId Error' }
            },
        }),
        getClickedOnDate: builder.query<any, { userId: string | undefined, monthAndYear: string, dateClicked: number | null }>({
            async queryFn( { userId, monthAndYear, dateClicked }){
                if (userId){
                    const snapshot = await getDocs(collection(db, `user/${userId}/${monthAndYear}`))
                    const data = snapshot.docs.find(snap => {
                        return snap.data().date === dateClicked 
                    })
                    
                    if (!data) return { error: 'Clicked date has no workout' }

                    return { data: data.data() }
                } else return { error: 'UserId Error' }
            },
        }),
        deleteUserWorkoutFromMonthWorkouts: builder.mutation<null,  { userId: string | undefined, monthAndYear: string, date: number }>({
            async queryFn({ userId, monthAndYear, date }){
                if (userId){
                    await deleteDoc(doc(db, 'user', userId, monthAndYear, `${date}`))
                    return { data: null }
                } else return { error: 'Error'}
            },
            invalidatesTags: (result, error, { date}) => {
                return [{ type: 'Day', date }]
            }
        }),
        addUserWorkoutToMonthWorkouts: builder.mutation<null,  { userId: string | undefined, monthAndYear: string, date: number, workout: Workout }>({
            async queryFn({ userId, monthAndYear, date, workout }){
                if (userId){
                    await setDoc(doc(db, 'user', userId, monthAndYear, `${date}`), { date, workout })
                    return { data: null }
                } else return { error: 'Error'}
            },
            invalidatesTags: (result, error, { date }) => {
                return [{ type: 'Day', date }]
            }
        }),

    })
})

export const { useGetUserMonthWorkoutsQuery, useAddUserWorkoutToMonthWorkoutsMutation, useDeleteUserWorkoutFromMonthWorkoutsMutation, useGetUserNextWorkoutQuery, useGetClickedOnDateQuery } = calendarApi; 