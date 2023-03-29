import styles from './Exercise.module.css';
import Exercise from '../../../interfaces/Exercise';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import Image from 'next/image';
import { useDeleteUserSavedExerciseMutation } from '../../../redux/features/exercise/exerciseApi';
import { useState } from 'react';

interface AppProps{
    exercise: Exercise;
    userId: string | undefined;
}

const Exercise = ( { exercise, userId }: AppProps ) => {
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable( { id: 'sortable-' + exercise.id } );
    const [deleteUserSavedExercise] = useDeleteUserSavedExerciseMutation();
    const [disappear, setDisappear] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition + ', ' + 'opacity 0.4s ease-out',
        touchAction: 'manipulation',
        opacity: disappear ? '0' : '1',
        cursor: 'move'
    };

    return(
        <div className={styles.container} style={style} {...attributes} {...listeners} ref={setNodeRef} >
            <div style={{display: 'flex', alignItems:'center', gap: '0.5rem'}}>
                <Image style={{pointerEvents: 'none'}} src='/images/icons/scroll.png' alt='scroll' width='16' height='16'/>
                <div>
                    <div style={{fontSize: '0.8rem',}}>
                        {exercise.name}
                    </div>
                    <div style={{fontSize: '0.7rem', display: 'flex', width: 'fit-content'}}>
                        <span style={{cursor: 'pointer'}} onClick={() => (setDisappear(true), deleteUserSavedExercise({userId, exerciseId: exercise.id}))}>Remove</span>
                    </div>
                </div>
            </div>
            {exercise.areasTargeted && 
            <ul className={styles.areasTargeted}>
                {exercise.areasTargeted.map(areaTargeted => {
                    return (
                        <li key={areaTargeted.id}>
                            <Image src={`/images/muscle-parts/${areaTargeted.name}.png`} alt={`${areaTargeted.name}`} width='30' height='30' />
                            <p>{areaTargeted.name}</p>
                        </li>
                    )
                })}
            </ul>}
        </div>
    )
}

export default Exercise;