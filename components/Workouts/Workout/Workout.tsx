import styles from './Workout.module.css'
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
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
    DragEndEvent,
    DragStartEvent,
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  import {
    restrictToParentElement
  } from '@dnd-kit/modifiers';
  import {
    CSS
  } from '@dnd-kit/utilities';
import { useState } from 'react';
import AllocatedExercise from '../../../interfaces/AllocatedExercise';

interface AppProps{
    workout: Workout;
}

const Workout = ( { workout }: AppProps) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name]);
    const { isOver, setNodeRef } = useDroppable({ id: workout.id, data: { type: 'workoutExercisesContainer' } });
    const [addUserSavedWorkoutExercise] = useAddUserSavedWorkoutExerciseMutation();
    const [ changeWorkoutExercisesOrderMutation ] = useChangeWorkoutExercisesOrderMutation();
    const [ workoutExercises, setWorkoutExercises ] = useState<AllocatedExercise[]>(workout.exercises)

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

    function handleDragEndScrollEvent(event: any){
        const {active, over} = event;
    
        if (active?.id !== over?.id && workoutExercises) {
            const oldIndex = workoutExercises.findIndex(exercise => exercise.id === active?.id);
            const newIndex = workoutExercises.findIndex(exercise => exercise.id === over?.id);
            console.log(oldIndex, newIndex)
            setWorkoutExercises((exercises: any) => {
                return arrayMove(exercises, oldIndex, newIndex)
            })
            changeWorkoutExercisesOrderMutation({userId, workoutId: workout.id, oldIndex, newIndex})
        }
    }

    return(
        <div className={styles.container}>
            <ul className={styles.exercises} ref={setNodeRef} style={style}>
                {workoutExercises && 
                <DndContext modifiers={[restrictToParentElement]} onDragEnd={handleDragEndScrollEvent}>
                    <SortableContext items={workoutExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
                        {workoutExercises.map(exercise => {
                            return (
                                <WorkoutExercise key={uid()} exercise={exercise} userId={userId} workoutId={workout.id} />
                            )
                        })}
                    </SortableContext>
                </DndContext>}
            </ul>
            <h4> Areas Targeted</h4>
            <ul className={styles.areasTargeted}>
                {workout.areasTargeted.map(area => {
                    return (
                        <li key={uid()}> {area} </li>
                    )
                })}
            </ul>

        </div>
    )
}

export const DraggableWorkout = (props: any) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.workout.id, data: { type: 'workout', workout: props.workout, renderDragLayout: ({workout} : {workout: Workout}) => <div >  hello</div> }
    });

    return (
        <li ref={setNodeRef} {...attributes}>
            <header className={styles.workoutHeader}>
                <div className={styles.workoutName}> Chest Day </div>
                <div className={styles.middleOfWorkoutHeader}>
                    <div>
                        {`\<`}
                    </div>
                    <div {...listeners}> ... </div>
                    <div>
                        {`\>`}
                    </div>
                </div>
                <ul className={styles.workoutEditor}>
                    <li>Edit</li>
                    <li>All</li>
                </ul>
            </header>
            {props.children}
        </li>
    )
}

const WorkoutExercise = ({ exercise, userId, workoutId}: { exercise: AllocatedExercise, userId: string | undefined, workoutId: string }) => {
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

export default Workout;