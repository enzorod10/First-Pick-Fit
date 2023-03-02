import styles from './Exercises.module.css'
import { uid } from 'uid'
import { useGetUserSavedExercisesQuery, useChangeExercisesOrderMutation } from '../../redux/features/exercise/exerciseApi'
import { userSlice } from '../../redux/features/user/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Exercise from './Exercise/Exercise'
import { useEffect, useState } from 'react'
import { DndContext, useDraggable } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import ExerciseInterface from '../../interfaces/Exercise'
import Router, { useRouter } from 'next/router'

const Exercises = () => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name]);
    const { data } = useGetUserSavedExercisesQuery(userId);
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [changeExerciseOrderMutation] = useChangeExercisesOrderMutation();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (data){
            setExercises(data)
        }
    }, [data])

    function handleDragEndScrollEvent(event: any){
        const {active, over} = event;
    
        if (active?.id !== over?.id && exercises) {
            const oldIndex = exercises.findIndex(exercise => 'sortable-' + exercise.id === active?.id);
            const newIndex = exercises.findIndex(exercise => 'sortable-' + exercise.id === over?.id);
            setExercises((exercises: any) => {
                return arrayMove(exercises, oldIndex, newIndex)
            })
            changeExerciseOrderMutation({userId, oldIndex, newIndex})
        }
    }

    return(
        <div className={styles.container}>
            <h2>
                Exercises
            </h2>
            <button onClick={() => setEditMode(editMode ? false : true)}>{editMode ? 'Currently: Edit Mode' : 'Currently: Drag Mode'}</button>
            <ul>
            {!editMode &&
                exercises && exercises.map((exercise: Exercise) => {
                    return(
                    <DraggableExercise key={uid()} exercise={exercise}>
                        <Exercise editMode={editMode} exercise={exercise} />
                    </DraggableExercise>
                    );
                })
            }
            {editMode &&
                exercises &&
                <DndContext onDragEnd={handleDragEndScrollEvent} modifiers={[restrictToParentElement]}>
                    <SortableContext items={exercises.map(exercise => 'sortable-' + exercise.id)} strategy={verticalListSortingStrategy}>
                        {exercises.map((exercise: ExerciseInterface) => {
                            return(
                                <Exercise key={uid()} editMode={editMode} exercise={exercise} />
                            );
                        })}
                    </SortableContext>
                </DndContext>}
            </ul>
        </div>
    )
}

const DraggableExercise = (props: any) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.exercise.id, data: { type: 'exercise', exercise: props.exercise, renderDragLayout: ({exercise}: { exercise: ExerciseInterface }) => <Exercise editMode={false} exercise={exercise} />  }
    });

    return (
        <li ref={setNodeRef} className={styles.container} {...listeners} {...attributes}>
            {props.children}
        </li>
    )
}

export default Exercises;