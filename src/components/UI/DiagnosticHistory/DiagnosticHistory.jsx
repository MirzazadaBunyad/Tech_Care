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
import ArrowUp from "../../../../public/assets/ArrowUp.svg";
import ArrowDown from "../../../../public/assets/ArrowDown.svg";
import RespiratoryRate from "../../../../public/assets/RespiratoryRate.svg";
import Temperature from "../../../../public/assets/temperature.svg";
import HeartBPM from "../../../../public/assets/HeartBPM.svg";

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
    const [clickedSystolicValue, setClickedSystolicValue] = useState(null);
    const [clickedDiastolicValue, setClickedDiastolicValue] = useState(null);
    const [systolicLevels, setSystolicLevels] = useState([]);
    const [diastolicLevels, setDiastolicLevels] = useState([]);
    const [respiratoryRateValue, setRespiratoryRateValue] = useState(null);
    const [respiratoryRateLevels, setRespiratoryRateLevels] = useState([]);
    const [temperatureValue, setTemperatureValue] = useState(null);
    const [temperatureLevels, setTemperatureLevels] = useState([]);
    const [heartRateValue, setHeartRateValue] = useState(null);
    const [heartRateLevels, setHeartRateLevels] = useState([]);

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
        if (!fetchedData) return;
        const diagnosisHistory = fetchedData[3].diagnosis_history.slice(0, 6).reverse();
        const systolicValues = diagnosisHistory.map(record => record.blood_pressure.systolic.value);
        const diastolicValues = diagnosisHistory.map(record => record.blood_pressure.diastolic.value);
        const systolicLevels = diagnosisHistory.map(record => record.blood_pressure.systolic.levels);
        const diastolicLevels = diagnosisHistory.map(record => record.blood_pressure.diastolic.levels);

        if (systolicValues.length > 0) {
            setClickedSystolicValue(systolicValues[0]);
            setSystolicLevels(systolicLevels[0]);
            setClickedDiastolicValue(diastolicValues[0]);
            setDiastolicLevels(diastolicLevels[0]);
            setRespiratoryRateValue(diagnosisHistory[0].respiratory_rate.value);
            setRespiratoryRateLevels(diagnosisHistory[0].respiratory_rate.levels);
            setTemperatureValue(diagnosisHistory[0].temperature.value);
            setTemperatureLevels(diagnosisHistory[0].temperature.levels);
            setHeartRateValue(diagnosisHistory[0].heart_rate.value);
            setHeartRateLevels(diagnosisHistory[0].heart_rate.levels);
        }
    }, [fetchedData]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!fetchedData) {
        return <div>Loading...</div>;
    }

    const diagnosisHistory = fetchedData[3].diagnosis_history.slice(0, 6).reverse();
    const diastolicValues = diagnosisHistory.map(record => record.blood_pressure.diastolic.value);

    const formatMonth = (month, year) => {
        const date = parse(`${month} ${year}`, 'MMMM yyyy', new Date());
        return format(date, 'MMM, yyyy');
    };

    const labels = diagnosisHistory.map(record => formatMonth(record.month, record.year));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Systolic',
                data: diagnosisHistory.map(record => record.blood_pressure.systolic.value),
                backgroundColor: 'transparent',
                borderColor: '#E66FD2',
                pointBackgroundColor: '#C26EB4',
                pointBorderWidth: 6,
                tension: 0.5
            },
            {
                label: 'Diastolic',
                data: diastolicValues,
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
                    const diagnosisHistory = response.data[3].diagnosis_history.slice(0, 6).reverse();

                    if (datasetIndex === 0) { // Systolic
                        const systolicRecord = diagnosisHistory.find(record => record.blood_pressure.systolic.value === value);
                        if (systolicRecord) {
                            setClickedSystolicValue(value);
                            setSystolicLevels(systolicRecord.blood_pressure.systolic.levels);
                            setRespiratoryRateValue(systolicRecord.respiratory_rate.value);
                            setRespiratoryRateLevels(systolicRecord.respiratory_rate.levels);
                            setTemperatureValue(systolicRecord.temperature.value);
                            setTemperatureLevels(systolicRecord.temperature.levels);
                            setHeartRateValue(systolicRecord.heart_rate.value);
                            setHeartRateLevels(systolicRecord.heart_rate.levels);
                        } else {
                            setClickedSystolicValue(null);
                            setSystolicLevels([]);
                            setRespiratoryRateValue(null);
                            setRespiratoryRateLevels([]);
                            setTemperatureValue(null);
                            setTemperatureLevels([]);
                            setHeartRateValue(null);
                            setHeartRateLevels([]);
                        }
                    } else if (datasetIndex === 1) { // Diastolic
                        const diastolicRecord = diagnosisHistory.find(record => record.blood_pressure.diastolic.value === value);
                        if (diastolicRecord) {
                            setClickedDiastolicValue(value);
                            setDiastolicLevels(diastolicRecord.blood_pressure.diastolic.levels);
                            setRespiratoryRateValue(diastolicRecord.respiratory_rate.value);
                            setRespiratoryRateLevels(diastolicRecord.respiratory_rate.levels);
                            setTemperatureValue(diastolicRecord.temperature.value);
                            setTemperatureLevels(diastolicRecord.temperature.levels);
                            setHeartRateValue(diastolicRecord.heart_rate.value);
                            setHeartRateLevels(diastolicRecord.heart_rate.levels);
                        } else {
                            setClickedDiastolicValue(null);
                            setDiastolicLevels([]);
                            setRespiratoryRateValue(null);
                            setRespiratoryRateLevels([]);
                            setTemperatureValue(null);
                            setTemperatureLevels([]);
                            setHeartRateValue(null);
                            setHeartRateLevels([]);
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
        <div className="mt-[32px] flex flex-col bg-white rounded-[16px]">
            <div>
                <h1 className="font-[Manrope] font-extrabold text-[24px] m-[20px]">Diagnosis History</h1>
                <div className="flex flex-col gap-[20px]">
                    <div className="bg-[#F4F0FE] flex gap-[32px] ml-[20px] rounded-[12px]">
                        <div className="w-[70%] h-[300px] flex flex-col">
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
                                    <p className="font-[Manrope] font-bold text-[22px] text-[#072635]">{clickedSystolicValue !== null ? clickedSystolicValue : 'Click a systolic point to see the value'}</p>
                                    <p className="font-[Manrope] text-[14px] flex gap-[8px]">
                                        <img src={ArrowUp} alt="" />
                                        {systolicLevels !== null ? systolicLevels : 'Click a systolic point to see the levels'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                                <div className="flex gap-[4px] items-center">
                                    <div className="bg-[#8C6FE6] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                                    <h3>Diastolic</h3>
                                </div>
                                <div>
                                    <p className="font-[Manrope] font-bold text-[22px] text-[#072635]">{clickedDiastolicValue !== null ? clickedDiastolicValue : 'Click a diastolic point to see the value'}</p>
                                    <p className="font-[Manrope] text-[14px] flex gap-[8px]">
                                        <img src={ArrowDown} alt="" />
                                        {diastolicLevels !== null ? diastolicLevels : 'Click a diastolic point to see the levels'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-[21px] w-full">
                        <div className="bg-[#E0F3FA] w-1/3 ml-[20px] flex flex-col p-[20px] rounded-[12px]">
                            <div className=" w-[96px] h-[96px]">
                                <img className="w-full h-full" src={RespiratoryRate} alt="Respiratory Rate" />
                            </div>
                            <div className="flex flex-col gap-[17px]">
                                <div>
                                    <h3 className="font-[Manrope] text-left font-medium text-[16px] text-[#072635]">Respiratory Rate</h3>
                                    <p className="font-[Manrope] font-extrabold text-[#072635] text-left text-[30px]">{respiratoryRateValue !== null ? respiratoryRateValue : 'Click a point to see the respiratory rate'} bpm</p>
                                </div>
                                <div>
                                    <p>{respiratoryRateLevels !== null ? respiratoryRateLevels : 'Click a point to see the levels'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#FFE6E9] w-1/3 flex flex-col p-[20px] rounded-[12px]">
                            <div className=" w-[96px] h-[96px]">
                                <img className="w-full h-full" src={Temperature} alt="Respiratory Rate" />
                            </div>
                            <div className="flex flex-col gap-[17px]">
                                <div>
                                    <h3 className="font-[Manrope] text-left font-medium text-[16px] text-[#072635]">Temperature</h3>
                                    <p className="font-[Manrope] font-extrabold text-[#072635] text-left text-[30px]">{temperatureValue !== null ? temperatureValue : 'Click a point to see the respiratory rate'}°F</p>
                                </div>
                                <div>
                                    <p>{temperatureLevels !== null ? temperatureLevels : 'Click a point to see the levels'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#FFE6F1] w-1/3 flex flex-col p-[20px] rounded-[12px]">
                            <div className=" w-[96px] h-[96px]">
                                <img className="w-full h-full" src={HeartBPM} alt="Respiratory Rate" />
                            </div>
                            <div className="flex flex-col gap-[17px]">
                                <div>
                                    <h3 className="font-[Manrope] text-left font-medium text-[16px] text-[#072635]">Heart Rate</h3>
                                    <p className="font-[Manrope] font-extrabold text-[#072635] text-left text-[30px]">{heartRateValue !== null ? heartRateValue : 'Click a point to see the respiratory rate'} bpm</p>
                                </div>
                                <div>
                                    <p>{heartRateLevels !== null ? heartRateLevels : 'Click a point to see the levels'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default DiagnosticHistory;
