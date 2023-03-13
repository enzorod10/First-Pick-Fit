import Exercise from "./Exercise";
import SetBlock from "./SetBlock";

export default interface AllocatedExercise extends Exercise{
    sets: SetBlock[];
    complete?: boolean;
    notes?: string;
}