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
            providesTags: (result) =>
            (result && result.length > 0) ? result.map(({ id }) => ({ type: 'Exercise' as const, id })) : ['Exercise'],
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
            },
            invalidatesTags: ['Exercise']
    }),
        addUserSavedExercise: builder.mutation<null, { userId: undefined | string, exercise: Exercise }>({
            async queryFn( { userId, exercise }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedExercises
                    data.unshift(exercise)                  
                    await updateDoc(doc(db, `user`, userId), { savedExercises: data } )

                    return { data: null }
                } else {
                    return { error: 'Error'}
                }
            },
            invalidatesTags: ['Exercise']
        }),
        deleteUserSavedExercise: builder.mutation<null, { userId: undefined | string, exerciseId: string }>({
            async queryFn( { userId, exerciseId }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedExercises
                    await updateDoc(doc(db, `user`, userId), { savedExercises: data.filter((exercise: Exercise) => exercise.id !== exerciseId) } )

                    return { data: null }
                } else {
                    return { error: 'Error'}
                }
            },
            invalidatesTags: (result, error, {exerciseId}) => [{ type: 'Exercise', id: exerciseId }]
        }),
    })
})

export const { useGetUserSavedExercisesQuery, useChangeExercisesOrderMutation, useAddUserSavedExerciseMutation, useDeleteUserSavedExerciseMutation } = exerciseApi; 