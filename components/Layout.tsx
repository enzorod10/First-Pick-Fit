import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Calendar from '../components/Calendar/Calendar/Calendar'
import Nav from './Nav/Nav'
import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';

const Layout = ( { children, windowSize }: { children: React.ReactNode, windowSize: { width: number | undefined, height: number | undefined } } ) => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])


    return(
        <>
            <Head>
                <title>{children ? (children as any)?.type?.name + ' - First Pick Fit' : 'First Pick Fit'}</title>
            </Head>
            <Calendar windowSize={windowSize} userId={userId}/>
            { children }
            <Nav />
        </>
        
    )
}

export default Layout;