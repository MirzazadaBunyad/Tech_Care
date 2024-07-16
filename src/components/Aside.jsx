import SearchLogo from "../../public/assets/search.png";
import MoreHoriz from "../../public/assets/more_horizontal.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, selectPatient } from '../ReduxToolkit/Features/dataSlice';
import DiagnosticHistory from './UI/DiagnosticHistory/DiagnosticHistory';

function Aside() {
    const dispatch = useDispatch();
    const { fetchedData, error } = useSelector((state) => state.data.patients);
    const { selectedPatient } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const names = fetchedData ? fetchedData.map(person => person.name) : [];

    const handleClick = (index) => {
        const selectedPatient = fetchedData[index];
        dispatch(selectPatient(selectedPatient));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    return (
        <aside className="bg-white mt-[32px] w-[20%] rounded-[16px] h-[1010px] overflow-hidden">
            <div className="flex justify-between px-[20px] pt-[20px] items-center">
                <h2 className="font-bold text-[24px] text-left">Patients</h2>
                <button className="w-[18px] h-[18px]">
                    <img className="w-full h-full" src={SearchLogo} alt="Search" />
                </button>
            </div>
            <div className="flex flex-col gap-[16px] mt-[20px] max-h-full overflow-y-auto custom-scrollbar">
                {names.map((name, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`flex justify-between p-[16px] cursor-pointer items-center ${index === 3 ? 'bg-[#D8FCF7]' : ''}`}
                    >
                        <div className="flex w-full gap-[12px] items-center">
                            <div className="w-[48px] h-[48px]">
                                {fetchedData[index].profile_picture ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={fetchedData[index].profile_picture}
                                        alt="Profile"
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </div>
                            <div className="flex w-full gap-[12px] justify-between items-center">
                                <div>
                                    <h2 className="font-bold text-[14px] text-left">{name}</h2>
                                    <h4 className="text-[14px] text-[#707070] text-left">
                                        {fetchedData[index].gender}, {fetchedData[index].age}
                                    </h4>
                                </div>
                                <button>
                                    <img
                                        src={MoreHoriz}
                                        className="w-[18px] h-[4px]"
                                        alt="More options"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPatient && <DiagnosticHistory selectedPatient={console.log(selectedPatient)} />}
        </aside>
    );
}

export default Aside;
