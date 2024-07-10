import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";
import { useEffect } from "react";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

function DiagnosticHistory() {
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get("https://fedskillstest.coalitiontechnologies.workers.dev");
                const dynamicData = response.data;
                console.log(dynamicData);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        };

        fetchImageData();
    }, []);
    const data = {
        labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [120, 115, 160, 110, 150, 160],
                backgroundColor: 'transparent',
                borderColor: '#E66FD2',
                pointBackgroundColor: '#C26EB4',
                pointBorderWidth: 6,
                tension: 0.5
            },
            {
                label: 'Dataset 2',
                data: [110, 65, 110, 90, 70, 75],
                backgroundColor: 'transparent',
                borderColor: '#8C6FE6',
                pointBackgroundColor: '#6EB4C2',
                pointBorderWidth: 6,
                tension: 0.5
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 60,
                max: 180,
                ticks: {
                    stepSize: 20,
                    callback: (value) => value,
                },
                grid: {
                    borderDash: [10],
                }
            }
        }
    };

    return (
        <div className="my-[32px] w-[50%] bg-white rounded-[16px]">
            <h1 className="font-[Manrope] font-extrabold text-[24px] m-[20px]">Diagnosis History</h1>
            <div className="bg-[#F4F0FE] flex gap-[32px] m-[20px]">
                <div className=" w-[70%] h-[300px]  flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="font-[Manrope] outline-none text-[#072635] font-extrabold p-[16px] text-[18px]">Blood Pressure</h2>
                        <select name="" id="" className="p-[16px] border-none bg-transparent">
                            <option value="" className="">Last 6 months</option>
                        </select>
                    </div>
                    <Line className="px-[16px]" data={data} options={options} />
                </div>
                <div className="w-[30%] flex flex-col gap-[8px] py-[16px]">
                    <div>
                        <div className="flex gap-[4px] items-center">
                            <div className="bg-[#E66FD2] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                            <h3>Systolic</h3>
                        </div>
                        <div></div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosticHistory;
