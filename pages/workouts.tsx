import WorkoutsComponent from '../components/Workouts/Workouts' 

export default function Workouts({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined } }) {
    return (
        <WorkoutsComponent windowSize={windowSize}/>
    )
}