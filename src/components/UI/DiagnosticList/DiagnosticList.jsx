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

    return <div className="flex flex-col gap-[32px] bg-white rounded-[16px]">
        <h2 className="font-extrabold text-[24px] ml-[20px] mt-[20px]">Diagnostic List</h2>
        <div className="mx-[16px] mb-[16px] flex flex-col gap-[10px]">
            <div className="flex justify-between items-center  py-[8px] pl-[15px] bg-[#F6F7F8] rounded-[24px]">
                <span className="w-[30%] font-bold text-[14px] text-left">Problem/Diagnosis</span>
                <span className="w-[49%] font-bold text-[14px] text-left">Description</span>
                <span className="w-[18%] font-bold text-[14px] text-left">Status</span>
            </div>
            <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                {diagnos.map((diagnosis, index) => (
                    <div key={index} className="flex justify-between items-center pr-[23px] pl-[15px]">
                        <span className="w-[30%] py-[10px] text-[14px] text-left">{diagnosis.name}</span>
                        <span className="w-[50%] py-[10px] text-[14px] text-left">{diagnosis.description}</span>
                        <span className="w-[15%] py-[10px] text-[14px] text-left">{diagnosis.status}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>;
}
export default DiagnosticList;