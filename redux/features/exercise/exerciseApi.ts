import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import Exercise from '../../../interfaces/Exercise';

export const exerciseApi = createApi({
    reducerPath: 'exerciseApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Exercise'], 
    endpoints: (builder) => ({
        getUserSavedExercises: builder.query<Exercise[], undefined | string>({
            async queryFn(userId){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedExercises
                return { data }
                } else return { error: 'Error' }
            },
            providesTags: ['Exercise']
        }),
        changeExercisesOrder: builder.mutation<null, { userId: undefined | string, oldIndex: number, newIndex: number}>({
            async queryFn( { userId, oldIndex, newIndex }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedExercises
                    const element = data.splice(oldIndex, 1)[0]
                    data.splice(newIndex, 0, element)
                    await updateDoc(doc(db, `user`, userId), { savedExercises: data } )
                    return { data: null }
                } else {
                    return { error: 'Error'}
                }
            }
        }),
        addUserSavedExercise: builder.mutation<null, { userId: undefined | string, oldIndex: number, newIndex: number}>({
            async queryFn( { userId, oldIndex, newIndex }){
                if (userId){
                    const exercise: {} = {}
                    await updateDoc(doc(db, `user`, userId), { savedExercises: arrayUnion(exercise) } )

                    return { data: null }
                } else {
                    return { error: 'Error'}
                }
            }
        }),
    })
})

export const { useGetUserSavedExercisesQuery, useChangeExercisesOrderMutation } = exerciseApi; 