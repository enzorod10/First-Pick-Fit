import styles from './Exercise.module.css'
import { useDraggable } from '@dnd-kit/core';

interface AppProps{
    exercise: String;
}


const Exercise = ( { exercise }: AppProps ) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: 'exercise'})

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;

    return(
        <div ref={setNodeRef} className={styles.container} style={style} {...listeners} {...attributes}>
            {exercise}
        </div>
    )
}

export default Exercise;