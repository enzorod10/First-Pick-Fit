import Calendar from '../components/Calendar/Calendar/Calendar'
import Workouts from '../components/Workouts/Workouts'
import Exercises from '../components/Exercises/Exercises'
import styles from '../styles/dashboard.module.css'
import { DndContext } from '@dnd-kit/core'

export default function Dashboard() {

  return (
    <div>
      <DndContext>
        <Calendar />
        <div className={styles.workoutsContainerAndExercisesContainer}>
          <Workouts />
          <Exercises />
        </div>
      </DndContext>
    </div>
  )
}