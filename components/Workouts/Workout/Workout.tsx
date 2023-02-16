import styles from './Workout.module.css'

const Workout = () => {

    return(
        <div className={styles.container}>
            <h3 className={styles.workoutName}>
                Workout Name 
            </h3>
            <h4>Exercises</h4>
            <ul className={styles.exercises}>
                <li>Exercise 1</li>
                <li>Exercise 2</li>
                <li>Exercise 3</li>
                <li>Exercise 4</li>
            </ul>
            <h4> Areas Targeted</h4>
            <ul className={styles.areasTargeted}>
                <li>Chest</li>
                <li>Shoulders</li>
            </ul>

        </div>
    )
}

export default Workout;