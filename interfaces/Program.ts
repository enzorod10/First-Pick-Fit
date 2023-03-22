import Workout from "./Workout";

export default interface Program {
    name: string;
    info: string;
    shape: [number | null, number | null, number | null, number | null, number | null, number | null, number | null];
    duration: number;
    startDate?: string;
    workouts: Workout[];
    id: string;
}