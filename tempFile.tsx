import { uid } from "uid"
import Program from "./interfaces/Program"

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

const program: Program = {
    name: 'Push/Pull/Legs (PPL) Powerbuilding Split',
    info: 'This 6 day push/pull/legs workout routine split is a high volume, rest-pause system designed for intermediate lifters looking to gain muscle and strength.',
    shape: [0, 1, 2, 3, 4, 5, null],
    duration: 12,
    workouts: [
        {
            name: 'Push A',
            exercises: [
                {
                    name: 'Flat Barbell Bench Press',
                    areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Behind the Neck Press',
                    areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Weighted Tricep Dips',
                    areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Standing Cable Crossovers',
                    areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Tricep Extensions',
                    areasTargeted: [{ name: 'Triceps', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Dumbbell Lateral Raises',
                    areasTargeted: [{ name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                }
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        },
        {
            name: 'Pull A',
            exercises: [
                {
                    name: 'Barbell Conventional Deadlift',
                    areasTargeted: [{ name: 'Hamstrings', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Lats', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Weighted Chin-ups',
                    areasTargeted: [{ name: 'Lats', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Chest Supported Rows',
                    areasTargeted: [{ name: 'Lats', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Shoulders', id: uid() } ],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Shrugs',
                    areasTargeted: [{ name: 'Shoulders', id: uid() }, { name: 'Trapezius', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Standing Barbell Curls',
                    areasTargeted: [{ name: 'Biceps', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Standing Cable Reverse Fly',
                    areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                }
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        },
        {
            name: 'Legs A',
            exercises: [
                {
                    name: 'Barbell Back Squat',
                    areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Barbell Good Mornings',
                    areasTargeted: [{ name: 'Gluteus', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Leg Press',
                    areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Gluteus', id: uid() },{ name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Reverse Hyperextension',
                    areasTargeted: [{ name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Leg Curl',
                    areasTargeted: [{ name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Calf Raise',
                    areasTargeted: [{ name: 'Calves', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        },
        {
            name: 'Push B',
            exercises: [
                {
                    name: 'Standing Overhead Press',
                    areasTargeted: [{ name: 'Shoulders', id: uid() }, { name: 'Trapezius', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Incline Bench Press',
                    areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Triceps', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Close Grip Bench Press',
                    areasTargeted: [{ name: 'Triceps', id: uid() }, { name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Machine Fly',
                    areasTargeted: [{ name: 'Pectorals', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Standing Tricep Pushdown',
                    areasTargeted: [{ name: 'Triceps', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Standing Cable Lateral Raises',
                    areasTargeted: [{ name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        },
        {
            name: 'Pull B',
            exercises: [
                {
                    name: 'Barbell Snatch Grip Deadlift',
                    areasTargeted: [{ name: 'Hamstrings', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Lats', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Barbell Rows',
                    areasTargeted: [{ name: 'Lats', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Weighted Pull-ups',
                    areasTargeted: [{ name: 'Lats', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: '1-Arm Rows',
                    areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Shoulders', id: uid() }, { name: 'Biceps', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Lats', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Incline Dumbbell Curl',
                    areasTargeted: [{ name: 'Biceps', id: uid() }, { name: 'Forearms', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Machine Reverse Fly',
                    areasTargeted: [{ name: 'Trapezius', id: uid() }, { name: 'Shoulders', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        },
        {
            name: 'Legs B',
            exercises: [
                {
                    name: 'Barbell Back Squat',
                    areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 5, reps: 3, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Barbell Romanian Deadlifts',
                    areasTargeted: [{ name: 'Hamstrings', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Lats', id: uid() }, { name: 'Trapezius', id: uid() }],
                    sets: [{ sets: 3, reps: 8, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Barbell Hip Thrusts',
                    areasTargeted: [{ name: 'Gluteus', id: uid() }, { name: 'Abdominals', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 3, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Dumbbell Lunges',
                    areasTargeted: [{ name: 'Quadriceps', id: uid() }, { name: 'Calves', id: uid() }, { name: 'Gluteus', id: uid() }, { name: 'Hamstrings', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Seated Leg Extensions',
                    areasTargeted: [{ name: 'Quadriceps', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
                {
                    name: 'Hanging Leg Raise',
                    areasTargeted: [{ name: 'Abdominals', id: uid() }, { name: 'Forearms', id: uid() }],
                    sets: [{ sets: 5, reps: 10, id: uid() }],
                    id: uid(),
                },
            ],
            get areasTargeted(){
                return sortUniqueAreas(this.exercises)
            },
            id: uid()
        }
    ],
    id: uid(),
}