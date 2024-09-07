import styles from './Workout.module.css'
import { useAddUserSavedWorkoutExerciseMutation } from '../../../redux/features/workout/workoutApi';
import { useSelector } from 'react-redux'
import { userSlice } from '../../../redux/features/user/userSlice';
import { RootState } from '../../../store';
import { default as WorkoutType } from '../../../interfaces/Workout';
import { useDraggable } from "@dnd-kit/core";
import {
    useDndMonitor,
    useDroppable,
    DragEndEvent,
  } from '@dnd-kit/core';
import AllocatedExercise from '../../../interfaces/AllocatedExercise';
import Image from 'next/image';

interface AppProps{
    workout: WorkoutType;
    initiateEditMode: (workout?: WorkoutType) =>  void;
}

const Workout = ( { workout, initiateEditMode }: AppProps) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name]);
    const { isOver } = useDroppable({ id: workout.id, data: { type: 'workoutExercisesContainer' } });
    const [addUserSavedWorkoutExercise] = useAddUserSavedWorkoutExerciseMutation();

    useDndMonitor({
        onDragEnd(event: DragEndEvent){
            const { active, over } = event;
            if(active?.data?.current?.type === 'exercise' && over?.data?.current?.type === 'workoutExercisesContainer'){
                addUserSavedWorkoutExercise({userId, exerciseId: active.id as string, workoutId: over.id as string, index: 0})
            }
        }
    })

    return(
        <div className={styles.container}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '0.3rem'}}>
                <div className='flex justify-between' style={{fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--charcoal)', width: '100%', wordWrap: 'break-word', paddingLeft: '0rem'}}>
                    {workout.name}
                    <Image onClick={() => initiateEditMode(workout)} width={16} height={10} alt='edit' src='/images/icons/edit.png'/>
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
        id: props.workout.id, data: { type: 'workout', workout: props.workout, renderDragLayout: ({workout} : {workout: WorkoutType}) => <div style={{ fontSize: '0.6rem', borderRadius: '2px', backgroundColor: 'rgba(211,211,211, 0.45)', padding: '0.18rem', display: 'flex', alignItems: 'flex-end', color: 'var(--charcoal)', border: '1px #0119364a solid', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: document.querySelector('#date-1')?.getBoundingClientRect().width, height: document.querySelector('#date-1')?.getBoundingClientRect().height }}> {workout.name} </div> }
    });

    return (
        <div ref={setNodeRef} style={{touchAction: 'manipulation', position: 'relative', WebkitUserSelect: 'none'}} {...attributes}>
            <div {...listeners} style={{ cursor: 'move', touchAction: 'manipulation', position:'absolute', height: '100%', width: '85px'}}></div>
            {props.children}
        </div>
    )
}

export default Workout;