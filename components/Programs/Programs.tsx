import { uid } from 'uid';
import styles from './Programs.module.css';
import Program from '../../interfaces/Program';
import AreaTargeted from '../../interfaces/AreaTargeted';
import AllocatedExercise from '../../interfaces/AllocatedExercise';
import { db } from '../../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import SelectedProgram from './SelectedProgram';

const Programs = ({ data, userId }: { data: Program[], userId: string | undefined }) => {

    const [selectedProgram, setSelectedProgram] = useState<null | Program>(null)
    
    const sortUniqueAreas = (exercises: AllocatedExercise[]): AreaTargeted[] => {
        const counts: {[key: string]: {count: number, id: string}} = exercises.reduce((acc: any, curr: any) => {
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

    const program: Program = {
        name: 'Mass Building Hypertrophy',
        info: 'This 4-day a week program will help intermediate and advanced trainees gain size and strength. Rest-pause set, drop sets, and negatives will kick your muscle gains into high gear!',
        shape: [0, 1, null, 2, 3, null, null],
        duration: 8,
        workouts: [
            {
                name: 'Chest and Side Delts',
                exercises: [
                    {
                        name: 'Incline Barbell Bench Press',
                        areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Flat Dumbbell Bench Press',
                        areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Cable Crossover',
                        areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() } ],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Seated Lateral Raise',
                        areasTargeted: [{ name: 'Shoulders', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Single Arm Cable Lateral Raise',
                        areasTargeted: [{ name: 'Shoulders', id: uid() }, { name: 'Trapezius', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    }
                ],
                get areasTargeted(){
                    return sortUniqueAreas(this.exercises)
                },
                id: uid()
            },
            {
                name: 'Upper Back and Rear Delts',
                exercises: [
                    {
                        name: 'Bent-Over Barbell Row',
                        areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Lats', id: uid() }, { name: 'Shoulders', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Dumbbell Pullover',
                        areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }, { name: 'Lats', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Wide Grip Lat Pulldown',
                        areasTargeted: [{ name: 'Lats', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Shoulders', id: uid() } ],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Dumbbell Rear Delt Fly',
                        areasTargeted: [{ name: 'Shoulders', id: uid() }, { name: 'Trapezius', id: uid() }, { name: 'Triceps', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Cable Face Pull',
                        areasTargeted: [{ name: 'Shoulders', id: uid() }, { name: 'Trapezius', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Dumbbell Shrug',
                        areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Shoulders', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    }
                ],
                get areasTargeted(){
                    return sortUniqueAreas(this.exercises)
                },
                id: uid()
            },
            {
                name: 'Arms and Abs',
                exercises: [
                    {
                        name: 'Close Grip Bench Press',
                        areasTargeted: [{ name: 'Triceps', id: uid() }, { name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Lats', id: uid() }, { name: 'Shoulders', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Weighted Dip',
                        areasTargeted: [{ name: 'Triceps', id: uid() }, { name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Lats', id: uid() }, { name: 'Shoulders', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Rope Tricep Extension',
                        areasTargeted: [{ name: 'Triceps', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Lying Leg Raise',
                        areasTargeted: [{ name: 'Abdominals', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Cable Crunch',
                        areasTargeted: [{ name: 'Abdominals', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Barbell Curl',
                        areasTargeted: [{ name: 'Biceps', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Hammer Curl',
                        areasTargeted: [{ name: 'Biceps', id: uid() }, { name: 'Forearms', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Cable Curl',
                        areasTargeted: [{ name: 'Biceps', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    }
                ],
                get areasTargeted(){
                    return sortUniqueAreas(this.exercises)
                },
                id: uid()
            },
            {
                name: 'Legs',
                exercises: [
                    {
                        name: 'Deadlift',
                        areasTargeted: [{ name: 'Hamstrings', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Quadriceps', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Lying Leg Curl',
                        areasTargeted: [{ name: 'Hamstrings', id: uid() }],
                        sets: [{ sets: 3, reps: 10, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Walking Lunge',
                        areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }, { name: 'Calves', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Front Squat',
                        areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Hamstrings', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Leg Extension',
                        areasTargeted: [{ name: 'Quadriceps', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Dummbbell Side Lunge',
                        areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }, { name: 'Calves', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Seated Calf Raise',
                        areasTargeted: [{ name: 'Calves', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    },
                    {
                        name: 'Calf Press',
                        areasTargeted: [{ name: 'Calves', id: uid() }],
                        sets: [{ sets: 3, reps: 12, id: uid() }],
                        id: uid(),
                    }
                ],
                get areasTargeted(){
                    return sortUniqueAreas(this.exercises)
                },
                id: uid()
            }
        ],
        id: uid(),
    }

    const addButton = async () => {
        const newcollection = await setDoc(doc(db, 'program', program.id), program)
    }

    const changeSelectedProgram = () => {
        setSelectedProgram(null);
    }

    return !selectedProgram ?
        <div className={styles.container}>
            <button onClick={() => addButton()}> Add </button>
            {data?.map((program: Program) => {
                return(
                    <div onClick={() => setSelectedProgram(program)} className={styles.programContainer} key={program.id}>
                        <h3 style={{fontSize: '1rem'}}>
                            {program.name}
                        </h3>
                        <div style={{fontSize: '0.8rem', fontStyle: 'italic'}}>
                            {program.info}
                        </div>
                        <div style={{fontSize: '0.8rem'}}>
                            Duration: {program.duration} weeks
                        </div>
                    </div>
                )
            })}
        </div> :
        <SelectedProgram program={selectedProgram} changeSelectedProgram={changeSelectedProgram} userId={userId}/>
};

export default Programs;