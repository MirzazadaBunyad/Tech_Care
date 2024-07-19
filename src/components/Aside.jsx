import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from '../ReduxToolkit/ThunkAPI/AsyncThunk';
import { setSelectedPatient } from '../ReduxToolkit/Features/dataSlice';
import SearchLogo from "../../public/assets/search.png";
import PatientItem from './UI/PatientItem/PatientItem';

const usePatients = () => {
    const dispatch = useDispatch();
    const { fetchedData, error } = useSelector((state) => state.data.patients);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    useEffect(() => {
        if (fetchedData && fetchedData.length > 0) {
            dispatch(setSelectedPatient({ ...fetchedData[0], index: 0 }));
        }
    }, [fetchedData, dispatch]);

    return { fetchedData, error };
};

function Aside() {
    const { fetchedData, error } = usePatients();
    const [selectedIdx, setSelectedIdx] = useState(0);
    const dispatch = useDispatch();

    const handlePatientClick = (index) => {
        setSelectedIdx(index);
        const selectedPatient = { ...fetchedData[index], index };
        dispatch(setSelectedPatient(selectedPatient));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    return (
        <aside className="bg-white mt-[32px] w-[20%] rounded-[16px] h-[100%] overflow-hidden">
            <div className="flex justify-between px-[20px] pt-[20px] items-center">
                <h2 className="font-bold text-[24px] text-left cursor-default">Patients</h2>
                <button className="w-[18px] h-[18px]">
                    <img className="w-full h-full" src={SearchLogo} alt="Search" />
                </button>
            </div>
            <div className="flex flex-col gap-[16px] mt-[20px] h-[980px] overflow-y-auto custom-scrollbar">
                {fetchedData.map((person, index) => (
                    <PatientItem
                        key={index}
                        index={index}
                        name={person.name}
                        profilePhoto={person.profile_picture}
                        gender={person.gender}
                        age={person.age}
                        selectedIdx={selectedIdx}
                        handleClick={handlePatientClick}
                    />
                ))}
            </div>
        </aside>
    );
}

export default Aside;
