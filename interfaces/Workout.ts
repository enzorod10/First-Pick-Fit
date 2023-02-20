import ActiveExercise from "./ActiveExercise"

export default interface Workout{
    name: string;
    exercises: ActiveExercise[];
    complete?: boolean
}