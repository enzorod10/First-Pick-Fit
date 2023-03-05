import styles from './MobileWorkout.module.css'
import { useAddUserSavedWorkoutExerciseMutation, useChangeWorkoutExercisesOrderMutation, useDeleteUserSavedWorkoutExerciseMutation } from '../../../redux/features/workout/workoutApi';
import { uid } from 'uid'
import { useSelector } from 'react-redux'
import { userSlice } from '../../../redux/features/user/userSlice';
import { RootState } from '../../../store';
import Workout from '../../../interfaces/Workout';
import { useDraggable } from "@dnd-kit/core";
import {
    DndContext,
    useDndMonitor,
    useDroppable,
    DragEndEvent,
  } from '@dnd-kit/core';
  import {
    useSortable,
  } from '@dnd-kit/sortable';
  import {
    CSS
  } from '@dnd-kit/utilities';
import { useState } from 'react';
import AllocatedExercise from '../../../interfaces/AllocatedExercise';

interface AppProps{
    workout: Workout;
    displayWorkout: (workout?: Workout) => void;
}

const MobileWorkout = ( { workout, displayWorkout }: AppProps) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name]);
    const { isOver, setNodeRef } = useDroppable({ id: workout.id, data: { type: 'workoutExercisesContainer' } });
    const [addUserSavedWorkoutExercise] = useAddUserSavedWorkoutExerciseMutation();

    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    };

    useDndMonitor({
        onDragEnd(event: DragEndEvent){
            const { active, over } = event;
            if(active?.data?.current?.type === 'exercise' && over?.data?.current?.type === 'workoutExercisesContainer'){
                addUserSavedWorkoutExercise({userId, exerciseId: active.id as string, workoutId: over.id as string, index: 0})
            }
        }
    })

    return(
        <div onClick={() => displayWorkout(workout)} className={styles.container}>
            <ul className={styles.areasTargeted}>
                {workout.name}
                {workout.areasTargeted.map(area => {
                    return (
                        <li key={uid()}> {area} </li>
                    )
                })}
            </ul>

        </div>
    )
}

export const MobileDraggableWorkout = (props: any) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.workout.id, data: { type: 'workout', workout: props.workout, renderDragLayout: ({workout} : {workout: Workout}) => <div >  hello</div> }
    });

    return (
        <div ref={setNodeRef} style={{touchAction: 'manipulation'}} {...attributes}>
            <div {...listeners}>
            drag handle   
            </div>
            {props.children}
        </div>
    )
}

export const MobileIndividualWorkout = ({ workout, displayWorkout }: AppProps) => {
    return(
        <div>
            <div onClick={() => displayWorkout()}>Go back</div>
            Workout Name
        </div>
    )
}

const MobileWorkoutExercise = ({ exercise, userId, workoutId}: { exercise: AllocatedExercise, userId: string | undefined, workoutId: string }) => {
    const [deleteUserSavedWorkoutExercise] = useDeleteUserSavedWorkoutExerciseMutation();
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable( { id: exercise.id } );

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    return(
        <div ref={setNodeRef} className={styles.workoutExerciseContainer} style={style} {...attributes}>
            <div className={styles.workoutExerciseHandleAndInfo}>
                <div className={styles.workoutExerciseHandle} {...listeners}>...</div>
                <div className={styles.workoutExerciseInfo}>
                    <h4 style={{all: 'unset'}}>{ exercise.name }</h4>
                    <div className={styles.workoutExerciseSets}>
                        <div>
                            1. 10 reps - 100 lbs
                        </div>
                        <div>
                            2. 10 reps - 100 lbs
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => deleteUserSavedWorkoutExercise({userId, exerciseId: exercise.id, workoutId })} style={{marginLeft: '20px'}}> X</button> 
        </div>
    )
}

export default MobileWorkout;