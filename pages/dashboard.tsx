import Calendar from '../components/calendar/Calendar'
import Workouts from '../components/workouts/Workouts'
import { useEffect } from 'react'
import { auth, db } from '../firebase/clientApp';
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'

export default function Dashboard() {
    const [value, loading, error] = useDocument(
    doc(db, 'user', `${auth.currentUser?.uid}`), 
    {
        snapshotListenOptions: { includeMetadataChanges: true }
    }
    );

    useEffect(() => {
        console.log(value?.data())
    }, [value])

  return (
    <div>
      <Calendar />
      <Workouts />
    </div>
  )
}