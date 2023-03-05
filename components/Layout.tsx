import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Calendar from '../components/Calendar/Calendar/Calendar'
import MobileMenu from './MobileMenu/MobileMenu'
import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';

const Layout = ( { children, windowSize }: { children: React.ReactNode, windowSize: { width: number | undefined, height: number | undefined } } ) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])

    return(
        <>
            <Head>
                <title>Create Next</title>
            </Head>
            {windowSize.width && windowSize.width <= 600 && <MobileMenu />}
            <Calendar windowSize={windowSize} userId={userId}/>
            { children }
        </>
        
    )
}

export default Layout;