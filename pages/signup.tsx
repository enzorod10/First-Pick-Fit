import Router from 'next/router'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/clientApp'

export default function Signup() {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const newUser = async () => {
        await setDoc(doc(db, 'user', `${auth.currentUser?.uid}`), {
            favorite_exercises: ['hello'],
            favorite_workouts: ['hello', 'bye'],
        }).then(() => {
            Router.push('/dashboard')
        })
    }

    if (user){
        newUser()
    }

    if (error){
        console.log(error)
    }

    return (
        <div>
            <form>
                <input type="email" value={userInfo.email} placeholder='email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                <input type="password" value={userInfo.password} placeholder='password' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                <button onClick={() => createUserWithEmailAndPassword(userInfo.email, userInfo.password)} type='button'> Sign up</button>
            </form>
        </div>
    )
}