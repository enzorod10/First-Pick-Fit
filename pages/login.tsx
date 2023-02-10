import Router from 'next/router'
import { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/clientApp'

export default function Signup() {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

    return (
        <div>
            <form>
                <input type="email" value={userInfo.email} placeholder='email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                <input type="password" value={userInfo.password} placeholder='password' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                <button onClick={() => signInWithEmailAndPassword(userInfo.email, userInfo.password)} type='button'> Log in</button>
            </form>
        </div>
    )
}