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
                Reach Your Fitness Goals
            </h1>
            <p className="mb-8 text-center text-gray-500 px-4 dark:text-gray-400 sm:px-16 md:text-lg lg:text-xl xl:px-48">
            Take control of your fitness goals with our innovative workout tracker. Whether you&apos;re a beginner or a seasoned athlete, our platform is designed to make your workout routine seamless and effective.
            </p>
            <div className="mb-8 flex flex-col px-4 space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => router.push('/signup')}>
                    Get Started for Free
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Drag. Drop. Achieve.
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
                    Easily schedule your workouts with our intuitive drag-and-drop calendar. Simply pick a workout and drop it into your desired date. Track your progress by marking each session as complete or pending. It&apos;s that simple!
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                    Customized Programs for Every Goal

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
                        Not sure where to start? Choose from our expertly designed workout programs that cater to various fitness levels and goals. Whether it&apos;s a 6-week strength-building regimen or a 2-month fat loss journey, just set your start date, and watch your calendar fill up automatically with a structured plan that keeps you on track
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Stay on Track, Every Step of the Way
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
                        Our workout tracker isn%apos;t just about scheduling&mdash;it&apos;s about accountability. Stay motivated as you see your progress, with visual markers that highlight completed workouts. Ready to take your fitness to the next level?
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-current p-4 border-4 rounded">
                    <h3 className="font-bold text-xl">
                        Join Us Today
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
                        Start your free trial and discover how easy it is to build a consistent workout routine that fits your lifestyle. Achieve your fitness goals with the power of simplicity and smart planning.
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}