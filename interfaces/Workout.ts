import AllocatedExercise from "./AllocatedExercise"
import AreaTargeted, { Area } from "./AreaTargeted";

export default interface Workout{
    name: string;
    exercises: AllocatedExercise[];
    areasTargeted: AreaTargeted[];
    complete?: boolean;
    id: string;
}