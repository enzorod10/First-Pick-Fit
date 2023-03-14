import Image from 'next/image';
import Workout, { DraggableWorkout } from './Workout/Workout';
import WorkoutInterface from '../../interfaces/Workout';
import AreaTargeted from '../../interfaces/AreaTargeted';
import styles from './Workouts.module.css';
import Exercise from '../../interfaces/Exercise';
import AllocatedExercise from '../../interfaces/AllocatedExercise';
import SetBlock from '../../interfaces/SetBlock';
import { useDispatch } from 'react-redux'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { uid } from 'uid';
import { DndContext, useDraggable, useDroppable, useDndMonitor, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { setIsCalendarExpanded } from "../../redux/features/calendar/calendarSlice"
import { useGetUserSavedExercisesQuery } from '../../redux/features/exercise/exerciseApi'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useCreateUserWorkoutMutation, useEditUserWorkoutMutation, useDeleteUserWorkoutMutation } from '../../redux/features/workout/workoutApi';

export const WorkoutsComponent = ({ workouts, userId }: { workouts: WorkoutInterface[], userId: string | undefined}) => {
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>()
    const [isEditingWorkout, setIsEditingWorkout] = useState<boolean>(false)
    const [createUserWorkout] = useCreateUserWorkoutMutation();
    const [editUserWorkout] = useEditUserWorkoutMutation();
    const [search, setSearch] = useState('');
    const [searchedWorkouts, setSearchedWorkouts] = useState<Workout[]>([]);
    
    const dispatch = useDispatch();

    const initiateEditMode = (workout?: WorkoutInterface) => {
        dispatch(setIsCalendarExpanded(false));
        workout ? setSelectedWorkout(workout) : setSelectedWorkout(undefined);
        isEditingWorkout ? setIsEditingWorkout(false) : setIsEditingWorkout(true)
    }

    const handleCreatedWorkout = (workout?: WorkoutInterface) => {
        setIsEditingWorkout(false)
        dispatch(setIsCalendarExpanded(true))
        workout && createUserWorkout({ userId, workout })
    }

    const handleEditedWorkout = (workout?: WorkoutInterface) => {
        setIsEditingWorkout(false)
        setSelectedWorkout(undefined)
        dispatch(setIsCalendarExpanded(true))
        workout && editUserWorkout({ userId, workout })
    }

    useEffect(() => {
        if (workouts && search.trim() !== ''){
            const tempWorkouts = workouts?.filter(workout => {
                return workout.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedWorkouts(tempWorkouts)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    if (!isEditingWorkout){
        return(
            <div className={styles.workoutsContainer}>
                <div className={styles.searchWorkoutNameAndButton}>
                    <input type="text" placeholder='Search Workouts...' value={search} onChange={e => setSearch(e.target.value)} style={{all: 'unset', width: '100%', fontSize: '0.9rem'}}/>
                    <button onClick={() => initiateEditMode()} style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>New Workout</button>
                </div>
                {!selectedWorkout && 
                <div className={styles.workoutsInnerContainer}>
                    {search.trim() === '' ? workouts.map(workout => {
                        return(
                            <DraggableWorkout key={workout.id} workout={workout}>
                                <Workout workout={workout} initiateEditMode={initiateEditMode}/>
                            </DraggableWorkout>
                        )
                    }) :
                    searchedWorkouts.map(workout => {
                        return(
                            <DraggableWorkout key={workout.id} workout={workout}>
                                <Workout workout={workout} initiateEditMode={initiateEditMode}/>
                            </DraggableWorkout>
                        )})}
                </div>}
            </div>)
    }
        
    if (selectedWorkout && isEditingWorkout){
        return(
            <WorkoutEditor handleEditedWorkout={handleEditedWorkout} workout={selectedWorkout} userId={userId} />
        )
    }
    if (!selectedWorkout && isEditingWorkout){
        return(
            <WorkoutEditor handleCreatedWorkout={handleCreatedWorkout} userId={userId} />
        )
    }
    else return null;
}

const WorkoutEditor = ( { handleCreatedWorkout, handleEditedWorkout, workout, userId }: { handleCreatedWorkout?: (workout?: WorkoutInterface) => void, handleEditedWorkout?: (workout?: WorkoutInterface) => void, workout?: WorkoutInterface, userId: string | undefined }) => {
    const [workoutExercises, setWorkoutExercises] = useState<null | AllocatedExercise[]>(workout ? workout.exercises : null);
    const [workoutName, setWorkoutName] = useState<string>(workout ? workout.name : '');
    const { setNodeRef, isOver, node } = useDroppable({ id: 'newWorkoutExercisesContainer', data: { type: 'newWorkoutExercisesContainer' } });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { data } = useGetUserSavedExercisesQuery(userId);
    const uniqueAreas = useMemo(() => sortUniqueWorkoutExercises(workoutExercises!), [workoutExercises]);
    const [newSetMode, setNewSetMode] =useState<{ id: string, data: SetBlock}>({ id: '', data: { sets: 3, reps: 8, weight: 100, id: '' }})
    const [deleteUserWorkout] = useDeleteUserWorkoutMutation();
    const [ghostPiece, setGhostPiece] = useState<null | string>(null)
    const workoutExercisesRef = useRef<Array<HTMLDivElement | null>>([]);
    const [activeWorkoutExerciseRef, setActiveWorkoutExerciseRef] = useState<HTMLDivElement | null>(null);
    const [successfullyDropped ,setSuccessfullyDropped] = useState(false);

    interface ChangeEvent<T = HTMLInputElement> extends React.ChangeEvent<T> {}
    type ChangeEventHandler<T = HTMLInputElement> = (event: ChangeEvent<T>) => void;

    const handleWorkoutNameChange: ChangeEventHandler = (event) => {
        setWorkoutName(event.target.value)
    };

    function sortUniqueWorkoutExercises(arr: AllocatedExercise[]): AreaTargeted[] | undefined{
        if (arr){
            console.log(arr)
            const counts: {[key: string]: {count: number, id: string}} = arr.reduce((acc: any, curr: AllocatedExercise) => {
                curr.areasTargeted && curr.areasTargeted.forEach((areaTargeted) => {
                  if (areaTargeted.name in acc) {
                    acc[areaTargeted.name].count++;
                  } else {
                    acc[areaTargeted.name] = {count: 1, id: areaTargeted.id};
                  }
                });
                return acc;
              }, {});

              const uniqueArr = Object.entries(counts).sort((a, b) => b[1].count - a[1].count).map((item: any) => ({name: item[0], id: item[1].id}));
            
              return uniqueArr;
        }
    }

    useEffect(() => {
        ghostPiece && node.current?.scrollTo({ top: node.current.scrollHeight, behavior: 'smooth' });
    }, [ghostPiece, node])

    useEffect(() => {
        if (workoutExercises && workoutExercises.length > 0){
            workoutExercisesRef.current = workoutExercisesRef.current.slice(0, workoutExercises?.length)
        }
    }, [workoutExercises])

    useEffect(() => {
        if(!isOver){
            activeWorkoutExerciseRef?.removeAttribute('style');
            !successfullyDropped && setGhostPiece(null)
        }
    }, [activeWorkoutExerciseRef, isOver, successfullyDropped])

    useLayoutEffect(() => {
        if (workoutExercises && workoutExercises.length > 0){
            setGhostPiece(null)
            setSuccessfullyDropped(false)
        }
        
    }, [workoutExercises])

    useDndMonitor({
        onDragOver(event: DragOverEvent){
            const { active, over } = event;
            if (active?.data?.current?.type === 'exercise' && over?.data?.current?.type === 'newWorkoutExercisesContainer'){
                if(workoutExercises){
                    const indexCheck = workoutExercises.findIndex(exercise => {
                        return exercise.id === active?.data?.current?.exercise.id
                    })
                    if (indexCheck === -1){
                        setGhostPiece(active?.data?.current?.exercise?.name);
                    } else{
                        setActiveWorkoutExerciseRef(workoutExercisesRef.current[indexCheck]);
                        workoutExercisesRef.current[indexCheck]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                        workoutExercisesRef.current[indexCheck]?.setAttribute('style', 'border: 1px red solid');
                    }
                } else{
                    setGhostPiece(active?.data?.current?.exercise?.name);
                }
            }
        },
        onDragEnd(event: DragEndEvent){
            const { active, over } = event;
            if (active?.data?.current?.type === 'exercise' && over?.data?.current?.type === 'newWorkoutExercisesContainer'){
                const tempWorkoutExercise = {...active?.data?.current?.exercise, sets: []}
                if(workoutExercises){
                    let tempWorkoutExercises = [...workoutExercises];
                    const indexCheck = tempWorkoutExercises.findIndex(exercise => {
                        return exercise.id === active?.data?.current?.exercise.id
                    })
                    tempWorkoutExercises = [...tempWorkoutExercises, tempWorkoutExercise]
                    if (indexCheck === -1){
                        setSuccessfullyDropped(true)
                        setTimeout(() => setWorkoutExercises(tempWorkoutExercises), 500)
                    }
                } else {
                    setSuccessfullyDropped(true)
                    setTimeout(() => setWorkoutExercises([tempWorkoutExercise]), 500)
                }
            }
        },
    });

    function changeOrderOfWorkoutExercises(event: any){
        const {active, over} = event;
    
        if (active?.id !== over?.id && workoutExercises) {
            const oldIndex = workoutExercises.findIndex(exercise => exercise.id === active?.id);
            const newIndex = workoutExercises.findIndex(exercise => exercise.id === over?.id);
            setWorkoutExercises((exercises: any) => {
                return arrayMove(exercises, oldIndex, newIndex)
            })
        }
    }

    const handleNewSet = (id: string) => {
        const tempWorkoutExercises = workoutExercises!.map(exercise => {
            if (exercise.id === id){
                const updatedExercise = {...exercise}
                newSetMode.data.id = uid();
                updatedExercise.sets = [...exercise.sets, newSetMode.data]
                return updatedExercise;
            }
            return exercise
        })
        setWorkoutExercises(tempWorkoutExercises);
        setNewSetMode({id: '', data: { sets: 3, reps: 8, weight: 100, id: '' }})
    }

    const updateSet = (section: string, action: string) => {
        const tempNewSetMode = {...newSetMode};

        if (section === 'reps'){
            if (action === 'decrease'){
                tempNewSetMode.data.reps > 0 && tempNewSetMode.data.reps --;
            } else {
                tempNewSetMode.data.reps ++;
            }
        } 
        if (section === 'sets'){
            if (action === 'decrease'){
                tempNewSetMode.data.sets > 0 && tempNewSetMode.data.sets --;
            } else {
                tempNewSetMode.data.sets ++;
            }
        }
        if (section === 'weight'){
            if (action === 'decrease'){
                if (tempNewSetMode.data.weight >= 2.5){
                    tempNewSetMode.data.weight -= 2.5;
                }
                if (tempNewSetMode.data.weight < 2.5){
                    tempNewSetMode.data.weight = 0;
                }
            } else {
                tempNewSetMode.data.weight += 2.5;
            }
        }
        setNewSetMode(tempNewSetMode);
    }

    const deleteSet = (id: string, setBlockIndex: number) => {
        const tempWorkoutExercises = [...workoutExercises!];
        const tempExercise = tempWorkoutExercises.find(exercise => exercise.id === id);
        if (tempExercise){
            const tempExerciseSets = [...tempExercise?.sets]
            const tempExerciseIndex = tempWorkoutExercises.findIndex(exercise => exercise.id === id);
            tempExerciseSets.splice(setBlockIndex, 1);
            const newTempExercise = {...tempExercise, sets: tempExerciseSets}
            tempWorkoutExercises.splice(tempExerciseIndex, 1, newTempExercise);
            setWorkoutExercises(tempWorkoutExercises)
        }
    }

    const verifyWorkoutInformation = () => {
        if (!workoutExercises || workoutExercises?.length === 0){
            setErrorMessage('You must include at least 1 exercise')
            return
        }
        workoutName.trim() === '' && setWorkoutName('Workout')
        const tempWorkout = { name:  workoutName.trim() === '' ? 'Workout' : workoutName, exercises: workoutExercises, areasTargeted: uniqueAreas!, complete: false, id: workout ? workout.id : uid() }
        handleCreatedWorkout && handleCreatedWorkout(tempWorkout);
        handleEditedWorkout && handleEditedWorkout(tempWorkout);
    }

    return(
        <div className={styles.workoutCreatorContainer}>
            <div style={{padding: '1rem 1rem 0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '60%', position: 'relative'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <input value={workoutName} placeholder='New Workout Name' style={{all: 'unset', width: '100%'}} onChange={handleWorkoutNameChange}/>
                    <span style={{display: 'flex', minWidth: 'fit-content', gap: '0.5rem'}}>
                        {workout && <button style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }} onClick={() => (deleteUserWorkout({ userId, workoutId: workout.id }), handleCreatedWorkout?.() ?? handleEditedWorkout?.()) }>Delete</button>}
                        <button style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }} onClick={() => handleCreatedWorkout?.() ?? handleEditedWorkout?.()}>Cancel</button>
                        <button style={{ padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }} onClick={verifyWorkoutInformation}>Save</button>
                    </span>
                </div>
                <ul className={styles.areasTargeted} style={{justifyContent: 'space-evenly', gap: '0rem', height: uniqueAreas && uniqueAreas.length > 0 ? '70px' : '0', transition: 'height 1s ease'}}>
                    {uniqueAreas && uniqueAreas.map(area => {
                        return (
                            <li key={area.id}>
                                <Image src={`/images/muscle-parts/${area.name}.png`} alt={`${area.name}`} width='30' height='30' />
                                <p>{area.name}</p>
                            </li>)
                    })}
                </ul>
                <div ref={setNodeRef} className={styles.workoutExercisesCreatorContainer}>
                    { workoutExercises && workoutExercises.length > 0 ? 
                    <DndContext modifiers={[restrictToParentElement]} onDragEnd={changeOrderOfWorkoutExercises}>
                        <SortableContext items={workoutExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
                            {workoutExercises.map((exercise, i) => {
                                return (
                                    <div key={exercise.id} ref={el => workoutExercisesRef.current[i] = el} className={styles.individualWorkoutExercises} > 
                                        <div style={{fontSize: '0.8rem', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                                            <div>{exercise.name}</div>
                                            {newSetMode.id !== exercise.id && <button onClick={() => setNewSetMode({...newSetMode, id: exercise.id})} style={{ padding: '2px 10px', border: 'none', fontSize: '0.6rem', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>Add Sets</button>}
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '2px'}}>
                                            {exercise.sets.length > 0 && 
                                                <ol style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
                                                    {exercise.sets.map((setBlock, index) => {
                                                    return (
                                                        <li key={setBlock.id} style={{display: 'flex', width: '100%', alignItems: 'center', gap: '4px', fontSize: '0.8rem'}}>
                                                            <Image onClick={() => deleteSet(exercise.id, index)} src='/images/icons/remove.png' alt='removeIcon' width='12' height='12'/>
                                                            <span style={{minWidth: 'max-content', alignItems: 'center', display: 'flex', gap: '2px'}}>
                                                                <span> {setBlock.sets} </span>
                                                                <span> x </span>
                                                                <span>{setBlock.reps}</span>
                                                            </span>
                                                            {setBlock.weight > 0 && <span style={{fontSize: '0.7rem'}}> @ </span>}
                                                            {setBlock.weight > 0 && <span>{setBlock.weight} lbs</span>}
                                                        </li>
                                                    )})}
                                                </ol>}
                                            {newSetMode.id === exercise.id && 
                                            <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontSize: '0.7rem', borderRadius: '2px', border: '1px var(--oxford-blue) solid'}}>
                                                <div style={{display: 'flex', flexDirection: 'row', borderBottom: '1px var(--oxford-blue) solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50%'}}>Sets:</span> <span className={styles.newSetBlockInfo} style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('sets', 'decrease')}> - </span> <span style={{width: '40px', textAlign: 'center'}}> {newSetMode.data.sets}</span> <span onClick={() => updateSet('sets', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', borderBottom: '1px var(--oxford-blue) solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50%'}}>Reps:</span> <span className={styles.newSetBlockInfo} style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('reps', 'decrease')}> - </span> <span style={{width: '40px', textAlign: 'center'}}> {newSetMode.data.reps} </span> <span onClick={() => updateSet('reps', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', borderBottom: '1px var(--oxford-blue) solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50%'}}>Weight:</span> <span className={styles.newSetBlockInfo} style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('weight', 'decrease')}> - </span> <input style={{ fontSize: '0.7rem', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottomColor: 'var(--charcoal)', WebkitAppearance: 'none', borderRadius: 0, borderBottomWidth: '1px', width: '40px', color: 'var(--charcoal)', textAlign: 'center'}} value={`${newSetMode.data.weight}`} onChange={e => setNewSetMode({...newSetMode, data: {...newSetMode.data, weight: Number(e.currentTarget.value)}})} type='number' /> <span onClick={() => updateSet('weight', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '0.3rem'}}>
                                                    <button onClick={() => setNewSetMode({id: '', data: { sets: 3, reps: 8, weight: 100, id: '' }})} style={{ fontSize: '0.7rem', padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>Cancel</button>
                                                    <button onClick={() => handleNewSet(exercise.id)} style={{ fontSize: '0.7rem', padding: '3px 12px', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>Add</button> 
                                                </div>
                                            </div>}
                                        </div>
                                        <Image onClick={() => setWorkoutExercises((prevState: AllocatedExercise[] | null) => prevState ? prevState.filter((prevExercise: AllocatedExercise) => exercise.id !== prevExercise.id) : null)} src='/images/icons/remove.png' alt='removeIcon' width='18' height='18'/>
                                    </div>
                                )
                            })}
                        </SortableContext>
                    </DndContext> : 
                    !ghostPiece && <div style={{margin: 'auto auto', fontSize: '0.8rem', fontStyle:'oblique'}}> Drag Exercises Here</div> }  
                    {ghostPiece &&
                    <div style={{border: '1px var(--oxford-blue) solid', backgroundColor: successfullyDropped ? 'white' : 'var(--charcoal)', opacity: '0.1'}} className={`${styles.individualWorkoutExercises} ${successfullyDropped ? styles.active : ''}`}>
                        <div className={`${successfullyDropped ? styles.active : ''}`} style={{ opacity: '0', fontSize: '0.8rem', width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                            <div>{ghostPiece}</div>
                            <button style={{ padding: '2px 10px', border: 'none', fontSize: '0.6rem', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content' }}>Add Sets</button>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '2px'}}>
                        </div>
                        <Image style={{ opacity: '0'}} className={`${successfullyDropped ? styles.active : ''}`} src='/images/icons/remove.png' alt='removeIcon' width='18' height='18'/>
                    </div>}
                </div>
            </div>
            <div className={styles.exercisesCreatorContainer}>
                {data && data.map(exercise => {
                    return(
                        <DraggableExercise key={exercise.id} exercise={exercise}>
                            <div className={styles.individualExercisesToDrag}>
                                <span style={{minWidth: 'fit-content', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap:'0.5rem'}}>
                                    <Image src='/images/icons/drag.png' alt='drag and drop' width='9' height='15'/>
                                    {exercise.name}
                                </span>
                                <ul className={styles.areasTargeted}>
                                    {exercise.areasTargeted && exercise.areasTargeted.map((areaTargeted: AreaTargeted)=> {
                                        return (
                                            <li key={areaTargeted.id}>
                                                <Image src={`/images/muscle-parts/${areaTargeted.name}.png`} alt={`${areaTargeted.name}`} width='30' height='30' />
                                                <p>{areaTargeted.name}</p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </DraggableExercise>
                    )
                })}
            </div>
        </div>
    )
}

const DraggableExercise = ( { exercise, children }: { exercise: Exercise, children: JSX.Element } ) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: exercise.id, data: { type: 'exercise', exercise: exercise, renderDragLayout: ({exercise}: { exercise: Exercise}) => <div className={styles.individualExercisesToDrag}> 
            <span style={{minWidth: 'fit-content', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap:'0.5rem'}}>
                <Image src='/images/icons/drag.png' alt='drag and drop' width='9' height='15'/>
                {exercise.name}
            </span>
            <ul className={styles.areasTargeted}>
                {exercise.areasTargeted && exercise.areasTargeted.map((areaTargeted: AreaTargeted)=> {
                    return (
                        <li key={areaTargeted.id}>
                            <Image src={`/images/muscle-parts/${areaTargeted.name}.png`} alt={`${areaTargeted.name}`} width='30' height='30' />
                            <p>{areaTargeted.name}</p>
                        </li>
                    )
                })}
            </ul>
        </div>  }
    });

    return (
        <li style={{ touchAction: 'manipulation' }} ref={setNodeRef} {...attributes} {...listeners} >
            {children}
        </li>
    )
}