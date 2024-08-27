import AuthPage from '../components/AuthPage/AuthPage'
import { useSelector } from "react-redux";
import { userSlice } from "../redux/features/user/userSlice";
import { RootState } from '../store';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';

export default function Home( { windowSize }: { windowSize: { width: number | undefined, height: number | undefined }}) {
  const { loginStatus } = useSelector((state: RootState) => state[userSlice.name])

  const router = useRouter();

  useEffect(() => {
    loginStatus && router.push('/dashboard')
  }, [loginStatus, router])

  return (
    <>
    <Head>
      <title>First Pick Fit</title>
    </Head>
      <AuthPage windowSize={windowSize} />
    </>
  )
}