import Router from 'next/router';
import React, { useState } from 'react';
import styles from './MobileMenu.module.css';

const MobileMenu = () => {
    return(
        <ul className={styles.container}>
            <li onClick={() => Router.push('/dashboard')}>Home</li>
            <li onClick={() => Router.push('/workouts')}>Workouts</li>
            <li onClick={() => Router.push('/exercises')}>Exercises</li>
            <li onClick={() => Router.push('/home')}>Sign out</li>
        </ul>
    );
};

export default MobileMenu;