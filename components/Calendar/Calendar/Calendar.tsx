import { useEffect, useState } from "react";
import styles from './Calendar.module.css';
import Cell from "../Cell/Cell";
import { DateTime } from 'luxon';
import { uid } from "uid";
import { useGetUserMonthWorkoutsQuery, useAddUserWorkoutToMonthWorkoutsMutation } from "../../../redux/features/calendar/calendarApi";
import { userSlice } from "../../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import { DragStartEvent, DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { setMonthAndYear } from "../../../redux/features/calendar/calendarSlice";

const monthsOfTheYear: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

const Calendar = ( { windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) => {
    const [yearSelected, setYearSelected] = useState<number>(DateTime.local().year)
    const [monthSelected, setMonthSelected] = useState<number>(DateTime.local().month)
    const [monthMapped, setMonthMapped] = useState<({ date: number, day: string } | undefined)[] | undefined >()
    const [daysOfTheWeek, setDaysOfTheWeek] = useState<string[]>([ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ])

    const { userId } = useSelector((state: RootState) => state[userSlice.name])
    const dispatch = useDispatch();
    const { data } = useGetUserMonthWorkoutsQuery({ userId, monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`, arrayOfMonth: monthMapped?.reduce((a, v): any => (v !== undefined ? [...a, v.date] : a), [])})
    const [addUserWorkoutToMonthWorkoutsMutation] = useAddUserWorkoutToMonthWorkoutsMutation()

    useEffect(() => {
        if (windowSize.width && windowSize.width >= 600){
            setDaysOfTheWeek([ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ])
        }  else {
            setDaysOfTheWeek([ 'Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.' ])
        }
    }, [windowSize])

    useEffect(() => {
        let monthMappedTemp: (undefined | { date: number, day: string })[] = []
        let monthArray = new Array(DateTime.local(yearSelected, monthSelected).daysInMonth + DateTime.local(yearSelected, monthSelected, 1).weekday % 7)
        
        for(let i=0; i < monthArray.length; i++){
            if (i >= DateTime.local(yearSelected, monthSelected, 1).weekday % 7){
                let date = (i - (DateTime.local(yearSelected, monthSelected, 1).weekday % 7)) + 1
                let day = daysOfTheWeek[DateTime.local(yearSelected, monthSelected, date).weekday % 7]
                monthMappedTemp[i] = ( { date, day })
            } else {
                monthMappedTemp[i] = undefined
            }
        }

        
        dispatch(setMonthAndYear({monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`, spacedMonthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12]} ${yearSelected}`, monthSelected: `${monthSelected}`}))

        setMonthMapped(monthMappedTemp)
        
    }, [yearSelected, monthSelected, daysOfTheWeek, dispatch])

    const handleMonthChange = (action: string) => {
        if ((action === 'prev')){
            monthSelected === 1 ? (setMonthSelected(12), setYearSelected(yearSelected - 1)) : setMonthSelected(monthSelected - 1)
        }
        if ((action === 'next')){
            monthSelected === 12 ? (setMonthSelected(1), setYearSelected(yearSelected + 1)) : setMonthSelected(monthSelected + 1)
        }
    }

    useDndMonitor({
        onDragStart: (event: DragStartEvent) => {
            console.log(event)
        },
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event
            console.log(active)
            if (over){
                const date = Number(over.id.toString().slice(5))
                addUserWorkoutToMonthWorkoutsMutation({ userId, monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`, date, workout: active?.data?.current?.workout })
            }
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.nav}>
                <div onClick={() => handleMonthChange('prev')}>
                    {'<'}
                </div>
                <div className={styles.monthAndYear}>
                    {monthsOfTheYear[monthSelected - 1]} {yearSelected}
                </div>
                <div onClick={() => handleMonthChange('next')}>
                    {'>'}
                </div>
            </div>
            <div className={styles.innerContainer}>

                {daysOfTheWeek.map(day => {
                    return <div key={uid()} className={styles.day}> {day} </div>
                })}
                {monthMapped?.map((cell) => {
                    return ( <Cell key={uid()} dateInfo={cell && data && data[cell.date]} userId={userId} id={`date-${cell?.date}`} date={cell?.date} monthAndYear= {`${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`}/>)
                })}
            </div>
        </div>
    )
}

export default Calendar;