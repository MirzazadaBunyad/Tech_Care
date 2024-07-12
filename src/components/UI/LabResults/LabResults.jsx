import axios from "axios";
import { useEffect, useState } from "react";
import DownloadIcon from "../../../../public/assets/DownloadIcon.png";

function LabResults() {
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

    const labResData = fetchedData?.[3]?.lab_results;

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="flex flex-col bg-[#FFF] gap-[16px] rounded-[16px]">
            <h2 className="text-[#072635] font-bold text-[24px] ml-[20px] mt-[20px]">Lab Results</h2>
            <div className="ml-[20px] flex flex-col gap-[5px] max-h-[220px] overflow-y-auto custom-scrollbar">
                {labResData.map((item, index) => (
                    <div key={index} className="flex gap-[10px] justify-between pl-[16px] py-[10px]">
                        <p className="text-left text-[#072635] text-[13px]">{item}</p>
                        <button className="mr-[16px]">
                            <img className="w-[20px] h-[20px]" src={DownloadIcon} alt="Download Icon" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default LabResults;