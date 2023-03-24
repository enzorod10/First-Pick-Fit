import Head from 'next/head'
import React, { useState } from 'react'
import Calendar from '../components/Calendar/Calendar/Calendar'
import Nav from './Nav/Nav'
import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SearchComponent from './Search/Search'

const Layout = ( { children, windowSize }: { children: React.ReactNode, windowSize: { width: number | undefined, height: number | undefined } } ) => {
    const { userId, loginStatus } = useSelector((state: RootState) => state[userSlice.name])

    const router = useRouter();

    useEffect(() => {
      !loginStatus && router.push('/')
    }, [loginStatus, router])

    return(
        <>
            <Head>
                <title>{children ? (children as any)?.type?.name + ' - First Pick Fit' : 'First Pick Fit'}</title>
            </Head>
            <Calendar windowSize={windowSize} userId={userId}/>
            {router.pathname !=='/dashboard'&& <SearchComponent pathname={router.pathname}/>}
            { children }
            <Nav />
        </>
        
    )
}

export default Layout;