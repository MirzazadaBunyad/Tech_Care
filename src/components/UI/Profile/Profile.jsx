import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from '../../../ReduxToolkit/Features/dataSlice';
import BirthIcon from "../../../../public/assets/BirthIcon.png";
import FemaleIcon from "../../../../public/assets/FemaleIcon.png";
import PhoneIcon from "../../../../public/assets/PhoneIcon.png";
import InsuranceIcon from "../../../../public/assets/InsuranceIcon.png";

function Profile() {
    const dispatch = useDispatch();
    const { fetchedData, error } = useSelector((state) => state.data.profile);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-[32px] mt-[18px] bg-[#FFFFFF] rounded-[16px]">
            <div className="flex gap-[10px] mt-[32px] flex-col items-center justify-center">
                <img src={fetchedData.profile_picture} className="w-[200px] h-[200px]" alt="" />
                <h2 className="font-bold text-[24px] text-center">{fetchedData.name}</h2>
            </div>
            <div className="ml-[20px] flex flex-col gap-[24px]">
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={BirthIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Date Of Birth</h5>
                        <p className="font-bold text-[14px] text-left">{fetchedData.date_of_birth}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={FemaleIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Gender</h5>
                        <p className="font-bold text-[14px] text-left">{fetchedData.gender}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Contact Info.</h5>
                        <p className="font-bold text-[14px] text-left">{fetchedData.phone_number}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Emergency Contacts</h5>
                        <p className="font-bold text-[14px] text-left">{fetchedData.emergency_contact}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={InsuranceIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Insurance Provider</h5>
                        <p className="font-bold text-[14px] text-left">{fetchedData.insurance_type}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-[32px]">
                <button className="px-[40px] py-[11px] bg-[#01F0D0] rounded-[41px] text-[14px] font-bold">Show All Information</button>
            </div>
        </div>
    )
}
export default Profile;
