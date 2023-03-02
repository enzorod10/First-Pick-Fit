import styles from './Exercise.module.css';
import Exercise from '../../../interfaces/Exercise';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

interface AppProps{
    exercise: Exercise;
    editMode: boolean;
}

const Exercise = ( { exercise, editMode }: AppProps ) => {
    const { listeners, attributes, setNodeRef, transform, transition } = useSortable( { id: 'sortable-' + exercise.id } );

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '20px',
        border: '2px blue solid'
      };
    

    if (!editMode){
        return(
            <div style={{padding: '20px', border: '2px blue solid'}}>
                {exercise.name}
            </div>
        )
    } else {
        return(
            <div style={style} {...attributes} {...listeners} ref={setNodeRef} >
                {exercise.name} Scroll me
            </div>
        )
    }
}

export default Exercise;