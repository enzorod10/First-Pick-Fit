import Head from 'next/head';
import UserPrompt from '../components/UserPrompt/UserPrompt';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Head>
        <title>Dashboard - First Pick Fit</title>
        <meta name="description" content="Meta description for the Home page" />
      </Head>
      <UserPrompt />
    </div>
  )
}