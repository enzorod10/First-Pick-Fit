'use client';

import Image from "next/image"
import { useRouter } from "next/router"

export default function LandingPage() {
    const router = useRouter();

    return (
        <div className="w-full">
            <nav className="h-14 flex items-center justify-between px-4 border-b">
                <div className='flex items-center gap-3'>
                    <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        First Pick Fit
                    </h4>
                </div>
                <div className="flex items-center gap-2">
                    Get Started
                </div>
            </nav>
            <div className="m-4">
            <h1 className="mb-4 text-center text-4xl px-4 font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                Everything Kick Streamers
            </h1>
            <p className="mb-8 text-center text-gray-500 px-4 dark:text-gray-400 sm:px-16 md:text-lg lg:text-xl xl:px-48">
                A place for the kick community to find their place. Invest in streamers with virtual currency, keep up with upcoming streams, and find jobs with streamers!
            </p>
            <div className="mb-8 flex flex-col px-4 space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/signup')}>
                    Get Started for Free
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Join the Kick Realm
                    </h3>
                    <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                        <Image
                            src={''}
                            alt='streaming setup'
                            fill
                            className="mx-auto place-self-center rounded object-cover"
                        />
                    </div>
                    <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[6px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                    </div>
                    <div className="flex-1 tracking-wide font-medium flex items-center ">
                        Whether you&apos;re a streamer or a viewer, Kick Realm is the place to be for any user of Kick. Join our vibrant community and start your journey today!
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Connect with Streamers
                    </h3>
                    <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                        <Image
                            src={''}
                            alt='streaming stats' 
                            fill
                            className="mx-auto place-self-center rounded object-cover"
                        />
                    </div>
                    <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[6px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                    </div>
                    <div className="flex-1 tracking-wide font-medium flex items-center ">
                        Apply for work positions with your favorite streamers to help them manage their community & streams. Begin networking with the Kick community.
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Invest
                    </h3>
                    <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                        <Image
                            src={''}
                            alt='invest' 
                            fill
                            className="mx-auto place-self-center rounded object-cover"
                        />
                    </div>
                    <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[6px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                    </div>
                    <div className="flex-1 tracking-wide font-medium flex items-center">
                        Use Kick Realm Coins to invest in affiliated streamers. Build your portfolio, track real-time prices, and support your favorite streamers while enjoying the thrill of virtual investments.
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Keep up with Streamers
                    </h3>
                    <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                        <Image
                            src={''}
                            alt='stay updated' 
                            fill
                            className="mx-auto place-self-center rounded object-cover"
                        />
                    </div>
                    <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[6px] bg-red-500 rounded-full">
                        </div>
                        <div className="w-1/3 h-[1px] bg-red-500 rounded-full">
                        </div>
                    </div>
                    <div className="flex-1 tracking-wide font-medium flex items-center">
                        Keep up with streamers & their upcoming streams. Get informed of past/upcoming streams for any streamer who is part of the Kick Realm.  
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}