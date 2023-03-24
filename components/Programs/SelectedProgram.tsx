import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typewriter } from 'react-simple-typewriter';
import Program from '../../interfaces/Program';
import { useAddProgramToCalendarMutation } from '../../redux/features/calendar/calendarApi';
import { setSelectingProgramStatus, setProgramSelected, calendarSlice, setDateClickedForProgram, } from '../../redux/features/calendar/calendarSlice';
import styles from './SelectedProgram.module.css';
import { RootState } from '../../store'
import { DateTime, Duration } from 'luxon';
import { setHideSearchBar } from '../../redux/features/user/userSlice';

const SelectedProgram = ({ program, changeSelectedProgram, userId }: { userId: string | undefined, program: Program, changeSelectedProgram: () => void}) => {
    const [stage, setStage] = useState<number | null>(null);
    const dispatch = useDispatch();
    const { dateClickedForProgram, programSelected, spacedMonthAndYear, monthAndYear } = useSelector((state: RootState) => state[calendarSlice.name]);
    const [addProgramToCalendar] = useAddProgramToCalendarMutation();

    useEffect(() => {
        dispatch(setHideSearchBar(true));
    }, [dispatch])

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
        if (stage === 0 && dateClickedForProgram){
            setStage(1);
        }
    }, [dateClickedForProgram, stage])

    const handleAddProgramToCalendar = () => {
        addProgramToCalendar({ userId, program, startDate: spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1], endDate: DateTime.fromFormat(spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1], 'MMMM d, yyyy').plus(Duration.fromObject({ weeks: program.duration })).toFormat('MMMM d, yyyy') })
    }
    
    return(
        <div className={styles.container}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button style={{ boxShadow: 'rgba(0, 0, 0, 0.10) 0px 4px 4px 0px', padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}onClick={changeSelectedProgram}>
                    Back
                </button>
                {stage === null &&
                <button style={{ boxShadow: 'rgba(0, 0, 0, 0.10) 0px 4px 4px 0px', padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }} onClick={() => setStage(0)}>
                    Add Program To Calendar
                </button>}
                {stage === 1 && 
                <button onClick={handleAddProgramToCalendar} style={{ boxShadow: 'rgba(0, 0, 0, 0.10) 0px 4px 4px 0px', padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>
                    Confirm
                </button>}
            </div>
           
            {stage === 0 && 
                <div style={{ color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: '20px', fontWeight: 'bold', zIndex: '2', position: 'relative'}}>
                    <Typewriter
                        words={['Click on any date to set a start date for this program.']}
                        loop={1}
                        cursor
                        cursorStyle='|'
                        typeSpeed={120}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </div>}
            {stage === 1 && 
                <div style={{ color: 'var(--charcoal)', fontSize: '0.9rem', fontWeight: 'bold', lineHeight: '20px', zIndex: '2', position: 'relative'}}>
                    This program will start on {spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1]} and finish on {DateTime.fromFormat(spacedMonthAndYear.split(' ')[0] + ' ' + dateClickedForProgram + ', ' + spacedMonthAndYear.split(' ')[1], 'MMMM d, yyyy').plus(Duration.fromObject({ weeks: program.duration })).toFormat('MMMM d, yyyy')}.
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