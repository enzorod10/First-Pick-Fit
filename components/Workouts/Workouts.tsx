import Workout from "./Workout/Workout";
import styles from './Workouts.module.css'
import { uid } from "uid";
import { useGetUserSavedWorkoutsQuery } from "../../redux/features/workout/workoutApi";
import { useSelector } from 'react-redux'
import { userSlice } from '../../redux/features/user/userSlice'
import { RootState } from '../../store'
import { DraggableWorkout } from './Workout/Workout'

const Workouts = () => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])
    const { data } = useGetUserSavedWorkoutsQuery(userId)

    return(
        <div className={styles.container}>
            {data && data.map((workout: Workout) => {
                return (
                    <DraggableWorkout key={uid()} workout={workout}>
                        <Workout workout={workout}/>
                    </DraggableWorkout>
                )
            })}
        </div>
    )
}

export default Workouts;