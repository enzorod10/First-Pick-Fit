import Workout from "./Workout/Workout";
import styles from './Workouts.module.css'
import { uid } from "uid";
import { useGetUserSavedWorkoutsQuery } from "../../redux/features/user/userApi";
import { useSelector } from 'react-redux'
import { userSlice } from '../../redux/features/user/userSlice'
import { RootState } from '../../store'

const Workouts = () => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])

    const { data } = useGetUserSavedWorkoutsQuery(userId)

    return(
        <div className={styles.container}>
            <h2> Workouts </h2>
            {data && data.map((workout: any) => {
                return (
                    <Workout key={uid()} name={workout.name} exercises={workout.exercises} targetedAreas={workout.targetedAreas}/>
                )
            })}
        </div>
    )
}

export default Workouts;