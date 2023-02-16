import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase/clientApp';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        signInWithEmailAndPassword: builder.mutation({
            async queryFn({ auth, email, password }){
                await signInWithEmailAndPassword(auth, email, password);
                return { data: null };
            }
        }),
    })
})

export const { useSignInWithEmailAndPasswordMutation } = userApi