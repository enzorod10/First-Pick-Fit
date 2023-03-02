import Calendar from '../components/Calendar/Calendar/Calendar';
import Workouts from '../components/Workouts/Workouts';
import Exercises from '../components/Exercises/Exercises';
import { db, auth } from '../firebase/clientApp';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState } from 'react';
import { uid } from 'uid';
import UserPrompt from '../components/UserPrompt/UserPrompt';

export default function Dashboard() {
  // Temp state & function
  const [thing, setThing] = useState<any>({ })

  const tempAddExercise = async () => {
    if (auth.currentUser){
      await updateDoc(doc(db, `user`, auth.currentUser?.uid), { savedExercises: arrayUnion(thing) } )
    }
  }
  // Temp state & function

  return (
    <div className='dashboard'>
      <UserPrompt />
          {/* Temp form */}
          <div>
            <input type="text" placeholder='exercise name' onChange={(e) => setThing({...thing, id: uid(),  name: e.target.value })}/>
            <button onClick={tempAddExercise}>submit</button>
          </div>
          {/* Temp form */}

    </div>
  )
}