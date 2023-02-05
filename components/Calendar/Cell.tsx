interface AppProps{
    date?: number,
    day?: string,
}

const Cell = ( { date, day }: AppProps ) => {
    return !date ? <div> Empty </div> :
    <div>
        {date} {day}
    </div>
}

export default Cell