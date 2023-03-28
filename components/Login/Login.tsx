import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase/clientApp'
import { useSignInWithEmailAndPasswordMutation } from '../../redux/features/auth/authApi'
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithRedirect } from 'firebase/auth'

export default function Signup({ windowSize, changeAuthStage }: { windowSize: { width: number | undefined, height: number | undefined }, changeAuthStage: () => void}) {
    const [userInfo, setUserInfo] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })
    const [forgotPasswordMode, setForgotPasswordMode] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState('');

    const googleProvider = new GoogleAuthProvider();

    const [signInWithEmailAndPassword, result] = useSignInWithEmailAndPasswordMutation()
    
    useEffect(() => {
        if (result.isError){
            setErrorMessage('Email or Password is incorrect.')
        }
    }, [result])

    return (
        <div onSubmit={e => e.preventDefault()} className='loginPage' style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', width: windowSize.width && windowSize.width > 900 ? '70%' : '100%'}}>
            <form style={{display: 'flex', position: 'relative', flexDirection: 'column', alignItems:'center', width: '80%', maxWidth: '350px', margin: 'auto auto', gap: '12px'}}>
                <Image src='/images/logo/logo.png' alt='First Pick Fit Logo' height='64' width='64'/>
                <h2 style={{color: 'var(--oxford-blue)'}}>Welcome Back</h2>
                <h3 style={{textAlign: 'center'}}> Reach your fitness goals.</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <label htmlFor="email">Email</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="email" id='email' value={userInfo.email} placeholder='Enter your email' onChange={ev => (setUserInfo( { ...userInfo, email: ev.currentTarget.value }), setErrorMessage(''))}/>
                </div>
                {!forgotPasswordMode &&
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}>
                    <label htmlFor="password">Password</label>
                    <input style={{padding: '10px 15px', borderRadius: '5px', border: '1px var(--charcoal) solid'}} type="password" id='password' value={userInfo.password} placeholder='*******' onChange={ev => (setUserInfo( { ...userInfo, password: ev.currentTarget.value }), setErrorMessage(''))}/>
                </div>}
                {!forgotPasswordMode &&
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px', width: '100%'}}>
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">
                            Remember me
                        </label>
                    </span>
                    <span onClick={() => (setForgotPasswordMode(true), setErrorMessage(''))} style={{minWidth: 'fit-content', fontWeight: 'bold', color: 'var(--oxford-blue)', cursor: 'pointer'}}>Forgot Password?</span>
                </div>}
                {!forgotPasswordMode &&
                <button type='submit' style={{padding: '10px 0px', width: '100%', backgroundColor: 'var(--oxford-blue)', borderRadius: '5px', color: 'white', fontWeight: 'bold',}} onClick={() => signInWithEmailAndPassword({ auth, email: userInfo.email, password: userInfo.password })}> Sign In</button>
                }
                {!forgotPasswordMode &&
                <button type='submit' style={{padding: '10px 0px', border: '1px var(--charcoal) solid', fontWeight: 'bold', width: '100%', color: 'var(--oxford-blue)', borderRadius: '5px', backgroundColor: 'white'}} onClick={() => signInWithEmailAndPassword({ auth, email: 'guest@gmail.com', password: '101010' })}> Use Guest Account</button>
                }
                {!forgotPasswordMode &&
                <button onClick={() => signInWithRedirect(auth, googleProvider)} style={{display: 'flex', fontWeight: 'bold', justifyContent: 'center', gap: '10px', backgroundColor: 'white', border: '1px var(--charcoal) solid', alignItems: 'center', padding: '10px 0px', width: '100%', borderRadius: '5px', color: 'var(--oxford-blue)'}} type='button'> 
                    <Image style={{}} src='/images/icons/google.png' alt='Google' height='15' width='15'/>
                    Sign In with Google
                </button> 
                }
                {forgotPasswordMode &&
                <button type='submit' style={{fontWeight: 'bold', padding: '10px 0px', width: '100%', backgroundColor: 'var(--oxford-blue)', borderRadius: '5px', color: 'white'}} onClick={() => (sendPasswordResetEmail(auth, userInfo.email), setErrorMessage('If an account is associated with this email, you\'ll receive an email to reset your password.') )}> Send Password Reset Link</button>
                }
                {forgotPasswordMode &&
                <button onClick={() => (setForgotPasswordMode(false), setErrorMessage(''))} style={{display: 'flex', fontWeight: 'bold', justifyContent: 'center', gap: '10px', backgroundColor: 'white', border: '1px var(--charcoal) solid', alignItems: 'center', padding: '10px 0px', width: '100%', borderRadius: '5px', color: 'var(--oxford-blue)'}} type='button'> 
                    Go Back to Login Page
                </button>
                }
                <div style={{width: '100%'}}>
                    Not registered yet? <span style={{color: 'var(--oxford-blue)', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => changeAuthStage()}> Create an Account </span>
                </div>
                {errorMessage !== '' && <span style={{position: 'absolute', color: '#d73b3e ', fontSize: '13px', bottom: forgotPasswordMode ? '-40px' : '-25px', left: 0}}> {errorMessage} </span>}
            </form>
            <div style={{margin: 'auto auto', fontSize: '0.8rem'}}>
                &copy;2023 Enzo All Rights Reserved.
            </div>
        </div>
    )
}