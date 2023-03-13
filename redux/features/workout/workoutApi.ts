import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, doc, getDocs, getDoc, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';
import AllocatedExercise from '../../../interfaces/AllocatedExercise';
import Exercise from '../../../interfaces/Exercise';
import Workout from '../../../interfaces/Workout'

export const workoutApi = createApi({
    reducerPath: 'workoutApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Workout', 'WorkoutExercise'],
    endpoints: (builder) => ({
        getUserSavedWorkouts: builder.query<Workout[], undefined | string>({
            async queryFn(userId){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const data = snapshot.data()?.savedWorkouts
                    return { data }
                } else return { error: 'Error' }
            },
            providesTags: (result) =>
                (result && result.length > 0) ? result.reduce((acc: any, workout: Workout) => [ ...acc, { type: 'Workout', id: workout.id }, ...workout.exercises.map((exercise: AllocatedExercise) => ({ type: 'WorkoutExercise', id: exercise.id }))], []) : [{ type: 'Workout' }, { type: 'WorkoutExercise' }],
        }),
        createUserWorkout: builder.mutation<null, { userId: string | undefined, workout: Workout }>({
            async queryFn({ userId, workout }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    let data = snapshot.data()?.savedWorkouts
                    data.unshift(workout);
                    await updateDoc(doc(db, `user`, userId), { savedWorkouts: data } )
                    return { data: null }
                } else return { error: 'Error' }
            },
            invalidatesTags: (result, error, { workout }) => [{ type: 'Workout', id: workout.id }, { type: 'WorkoutExercise' }]
        }),
        editUserWorkout: builder.mutation<null, { userId: string | undefined, workout: Workout }>({
            async queryFn({ userId, workout }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    let data = snapshot.data()?.savedWorkouts
                    
                    await updateDoc(doc(db, `user`, userId), { savedWorkouts: data.map((userWorkout: Workout) => {
                        if (userWorkout.id === workout.id){
                            return workout
                        }
                        return userWorkout
                    })});
                    return { data: null }
                } else return { error: 'Error' }
            },
            invalidatesTags: (result, error, { workout }) => [{ type: 'Workout', id: workout.id }, { type: 'WorkoutExercise' }]
        }),
        deleteUserWorkout: builder.mutation<null, { userId: string | undefined, workoutId: string }>({
            async queryFn({ userId, workoutId }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    let data = snapshot.data()?.savedWorkouts

                    await updateDoc(doc(db, `user`, userId), { savedWorkouts: data.filter((userWorkout: Workout) => workoutId !== userWorkout.id )});
                    return { data: null }
                } else return { error: 'Error' }
            },
            invalidatesTags: (result, error, { workoutId }) => [{ type: 'Workout', id: workoutId }, { type: 'WorkoutExercise' }]
        }),
        changeWorkoutExercisesOrder: builder.mutation<null, { userId: undefined | string, workoutId: string, oldIndex: number, newIndex: number}>({
            async queryFn( { userId, workoutId, oldIndex, newIndex }){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const workouts = snapshot.data()?.savedWorkouts
                    const workoutIndex = workouts.findIndex((workout: Workout) => workout.id === workoutId)
                    const specificWorkout = workouts.splice(workoutIndex, 1)[0];
                
                    const element = specificWorkout.exercises.splice(oldIndex, 1)[0];
                    specificWorkout.exercises.splice(newIndex, 0, element);
                    workouts.splice(workoutIndex, 0, specificWorkout);

                    await updateDoc(doc(db, `user`, userId), { savedWorkouts: workouts } )
                    return { data: null }
                } else {
                    return { error: 'Error'}
                }
            }
        }),
        addUserSavedWorkoutExercise: builder.mutation<any, { userId: undefined | string, exerciseId: string, workoutId: string, index: number }>({
            async queryFn({userId, exerciseId, workoutId, index}){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const exercise = snapshot.data()?.savedExercises.find((exercise: Exercise) => {
                        return exercise.id === exerciseId
                    })

                    const selectedWorkout = snapshot.data()?.savedWorkouts.find((workout: Workout) => workoutId === workout.id)
                    if (selectedWorkout.exercises.some((allocatedExercise: AllocatedExercise) => allocatedExercise.id === 'allocatedExercise-' + exerciseId)){
                        return { error: 'This exercise is already part of this workout'}
                    }

                    const savedWorkouts = snapshot.data()?.savedWorkouts.map((workout: Workout) => {
                        if(workoutId === workout.id){
                            exercise.id = 'allocatedExercise-' + exercise.id;
                            workout.exercises.splice(index, 0, exercise)[0];
                        }
                        return workout;
                    })
                    await updateDoc(doc(db, 'user', `${userId}`), { savedWorkouts })
                    return { data: null }
                } else return { error: 'Error' }
            },
            invalidatesTags: (result, error, { workoutId, exerciseId }): any => {
                if (!error){
                    return(
                        [{ type: 'Workout', id: workoutId }, {type: 'WorkoutExercise', id: exerciseId}]
                    )}
                }
        }),
        deleteUserSavedWorkoutExercise: builder.mutation<any, any>({
            async queryFn({userId, exerciseId, workoutId}){
                if (userId){
                    const snapshot = await getDoc(doc(db, 'user', `${userId}`));
                    const savedWorkouts = snapshot.data()?.savedWorkouts.map((workout: Workout) => {
                        if(workoutId === workout.id){
                            const exerciseIndex = workout.exercises.findIndex(exercise => exerciseId === exercise.id)
                            workout.exercises.splice(exerciseIndex, 1);
                        }
                        return workout;
                    })
                    const selectedWorkout = savedWorkouts.find((workout: Workout) => workoutId === workout.id)
                    await updateDoc(doc(db, 'user', `${userId}`), { savedWorkouts })
                    return { data: selectedWorkout }
                } else return { error: 'Error'}
            },
            invalidatesTags: (result, error, { workoutId, exerciseId}) => [{ type: 'Workout', id: workoutId }, { type: 'WorkoutExercise', id: exerciseId }]
        }),
    })
})

export const { useCreateUserWorkoutMutation, useEditUserWorkoutMutation, useDeleteUserWorkoutMutation, useGetUserSavedWorkoutsQuery, useAddUserSavedWorkoutExerciseMutation, useChangeWorkoutExercisesOrderMutation, useDeleteUserSavedWorkoutExerciseMutation } = workoutApi; 