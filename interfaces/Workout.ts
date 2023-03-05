import AllocatedExercise from "./AllocatedExercise"

export default interface Workout{
    name: string;
    exercises: AllocatedExercise[];
    areasTargeted: string[];
    complete?: boolean;
    id: string;
}