import styles from './Cell.module.css'
import Workout from '../../../interfaces/Workout'
import { useDroppable } from '@dnd-kit/core'
import { useDispatch } from 'react-redux'
import { setDateClicked, setDateClickedForProgram } from '../../../redux/features/calendar/calendarSlice'
import { setPageLoadingStatus } from '../../../redux/features/user/userSlice'
import { useRouter } from 'next/router'
import LoadingIcons from 'react-loading-icons'

interface AppProps{
    date?: number,
    id: string,
    userId?: string,
    monthAndYear: string,
    dateInfo?: { date: number, workout: Workout},
    calendarExpanded: boolean,
    selectingProgramStatus: boolean,
    monthSelected: number,
    isLoading: boolean,
    addingProgramDates: boolean,
    programDates: string[] | null
}

const Cell = ({ addingProgramDates, programDates, isLoading, date, id, dateInfo, monthAndYear, userId, calendarExpanded, selectingProgramStatus, monthSelected}: AppProps) => {
    return !date ? <div className={styles.undefinedCellContainer}> </div> : <CellWithDate addingProgramDates={addingProgramDates} programDates={programDates} isLoading={isLoading} date={date} monthSelected={monthSelected} selectingProgramStatus={selectingProgramStatus} calendarExpanded={calendarExpanded} userId={userId} id={id} dateInfo={dateInfo} monthAndYear={monthAndYear}/>
}

const CellWithDate = ({ isLoading, date, id, dateInfo, monthAndYear, userId, addingProgramDates, programDates, monthSelected, calendarExpanded, selectingProgramStatus }: AppProps) => {
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

    const clickOnCell = () => {
        if (!selectingProgramStatus){
            router.pathname !== '/dashboard' ? changePageOnClick() : dispatch(setDateClicked(date));
        } else {
            dispatch(setDateClickedForProgram(date))
        }
    }

    return (
        <div ref={setNodeRef} style={style} className={styles.definedCellContainer} id={id} onClick={clickOnCell}>
            {dateInfo &&
            <div style={definedCellStyle}>
            </div>}
            {date}
            {addingProgramDates && (programDates?.findIndex(item => item.split(' ')[0].toLowerCase() === monthAndYear.split('_')[0] && Number(item.split(' ')[1].slice(0, -1)) === date && item.split(' ')[2] === monthAndYear.split('_')[1]) !== -1) && 
                <div style={{opacity: 0.5}}> <LoadingIcons.Puff stroke='var(--charcoal)'/> </div>
            }
            {isLoading && <div style={{opacity: 0.5}}> <LoadingIcons.Puff stroke='var(--charcoal)'/> </div>}
            <span style={{width: 'fit-content', wordBreak: 'break-word', fontSize: '0.6rem'}}>
                {dateInfo && dateInfo.workout.name }
            </span>
        </div>
    )
}

export default Cell