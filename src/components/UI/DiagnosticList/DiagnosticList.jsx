import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiagnosticList } from '../../../ReduxToolkit/Features/dataSlice';

function DiagnosticList() {
    const dispatch = useDispatch();
    const { fetchedData, error } = useSelector((state) => state.data.diagnostics);

    useEffect(() => {
        dispatch(fetchDiagnosticList());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-[32px] bg-white rounded-[16px]">
            <h2 className="font-bold text-[24px] ml-[20px] mt-[20px]">Diagnostic List</h2>
            <div className="mx-[16px] mb-[16px] flex flex-col gap-[10px]">
                <div className="flex justify-between items-center  py-[8px] pl-[15px] bg-[#F6F7F8] rounded-[24px]">
                    <span className="w-[30%] font-bold text-[14px] text-left">Problem/Diagnosis</span>
                    <span className="w-[49%] font-bold text-[14px] text-left">Description</span>
                    <span className="w-[18%] font-bold text-[14px] text-left">Status</span>
                </div>
                <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                    {fetchedData.map((diagnosis, index) => (
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
