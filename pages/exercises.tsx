import Router from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebase/clientApp'
import { useSignInWithEmailAndPasswordMutation } from '../redux/features/auth/authApi'
import { userSlice } from '../redux/features/user/userSlice'
import { RootState } from '../store'
import ExercisesComponent from '../components/Exercises/Exercises'

export default function Exercises() {
    return (
        <ExercisesComponent />
    )
}