import { useDispatch, useSelector } from 'react-redux';
import { setClickedOnButton, setSearchedItems, userSlice } from '../../redux/features/user/userSlice';
import styles from './Search.module.css';
import { RootState } from '../../store';

const Search = ({ pathname }: { pathname: string}) => {
    const dispatch = useDispatch();
    const { search, hideSearchBar } = useSelector((state: RootState) => state[userSlice.name])

    return(
    <div className={styles.searchItemNameAndButton} style={{justifyContent: 'space-between', userSelect: 'none', display: !hideSearchBar ? 'flex' : 'none'}}>
        <input type="text" placeholder= {'Search' + ' ' + pathname.slice(1)} value={search.value} onChange={e => dispatch(setSearchedItems({ type: pathname, value: e.target.value}))} className='h-8 outline-none' style={{ color: 'var(--charcoal)'}}/>
        {pathname !== '/programs' && 
        <button onClick={() => dispatch(setClickedOnButton(true))} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create {pathname.slice(1, (pathname.length - 1))}
        </button>}
    </div>)
};

export default Search;