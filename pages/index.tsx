import { auth } from '../firebase/clientApp'
import { useEffect } from 'react'
import Router from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'

export default function Home() {
  useEffect(() => {
    auth.currentUser && Router.push('/dashboard')
  }, [])

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