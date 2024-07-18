import { useSelector } from "react-redux";
import DownloadIcon from "../../../../public/assets/DownloadIcon.png";

function LabResults() {
    const selectedPatient = useSelector((state) => state.data.selectedPatient);
    const labResult = selectedPatient?.lab_results || [];

    return (
        <div className="flex flex-col bg-[#FFF] gap-[16px] rounded-[16px]">
            <h2 className="font-bold text-[24px] text-left ml-[20px] mt-[20px]">Lab Results</h2>
            <div className="ml-[20px] flex flex-col gap-[5px] max-h-[220px] overflow-y-auto custom-scrollbar">
                {labResult.map((item, index) => (
                    <div key={index} className="flex gap-[10px] justify-between pl-[16px] py-[10px]">
                        <p className="text-left text-[13px]">{item}</p>
                        <button className="mr-[16px]">
                            <img className="w-[20px] h-[20px]" src={DownloadIcon} alt="Download Icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LabResults;
