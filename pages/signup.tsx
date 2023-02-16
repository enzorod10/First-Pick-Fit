import Router from 'next/router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth, db } from '../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'

export default function Signup() {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })


    const newUser = async () => {
        await setDoc(doc(db, 'user', `${auth.currentUser?.uid}`), {
            favorite_exercises: ['hello'],
            favorite_workouts: ['hello', 'bye'],
        }).then(() => {
            Router.push('/dashboard')
        })
    }

    return (
        <div>
            <form>
                <input type="email" value={userInfo.email} placeholder='email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                <input type="password" value={userInfo.password} placeholder='password' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                <button onClick={() => createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)} type='button'> Sign up</button>
            </form>
        </div>
    )
}