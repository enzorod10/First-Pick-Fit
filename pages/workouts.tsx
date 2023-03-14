import { WorkoutsComponent } from "../components/Workouts/Workouts";
import { useGetUserSavedWorkoutsQuery } from "../redux/features/workout/workoutApi";
import { useSelector } from 'react-redux'
import { userSlice } from '../redux/features/user/userSlice'
import { RootState } from '../store';

export default function Workouts({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined } }) {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])
    const { data } = useGetUserSavedWorkoutsQuery(userId)
    return (
        <div style={{ height: '100%', overflowY: 'hidden' }}>
            {data && <WorkoutsComponent workouts={data} userId={userId}/>}
        </div>
    )
}