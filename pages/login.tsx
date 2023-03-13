import Image from 'next/image'
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
        <div className='loginPage' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
            <form style={{display: 'flex', flexDirection: 'column', alignItems:'center', width: '80%', maxWidth: '350px', margin: 'auto auto', gap: '10px'}}>
                <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                <h2 style={{color: 'var(--oxford-blue)'}}>Welcome Back</h2>
                <h3 style={{textAlign: 'center'}}> Reach your fitness goals.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <label htmlFor="email">Email</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="email" id='email' value={userInfo.email} placeholder='Enter your email' onChange={ev => setUserInfo( { ...userInfo, email: ev.currentTarget.value })}/>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}>
                    <label htmlFor="password">Password</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="password" id='password' value={userInfo.password} placeholder='*******' onChange={ev => setUserInfo( { ...userInfo, password: ev.currentTarget.value })}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px', width: '100%'}}>
                        <input type="checkbox" name="" id="" /> 
                        Remember me
                    </span>
                    <span style={{minWidth: 'fit-content', fontWeight: 'bold', color: 'var(--oxford-blue)',}}>Forgot Password?</span>
                </div>

                <button style={{padding: '10px 0px', width: '100%', backgroundColor: 'var(--oxford-blue)', borderRadius: '5px', color: 'white'}} type='button' onClick={() => signInWithEmailAndPassword({ auth, email: userInfo.email, password: userInfo.password })}> Sign In</button>
                <button style={{display: 'flex', fontWeight: 'bold', justifyContent: 'center', gap: '10px', backgroundColor: 'white', border: '1px var(--charcoal) solid', alignItems: 'center', padding: '10px 0px', width: '100%', borderRadius: '5px', color: 'var(--oxford-blue)'}} type='button' onClick={() => signInWithEmailAndPassword({ auth, email: userInfo.email, password: userInfo.password })}> 
                    <Image style={{}} src='/images/icons/google.png' alt='Google' height='15' width='15'/>
                    Sign In with Google
                </button>
                <div style={{width: '100%'}}>
                    Not registered yet? <span style={{color: 'var(--oxford-blue)', fontWeight: 'bold',}} onClick={() => Router.push('/signup')}> Create an Account </span>
                </div>
            </form>
            <div style={{margin: 'auto auto', fontSize: '0.8rem'}}>
                &copy;2023 Enzo All Rights Reserved.
            </div>
        </div>
    )
}