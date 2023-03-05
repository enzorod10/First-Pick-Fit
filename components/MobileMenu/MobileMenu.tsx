import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calendarSlice, setIsCalendarExpanded } from '../../redux/features/calendar/calendarSlice';
import { RootState } from '../../store';
import styles from './MobileMenu.module.css';

const MobileMenu = () => {
    const dispatch = useDispatch();
    const { calendarExpanded } = useSelector((state: RootState) => state[calendarSlice.name])

    const handleTabSwitch = (pathname: string) => {
        if (pathname !== '/workouts' && !calendarExpanded){
            dispatch(setIsCalendarExpanded(true));
        }
        Router.push(pathname)
    }

    return(
        <ul className={styles.container}>
            <li onClick={() => handleTabSwitch('/dashboard')}>Dashboard</li>
            <li onClick={() => handleTabSwitch('/workouts')}>Workouts</li>
            <li onClick={() => handleTabSwitch('/exercises')}>Exercises</li>
            <li onClick={() => handleTabSwitch('/home')}>Sign out</li>
        </ul>
    );
};

export default MobileMenu;