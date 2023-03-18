import Workout from "./interfaces/Workout"
import AllocatedExercise from "./interfaces/AllocatedExercise"
import AreaTargeted from "./interfaces/AreaTargeted"
import { uid } from "uid"

const AllocatedExercises: AllocatedExercise[] = [
    {
        name: 'Back Squat',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Romanian Deadlift',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}, {id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Leg Press',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Calf Raise',
        areasTargeted: [{id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Leg Extension',
        areasTargeted: [{id: uid(), name: 'Quadriceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Leg Curl',
        areasTargeted: [{id: uid(), name: 'Hamstrings'}, {id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Bench Press',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Pectoral Fly',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Dip',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Shoulder Press',
        areasTargeted: [{id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Lateral Raise',
        areasTargeted: [{id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Trapezius'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Lat Pulldown',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Skull Crushers',
        areasTargeted: [{id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Row',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Pull Up',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}, {id: uid(), name: 'Shoulders'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    {
        name: 'Crunch',
        areasTargeted: [{id: uid(), name: 'Abdominals'}, {id: uid(), name: 'Obliques'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
]

class WorkoutMaker{
    name: string;
    id: string;
    exercises: AllocatedExercise[];
    areasTargeted: AreaTargeted[];

    constructor(name: string, exercises: AllocatedExercise[]){
        this.name = name;
        this.id = uid();
        this.exercises = exercises;
        this.areasTargeted = this.sortUniqueAreas();
    }
    
    sortUniqueAreas(){
        const counts: {[key: string]: {count: number, id: string}} = this.exercises.reduce((acc: any, curr: any) => {
            curr.areasTargeted && curr.areasTargeted.forEach((areaTargeted: AreaTargeted) => {
                if (areaTargeted.name in acc) {
                acc[areaTargeted.name].count++;
                } else {
                acc[areaTargeted.name] = {count: 1, id: areaTargeted.id};
                }
            });
            return acc;
            }, {});

            const uniqueArr = Object.entries(counts).sort((a, b) => b[1].count - a[1].count).map((item: any) => ({name: item[0], id: item[1].id}));
        
            return uniqueArr;
    }
}

const pushDay1 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])
const pullDay1 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])
const legDay1 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])
const pushDay2 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])
const pullDay2 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])
const legDay2 = new WorkoutMaker('Chest Day', [AllocatedExercises[0], AllocatedExercises[1]])