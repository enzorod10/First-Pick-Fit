import styles from './Workout.module.css'
import { useAddUserSavedWorkoutExerciseMutation, useChangeWorkoutExercisesOrderMutation, useDeleteUserSavedWorkoutExerciseMutation } from '../../../redux/features/workout/workoutApi';
import { useSelector } from 'react-redux'
import { userSlice } from '../../../redux/features/user/userSlice';
import { RootState } from '../../../store';
import Workout from '../../../interfaces/Workout';
import { useDraggable } from "@dnd-kit/core";
import {
    useDndMonitor,
    useDroppable,
    DragEndEvent,
  } from '@dnd-kit/core';
import AllocatedExercise from '../../../interfaces/AllocatedExercise';
import Image from 'next/image';

interface AppProps{
    workout: Workout;
    initiateEditMode: (workout?: Workout) =>  void;
}

const Workout = ( { workout, initiateEditMode }: AppProps) => {
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
        <div onClick={() => initiateEditMode(workout)} className={styles.container}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '0.3rem'}}>
                <div style={{fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--charcoal)',width: '100%', wordWrap: 'break-word', paddingLeft: '0rem'}}>
                    {workout.name}
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Image style={{pointerEvents: 'none'}} src='/images/icons/drag.png' alt='drag and drop' width='9' height='15'/>
                    <ul style={{fontSize: '0.7rem', width: '100%'}}>
                        {workout.exercises.map((exercise: AllocatedExercise) => {
                            return <li key={exercise.id}>
                                {exercise.sets.reduce((acc, curr) => curr.sets + acc, 0)} {exercise.sets.reduce((acc, curr) => curr.sets + acc, 0) !== 1 ? 'sets' : 'set'} of <span>{exercise.name}</span>
                            </li>
                        })}
                    </ul>
                    <ul className={styles.areasTargeted}>
                        {workout.areasTargeted.map((area, index) => {
                            return (index < 2 &&
                                <li key={area.id}>
                                    <Image src={`/images/muscle-parts/${area.name}.png`} alt={`${area.name}`} width='30' height='30' />
                                    <p>{area.name}</p>
                                </li>)
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export const DraggableWorkout = (props: any) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.workout.id, data: { type: 'workout', workout: props.workout, renderDragLayout: ({workout} : {workout: Workout}) => <div >  hello</div> }
    });

    return (
        <div ref={setNodeRef} {...listeners} style={{touchAction: 'manipulation'}} {...attributes}>
            {props.children}
        </div>
    )
}

export default Workout;