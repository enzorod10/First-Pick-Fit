import styles from './Exercises.module.css'
import { useChangeExercisesOrderMutation, useAddUserSavedExerciseMutation } from '../../redux/features/exercise/exerciseApi'
import { useEffect, useState } from 'react'
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import Image from 'next/image'
import Exercise from './Exercise/Exercise'
import ExerciseInterface from '../../interfaces/Exercise'
import { uid } from 'uid'
import { Area } from '../../interfaces/AreaTargeted';
import { useDispatch } from 'react-redux'
import { setIsCalendarExpanded } from "../../redux/features/calendar/calendarSlice"

const Exercises = ( { data, userId, pageLoadingStatus }: {data: ExerciseInterface[], userId: string | undefined, pageLoadingStatus: boolean}) => {
    const [exercises, setExercises] = useState<ExerciseInterface[] | null>(data);
    const [exerciseEditor, setExerciseEditor] = useState({ mode: 'none', data: { id: '', name: '', areasTargeted: [{ id: '', name: '' as Area }] } })
    const [addUserSavedExercise] = useAddUserSavedExerciseMutation();
    const [changeExerciseOrderMutation] = useChangeExercisesOrderMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [areasTargeted, setAreasTargeted] = useState([{ id: '1', name: 'Biceps', selected: false }, { id: '2', name: 'Forearms', selected: false },
                                                        { id: '3', name: 'Pectorals', selected: false }, { id: '4', name: 'Shoulders', selected: false },
                                                        { id: '5', name: 'Triceps', selected: false }, { id: '6', name: 'Gluteus', selected: false },
                                                        { id: '7', name: 'Quadriceps', selected: false }, { id: '8', name: 'Abdominals', selected: false },
                                                        { id: '9', name: 'Hamstrings', selected: false }, { id: '10', name: 'Calves', selected: false },
                                                        { id: '11', name: 'Lats', selected: false }, { id: '12', name: 'Obliques',selected: false },
                                                        { id: '13', name: 'Trapezius', selected: false }])
    const [search, setSearch] = useState('');
    const [searchedExercises, setSearchedExercises] = useState<ExerciseInterface[]>([]);
    const dispatch = useDispatch();
    const [startup, setStartup]  = useState(false)

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
        delay: 250,
        tolerance: 5
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
        delay: 250,
        tolerance: 5
        }
    });
    const keyboardSensor = useSensor(KeyboardSensor);
    
    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
    );

    useEffect(() => {
        setTimeout(() => setStartup(true), 200)
    }, [])

    useEffect(() => {
        setExercises(data);
    }, [data])

    useEffect(() => {
        if (exercises && search.trim() !== ''){
            const tempExercises = exercises?.filter(exercise => {
                return exercise.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedExercises(tempExercises)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    function handleDragEndScrollEvent(event: any){
        const {active, over} = event;

        if (active && over && active?.id !== over?.id && exercises) {
            const oldIndex = exercises.findIndex(exercise => 'sortable-' + exercise.id === active?.id);
            const newIndex = exercises.findIndex(exercise => 'sortable-' + exercise.id === over?.id);
            setExercises((exercises: any) => {
                return arrayMove(exercises, oldIndex, newIndex)
            })
            changeExerciseOrderMutation({userId, oldIndex, newIndex})
        }
    }

    const toggleAreaTargeted = (id: string) => {
        setAreasTargeted(areasTargeted.map(area => {
            if (area.id === id){
                area.selected ? area.selected = false : area.selected = true;
            }
            return area
        }))
    }


    useEffect(() => {
        const selectedAreas = areasTargeted.filter(area => area.selected).map(({ name, id }) => ({ name, id }));
        
        setExerciseEditor((prevState: any) => {
            return {...prevState, data: {...prevState.data, areasTargeted: selectedAreas}}
        })
    }, [areasTargeted])


    const cancelNewExercise = () => {
        setAreasTargeted(areasTargeted.map(area => {
            if(area.selected){
                area.selected = false;
            }
            return area
        }));

        setExerciseEditor({ mode: 'none', data: { id: '', name: '', areasTargeted: [{ id: '', name: '' as Area }] } });
        dispatch(setIsCalendarExpanded(true));
    }

    const handleNewExercise = () => {
        if (exerciseEditor.data.name.trim() === ''){
            setErrorMessage('Exercise name can\'t be empty');
            return;
        }
        if (exerciseEditor.data.areasTargeted.length === 0){
            setErrorMessage('At least one muscle area must be selected');
            return;
        }

        const tempExerciseEditor = {...exerciseEditor};
        tempExerciseEditor.data.id = uid();
        tempExerciseEditor.data.areasTargeted.forEach(area => area.id = uid());
        setAreasTargeted(areasTargeted.map(area => {
            if(area.selected){
                area.selected = false;
            }
            return area
        }));

        addUserSavedExercise({ userId, exercise: tempExerciseEditor.data });
        setExerciseEditor({ mode: 'none', data: { id: '', name: '', areasTargeted: [{ id: '', name: '' as Area }] } });
        dispatch(setIsCalendarExpanded(true));
    }
    
    return(
        <ul className={styles.container} style={{opacity: (pageLoadingStatus || !startup) ? '0' : '1'}}>
            <div className={styles.searchExerciseNameAndButton} style={{display: 'flex', justifyContent: 'space-between'}}>
                <input type="text" placeholder='Search Exercises...' value={search} onChange={e => setSearch(e.target.value)} style={{all: 'unset', color: 'var(--charcoal)', fontSize: '0.9rem', width: '100%' }}/>
                {exerciseEditor.mode === 'none' && <button style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }} onClick={() => (setExerciseEditor({ ...exerciseEditor, mode: 'create' }), dispatch(setIsCalendarExpanded(false)) )} >New Exercise</button>}
            </div>
            {exerciseEditor.mode === 'create' &&
                <div style={{display: 'flex', flexDirection: 'column', padding: '0.5rem', marginBottom: '0.5rem', gap: '1rem', border: '1px black solid', alignItems: 'center'}}>
                    <input className={styles.exerciseCreatorName} onChange={e => setExerciseEditor({ ...exerciseEditor, data: { ...exerciseEditor.data, name: e.target.value }})} value={exerciseEditor.data.name} type="text" placeholder='New Exercise Name' style={{all: 'unset', color: 'var(--charcoal)', textAlign: 'center', width: '100%'}}/>
                    <ul className={styles.areasTargeted}>
                        {areasTargeted.map(areaTargeted => {
                            return (
                                <li onClick={() => toggleAreaTargeted(areaTargeted.id)} key={areaTargeted.id}>
                                    <Image style={{backgroundColor: areaTargeted.selected ? 'var(--tea-green)' : ''}} src={`/images/muscle-parts/${areaTargeted.name}.png`} alt={`${areaTargeted.name}`} width='30' height='30' />
                                    <p>{areaTargeted.name}</p>
                                </li>
                            )
                        })}
                    </ul>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                        <button onClick={cancelNewExercise} style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}> Cancel </button>
                        <button onClick={handleNewExercise} style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}> Save </button>
                    </div>
                </div>
            }
            <div className={styles.innerContainer}>
                {search.trim() === '' && exercises &&
                    <DndContext onDragEnd={handleDragEndScrollEvent} sensors={sensors} modifiers={[restrictToParentElement, restrictToVerticalAxis]}>
                        <SortableContext items={exercises.map(exercise => 'sortable-' + exercise.id)} strategy={verticalListSortingStrategy}>
                            {exercises.map((exercise: ExerciseInterface) => {
                                return(
                                    <Exercise key={exercise.id} exercise={exercise} userId={userId} />
                                );
                            })}
                        </SortableContext>
                    </DndContext>}
                {search.trim() !== '' && searchedExercises.map((exercise: ExerciseInterface) => {
                    return <Exercise key={exercise.id} exercise={exercise} userId={userId} />
                })}
            </div>
        </ul>
    )
}

export default Exercises;