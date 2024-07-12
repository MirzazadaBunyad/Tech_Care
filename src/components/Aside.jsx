import SearchLogo from "../../public/assets/search.png";
import Emily from "../../public/assets/Emily.png";
import MoreHoriz from "../../public/assets/more_horizontal.png";
import Ryhan from "../../public/assets/Ryhan.png";
import Brandon from "../../public/assets/Brandon.png";
import Jessica from "../../public/assets/Jessica.png";
import Samantha from "../../public/assets/Samantha.png";
import { useEffect, useState } from "react";
import axios from "axios";

function Aside() {

    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = 'coalition';
                const password = 'skills-test';
                const auth = btoa(`${username}:${password}`);
                const response = await axios.get("https://fedskillstest.coalitiontechnologies.workers.dev", {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                });
                setFetchedData(response.data);
            } catch (error) {
                setError(error);
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
                <h2 className="font-extrabold text-[24px]">Patients</h2>
                <button className="w-[18px] h-[18px]">
                    <img className="w-full h-full" src={SearchLogo} alt="Search" />
                </button>
            </div>
            <div className="flex flex-col gap-[32px] mt-[20px] max-h-full overflow-y-auto custom-scrollbar">
                {names.map((name, index) => (
                    <div key={index} className="flex justify-between mx-[20px] items-center">
                        <div className="flex w-full gap-[12px] items-center">
                            <div className="w-[48px] h-[48px]">
                                {profilePhotos[index] ? <img className="w-full h-full object-cover" src={profilePhotos[index]} alt="Profile" /> : "No Image"}
                            </div>
                            <div className="flex w-full gap-[12px] justify-between items-center">
                                <div>
                                    <h2 className="font-bold text-[14px]">{name}</h2>
                                    <h4 className="font-normal text-[14px] text-[#707070]">{gender[index]}, {age[index]}</h4>
                                </div>
                                <button>
                                    <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="More options" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="flex justify-between mx-[20px] items-center">
                    <div className="flex w-full gap-[12px] items-center">
                        <div className="w-[48px] h-[48px]">
                            <img className="w-full" src={Emily} alt="Emily" />
                        </div>
                        <div className="flex w-full gap-[12px] justify-between items-center">
                            <div>
                                <h2 className="font-bold text-[14px]">Emily Williams</h2>
                                <h4 className="font-normal text-[14px] text-[#707070]">Female, 18</h4>
                            </div>
                            <button>
                                <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="" />
                            </button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex justify-between mx-[20px] items-center">
                    <div className="flex w-full gap-[12px] items-center">
                        <div className="w-[48px] h-[48px]">
                            <img className="w-full" src={Ryhan} alt="Emily" />
                        </div>
                        <div className="flex w-full gap-[12px] justify-between items-center">
                            <div>
                                <h2 className="font-bold text-[14px]">Ryan Johnson</h2>
                                <h4 className="font-normal text-[14px] text-[#707070]">Male, 45</h4>
                            </div>
                            <button>
                                <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="" />
                            </button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex justify-between mx-[20px] items-center">
                    <div className="flex w-full gap-[12px] items-center">
                        <div className="w-[48px] h-[48px]">
                            <img className="w-full" src={Brandon} alt="Emily" />
                        </div>
                        <div className="flex w-full gap-[12px] justify-between items-center">
                            <div>
                                <h2 className="font-bold text-[14px]">Brandon Mitchell</h2>
                                <h4 className="font-normal text-[14px] text-[#707070]">Male, 36</h4>
                            </div>
                            <button>
                                <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="" />
                            </button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="bg-[#D8FCF7] w-full h-full">
                    <div className="flex justify-between mx-[20px] py-[16px] items-center">
                        <div className="flex w-full gap-[12px] items-center">
                            <div className="w-[48px] h-[48px]">
                                <img className="w-full" src={Jessica} alt="Emily" />
                            </div>
                            <div className="flex w-full gap-[12px] justify-between items-center">
                                <div>
                                    <h2 className="font-bold text-[14px]">Jessica Taylor</h2>
                                    <h4 className="font-normal text-[14px] text-[#707070]">Female, 28</h4>
                                </div>
                                <button>
                                    <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex justify-between mx-[20px] items-center">
                    <div className="flex w-full gap-[12px] items-center">
                        <div className="w-[48px] h-[48px]">
                            <img className="w-full" src={Samantha} alt="Emily" />
                        </div>
                        <div className="flex w-full gap-[12px] justify-between items-center">
                            <div>
                                <h2 className="font-bold text-[14px]">Samantha Johnson</h2>
                                <h4 className="font-normal text-[14px] text-[#707070]">Female, 56</h4>
                            </div>
                            <button>
                                <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="" />
                            </button>
                        </div>
                    </div>
                </div> */}
            </div>
        </aside >
    )
}
export default Aside;