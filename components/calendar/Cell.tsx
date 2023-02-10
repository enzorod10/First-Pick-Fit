import styles from '../../styles/calendar/Cell.module.css'

interface AppProps{
    date?: number,
    day?: string,
    id?: string
}

const Cell = ( { date, day, id }: AppProps ) => {
    return !date ? <div> </div> :
    <div id={id}>
        {date}
    </div>
}

export default Cell