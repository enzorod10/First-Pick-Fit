import Image from 'next/image'
import { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

const AuthPage = ({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) => {
    const [authStage, setAuthStage] = useState('login')

    const changeAuthStage = () => {
        authStage === 'login' ? setAuthStage('signup') : setAuthStage('login');
    }

    return(
        <div className='container' style={{display: 'flex', height: '100%', position: 'fixed', width: '100%', left: 0}}>
            {windowSize.width && windowSize.width > 900 &&
            <div style={{width: '100%', position: 'relative'}}> 
                <div style={{ userSelect: 'none', zIndex: '2', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60%', position: 'relative', width: '100%'}}>
                    <h2 style={{color: 'var(--oxford-blue)', fontSize: '3.5vmax', textShadow: '1px 1px 3px var(--charcoal)'}}>
                        Keep Track of Everything
                    </h2>
                    <h2 style={{ color: 'var(--charcoal)', textShadow: '1px 1px 3px var(--charcoal)', fontSize: '3vmax', fontWeight: 'bold', zIndex: '2', position: 'relative'}}>
                        <Typewriter
                            words={['Workouts', 'Exercises', 'Sets', 'Reps']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={100}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </h2>
                </div>
                <Image src='/images/backgroundPhoto.jpg' style={{objectFit: 'cover', zIndex: '1'}} fill alt='backgroundPhoto'/>
            </div>}
            {authStage === 'login' && <Login windowSize={windowSize} changeAuthStage={changeAuthStage}/>}
            {authStage === 'signup' && <Signup windowSize={windowSize} changeAuthStage={changeAuthStage}/>}
        </div>
    )    
}

export default AuthPage;