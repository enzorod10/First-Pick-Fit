import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUserSavedExercises: builder.query<any, any>({
            async queryFn(userId){
                if (userId){
                    const data = 'hello'
                return { data }
                } else return { error: 'Error' }
            },
        }),
    })
})

export const { useGetUserSavedExercisesQuery } = userApi; 