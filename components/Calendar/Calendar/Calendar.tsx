import { useEffect, useRef, useState } from "react";
import styles from './Calendar.module.css';
import Cell from "../Cell/Cell";
import { DateTime } from 'luxon';
import { useGetUserMonthWorkoutsQuery, useAddUserWorkoutToMonthWorkoutsMutation } from "../../../redux/features/calendar/calendarApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { calendarSlice, setMonthAndYear } from "../../../redux/features/calendar/calendarSlice";

const monthsOfTheYear: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

const Calendar = ( { windowSize, userId }: { windowSize: { width: number | undefined, height: number | undefined }, userId: string | undefined }) => {
    const [yearSelected, setYearSelected] = useState<number>(DateTime.local().year)
    const [monthSelected, setMonthSelected] = useState<number>(DateTime.local().month)
    const [monthMapped, setMonthMapped] = useState<({ date: number, day: string } | undefined)[] | undefined >()
    const [daysOfTheWeek, setDaysOfTheWeek] = useState<string[]>([ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ])

    const { calendarExpanded } = useSelector((state: RootState) => state[calendarSlice.name])
    const dispatch = useDispatch();
    const { data } = useGetUserMonthWorkoutsQuery({ userId, monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`, arrayOfMonth: monthMapped?.reduce((a, v): any => (v !== undefined ? [...a, v.date] : a), [])})
    const [addUserWorkoutToMonthWorkoutsMutation] = useAddUserWorkoutToMonthWorkoutsMutation()

    useEffect(() => {
        if (windowSize.width && windowSize.width > 600){
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
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event
            if (active?.data?.current?.type === 'workout' && over?.data?.current?.type === 'cell'){
                const date = Number(over.id.toString().slice(5))
                addUserWorkoutToMonthWorkoutsMutation({ userId, monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`, date, workout: active?.data?.current?.workout })
            }
        }
    })

    return(
        <div className={`${styles.container} ${ !calendarExpanded ? styles.condensed : '' }`}>
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
                    return <div key={day} className={styles.day}> {day} </div>
                })}
                {monthMapped?.map((cell, index) => {
                    return ( <Cell key={cell ? cell.date : 0 - index} dateInfo={cell && data && data[cell.date]} monthSelected={monthSelected} userId={userId} id={`date-${cell?.date}`} date={cell?.date} monthAndYear= {`${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}`} calendarExpanded={calendarExpanded}/>)
                })}
            </div>
        </div>
    )
}

export default Calendar;