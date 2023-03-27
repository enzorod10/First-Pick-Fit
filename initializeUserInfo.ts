import AllocatedExercise from "./interfaces/AllocatedExercise"
import AreaTargeted from "./interfaces/AreaTargeted"
import { uid } from "uid"

export const AllocatedExercises: AllocatedExercise[] = [
    //0
    {
        name: 'Back Squat',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //1
    {
        name: 'Romanian Deadlift',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}, {id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //2
    {
        name: 'Leg Press',
        areasTargeted: [{id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //3
    {
        name: 'Seated Calf Raise',
        areasTargeted: [{id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //4
    {
        name: 'Walking Lunge',
        areasTargeted: [{id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Abdominals'}, {id: uid(), name: 'Calves'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //5
    {
        name: 'Leg Extension',
        areasTargeted: [{id: uid(), name: 'Quadriceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //6
    {
        name: 'Leg Curl',
        areasTargeted: [{id: uid(), name: 'Hamstrings'}, {id: uid(), name: 'Calves'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //7
    {
        name: 'Deadlift',
        areasTargeted: [{id: uid(), name: 'Quadriceps'}, {id: uid(), name: 'Gluteus'}, {id: uid(), name: 'Abdominals'}, {id: uid(), name: 'Calves'}, {id: uid(), name: 'Hamstrings'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //8
    {
        name: 'Flat Dumbbell Bench Press',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //9
    {
        name: 'Incline Barbell Bench Press',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 150, id: uid()}],
        id: uid()
    },
    //10
    {
        name: 'Pectoral Fly',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //11
    {
        name: 'Dip',
        areasTargeted: [{id: uid(), name: 'Triceps'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Pectorals'}],
        sets: [{sets: 3, reps: 10, id: uid()}],
        id: uid()
    },
    //12
    {
        name: 'Shoulder Press',
        areasTargeted: [{id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //13
    {
        name: 'Dumbbell Shrugs',
        areasTargeted: [{id: uid(), name: 'Shoulders'}],
        sets: [{sets: 3, reps: 10, id: uid()}],
        id: uid()
    },
    //14
    {
        name: 'Seated Lateral Raise',
        areasTargeted: [{id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Trapezius'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //15
    {
        name: 'Cable Crossover',
        areasTargeted: [{id: uid(), name: 'Pectorals'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 12, id: uid()}],
        id: uid()
    },
    //16
    {
        name: 'Skull Crushers',
        areasTargeted: [{id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //17
    {
        name: 'Cable Triep Extensions',
        areasTargeted: [{id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //18
    {
        name: 'Lat Pulldown',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //19
    {
        name: 'Dumbbell Pullover',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //20
    {
        name: 'Bent Over Dumbbell Reverse Fly',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Triceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //21
    {
        name: 'Pull Up',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}, {id: uid(), name: 'Shoulders'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //22
    {
        name: 'Bent-Over Barbell Row',
        areasTargeted: [{id: uid(), name: 'Lats'}, {id: uid(), name: 'Trapezius'}, {id: uid(), name: 'Biceps'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //23
    {
        name: 'Cable Face Pull',
        areasTargeted: [{id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Trapezius'}],
        sets: [{sets: 3, reps: 10, weight: 100, id: uid()}],
        id: uid()
    },
    //24
    {
        name: 'Barbell Curl',
        areasTargeted: [{id: uid(), name: 'Biceps'}],
        sets: [{sets: 3, reps: 12, id: uid()}],
        id: uid()
    },
    //25
    {
        name: 'Hammer Curl',
        areasTargeted: [{id: uid(), name: 'Biceps'}, {id: uid(), name: 'Forearms'}],
        sets: [{sets: 3, reps: 12, id: uid()}],
        id: uid()
    },  
    //26
    {
        name: 'Crunch',
        areasTargeted: [{id: uid(), name: 'Abdominals'}, {id: uid(), name: 'Obliques'}],
        sets: [{sets: 3, reps: 10, id: uid()}],
        id: uid()
    },
    //27
    {
        name: 'Russian Twists',
        areasTargeted: [{id: uid(), name: 'Abdominals'}, {id: uid(), name: 'Obliques'}],
        sets: [{sets: 3, reps: 10, id: uid()}],
        id: uid()
    },
    //28
    {
        name: 'Plank',
        areasTargeted: [{id: uid(), name: 'Abdominals'}],
        sets: [{sets: 3, reps: 1, id: uid()}],
        id: uid()
    },
    //29
    {
        name: 'Close Grip Bench Press',
        areasTargeted: [{id: uid(), name: 'Triceps'}, {id: uid(), name: 'Shoulders'}, {id: uid(), name: 'Pectorals'}],
        sets: [{sets: 3, reps: 12, id: uid()}],
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

export const WorkoutsArray = [new WorkoutMaker('Chest and Side Delts', [AllocatedExercises[9], AllocatedExercises[8], AllocatedExercises[14], AllocatedExercises[15]]),
                       new WorkoutMaker('Upper Back and Rear Delts', [AllocatedExercises[20], AllocatedExercises[19], AllocatedExercises[18], AllocatedExercises[22], AllocatedExercises[23], AllocatedExercises[13]]),
                       new WorkoutMaker('Arms and Abs', [AllocatedExercises[29], AllocatedExercises[11], AllocatedExercises[17], AllocatedExercises[24], AllocatedExercises[25], AllocatedExercises[26], AllocatedExercises[27]]),
                       new WorkoutMaker('Legs', [AllocatedExercises[7], AllocatedExercises[6], AllocatedExercises[4], AllocatedExercises[0], AllocatedExercises[5], AllocatedExercises[3]]),
                       new WorkoutMaker('Upper Body', [AllocatedExercises[9], AllocatedExercises[22], AllocatedExercises[12], AllocatedExercises[21], AllocatedExercises[16], AllocatedExercises[25]]),
                       new WorkoutMaker('Lower Body', [AllocatedExercises[0], AllocatedExercises[6], AllocatedExercises[5], AllocatedExercises[3], AllocatedExercises[28]]),
                       new WorkoutMaker('Upper Body B', [AllocatedExercises[8], AllocatedExercises[22], AllocatedExercises[3], AllocatedExercises[18], AllocatedExercises[17], AllocatedExercises[24]])
]