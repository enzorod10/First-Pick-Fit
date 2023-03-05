import Image from 'next/image';
import MobileWorkout, { MobileDraggableWorkout, MobileIndividualWorkout } from './Workout/MobileWorkout';
import Workout from '../../interfaces/Workout';
import AreaTargeted from '../../interfaces/AreaTargeted';
import styles from './MobileWorkouts.module.css';
import Exercise from '../../interfaces/Exercise';
import AllocatedExercise from '../../interfaces/AllocatedExercise';
import { useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from "react";
import { uid } from 'uid';
import { DndContext, useDraggable, useDroppable, useDndMonitor, DragEndEvent } from '@dnd-kit/core';
import { setIsCalendarExpanded } from "../../redux/features/calendar/calendarSlice"
import { useGetUserSavedExercisesQuery } from '../../redux/features/exercise/exerciseApi'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

export const MobileWorkoutsComponent = ({ workouts, userId }: { workouts: Workout[], userId: string | undefined}) => {
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>()
    const [isCreatingWorkout, setIsCreatingWorkout] = useState<boolean>(false)
    
    const dispatch = useDispatch();

    const displayWorkout = (workout?: Workout) => {
        workout ? setSelectedWorkout(workout) : setSelectedWorkout(undefined) 
    }

    const handleCreatedWorkout = (workout?: Workout) => {
        setIsCreatingWorkout(false)
        dispatch(setIsCalendarExpanded(true))
    }

    const initiateCreateMode = () => {
        dispatch(setIsCalendarExpanded(false))
        isCreatingWorkout ? setIsCreatingWorkout(false) : setIsCreatingWorkout(true)
    }

    if (!selectedWorkout && !isCreatingWorkout){
        return (
            <div className={styles.workoutsContainer}>
            <div className={styles.header}>
                <input placeholder='Search Workout...'/>
                <button onClick={initiateCreateMode}>New Workout</button>
            </div>
            {workouts.map(workout => {
                return(
                    <MobileDraggableWorkout key={uid()} workout={workout}>
                        <MobileWorkout workout={workout}  displayWorkout={displayWorkout}/>
                    </MobileDraggableWorkout>
                )
            })}
            </div>
        )
    }
    if (selectedWorkout && !isCreatingWorkout){
        return(
            <MobileIndividualWorkout workout={selectedWorkout} displayWorkout={displayWorkout} />
        )
    }
    if (isCreatingWorkout){
        return(
            <WorkoutCreator handleCreatedWorkout={handleCreatedWorkout} userId={userId} />
        )
    }
    else return null;
}

const WorkoutCreator = ( { handleCreatedWorkout, userId }: { handleCreatedWorkout: () => void, userId: string | undefined }) => {
    const [workoutExercises, setWorkoutExercises] = useState<null | AllocatedExercise[]>(null);
    const [workoutName, setWorkoutName] = useState<string>('');
    const { setNodeRef, isOver } = useDroppable({ id: 'newWorkoutExercisesContainer', data: { type: 'newWorkoutExercisesContainer' } });
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { data } = useGetUserSavedExercisesQuery(userId);
    const uniqueAreas = useMemo(() => sortUniqueWorkoutExercises(workoutExercises!), [workoutExercises]);
    const [newSetMode, setNewSetMode] =useState<{ id: string, data: { reps: number, weight: number, sets: number }}>({id: '', data: { reps: 10, weight: 100, sets: 3 }})

    interface ChangeEvent<T = HTMLInputElement> extends React.ChangeEvent<T> {}
    type ChangeEventHandler<T = HTMLInputElement> = (event: ChangeEvent<T>) => void;

    const handleWorkoutNameChange: ChangeEventHandler = (event) => {
        setWorkoutName(event.target.value)
    };

    function sortUniqueWorkoutExercises(arr: AllocatedExercise[]): string[] | undefined{
        if (arr){
            const counts: {[key: string]: number} = arr.reduce((acc: any, curr: AllocatedExercise) => {
                curr.areasTargeted && curr.areasTargeted.forEach((area) => {
                  if (area in acc) {
                    acc[area]++;
                  } else {
                    acc[area] = 1;
                  }
                });
                return acc;
              }, {});

              const uniqueArr = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(item => item[0]);
            
              return uniqueArr;
        }
    }
    

    const style = {
        backgroundColor: isOver ? 'green' : undefined,
    }

    useDndMonitor({
        onDragEnd(event: DragEndEvent){
            const { active, over } = event;
            if (active?.data?.current?.type === 'exercise' && over?.data?.current?.type === 'newWorkoutExercisesContainer'){
                const tempWorkoutExercise = {...active?.data?.current?.exercise, sets: []}
                tempWorkoutExercise.sets = [{ reps: 8, weight: 100 }]
                if(workoutExercises){
                    let tempWorkoutExercises = [...workoutExercises];
                    const indexCheck = tempWorkoutExercises.findIndex(exercise => {
                        return exercise.id === active?.data?.current?.exercise.id
                    })
                    tempWorkoutExercises = [...tempWorkoutExercises, tempWorkoutExercise]
                    indexCheck === -1 && setWorkoutExercises(tempWorkoutExercises)
                } else setWorkoutExercises([tempWorkoutExercise])
            }
        },
    })

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
                exercise.sets = [...exercise.sets, { reps: 8, weight: 100 }]
            }
            return exercise
        })
        setWorkoutExercises(tempWorkoutExercises);
    }

    const updateSet = (section: string, action: string) => {
        const tempNewSetMode = {...newSetMode};

        if (section === 'reps'){
            if (action === 'decrease'){
                tempNewSetMode.data.reps --;
            } else {
                tempNewSetMode.data.reps ++;
            }
        } 
        if (section === 'sets'){
            if (action === 'decrease'){
                tempNewSetMode.data.sets --;
            } else {
                tempNewSetMode.data.sets ++;
            }
        }
        if (section === 'weight'){
            if (action === 'decrease'){
                tempNewSetMode.data.weight -= 2.5;
            } else {
                tempNewSetMode.data.weight += 2.5;
            }
        }
        setNewSetMode(tempNewSetMode);
    }

    const deleteSet = (id: string, setIndex: number) => {
        const tempWorkoutExercises = [...workoutExercises!];
        const tempExercise = tempWorkoutExercises.find(exercise => exercise.id === id);
        const tempExerciseIndex = tempWorkoutExercises.findIndex(exercise => exercise.id === id);
        tempExercise && tempExercise?.sets.splice(setIndex, 1);
        tempExercise && tempExerciseIndex && tempWorkoutExercises.splice(tempExerciseIndex, 1, tempExercise);
        setWorkoutExercises(tempWorkoutExercises)
    }

    const verifyWorkoutInformation = () => {
        if (!workoutExercises){
            setErrorMessage('You must include at least 1 exercise')
            return
        }
        workoutName.trim() === '' && setWorkoutName('Workout')
        handleCreatedWorkout()
    }

    return(
        <div className={styles.workoutCreatorContainer}>
            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0rem', maxHeight: '60%', position: 'relative'}}>
                <div className={styles.newWorkoutNameAndButtons}>
                    <input value={workoutName} placeholder='Workout Name' onChange={handleWorkoutNameChange}/>
                    <span>
                        <button onClick={() => handleCreatedWorkout()}>N</button>
                        <button onClick={verifyWorkoutInformation}>Y</button>
                    </span>
                    
                </div>
                {uniqueAreas && 
                    <div className={styles.areasTargeted} style={{justifyContent: 'space-evenly', gap: '0rem', height: '70px'}}>
                    {uniqueAreas.map(area => {
                        return (
                            <div key={uid()}>
                                <Image src={`/images/muscle-parts/${area}.png`} alt='triceps' width='30' height='30' />
                                <p>{area}</p>
                            </div>)
                    })}
                </div>}
                <div ref={setNodeRef} style={style} className={styles.workoutExercisesCreatorContainer}>
                    { workoutExercises ? 
                    <DndContext modifiers={[restrictToParentElement]} onDragEnd={changeOrderOfWorkoutExercises}>
                        <SortableContext items={workoutExercises.map(exercise => exercise.id)} strategy={verticalListSortingStrategy}>
                            {workoutExercises.map(exercise => {
                                return (
                                    <div key={exercise.id} className={styles.individualWorkoutExercises} > 
                                        <div style={{fontSize: '0.8rem', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                                            <div>{exercise.name}</div>
                                            <div onClick={() => setNewSetMode({...newSetMode, id: exercise.id})} style={{ fontSize: '0.7rem', border: '1px red solid', padding: '0.1rem 0.4rem'}}>Add Set</div>
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column', border: '1px red solid', width: '100%'}}>
                                            {exercise.sets.length > 0 && 
                                                <ol>
                                                    {exercise.sets.map((set, index) => {
                                                    return (
                                                        <li key={uid()}>
                                                            3 x 8 100 lbs
                                                        </li>
                                                    )})}
                                                </ol>}
                                            {newSetMode.id === exercise.id && 
                                            <div style={{display: 'flex', flexDirection: 'column', width: '100%', fontSize: '0.8rem'}}>
                                                <div style={{display: 'flex', flexDirection: 'row', border: '1px red solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50px'}}>Sets:</span> <span style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('sets', 'decrease')}> - </span> <span style={{width: '40px', textAlign: 'center'}}> {newSetMode.data.sets}</span> <span onClick={() => updateSet('sets', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', border: '1px red solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50px'}}>Reps:</span> <span style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('reps', 'decrease')}> - </span> <span style={{width: '40px', textAlign: 'center'}}> {newSetMode.data.reps} </span> <span onClick={() => updateSet('reps', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', border: '1px red solid', padding: '0.3rem'}}>
                                                    <span style={{width: '50px'}}>Weight:</span> <span style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}> <span onClick={() => updateSet('weight', 'decrease')}> - </span> <input style={{all: 'unset', width: '40px', borderBottom: '1px black solid', textAlign: 'center'}} value={`${newSetMode.data.weight}`} onChange={e => setNewSetMode({...newSetMode, data: {...newSetMode.data, weight: Number(e.currentTarget.value)}})} type='number' /> <span onClick={() => updateSet('weight', 'increase')}> + </span> </span>
                                                </div>
                                                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', border: '1px red solid', padding: '0.3rem'}}>
                                                    <span style={{border: '1px red solid', padding: '0.3rem'}}>Save</span> <span style={{border: '1px red solid', padding: '0.3rem'}}>Cancel</span>
                                                </div>
                                            </div>}
                                        </div>
                                        
                                    </div>
                                )
                            })}
                        </SortableContext>
                    </DndContext> : 
                    <div style={{margin: 'auto auto'}}> Drag Exercises Here</div> }  
                </div>
            </div>
            <div className={styles.exercisesCreatorContainer}>
                {data && data.map(exercise => {
                    return(
                        <DraggableExercise key={uid()} exercise={exercise}>
                            <div className={styles.individualExercisesToDrag}>
                                <span style={{minWidth: 'fit-content', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap:'0.5rem'}}>
                                    <Image src='/images/icons/drag.png' alt='drag and drop' width='7' height='12'/>
                                    {exercise.name}
                                </span>
                                <div className={styles.areasTargeted}>
                                    {exercise.areasTargeted && exercise.areasTargeted.map((area: AreaTargeted)=> {
                                        return (
                                            <div key={uid()}>
                                                <Image src={`/images/muscle-parts/${area}.png`} alt='triceps' width='30' height='30' />
                                                <p>{area}</p>
                                            </div>
                                        )
                                    })}
                                </div>
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
        id: exercise.id, data: { type: 'exercise', exercise: exercise, renderDragLayout: ({exercise}: { exercise: Exercise}) => <div> {exercise.name} </div>  }
    });

    return (
        <li style={{ touchAction: 'manipulation' }} ref={setNodeRef} {...attributes} {...listeners} >
            {children}
        </li>
    )
}