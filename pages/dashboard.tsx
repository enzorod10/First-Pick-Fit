import UserPrompt from '../components/UserPrompt/UserPrompt';
import { useSelector } from 'react-redux';
import { userSlice } from '../redux/features/user/userSlice';
import { RootState } from '../store';
import LoadingIcons from 'react-loading-icons';


export default function Dashboard() {
  const { pageLoadingStatus } = useSelector((state: RootState) => state[userSlice.name])

  return (
    <div className='dashboard'>
      <UserPrompt pageLoadingStatus={pageLoadingStatus}/>
    </div>
  )
}