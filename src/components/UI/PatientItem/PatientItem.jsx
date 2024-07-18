import MoreHoriz from "../../../../public/assets/more_horizontal.png";

const PatientItem = ({ index, name, profilePhoto, gender, age, selectedIdx, handleClick }) => (
    <div
        className={`patient-item flex justify-between p-[16px] cursor-pointer items-center ${selectedIdx === index ? 'selected' : ''}`}
        onClick={() => handleClick(index)}
    >
        <div className="flex w-full gap-[12px] items-center">
            <div className="w-[48px] h-[48px]">
                {profilePhoto ? (
                    <img className="w-full h-full object-cover" src={profilePhoto} alt="Profile" />
                ) : (
                    "No Image"
                )}
            </div>
            <div className="flex w-full gap-[12px] justify-between items-center">
                <div>
                    <h2 className="font-bold text-[14px] text-left">{name}</h2>
                    <h4 className="text-[14px] text-[#707070] text-left">{gender}, {age}</h4>
                </div>
                <button>
                    <img src={MoreHoriz} className="w-[18px] h-[4px]" alt="More options" />
                </button>
            </div>
        </div>
    </div>
);

export default PatientItem;
