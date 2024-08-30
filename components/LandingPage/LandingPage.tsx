'use client';

import Image from "next/image";
import { useRouter } from "next/router";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
import { RootState } from '../../store'
import { userSlice } from "../../redux/features/user/userSlice";
import { useEffect } from "react";

export default function LandingPage() {
    const router = useRouter();
    const { loginStatus } = useSelector((state: RootState) => state[userSlice.name])

    useEffect(() => {
        loginStatus && router.push('/dashboard')
    }, [loginStatus, router])

    return (
        <div className="w-full">
            <nav className="h-14 flex items-center px-4 border-b gap-3">
                    <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        First Pick Fit
                    </h4>
            </nav>
            <div className="lg:flex max-w-screen-2xl mx-auto">
                <Image
                    src="/images/landing-page-images/main.jpg"
                    alt="first pick fit"
                    className="mx-auto"
                    height={1000}
                    width={500}
                />
                <div className="my-auto">
                    <h1 className="mb-4 text-violet-500 text-center text-4xl px-4 font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        Reach Your Fitness Goals
                    </h1>
                    <p className="mb-8 text-center text-gray-500 px-4 dark:text-gray-400 sm:px-16 md:text-lg lg:text-xl xl:px-48">
                        Take control of your fitness goals with our innovative workout tracker. Whether you&apos;re a beginner or a seasoned athlete, our platform is designed to make your workout routine seamless and effective.
                    </p>
                    <div className="mb-8 flex flex-col px-4 space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16 ">
                        <button type="button" onClick={() => router.push('/login')} className="focus:outline-none text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900">
                            Get Started for Free
                        </button>
                    </div>
                </div>
            </div>
            <div className="m-4 max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    <div className="flex flex-col gap-4 text-current p-4 border-4 rounded-3xl border-violet-300">
                        <h3 className="font-bold text-xl">
                            Join Us Today
                        </h3>
                        <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                            <Image
                                src="/images/landing-page-images/goals.jpg"
                                alt='stay updated' 
                                fill
                                className="mx-auto place-self-center rounded object-cover"
                            />
                        </div>
                        <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[6px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                        </div>
                        <div className="flex-1 tracking-wide font-medium flex items-center">
                            It is completely free! Join and discover how easy it is to build a consistent workout routine that fits your lifestyle. Achieve your fitness goals with the power of simplicity and smart planning.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-current p-4 border-4 rounded-3xl border-violet-300 z-10">
                        <h3 className="font-bold text-xl">
                            Drag. Drop. Achieve.
                        </h3>
                        <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                            <Image
                                src="/images/landing-page-images/schedule.jpg"
                                alt='schedule'
                                fill
                                className="mx-auto place-self-center rounded object-cover"
                            />
                        </div>
                        <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[6px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                        </div>
                        <div className="flex-1 tracking-wide font-medium flex items-center ">
                        Easily schedule your workouts with our intuitive drag-and-drop calendar. Simply pick a workout and drop it into your desired date. Track your progress by marking each session as complete or pending. It&apos;s that simple!
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-current p-4 border-4 rounded-3xl border-violet-300">
                        <h3 className="font-bold text-xl">
                        Customized Programs for Every Goal

                        </h3>
                        <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                            <Image
                                src="/images/landing-page-images/programs.jpg"
                                alt='programs' 
                                fill
                                className="mx-auto place-self-center rounded object-cover"
                            />
                        </div>
                        <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[6px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                        </div>
                        <div className="flex-1 tracking-wide font-medium flex items-center ">
                            Not sure where to start? Choose from our expertly designed workout programs that cater to various fitness levels and goals. Whether it&apos;s a 6-week strength-building regimen or a 2-month fat loss journey, just set your start date, and watch your calendar fill up automatically with a structured plan that keeps you on track
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-current p-4 border-4 rounded-3xl border-violet-300">
                        <h3 className="font-bold text-xl">
                            Stay on Track, Every Step of the Way
                        </h3>
                        <div className="grid w-fit relative w-full min-h-[200px] max-h-[200px] mx-auto rounded">
                            <Image
                                src="/images/landing-page-images/steps.jpg"
                                alt='goals' 
                                fill
                                className="mx-auto place-self-center rounded object-cover"
                            />
                        </div>
                        <div className="flex w-2/3 max-w-2/3 mx-auto items-center">
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[6px] bg-violet-500 rounded-full">
                            </div>
                            <div className="w-1/3 h-[1px] bg-violet-500 rounded-full">
                            </div>
                        </div>
                        <div className="flex-1 tracking-wide font-medium flex items-center">
                            Our workout tracker isn&apos;t just about scheduling&mdash;it&apos;s about accountability. Stay motivated as you see your progress, with visual markers that highlight completed workouts. Ready to take your fitness to the next level?
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}