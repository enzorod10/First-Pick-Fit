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
            <div className='z-10 relative flex flex-col h-full w-full sm:min-w-[450px] max-w-[450px] overflow-hidden'>
                <Calendar windowSize={windowSize} userId={userId}/>
                {router.pathname !=='/dashboard'&& <SearchComponent pathname={router.pathname}/>}
                { children }
                <Nav windowSize={windowSize} />
            </div>
            {windowSize.width && windowSize.width >= 1000 && 
                <div style={{zIndex: 2, borderRadius: '5%', backgroundColor: 'rgba(240, 240, 240, 0.8)', minWidth: '45px', padding: '0 2px', display: 'flex', gap: '10px', justifyContent: 'space-evenly',  flexDirection: 'column', boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px', margin: '3% 0 3% 0.5rem', height: '94%', content: '', }}>
                    {[1, 2, 3, 4, 5, 6].map(item => {
                        return(
                            <div key={item} style={{ position: 'relative', width: '100%', height: '16px', border: '7px var(--charcoal) solid', boxShadow: '0px -2px 5px 3px rgba(70, 83, 98, 0.2)', borderBottom: 'none', borderTopRightRadius: '50%', borderTopLeftRadius: '50%', content: '', backgroundColor: 'transparent', }}>
                                <div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            }

            {windowSize.width && windowSize.width >= 1000 && data && 
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '450px', margin: '5rem 0px'}}>

                <Programs windowSize={windowSize} data={data} userId={userId}/>
            </div>}
        </>
    )
}

export default Layout;