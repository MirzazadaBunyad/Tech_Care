import axios from "axios";
import { useEffect, useState } from "react";

function DiagnosticList() {
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

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    const diagnos = fetchedData[3].diagnostic_list;

    return <div className="my-[32px] flex flex-col gap-[32px] bg-white rounded-[16px] ml-3">
        <h2 className="font-[Manrope] font-extrabold text-[24px] m-[20px]">Diagnostic List</h2>
        <div className="ml-[16px] w-full">
            <div className="flex justify-between items-center py-[15px] pl-[15px]">
                <span className="w-[30%] font-bold text-[14px] font-[Manrope] text-left">Problem/Diagnosis</span>
                <span className="w-[55%] font-bold text-[14px] font-[Manrope] text-left">Description</span>
                <span className="w-[15%] font-bold text-[14px] font-[Manrope] text-left">Status</span>
            </div>
            <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                {diagnos.map((diagnosis, index) => (
                    <div key={index} className="flex justify-between items-center pr-[23px] pl-[15px]">
                        <span className="w-[30%] py-[20px] text-[14px] font-[Manrope] text-left">{diagnosis.name}</span>
                        <span className="w-[55%] py-[20px] text-[14px] font-[Manrope] text-left">{diagnosis.description}</span>
                        <span className="w-[15%] py-[20px] text-[14px] font-[Manrope] text-left">{diagnosis.status}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>;
}
export default DiagnosticList;