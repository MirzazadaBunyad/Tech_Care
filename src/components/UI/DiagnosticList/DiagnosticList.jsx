import { useSelector } from "react-redux";

function DiagnosticList() {
    const selectedPatient = useSelector((state) => state.data.selectedPatient);
    const diagnosticList = selectedPatient?.diagnostic_list || [];

    return (
        <div className="flex flex-col gap-[32px] bg-white rounded-[16px] h-full cursor-default">
            <h2 className="font-bold text-[24px] ml-[20px] mt-[20px]">Diagnostic List</h2>
            <div className="mx-[16px] h-full flex flex-col gap-[10px]">
                <div className="flex justify-between items-center  py-[8px] pl-[15px] bg-[#F6F7F8] rounded-[24px]">
                    <span className="w-[30%] font-bold text-[14px] text-left">Problem/Diagnosis</span>
                    <span className="w-[49%] font-bold text-[14px] text-left">Description</span>
                    <span className="w-[18%] font-bold text-[14px] text-left">Status</span>
                </div>
                <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                    {diagnosticList.map((diagnosis, index) => (
                        <div key={index} className="flex justify-between items-center pr-[23px] pl-[15px]">
                            <span className="w-[30%] py-[10px] text-[14px] text-left">{diagnosis.name}</span>
                            <span className="w-[50%] py-[10px] text-[14px] text-left">{diagnosis.description}</span>
                            <span className="w-[15%] py-[10px] text-[14px] text-left">{diagnosis.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiagnosticList;
