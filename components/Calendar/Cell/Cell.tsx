import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'
import { useDroppable } from '@dnd-kit/core'
import { useDeleteUserWorkoutFromMonthWorkoutsMutation } from '../../../redux/features/calendar/calendarApi'
import { useDispatch } from 'react-redux'
import { setDateClicked } from '../../../redux/features/calendar/calendarSlice'

interface AppProps{
    date?: number,
    id: string,
    userId?: string,
    monthAndYear: string,
    dateInfo?: { date: number, workout: Workout}
}

const Cell = ({ date, id, dateInfo, monthAndYear, userId }: AppProps) => {
    
    return !date ? <div className={styles.undefinedCellContainer}> </div> : <CellWithDate date={date} userId={userId} id={id} dateInfo={dateInfo} monthAndYear={monthAndYear}/>
    
}

const CellWithDate = ({ date, id, dateInfo, monthAndYear, userId }: AppProps) => {
    const { isOver, setNodeRef } = useDroppable({ id });
    const style = isOver ? { backgroundColor: 'red'} : {};
    const dispatch = useDispatch();    

    return (
        <div ref={setNodeRef} style={style} className={styles.definedCellContainer} id={id} onClick={() => dispatch(setDateClicked(date))}>
            {date}
            {dateInfo && dateInfo.workout.name }
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