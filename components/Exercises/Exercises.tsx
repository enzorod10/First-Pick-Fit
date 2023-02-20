import styles from './Exercises.module.css'
import { uid } from 'uid'
import { useGetUserSavedExercisesQuery } from '../../redux/features/user/userApi'
import { userSlice } from '../../redux/features/user/userSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import Exercise from './Exercise/Exercise'


const Exercises = () => {
    const { userId } = useSelector((state: RootState) => state[userSlice.name])

    const { data } = useGetUserSavedExercisesQuery(userId)

    console.log(data)

    return(
        <div className={styles.container}>
            <h2>
                Exercises
            </h2>
            {data && data.map(category => {
                return(
                    <div className={styles.category} key={uid()}> 
                        <h3>{category.category}</h3>
                        {category.types.map(type => {
                            return(
                                <ul className={styles.type} key={uid()}>
                                    <h4>{type.type}</h4>
                                    {type.exercises.map(exercise => {
                                        return (
                                            <Exercise key={uid()} exercise={exercise} />
                                        )
                                    })}
                                </ul>
                            )
                        })}
                    </div>
                )
            })}
           
        </div>
    )
}

export default Exercises;