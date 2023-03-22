import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetAllPlansQuery } from '../redux/features/userApi/userApi';
import ProgramsComponent from '../components/Programs/Programs';
import LoadingIcons from 'react-loading-icons';

export default function Programs({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined } }) {
    const { userId, pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])
    const [startup, setStartup]  = useState(false)
    const { data, isSuccess } = useGetAllPlansQuery();

    useEffect(() => {
        setTimeout(() => setStartup(true), 200)
    }, [])

    if (!isSuccess) return <div style={{height: '100%', display: 'grid', placeItems: 'center'}}> <LoadingIcons.BallTriangle stroke='var(--charcoal)'/> </div>

    return (
        <div style={{ height: '100%', overflowY: 'hidden', opacity: (pageLoadingStatus || !startup) ? '0' : '1', transition: 'opacity 0.2s ease-out' }}>
            {data && <ProgramsComponent data={data} userId={userId} />}
        </div>
    )
}