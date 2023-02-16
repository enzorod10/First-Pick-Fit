import Calendar from '../components/calendar/Calendar'
import Workouts from '../components/Workouts/Workouts'
import Exercises from '../components/Exercises/Exercises'
import { useEffect, useState } from 'react'
import { doc, getDoc} from 'firebase/firestore'
import { auth, db } from '../firebase/clientApp'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { userSlice } from '../redux/features/userFeatures/userSlice'

export default function Dashboard() {

  const { loginStatus } = useSelector((state: RootState) => state[userSlice.name])

  return (
    <div>
      <Calendar />
      <Workouts />
      <Exercises />
    </div>
  )
}