import SearchLogo from "../../public/assets/search.png";
import MoreHoriz from "../../public/assets/more_horizontal.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from '../ReduxToolkit/Features/dataSlice';

function Aside() {
    const dispatch = useDispatch();
    const { fetchedData, error } = useSelector((state) => state.data.patients);

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    const names = fetchedData ? fetchedData.map(person => person.name) : [];
    const profilePhotos = fetchedData ? fetchedData.map(person => person.profile_picture) : [];
    const gender = fetchedData ? fetchedData.map(person => person.gender) : [];
    const age = fetchedData ? fetchedData.map(person => person.age) : [];

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
                        className={`flex justify-between p-[16px] items-center ${index === 3 ? 'bg-[#D8FCF7]' : ''}`}
                    >
                        <div className="flex w-full gap-[12px] items-center">
                            <div className="w-[48px] h-[48px]">
                                {profilePhotos[index] ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={profilePhotos[index]}
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
                                        {gender[index]}, {age[index]}
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
        </aside>
    );
}

export default Aside;
