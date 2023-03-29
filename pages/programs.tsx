import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';
import { useEffect, useState } from 'react'
import { useGetAllPlansQuery } from '../redux/features/userApi/userApi';
import ProgramsComponent from '../components/Programs/Programs';
import LoadingIcons from 'react-loading-icons';
import useWindowSize from "../hooks/useWindowSize";

export default function Programs() {
    const { userId, pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])
    const [startup, setStartup]  = useState(false)
    const { data, isSuccess } = useGetAllPlansQuery();
    const windowSize = useWindowSize();


    useEffect(() => {
        setTimeout(() => setStartup(true), 200)
    }, [])

    if (!isSuccess) return <div style={{height: '100%', display: 'grid', placeItems: 'center'}}> <LoadingIcons.BallTriangle stroke='var(--charcoal)'/> </div>

    return (
        <div style={{ height: '100%', overflowY: 'hidden', opacity: (pageLoadingStatus || !startup) ? '0' : '1', transition: 'opacity 0.2s ease-out' }}>
            {data && <ProgramsComponent windowSize={windowSize} data={data} userId={userId} />}
        </div>
    )
}