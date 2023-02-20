import { useEffect, useState } from "react";
import styles from './Calendar.module.css';
import Cell from "../Cell/Cell";
import { DateTime } from 'luxon';
import { uid } from "uid";
import { useGetUserMonthWorkoutsQuery } from "../../../redux/features/user/userApi";
import { userSlice } from "../../../redux/features/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from '../../../store';

const daysOfTheWeek: string[] = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
const monthsOfTheYear: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]

const Calendar = () => {
    const [yearSelected, setYearSelected] = useState<number>(DateTime.local().year)
    const [monthSelected, setMonthSelected] = useState<number>(DateTime.local().month)
    const [monthMapped, setMonthMapped] = useState<({ date: number, day: string } | null)[] | null >(null)

    useEffect(() => {
        let monthMappedTemp: (null | { date: number, day: string })[] = []
        let monthArray = new Array(DateTime.local(yearSelected, monthSelected).daysInMonth + DateTime.local(yearSelected, monthSelected, 1).weekday % 7)
        
        for(let i=0; i < monthArray.length; i++){
            if (i >= DateTime.local(yearSelected, monthSelected, 1).weekday % 7){
                let date = (i - (DateTime.local(yearSelected, monthSelected, 1).weekday % 7)) + 1
                let day = daysOfTheWeek[DateTime.local(yearSelected, monthSelected, date).weekday % 7]
                monthMappedTemp[i] = ( { date, day })
            } else {
                monthMappedTemp[i] = null
            }
        }

        setMonthMapped(monthMappedTemp)
        
    }, [yearSelected, monthSelected])

    const handleMonthChange = (action: string) => {
        if ((action === 'prev')){
            monthSelected === 1 ? (setMonthSelected(12), setYearSelected(yearSelected - 1)) : setMonthSelected(monthSelected - 1)
        }
        if ((action === 'next')){
            monthSelected === 12 ? (setMonthSelected(1), setYearSelected(yearSelected + 1)) : setMonthSelected(monthSelected + 1)
        }
    }

    const { userId } = useSelector((state: RootState) => state[userSlice.name])

    const { data } = useGetUserMonthWorkoutsQuery({ userId, monthAndYear: `${monthsOfTheYear[((monthSelected - 1) % 12 + 12) % 12].toLowerCase()}_${yearSelected}` })

    return(
        <div className={styles.container}>
            <div className={styles.nav}>
                <div onClick={() => handleMonthChange('prev')}>
                    {'<'}
                </div>
                <div>
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
                    return ( <Cell key={uid()} dateInfo={cell && data && data[cell.date]} id={`date-${cell?.date}`} date={cell?.date} day={cell?.day}/>)
                })}
            </div>
        </div>
    )
}

export default Calendar;