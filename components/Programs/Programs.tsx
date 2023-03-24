import { uid } from 'uid';
import styles from './Programs.module.css';
import Program from '../../interfaces/Program';
import AreaTargeted from '../../interfaces/AreaTargeted';
import AllocatedExercise from '../../interfaces/AllocatedExercise';
import { db } from '../../firebase/clientApp';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import SelectedProgram from './SelectedProgram';
import { setClickedOnButton, setSearchedItems, setHideSearchBar, userSlice } from '../../redux/features/user/userSlice'
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const Programs = ({ data, userId }: { data: Program[], userId: string | undefined }) => {

    const [selectedProgram, setSelectedProgram] = useState<null | Program>(null);
    const [searchedPrograms, setSearchedPrograms] = useState<Program[]>([]);
    const { search } = useSelector((state: RootState) => state[userSlice.name]);
    const dispatch = useDispatch();
    
    const sortUniqueAreas = (exercises: AllocatedExercise[]): AreaTargeted[] => {
        const counts: {[key: string]: {count: number, id: string}} = exercises.reduce((acc: any, curr: any) => {
            curr.areasTargeted && curr.areasTargeted.forEach((areaTargeted: AreaTargeted) => {
                if (areaTargeted.name in acc) {
                acc[areaTargeted.name].count++;
                } else {
                acc[areaTargeted.name] = {count: 1, id: areaTargeted.id};
                }
            });
            return acc;
            }, {});

            const uniqueArr = Object.entries(counts).sort((a, b) => b[1].count - a[1].count).map((item: any) => ({name: item[0], id: item[1].id}));
        
            return uniqueArr;
    }

    // const addButton = async () => {
    //     const newcollection = await setDoc(doc(db, 'program', program.id), program)
    // }


    useEffect(() => {
        if (search.value.trim() !== ''){            
            const tempPrograms = data?.filter(exercise => {
                return exercise.name.toLowerCase().includes(search.value.toLowerCase())
            })
            setSearchedPrograms(tempPrograms)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const changeSelectedProgram = () => {
        dispatch(setHideSearchBar(false));
        setSelectedProgram(null);
    }

    return !selectedProgram ?
        <div className={styles.container}>
            {/* <button onClick={() => addButton()}> Add </button> */}
            {/* <div className={styles.searchProgramNameAndButton} style={{display: 'flex', justifyContent: 'space-between'}}>
                <input type="text" placeholder='Search Programs...' value={search} onChange={e => setSearch(e.target.value)} style={{all: 'unset', color: 'var(--charcoal)', fontSize: '0.9rem', width: '100%' }}/>
            </div> */}
            <div className={styles.innerContainer}>
                {search.value.trim() === '' ? data?.map((program: Program) => {
                    return(
                        <div onClick={() => setSelectedProgram(program)} className={styles.programContainer} key={program.id}>
                            <h3 style={{fontSize: '1rem'}}>
                                {program.name}
                            </h3>
                            <div style={{fontSize: '0.8rem', fontStyle: 'italic'}}>
                                {program.info}
                            </div>
                            <div style={{fontSize: '0.8rem'}}>
                                Duration: {program.duration} weeks
                            </div>
                        </div>
                    )}) : 
                searchedPrograms?.map((program: Program) => {
                return(
                    <div onClick={() => setSelectedProgram(program)} className={styles.programContainer} key={program.id}>
                        <h3 style={{fontSize: '1rem'}}>
                            {program.name}
                        </h3>
                        <div style={{fontSize: '0.8rem', fontStyle: 'italic'}}>
                            {program.info}
                        </div>
                        <div style={{fontSize: '0.8rem'}}>
                            Duration: {program.duration} weeks
                        </div>
                    </div>
                )})}
            </div> 
        </div> :
        <SelectedProgram program={selectedProgram} changeSelectedProgram={changeSelectedProgram} userId={userId}/>
};

export default Programs;