import { useEffect, useState } from "react";
import styles from '../../styles/Calendar.module.css'
import Cell from "./Cell";
import { DateTime } from 'luxon'
import { uid } from "uid";

const daysOfTheWeek: string[] = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]

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

    return(
        <div className={styles.container}>
            {daysOfTheWeek.map(day => {
                return <div key={uid()} className={styles.day}> {day} </div>
            })}
            {monthMapped?.map((cell, index) => {
                return ( <Cell key={uid()} date={cell?.date} day={cell?.day}/>)
            })}
        </div>
    )
}

export default Calendar;