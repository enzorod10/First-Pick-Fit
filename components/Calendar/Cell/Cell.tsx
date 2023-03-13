import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'
import { useDroppable } from '@dnd-kit/core'
import { useDeleteUserWorkoutFromMonthWorkoutsMutation } from '../../../redux/features/calendar/calendarApi'
import { useDispatch } from 'react-redux'
import { setDateClicked } from '../../../redux/features/calendar/calendarSlice'
import Router from 'next/router'

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

    return (
        <div ref={setNodeRef} style={style} className={styles.definedCellContainer} id={id} onClick={() => Router.pathname !== '/dashboard' ? (dispatch(setDateClicked(date)), Router.push('/dashboard')) : dispatch(setDateClicked(date)) }>
            {date}
            <span style={{width: 'fit-content', wordBreak: 'break-word', fontSize: '0.7rem'}}>
                {dateInfo && dateInfo.workout.name }
            </span>
            <DeleteWorkoutFromScheduleButton userId={userId} monthAndYear={monthAndYear} date={date} />
        </div>
    )
}

const DeleteWorkoutFromScheduleButton = ({ userId, monthAndYear, date }: any) => {
    const [deleteUserWorkoutFromMonthWorkoutsMutation] = useDeleteUserWorkoutFromMonthWorkoutsMutation();

    return <button className={styles.deleteButton} onClick={() => deleteUserWorkoutFromMonthWorkoutsMutation({ userId, monthAndYear, date })}>
        X
    </button>
}


export default Cell