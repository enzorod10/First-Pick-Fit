import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/clientApp'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {
  const [user, loading, error] = useAuthState(auth)
  
  useEffect(() => {
    if (user){
      Router.push('/dashboard')
    }
  }, [user])
 

  return (
    <div>
      Home Page 
      <div onClick={() => Router.push('/login')}>
        Log In
      </div>
      <div onClick={() => Router.push('/signup')}>
        Sign Up
      </div>
    </div>
  )
}