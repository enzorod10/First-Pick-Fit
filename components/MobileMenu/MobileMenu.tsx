import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSlice, setDateClicked, setIsCalendarExpanded } from '../../redux/features/calendar/calendarSlice';
import { RootState } from '../../store';
import styles from './MobileMenu.module.css';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const { calendarExpanded } = useSelector((state: RootState) => state[calendarSlice.name])

    const handleTabSwitch = (pathname: string) => {
        if (Router.pathname !== '/dashboard'){
            dispatch(setDateClicked(null));
        }
        if (Router.pathname !== pathname){
            if (!calendarExpanded){
                dispatch(setIsCalendarExpanded(true));
            }
            Router.push(pathname)
        }
    }

    return(
        <ul className={styles.container}>
            <li onClick={() => handleTabSwitch('/dashboard')}>
                <span className={`${Router.pathname === '/dashboard' && styles.active}`}>Dashboard</span>
            </li>
            <li onClick={() => handleTabSwitch('/workouts')}>
                <span className={`${Router.pathname === '/workouts' && styles.active}`}>Workouts</span>
            </li>
            <li onClick={() => handleTabSwitch('/exercises')}>
                <span className={`${Router.pathname === '/exercises' && styles.active}`}>Exercises</span>

            </li>
            <li onClick={() => handleTabSwitch('/home')}>
                <span className={`${Router.pathname === '/signout' && styles.active}`}>Sign Out</span>
            </li>
        </ul>
    );
};

export default MobileMenu;