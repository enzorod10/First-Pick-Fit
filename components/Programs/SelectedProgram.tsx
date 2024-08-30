import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typewriter } from 'react-simple-typewriter';
import Program from '../../interfaces/Program';
import { useAddProgramToCalendarMutation } from '../../redux/features/calendar/calendarApi';
import { setSelectingProgramStatus, setProgramSelected, calendarSlice, setDateClickedForProgram, setProgramDates, setAddingProgramStatus } from '../../redux/features/calendar/calendarSlice';
import styles from './SelectedProgram.module.css';
import { RootState } from '../../store'
import { DateTime, Duration } from 'luxon';
import { setHideSearchBar } from '../../redux/features/user/userSlice';

const SelectedProgram = ({ program, changeSelectedProgram, userId, windowSize }: { windowSize: { width: number | undefined, height: number | undefined}, userId: string | undefined, program: Program, changeSelectedProgram: () => void}) => {
    const [stage, setStage] = useState<number | null>(null);
    const dispatch = useDispatch();
    const { dateClickedForProgram, spacedMonthAndYear } = useSelector((state: RootState) => state[calendarSlice.name]);
    const [addProgramToCalendar, result] = useAddProgramToCalendarMutation();
    const [programDateRange, setProgramDateRange] = useState<[string, string] | null>(null)

    useEffect(() => {
        return(() => {
            dispatch(setAddingProgramStatus(false))
        })
    }, [dispatch])

    useEffect(() => {
        if (!result.isUninitialized && (result.isError || result.isSuccess)){
            setStage(null);
            dispatch(setAddingProgramStatus(false))
        }
    }, [dispatch, result])

    useEffect(() => {
        if (windowSize.width && windowSize.width < 1000){
            dispatch(setHideSearchBar(true));
        }
    }, [dispatch, windowSize.width])

    useEffect(() => {
            dispatch(setDateClickedForProgram(null));
            dispatch(setProgramSelected(program));
        return () => {
            dispatch(setDateClickedForProgram(null));
            dispatch(setProgramSelected(null));
            dispatch(setSelectingProgramStatus(false));
        }
    }, [dispatch, program])

    useEffect(() => {
        if (stage === 0 || stage === 1){
            dispatch(setSelectingProgramStatus(true));
        } else {
            dispatch(setSelectingProgramStatus(false));
        }
    }, [dispatch, stage])


    useEffect(() => {
        if ((stage === 0 || stage === 1) && dateClickedForProgram){
            let dateArray: string[] = [];
            for (let i=0; i<program.duration; i++){
                for (let q=0; q<7; q++){
                    if (program.shape[q] === null){
                        continue;
                    } else{
                        let dateToUse = DateTime.fromFormat(spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1], 'MMMM d, yyyy').plus(Duration.fromObject({ days: (i*7) + q }));
                        dateArray.push(dateToUse.toFormat('MMMM d, yyyy'))
                    }
                }
            }
            dispatch(setProgramDates(dateArray));
            setProgramDateRange([dateArray[0], dateArray[dateArray.length - 1]] )
            stage !== 1 && setStage(1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateClickedForProgram])

    const handleAddProgramToCalendar = () => {
        dispatch(setAddingProgramStatus(true))
        setStage(2);
        addProgramToCalendar({ userId, program, startDate: spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1] })
    }
    
    return(
        <div className={styles.container}>
            <div style={{  boxShadow: (windowSize.width && windowSize.width < 1000) ? '0px 4px 5px rgba(0, 0, 0, 0.10)' : 'none', padding: '1rem 1rem 0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="px-3 py-2 text-xs font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={changeSelectedProgram}>
                    Back
                </button>
                {stage === null &&
                <button className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setStage(0)}>
                    Add program to calendar
                </button>}
                {stage === 1 && 
                <button onClick={handleAddProgramToCalendar} className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Confirm
                </button>}
                {stage === 0 && 
                <div style={{ color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: '20px', fontWeight: 'bold', zIndex: '2', position: 'relative'}}>
                    <Typewriter
                        words={['Set a start date by clicking on a date.']}
                        loop={1}
                        cursor
                        cursorStyle='|'
                        typeSpeed={35}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </div>}
                {stage === 2 && 
                <div style={{ color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: '20px', fontWeight: 'bold', zIndex: '2', position: 'relative'}}>
                    <Typewriter
                        words={['Adding program...']}
                        loop={1}
                        cursor
                        cursorStyle='|'
                        typeSpeed={35}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </div>}
            </div>

            {stage === 1 && 
                <div style={{ color: 'var(--charcoal)', padding: '0.5rem 0.5rem 0rem 0.5rem', fontSize: '0.9rem', fontWeight: 'bold', lineHeight: '20px', zIndex: '2', position: 'relative'}}>
                    This program will start on {programDateRange && programDateRange[0]} and finish on {programDateRange && programDateRange[1]}.
                    Click confirm to add it to your calendar.
                </div>
            }
            <div className={styles.programContainer} key={program.id}>
                <h3 style={{fontSize: '1rem'}}>
                    {program.name}
                </h3>
                <div style={{fontSize: '0.8rem', fontStyle: 'italic'}}>
                    {program.info}
                </div>
                <div style={{fontSize: '0.8rem'}}>
                    Duration: {program.duration} weeks
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {program.shape.map((item, index) => {
                        return(
                            <div key={index} style={{fontSize: '0.7rem'}}>
                                <h4 style={{fontSize: '0.8rem'}}>DAY {index + 1}</h4>
                                {item !== null ?
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    {program.workouts[item].name}
                                    {program.workouts[item].exercises.map((exercise, index) => {
                                        return(
                                            <div key={exercise.id} style={{paddingLeft: '0.5rem'}}>
                                                {index + 1}. {exercise.name} - {exercise.sets[0].sets} x {exercise.sets[0].reps}
                                            </div>
                                        )
                                    })}
                                </div> :
                                'Rest'}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default SelectedProgram;