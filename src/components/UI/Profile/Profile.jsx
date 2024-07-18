import { useSelector } from "react-redux";
import BirthIcon from "../../../../public/assets/BirthIcon.png";
import FemaleIcon from "../../../../public/assets/FemaleIcon.png";
import PhoneIcon from "../../../../public/assets/PhoneIcon.png";
import InsuranceIcon from "../../../../public/assets/InsuranceIcon.png";

function Profile() {
    const selectedPatient = useSelector((state) => state.data.selectedPatient);

    if (!selectedPatient) {
        return <div>Select a patient to view profile</div>;
    }

    return (
        <div className="flex flex-col gap-[32px] mt-[18px] bg-[#FFFFFF] rounded-[16px]">
            <div className="flex gap-[10px] mt-[32px] flex-col items-center justify-center">
                <img src={selectedPatient.profile_picture} className="w-[200px] h-[200px]" alt="" />
                <h2 className="font-bold text-[24px] text-center">{selectedPatient.name}</h2>
            </div>
            <div className="ml-[20px] flex flex-col gap-[24px]">
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={BirthIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Date Of Birth</h5>
                        <p className="font-bold text-[14px] text-left">{selectedPatient.date_of_birth}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={FemaleIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Gender</h5>
                        <p className="font-bold text-[14px] text-left">{selectedPatient.gender}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Contact Info.</h5>
                        <p className="font-bold text-[14px] text-left">{selectedPatient.phone_number}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={PhoneIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Emergency Contacts</h5>
                        <p className="font-bold text-[14px] text-left">{selectedPatient.emergency_contact}</p>
                    </div>
                </div>
                <div className="flex gap-[16px] justify-start items-center">
                    <div>
                        <img src={InsuranceIcon} alt="" />
                    </div>
                    <div className="flex flex-col gap-[4px]">
                        <h5 className="text-[14px] font-medium text-left">Insurance Provider</h5>
                        <p className="font-bold text-[14px] text-left">{selectedPatient.insurance_type}</p>
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
