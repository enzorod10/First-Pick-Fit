import Head from 'next/head';
import React, { useState } from 'react';
import Calendar from '../components/Calendar/Calendar/Calendar';
import Nav from './Nav/Nav';
import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchComponent from './Search/Search';
import Programs from './Programs/Programs';
import { useGetAllPlansQuery } from '../redux/features/userApi/userApi';

const Layout = ( { children, windowSize }: { children: React.ReactNode, windowSize: { width: number | undefined, height: number | undefined } } ) => {
    const { userId, loginStatus } = useSelector((state: RootState) => state[userSlice.name])
    const { data } = useGetAllPlansQuery();

    const router = useRouter();

    useEffect(() => {
      !loginStatus && router.push('/')
    }, [loginStatus, router])

    return(
        <>
            <Head>
                <title>{children ? (children as any)?.type?.name + ' - First Pick Fit' : 'First Pick Fit'}</title>
            </Head>
            <div style={{height: '100%', width: windowSize.width, maxWidth: '450px', overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
                <Calendar windowSize={windowSize} userId={userId}/>
                {router.pathname !=='/dashboard'&& <SearchComponent pathname={router.pathname}/>}
                { children }
                <Nav windowSize={windowSize} />
            </div>
            {windowSize.width && windowSize.width >= 1000 && data && 
            <div style={{ maxWidth: '450px', padding: '0rem 1rem', margin: '5rem 0px'}}>
                <Programs windowSize={windowSize} data={data} userId={userId}/>
            </div>
            }
        </>
    )
}

export default Layout;