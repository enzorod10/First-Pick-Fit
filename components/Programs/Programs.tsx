import styles from './Programs.module.css';
import Program from '../../interfaces/Program';
import { useEffect, useState } from 'react';
import SelectedProgram from './SelectedProgram';
import { setHideSearchBar, userSlice } from '../../redux/features/user/userSlice'
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const Programs = ({ data, userId, windowSize }: { data: Program[], userId: string | undefined, windowSize: { width: number | undefined, height: number | undefined } }) => {

    const [selectedProgram, setSelectedProgram] = useState<null | Program>(null);
    const [searchedPrograms, setSearchedPrograms] = useState<Program[]>([]);
    const { search } = useSelector((state: RootState) => state[userSlice.name]);
    const dispatch = useDispatch();
    

    // utilized to add program in dev
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
            <div className={styles.innerContainer}>
                {(search.value.trim() === '' || (windowSize.width && windowSize.width >= 1000)) ? data?.map((program: Program) => {
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
        <SelectedProgram windowSize={windowSize} program={selectedProgram} changeSelectedProgram={changeSelectedProgram} userId={userId}/>
};

export default Programs;