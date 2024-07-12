import axios from "axios";
import { useEffect, useState } from "react";
import BirthIcon from "../../../../public/assets/BirthIcon.png";
import FemaleIcon from "../../../../public/assets/FemaleIcon.png";
import PhoneIcon from "../../../../public/assets/PhoneIcon.png";
import InsuranceIcon from "../../../../public/assets/InsuranceIcon.png";

function Profile() {
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

    const profileData = fetchedData?.[3];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col gap-[32px] mt-[18px]">
            <div className="flex gap-[10px] mt-[32px] flex-col items-center justify-center">
                <img src={profileData?.profile_picture} className="w-[200px] h-[200px]" alt="" />
                <h2 className="font-[Manrope] text-[#072635] font-bold text-[24px] text-center">{profileData?.name}</h2>
            </div>
            <div className="ml-[10px] flex flex-col gap-[24px]">
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={BirthIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="font-[Manrope] text-[#072635] text-[14px]">Date Of Birth</h5>
                        <p className="font-[Manrope] font-bold text-[#072635] text-[14px]">{profileData?.date_of_birth}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={FemaleIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="font-[Manrope] text-[#072635] text-[14px]">Gender</h5>
                        <p className="font-[Manrope] font-bold text-[#072635] text-[14px]">{profileData?.gender}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="font-[Manrope] text-[#072635] text-[14px]">Contact Info.</h5>
                        <p className="font-[Manrope] font-bold text-[#072635] text-[14px]">{profileData?.phone_number}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="font-[Manrope] text-[#072635] text-[14px]">Emergency Contacts</h5>
                        <p className="font-[Manrope] font-bold text-[#072635] text-[14px]">{profileData?.emergency_contact}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={InsuranceIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="font-[Manrope] text-[#072635] text-[14px]">Insurance Provider</h5>
                        <p className="font-[Manrope] font-bold text-[#072635] text-[14px]">{profileData?.insurance_type}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="px-[40px] py-[11px] bg-[#01F0D0] rounded-[41px] text-[14px] font-[Manrope] font-bold">Show All Information</button>
            </div>
        </div>
    )
}
export default Profile;