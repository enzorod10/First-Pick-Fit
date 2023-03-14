import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSlice, setDateClicked, setIsCalendarExpanded } from '../../redux/features/calendar/calendarSlice';
import { RootState } from '../../store';
import styles from './Nav.module.css';

const Nav = () => {
    const dispatch = useDispatch();
    const { calendarExpanded } = useSelector((state: RootState) => state[calendarSlice.name])
    const router = useRouter();

    const handleTabSwitch = (pathname: string) => {
        if (router.pathname !== '/dashboard'){
            dispatch(setDateClicked(null));
        }
        if (router.pathname !== pathname){
            if (!calendarExpanded){
                dispatch(setIsCalendarExpanded(true));
            }
            router.push(pathname)
        }
    }

    return(
        <ul className={styles.container}>
            <li onClick={() => handleTabSwitch('/dashboard')}>
                <span className={`${router.pathname === '/dashboard' && styles.active}`}>Dashboard</span>
            </li>
            <li onClick={() => handleTabSwitch('/workouts')}>
                <span className={`${router.pathname === '/workouts' && styles.active}`}>Workouts</span>
            </li>
            <li onClick={() => handleTabSwitch('/exercises')}>
                <span className={`${router.pathname === '/exercises' && styles.active}`}>Exercises</span>

            </li>
            <li onClick={() => handleTabSwitch('/home')}>
                <span className={`${router.pathname === '/signout' && styles.active}`}>Sign Out</span>
            </li>
        </ul>
    );
};

export default Nav;