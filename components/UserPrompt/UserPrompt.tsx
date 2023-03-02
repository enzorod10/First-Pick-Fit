import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter'
import styles from './UserPrompt.module.css';
import { userSlice } from '../../redux/features/user/userSlice';
import { calendarSlice } from '../../redux/features/calendar/calendarSlice';
import { useSelector } from "react-redux";
import { RootState } from '../../store';
import { useGetUserNextWorkoutQuery, useGetClickedOnDateQuery } from '../../redux/features/calendar/calendarApi';
import { DateTime } from 'luxon';
import AllocatedExercise from '../../interfaces/AllocatedExercise';
import { uid } from 'uid';
import Workout from '../../interfaces/Workout';

const UserPrompt = () => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])
    const { monthAndYear, monthSelected, spacedMonthAndYear, dateClicked } = useSelector((state: RootState) => state[calendarSlice.name])
    const [skip, setSkip] = useState<boolean[]>([false, true])
    const { data, error, isSuccess } = useGetUserNextWorkoutQuery({ userId, monthAndYear, currentDate: DateTime.now().day, currentMonth: DateTime.now().month, monthSelected, currentYear: DateTime.now().year }, { skip: skip[0]})
    const [secondRender, setSecondRender] = useState(false)
    const [thirdRender, setThirdRender] = useState(false)
    const clickedOnDateResult = useGetClickedOnDateQuery({ userId, monthAndYear, dateClicked }, { skip: skip[1] })

    useEffect(() => {
        monthAndYear !== '' && setSkip((prevskip) => [prevskip[0] = false, prevskip[1] = true])
    }, [monthAndYear])

    useEffect(() => {
        dateClicked && setSkip((prevskip) => [prevskip[0] = true, prevskip[1] = false])
    }, [dateClicked])

    useEffect(() => {
        skip[0] && setSecondRender(false)
        skip[1] && setThirdRender(false) 
    }, [skip])

    useEffect(() => {
        !secondRender && setThirdRender(true)
        !thirdRender && setSecondRender(true)
    }, [secondRender, thirdRender])

    const UserHasUpcomingWorkoutRender: any = () => {
        return(
            <div>
                <div>
                    The next workout you have planned for the month you are viewing is on{' '}
                    <span style={{ color: 'red', fontWeight: 'bold' }}>
                    <Typewriter
                        words={[` ${spacedMonthAndYear.split(' ')[0]} ${data.date}: `]}
                        loop={1}
                        cursor
                        cursorStyle=''
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={2000}/>
                    </span>
                </div>
                <WorkoutExerciseRenderedOnDashboard workout={data.workout}/>
            </div>)
    }

    const WorkoutExerciseRenderedOnDashboard = ( { workout }: {workout: Workout}) => {
        return(
            <div>
                <div className={styles.workoutName} style={{ color: 'red', fontWeight: 'bold' }}>
                    <Typewriter
                        words={[` ${workout.name} `]}
                        loop={1}
                        cursor
                        cursorStyle=''
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={2000}/>
                </div>
                {workout.exercises.map((exercise: AllocatedExercise) => {
                    return (<div key={exercise.id}> 
                               {'>'} 
                                    <span className={styles.workoutExerciseName} style={{ color: 'red', fontWeight: 'bold' }}>
                                    <Typewriter
                                        words={[` ${exercise.name} `]}
                                        loop={1}
                                        cursor
                                        cursorStyle=''
                                        typeSpeed={100}
                                        deleteSpeed={50}
                                        delaySpeed={2000}/>
                                    </span>
                                    <div className={styles.setsContainer}>
                                        1. Set 1:  <span className={styles.workoutExerciseName} style={{ color: 'red', fontWeight: 'bold' }}>
                                                        <Typewriter
                                                            words={[` 10 reps 100 lbs `]}
                                                            loop={1}
                                                            cursor
                                                            cursorStyle=''
                                                            typeSpeed={100}
                                                            deleteSpeed={50}
                                                            delaySpeed={2000}/>
                                                        </span>
                                    </div>
                            </div>)
                })}
                    <div className={styles.areasTargetedContainer}>
                        {workout.areasTargeted.map((areaTargeted: string) => {
                            return <div key={uid()}> {areaTargeted} </div>
                        })}
                    </div>
            </div>)
    }
    
    const ClickedOnWorkoutInformationRender = () => {
        return(
            <div>
                You clicked on {spacedMonthAndYear.split(' ')[0]} {clickedOnDateResult.data.date}, {spacedMonthAndYear.split(' ')[1]}:
                <WorkoutExerciseRenderedOnDashboard workout={clickedOnDateResult.data.workout} />
            </div>
        )
    } 

    const SecondMessageRender: any = () => {
        if (isSuccess) return UserHasUpcomingWorkoutRender()
        if (error && error !== 'UserId Error'){
            return <div>
            Currently viewing
            <span style={{ color: 'red', fontWeight: 'bold' }}>
                <Typewriter
                    words={[` ${spacedMonthAndYear}. `]}
                    loop={1}
                    cursor
                    cursorStyle=''
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}/>
                </span>
            It looks like you don&apos;t have any upcoming workouts 
            for this month. You can drag workouts directly into a date
            to schedule a workout for that date.
        </div>
        }
    }

    const ThirdMessageRender: any = () => {
        if (clickedOnDateResult.isSuccess) return <ClickedOnWorkoutInformationRender />
        if (clickedOnDateResult.error && clickedOnDateResult.error !== 'UserId Error') return( 
            <div>
                There&apos;s no workout scheduled for this day.
            </div>)
    }

    return (
        <div>
            <div>Today is
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    <Typewriter
                    words={[` ${DateTime.now().toFormat('MMMM d, yyyy')}. `]}
                    loop={1}
                    cursor
                    cursorStyle=' '
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    />
                </span>
                Click on any date on the calendar to get information about a workout
                scheduled for that day. 
            </div>
            { secondRender && SecondMessageRender() }
            { thirdRender && ThirdMessageRender() }
        </div>
    )
};

export default UserPrompt;