import Exercise from "./Exercise";
import Set from "./Set";

export default interface AllocatedExercise extends Exercise{
    sets: Set[];
    complete?: boolean;
    notes?: string;
}