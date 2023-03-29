import { WorkoutsComponent } from "../components/Workouts/Workouts";
import { useGetUserSavedWorkoutsQuery } from "../redux/features/workout/workoutApi";
import { useSelector } from 'react-redux';
import { userSlice } from '../redux/features/user/userSlice';
import { RootState } from '../store';
import LoadingIcons from 'react-loading-icons';
import { useEffect, useState } from "react";

export default function Workouts() {
    const { userId, pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])
    const { data, isSuccess } = useGetUserSavedWorkoutsQuery(userId)
    const [startup, setStartup]  = useState(false)

    useEffect(() => {
        setTimeout(() => setStartup(true), 200)
    }, [])

    if (!isSuccess) return <div style={{height: '100%', display: 'grid', placeItems: 'center'}}> <LoadingIcons.BallTriangle stroke='var(--charcoal)'/> </div>

    return (
        <div style={{ height: '100%', overflowY: 'hidden', opacity: (pageLoadingStatus || !startup) ? '0' : '1', transition: 'opacity 0.2s ease-out' }}>
            {data && <WorkoutsComponent workouts={data} userId={userId}/>}
        </div>
    )
}