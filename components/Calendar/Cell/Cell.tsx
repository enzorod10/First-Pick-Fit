import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'
import { useDroppable } from '@dnd-kit/core'
import { useDispatch } from 'react-redux'
import { setDateClicked } from '../../../redux/features/calendar/calendarSlice'
import { setPageLoadingStatus } from '../../../redux/features/user/userSlice'
import { useRouter } from 'next/router'

interface AppProps{
    date?: number,
    id: string,
    userId?: string,
    monthAndYear: string,
    dateInfo?: { date: number, workout: Workout},
    calendarExpanded: boolean,
    monthSelected: number
}

const Cell = ({ date, id, dateInfo, monthAndYear, userId, calendarExpanded, monthSelected}: AppProps) => {
    return !date ? <div className={styles.undefinedCellContainer}> </div> : <CellWithDate date={date} monthSelected={monthSelected} calendarExpanded={calendarExpanded} userId={userId} id={id} dateInfo={dateInfo} monthAndYear={monthAndYear}/>
}

const CellWithDate = ({ date, id, dateInfo, monthAndYear, userId, monthSelected, calendarExpanded }: AppProps) => {
    const { isOver, setNodeRef } = useDroppable({ id, data: { type: 'cell' }, disabled: !calendarExpanded });
    const style = isOver ? { backgroundColor: '#d3d3d3' } : {};
    const dispatch = useDispatch();  
    const router = useRouter();
    
    const changePageOnClick = () => {
        if (calendarExpanded){
            dispatch(setDateClicked(date))
            dispatch(setPageLoadingStatus(true))
            router.events.on('routeChangeComplete', () => dispatch(setPageLoadingStatus(false)))
            setTimeout(() => router.push('/dashboard'), 100)
            return(
                router.events.off('routeChangeComplete', () => dispatch(setPageLoadingStatus(false)))
            )
        }
    }

    const getDefinedCellCorrectColor = () => {
        if (dateInfo){
            if ((Number(monthAndYear.split('_')[1])  > new Date().getFullYear()) || ((Number(monthAndYear.split('_')[1]) === new Date().getFullYear()) && (monthSelected - 1 > new Date().getMonth()))){
                return dateInfo?.workout.complete ? 'var(--olivine)' : 'var(--charcoal)'
            } if ((Number(monthAndYear.split('_')[1]) < new Date().getFullYear()) || ((Number(monthAndYear.split('_')[1]) === new Date().getFullYear()) && (monthSelected - 1 < new Date().getMonth()))){
                return dateInfo?.workout.complete ? 'var(--olivine)' : '#E6676B'
            } if ((Number(monthAndYear.split('_')[1]) === new Date().getFullYear()) && (monthSelected - 1 === new Date().getMonth())){
                if (dateInfo.date < new Date().getDate()){
                    return dateInfo?.workout.complete ? 'var(--olivine)' : '#E6676B'
                } else {
                    return dateInfo?.workout.complete ? 'var(--olivine)' : 'var(--charcoal)'
                }
            }
        }
    }

    const definedCellStyle: React.CSSProperties = {
        position: 'absolute', 
        right: '0', 
        top: '0',
        borderBottomLeftRadius:'100%',
        backgroundColor: getDefinedCellCorrectColor(),
        width: '30%', 
        height: '40%'
    }

    return (
        <div ref={setNodeRef} style={style} className={styles.definedCellContainer} id={id} onClick={() => router.pathname !== '/dashboard' ? changePageOnClick() : dispatch(setDateClicked(date)) }>
            {dateInfo && 
            <div style={definedCellStyle}>

            </div>}
            {date}
            <span style={{width: 'fit-content', wordBreak: 'break-word', fontSize: '0.6rem'}}>
                {dateInfo && dateInfo.workout.name }
            </span>
        </div>
    )
}

export default Cell