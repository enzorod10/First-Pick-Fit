import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'
import { useDroppable } from '@dnd-kit/core'
import { useDeleteUserWorkoutFromMonthWorkoutsMutation } from '../../../redux/features/calendar/calendarApi'
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
    calendarExpanded: boolean
}

const Cell = ({ date, id, dateInfo, monthAndYear, userId, calendarExpanded}: AppProps) => {
    return !date ? <div className={styles.undefinedCellContainer}> </div> : <CellWithDate date={date} calendarExpanded={calendarExpanded} userId={userId} id={id} dateInfo={dateInfo} monthAndYear={monthAndYear}/>
}

const CellWithDate = ({ date, id, dateInfo, monthAndYear, userId, calendarExpanded }: AppProps) => {
    const { isOver, setNodeRef } = useDroppable({ id, data: { type: 'cell' }, disabled: !calendarExpanded });
    const style = isOver ? { backgroundColor: 'red'} : {};
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

    return (
        <div ref={setNodeRef} style={style} className={styles.definedCellContainer} id={id} onClick={() => router.pathname !== '/dashboard' ? changePageOnClick() : dispatch(setDateClicked(date)) }>
            {date}
            <span style={{width: 'fit-content', wordBreak: 'break-word', fontSize: '0.7rem'}}>
                {dateInfo && dateInfo.workout.name }
            </span>
        </div>
    )
}

export default Cell