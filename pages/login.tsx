import Router from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../firebase/clientApp'
import { useSignInWithEmailAndPasswordMutation } from '../redux/features/auth/authApi'
import { userSlice } from '../redux/features/user/userSlice'
import { RootState } from '../store'

export default function Signup() {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })

    const [signInWithEmailAndPassword, result] = useSignInWithEmailAndPasswordMutation()

    const { loginStatus } = useSelector((state: RootState) => state[userSlice.name])

    if (loginStatus){
        Router.push('/dashboard')
    }

    return (
        <div>
            <form>
                <input type="email" value={userInfo.email} placeholder='email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                <input type="password" value={userInfo.password} placeholder='password' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                <button type='button' onClick={() => signInWithEmailAndPassword({ auth, email: userInfo.email, password: userInfo.password })}> Log in</button>
            </form>
        </div>
    )
}