import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedOnButton, setSearchedItems, userSlice } from '../../redux/features/user/userSlice';
import styles from './Search.module.css';
import { RootState } from '../../store';

const Search = ({ pathname }: { pathname: string}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { search, hideSearchBar } = useSelector((state: RootState) => state[userSlice.name])

    return(
    <div className={styles.searchItemNameAndButton} style={{justifyContent: 'space-between', display: !hideSearchBar ? 'flex' : 'none' }}>
        <input type="text" placeholder= {'Search' + ' ' + pathname.slice(1)} value={search.value} onChange={e => dispatch(setSearchedItems({ type: pathname, value: e.target.value}))} style={{all: 'unset', color: 'var(--charcoal)', fontSize: '0.9rem', width: '100%'}}/>
        <button onClick={() => dispatch(setClickedOnButton(true))} style={{ boxShadow: 'rgba(0, 0, 0, 0.10) 0px 4px 4px 0px', padding: '3px 12px', visibility: ['/exercises', '/workouts'].includes(pathname) ? 'visible' : 'hidden', border: 'none', borderRadius: '5px', color: 'var(--charcoal)', minWidth: 'max-content', textTransform: 'capitalize' }}>New {pathname.slice(1, (pathname.length - 1))}</button>
    </div>)
};

export default Search;