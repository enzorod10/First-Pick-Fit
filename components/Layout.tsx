import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Calendar from '../components/Calendar/Calendar/Calendar'
import MobileMenu from './MobileMenu/MobileMenu'

const Layout = ( { children, windowSize }: { children: React.ReactNode, windowSize: { width: number | undefined, height: number | undefined } } ) => {

    return(
        <>
            <Head>
                <title>Create Next</title>
            </Head>
            {windowSize.width && windowSize.width <= 800 && <MobileMenu />}
            <Calendar windowSize={windowSize}/>
            { children }
        </>
        
    )
}

export default Layout;