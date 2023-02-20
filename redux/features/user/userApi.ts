import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import Exercise from '../../../interfaces/Exercise';
import Categories from '../../../interfaces/Categories';
import Types from '../../../interfaces/Types';
import Workout from '../../../interfaces/Workout'

// const randomData = {
//     workouts: [
//         {
//             exercises: [
//                 {
//                     name: 'Concentration Curls',
//                     sets: [
//                         {
//                             reps: 10,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         },
//                         {
//                             reps: 9,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         },
//                         {
//                             reps: 8,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         }
//                     ]
//                 },
//                 {
//                     name: 'Barbell Bench Press',
//                     sets: [
//                         {
//                             reps: 10,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         },
//                         {
//                             reps: 9,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         },
//                         {
//                             reps: 8,
//                             weight: 100,
//                             weightUnit: 'lbs',
//                             complete: false
//                         }
//                     ]
//                 }
//             ],
//             name: 'Chest Day'
//         }
//     ],
//     date: 5
// }

// setDoc(doc(collection(db, `user/${auth.currentUser?.uid}/february_2023`)), randomData)

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getUserSavedExercises: builder.query<Categories[], undefined | string>({
            async queryFn(userId){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const initialData = snapshot.data()?.savedExercises

                    const data = initialData.reduce((acc: Categories[], exercise: Exercise) => {
                        // Check if the category exists in the accumulator array
                        const categoryIndex = acc.findIndex((cat: Categories) => cat.category === exercise.category);
                        
                        // If the category doesn't exist, add it to the accumulator array
                        if (categoryIndex === -1) {
                            acc.push({ category: exercise.category, types: [] });
                        }
                        
                        // Find the category in the accumulator array
                        const category = acc.find(cat => cat.category === exercise.category);
                        
                        // Check if the type exists in the category object
                        const typeIndex = category?.types.findIndex((t: Types) => t.type === exercise.type);
                        
                        // If the type doesn't exist, add it to the category object
                        if (typeIndex === -1) {
                            category?.types.push({ type: exercise.type, exercises: [] });
                        }
                        
                        // Find the type in the category object
                        const type = category?.types.find((t: Types) => t.type === exercise.type);
                        
                        // Add the exercise to the type object
                        type?.exercises.push(exercise.name);
                        
                        return acc;
                }, [])
                
                return { data }
                } else return { error: 'Error' }
                
            }
        }),
        getUserSavedWorkouts: builder.query<Workout[], undefined | string>({
            async queryFn(userId){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedWorkouts
                    return { data }
                } else return { error: 'Error' }
            }
        }),
        getUserMonthWorkouts: builder.query<{ [key: number]: { date: number, workouts: Workout[] } }, { userId: string, monthAndYear: string }>({
            async queryFn( { userId, monthAndYear}){
                if (userId){
                    const snapshot = await getDocs(collection(db, `user/${userId}/${monthAndYear}`))
                    const initialData = snapshot.docs.map(snap => {
                        return snap.data()
                    })

                    const data = initialData.reduce((a, v) => ({ ...a, [v.date]: v }), {})

                    console.log(data)
                    
                    return { data }
                } else return { error: 'Error' }
            }
        })
    })
})

export const { useGetUserSavedExercisesQuery, useGetUserSavedWorkoutsQuery, useGetUserMonthWorkoutsQuery } = userApi;