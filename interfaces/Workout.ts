import AllocatedExercise from "./AllocatedExercise"

export default interface Workout{
    name: string;
    exercises: AllocatedExercise[];
    areasTargeted: [];
    complete?: boolean;
    id: string;
}