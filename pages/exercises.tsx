import ExercisesComponent from '../components/Exercises/Exercises'
import { useSelector } from 'react-redux';
import { userSlice } from '../redux/features/user/userSlice';
import { RootState } from '../store';
import LoadingIcons from 'react-loading-icons';
import { useGetUserSavedExercisesQuery } from '../redux/features/exercise/exerciseApi';
import Head from 'next/head';

export default function Exercises() {
    const { pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])
    const { userId } = useSelector((state: RootState) => state[userSlice.name]);
    const { data, isSuccess, isFetching } = useGetUserSavedExercisesQuery(userId);

    if (!isSuccess) return <div style={{height: '100%', display: 'grid', placeItems: 'center'}}> <LoadingIcons.BallTriangle stroke='var(--charcoal)'/> </div>
    if (data) return (
        <>
        <Head>
            <title>
                Exercises
            </title>
        </Head>
        <ExercisesComponent pageLoadingStatus={pageLoadingStatus} data={data} userId={userId} />
        </>
    )
}