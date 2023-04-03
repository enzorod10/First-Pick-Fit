import UserPrompt from '../components/UserPrompt/UserPrompt';
import { useSelector } from 'react-redux';
import { userSlice } from '../redux/features/user/userSlice';
import { RootState } from '../store';
import LoadingIcons from 'react-loading-icons';
import Head from 'next/head';


export default function Dashboard() {
  const { pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])

  return (
    <>
    <Head>
      <title>
        Dashboard
      </title>
    </Head>
      <div className='dashboard'>
        <UserPrompt pageLoadingStatus={pageLoadingStatus}/>
      </div>
    </>
  )
}