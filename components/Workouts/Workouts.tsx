import Workout from "./Workout/Workout";
import styles from './Workouts.module.css'
import { uid } from "uid";
import { useGetUserSavedWorkoutsQuery } from "../../redux/features/workout/workoutApi";
import { useSelector } from 'react-redux'
import { userSlice } from '../../redux/features/user/userSlice'
import { RootState } from '../../store';
import { DraggableWorkout } from './Workout/Workout';

import { MobileWorkoutsComponent } from "./MobileWorkouts";

const Workouts = ({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined } }) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])
    const { data } = useGetUserSavedWorkoutsQuery(userId)

    return(
        <div className={styles.container}>
            {windowSize.width && windowSize.width >= 600 ?
            data && data.map((workout: Workout) => {
                return (
                    <DraggableWorkout key={workout.id} workout={workout}>
                        <Workout workout={workout} userId={userId}/>
                    </DraggableWorkout>
                )
            }) :
            data && <MobileWorkoutsComponent workouts={data} userId={userId}/> }
        </div>
    )
}

export default Workouts;