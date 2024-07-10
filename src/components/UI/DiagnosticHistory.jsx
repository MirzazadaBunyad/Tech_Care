import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { parse, format } from "date-fns";
import ArrowUp from "../../../public/assets/ArrowUp.svg";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

function DiagnosticHistory() {
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(null);
    const [clickedValue, setClickedValue] = useState(null);
    const [systolicLevels, setSystolicLevels] = useState([]);
    const [diastolicLevels, setDiastolicLevels] = useState([]);

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

    useEffect(() => {
        if (!fetchedData) return; // Exit early if fetchedData is null
        const diagnosisHistory = fetchedData[3].diagnosis_history.slice(0, 6);
        const systolicValues = diagnosisHistory.map(record => record.blood_pressure.systolic.value);
        const systolicLevels = diagnosisHistory.map(record => record.blood_pressure.systolic.levels).reverse();
        const diastolicLevels = diagnosisHistory.map(record => record.blood_pressure.diastolic.levels).reverse();
        if (systolicValues.length > 0) {
            setClickedValue(systolicValues[systolicValues.length - 1]);
            setSystolicLevels(systolicLevels[systolicLevels.length - 1]);
            setDiastolicLevels(diastolicLevels[diastolicLevels.length - 1]);
        }
    }, [fetchedData]); // Run this effect whenever fetchedData changes

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    const diagnosisHistory = fetchedData[3].diagnosis_history.slice(0, 6);
    const diastolicValues = diagnosisHistory.map(record => record.blood_pressure.diastolic.value);

    const formatMonth = (month, year) => {
        const date = parse(`${month} ${year}`, 'MMMM yyyy', new Date());
        return format(date, 'MMM, yyyy');
    };

    const labels = diagnosisHistory.map(record => formatMonth(record.month, record.year)).reverse();

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Systolic',
                data: diagnosisHistory.map(record => record.blood_pressure.systolic.value).reverse(),
                backgroundColor: 'transparent',
                borderColor: '#E66FD2',
                pointBackgroundColor: '#C26EB4',
                pointBorderWidth: 6,
                tension: 0.5
            },
            {
                label: 'Diastolic',
                data: diastolicValues.reverse(),
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
            },
            tooltip: {
                enabled: true,
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
        },
        onClick: async (e, elements) => {
            if (elements.length > 0) {
                const chart = elements[0].element.$context.chart;
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                const value = chart.data.datasets[datasetIndex].data[index];

                try {
                    const username = 'coalition';
                    const password = 'skills-test';
                    const auth = btoa(`${username}:${password}`);
                    const response = await axios.get("https://fedskillstest.coalitiontechnologies.workers.dev", {
                        headers: {
                            'Authorization': `Basic ${auth}`
                        }
                    });
                    const diagnosisHistory = response.data[3].diagnosis_history.slice(0, 6);

                    // Handle systolic values and levels
                    if (datasetIndex === 0) {
                        const systolicRecord = diagnosisHistory.find(record => record.blood_pressure.systolic.value === value);
                        if (systolicRecord) {
                            setClickedValue(value);
                            setSystolicLevels(systolicRecord.blood_pressure.systolic.levels);
                        } else {
                            setClickedValue(null);
                            setSystolicLevels([]);
                        }
                    }

                    // Handle diastolic values and levels
                    if (datasetIndex === 1) {
                        const diastolicRecord = diagnosisHistory.find(record => record.blood_pressure.diastolic.value === value);
                        if (diastolicRecord) {
                            setClickedValue(value);
                            setDiastolicLevels(diastolicRecord.blood_pressure.diastolic.levels);
                        } else {
                            setClickedValue(null);
                            setDiastolicLevels([]);
                        }
                    }

                } catch (error) {
                    setError(error);
                    console.error("Error fetching data:", error);
                }
            }
        }
    };

    return (
        <div className="my-[32px] w-[50%] bg-white rounded-[16px]">
            <h1 className="font-[Manrope] font-extrabold text-[24px] m-[20px]">Diagnosis History</h1>
            <div className="bg-[#F4F0FE] flex gap-[32px] m-[20px] rounded-[12px]">
                <div className=" w-[70%] h-[300px] flex flex-col">
                    <div className="flex justify-between items-center">
                        <h2 className="font-[Manrope] outline-none text-[#072635] font-extrabold p-[16px] text-[18px]">Blood Pressure</h2>
                        <select name="" id="" className="p-[16px] border-none bg-transparent">
                            <option value="" className="">Last 6 months</option>
                        </select>
                    </div>
                    <Line className="px-[16px]" data={data} options={options} />
                </div>
                <div className="w-[30%] flex flex-col gap-[33px] py-[16px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex gap-[4px] items-center">
                            <div className="bg-[#E66FD2] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                            <h3>Systolic</h3>
                        </div>
                        <div>
                            <p className="font-[Manrope] font-bold text-[22px] text-[#072635]">{clickedValue !== null ? clickedValue : 'Click a systolic point to see the value'}</p>
                            <p className="font-[Manrope] text-[14px] flex gap-[8px]">
                                <img src={ArrowUp} alt="" />
                                {systolicLevels !== null ? systolicLevels : 'Click a systolic point to see the value'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-[4px] items-center">
                            <div className="bg-[#8C6FE6] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                            <h3>Diastolic</h3>
                        </div>
                        <div>
                            <p className="font-[Manrope] font-bold text-[22px] text-[#072635]">{clickedValue !== null ? clickedValue : 'Click a systolic point to see the value'}</p>
                            <p className="font-[Manrope] text-[14px] flex gap-[8px]">
                                <img src={ArrowUp} alt="" />
                                {diastolicLevels !== null ? diastolicLevels : 'Click a systolic point to see the value'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosticHistory;
