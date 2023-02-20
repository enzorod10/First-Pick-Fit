import styles from './Workout.module.css'
import { uid } from 'uid'
import { useDroppable } from '@dnd-kit/core'

interface AppProps{
    name: string,
    exercises: any[],
    targetedAreas: string[]
}

const Workout = ( { name, targetedAreas, exercises }: AppProps) => {
    const { isOver, setNodeRef } = useDroppable({ id: 'exercisesListOnWorkout'})

    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    };

    return(
        <div className={styles.container}>
            <h3 className={styles.workoutName}>
                {name}
            </h3>
            <h4>Exercises</h4>
            <ul className={styles.exercises} ref={setNodeRef} style={style}>
                {exercises.map(exercise => {
                    return (
                        <li key={uid()}> {exercise.name} </li>
                    )
                })}
               
            </ul>
            <h4> Areas Targeted</h4>
            <ul className={styles.areasTargeted}>
                {targetedAreas.map(area => {
                    return (
                        <li key={uid()}> {area} </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Workout;