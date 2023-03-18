import Router from 'next/router'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { useState } from 'react'
import { auth, db } from '../../firebase/clientApp'
import { doc, setDoc } from 'firebase/firestore'
import Image from 'next/image'

export default function Signup({ windowSize, changeAuthStage }: { windowSize: { width: number | undefined, height: number | undefined }, changeAuthStage: () => void}) {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })

    const googleProvider = new GoogleAuthProvider();

    const newUser = async () => {
        await setDoc(doc(db, 'user', `${auth.currentUser?.uid}`), {
            favorite_exercises: ['hello'],
            favorite_workouts: ['hello', 'bye'],
        }).then(() => {
            Router.push('/dashboard')
        })
    }

    return (
        <div className='loginPage' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: windowSize.width && windowSize.width > 900 ? '70%' : '100%'}}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '80%', maxWidth: '350px', margin: 'auto auto', gap: '12px'}}>
                <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                <h2 style={{color: 'var(--oxford-blue)'}}>Join Today</h2>
                <h3 style={{textAlign: 'center'}}> Reach your fitness goals.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <label htmlFor="email">Email</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="email" id='email' value={userInfo.email} placeholder='Enter your email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}>
                    <label htmlFor="password">Password</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="password" id='password' value={userInfo.password} placeholder='*******' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}>
                    <label htmlFor="password">Confirm Password</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="password" id='password' value={userInfo.password} placeholder='*******' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                </div>
                <button style={{padding: '10px 0px', width: '100%', backgroundColor: 'var(--oxford-blue)', borderRadius: '5px', color: 'white'}} type='button' onClick={() => createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)}> Sign up</button>
                <button onClick={() => signInWithRedirect(auth, googleProvider)} style={{display: 'flex', fontWeight: 'bold', justifyContent: 'center', gap: '10px', backgroundColor: 'white', border: '1px var(--charcoal) solid', alignItems: 'center', padding: '10px 0px', width: '100%', borderRadius: '5px', color: 'var(--oxford-blue)'}} type='button'> 
                    <Image style={{}} src='/images/icons/google.png' alt='Google' height='15' width='15'/>
                    Sign In with Google
                </button>                
                <div style={{width: '100%'}}>
                    Already have an account? <span style={{color: 'var(--oxford-blue)', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => changeAuthStage()}> Sign In </span>
                </div>
            </form>
            <div style={{margin: 'auto auto', fontSize: '0.8rem'}}>
                &copy;2023 Enzo All rights reserved.
            </div>
        </div>
    )
}