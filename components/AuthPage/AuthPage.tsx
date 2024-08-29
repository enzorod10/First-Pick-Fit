import { useState } from 'react'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

const AuthPage = ({ windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) => {
    const [authStage, setAuthStage] = useState('login')

    const changeAuthStage = () => {
        authStage === 'login' ? setAuthStage('signup') : setAuthStage('login');
    }

    return(
        <div className='mx-auto w-full' style={{height: '100%', position: 'fixed'}}>
            {authStage === 'login' && <Login windowSize={windowSize} changeAuthStage={changeAuthStage}/>}
            {authStage === 'signup' && <Signup windowSize={windowSize} changeAuthStage={changeAuthStage}/>}
        </div>
    )    
}

export default AuthPage;