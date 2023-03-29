import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/clientApp';
import { calendarSlice, setDateClicked, setIsCalendarExpanded } from '../../redux/features/calendar/calendarSlice';
import { setClickedOnButton, setPageLoadingStatus, setSearchedItems, setHideSearchBar } from '../../redux/features/user/userSlice';
import { RootState } from '../../store';

import styles from './Nav.module.css';

const Nav = ( { windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) => {
    const dispatch = useDispatch();
    const { calendarExpanded } = useSelector((state: RootState) => state[calendarSlice.name])
    const router = useRouter();

    const handleTabSwitch = (pathname: string) => {
        if (router.pathname !== '/dashboard'){
            dispatch(setDateClicked(null));
        }
        if (router.pathname !== pathname){
            dispatch(setSearchedItems({value: '', type: router.pathname}));
            dispatch(setClickedOnButton(false));
            dispatch(setHideSearchBar(false));
            dispatch(setPageLoadingStatus(true))
            router.events.on('routeChangeComplete', () => dispatch(setPageLoadingStatus(false)))
            if (!calendarExpanded){
                dispatch(setIsCalendarExpanded(true));
            }
            setTimeout(() => router.push(pathname), 100)
            return(
                router.events.off('routeChangeComplete', () => dispatch(setPageLoadingStatus(false)))
            )
        }
    }

    return(
        <ul className={styles.container}>
            <li onClick={() => handleTabSwitch('/dashboard')}>
                <span className={`${router.pathname === '/dashboard' && styles.active}`}>Dashboard</span>
            </li>
            {windowSize.width && windowSize.width < 1000 &&
            <li onClick={() => handleTabSwitch('/programs')}>
                <span className={`${router.pathname === '/programs' && styles.active}`}>Programs</span>
            </li>}
            <li onClick={() => handleTabSwitch('/workouts')}>
                <span className={`${router.pathname === '/workouts' && styles.active}`}>Workouts</span>
            </li>
            <li onClick={() => handleTabSwitch('/exercises')}>
                <span className={`${router.pathname === '/exercises' && styles.active}`}>Exercises</span>
            </li>
            <li onClick={() => signOut(auth)}>
                <Image src='/images/icons/logout.png' alt='logout' width='18' height='18' />
            </li>
        </ul>
    );
};

export default Nav;