import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import Program from '../../../interfaces/Program';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllPlans: builder.query<Program[], void>({
            async queryFn(){
                const allCollections = await getDocs(collection(db, `/program`))
                const data = allCollections.docs.map(col => col.data()) as Program[]
                return { data }
            }
        }),
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

export const { useGetAllPlansQuery, useGetUserSavedExercisesQuery } = userApi; 