import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'

interface AppProps{
    date?: number,
    day?: string,
    id?: string,
    dateInfo: { date: number, workouts: Workout[]}
}

const Cell = ( { date, day, id, dateInfo }: AppProps ) => {
    
    return !date ? <div> </div> :
    <div className={styles.container} id={id}>
        {date}
        {dateInfo && dateInfo.workouts && dateInfo.workouts[0].name}
    </div>
}

export default Cell