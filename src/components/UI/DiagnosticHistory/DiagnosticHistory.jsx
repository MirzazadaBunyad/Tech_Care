import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { parse, format } from 'date-fns';
import { fetchDiagnosticHistory } from '../../../ReduxToolkit/ThunkAPI/AsyncThunk';
import {
    setClickedSystolicValue,
    setClickedDiastolicValue,
    setSystolicLevels,
    setDiastolicLevels,
    setRespiratoryRateValue,
    setRespiratoryRateLevels,
    setTemperatureValue,
    setTemperatureLevels,
    setHeartRateValue,
    setHeartRateLevels,
} from '../../../ReduxToolkit/Features/dataSlice';
import ArrowUp from '../../../../public/assets/ArrowUp.svg';
import ArrowDown from '../../../../public/assets/ArrowDown.svg';
import RespiratoryRate from '../../../../public/assets/RespiratoryRate.svg';
import Temperature from '../../../../public/assets/temperature.svg';
import HeartBPM from '../../../../public/assets/HeartBPM.svg';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
);

const formatMonth = (month, year) => {
    const date = parse(`${month} ${year}`, 'MMMM yyyy', new Date());
    return format(date, 'MMM, yyyy');
};

const DiagnosticHistory = ({ selectedPatient }) => {
    const dispatch = useDispatch();
    const {
        error,
        clickedSystolicValue,
        clickedDiastolicValue,
        systolicLevels,
        diastolicLevels,
        respiratoryRateValue,
        respiratoryRateLevels,
        temperatureValue,
        temperatureLevels,
        heartRateValue,
        heartRateLevels,
    } = useSelector((state) => state.data.diagnosticHistory);

    const selectedPatient = useSelector((state) => state.data.selectedPatient);

    useEffect(() => {
        if (selectedPatient) {
            dispatch(fetchDiagnosticHistory(selectedPatient.id));
        }
    }, [dispatch, selectedPatient]);

    useEffect(() => {
        if (!selectedPatient || !selectedPatient.diagnosis_history) return;

        const diagnosisHistory = selectedPatient.diagnosis_history.slice(0, 6).reverse();

        const initialValues = {
            systolic: diagnosisHistory[0].blood_pressure.systolic.value,
            diastolic: diagnosisHistory[0].blood_pressure.diastolic.value,
            systolicLevels: diagnosisHistory[0].blood_pressure.systolic.levels,
            diastolicLevels: diagnosisHistory[0].blood_pressure.diastolic.levels,
            respiratoryRate: diagnosisHistory[0].respiratory_rate.value,
            respiratoryRateLevels: diagnosisHistory[0].respiratory_rate.levels,
            temperature: diagnosisHistory[0].temperature.value,
            temperatureLevels: diagnosisHistory[0].temperature.levels,
            heartRate: diagnosisHistory[0].heart_rate.value,
            heartRateLevels: diagnosisHistory[0].heart_rate.levels,
        };
        dispatch(setClickedSystolicValue(initialValues.systolic));
        dispatch(setSystolicLevels(initialValues.systolicLevels));
        dispatch(setClickedDiastolicValue(initialValues.diastolic));
        dispatch(setDiastolicLevels(initialValues.diastolicLevels));
        dispatch(setRespiratoryRateValue(initialValues.respiratoryRate));
        dispatch(setRespiratoryRateLevels(initialValues.respiratoryRateLevels));
        dispatch(setTemperatureValue(initialValues.temperature));
        dispatch(setTemperatureLevels(initialValues.temperatureLevels));
        dispatch(setHeartRateValue(initialValues.heartRate));
        dispatch(setHeartRateLevels(initialValues.heartRateLevels));
    }, [selectedPatient, dispatch]);

    if (error) return <div>Error: {error.message}</div>;
    if (!selectedPatient || !selectedPatient.diagnosis_history) return <div>Loading...</div>;

    const diagnosisHistory = selectedPatient.diagnosis_history.slice(0, 6).reverse();
    const labels = diagnosisHistory.map(record => formatMonth(record.month, record.year));
    const systolicValues = diagnosisHistory.map(record => record.blood_pressure.systolic.value);
    const diastolicValues = diagnosisHistory.map(record => record.blood_pressure.diastolic.value);

    const data = {
        labels,
        datasets: [
            {
                label: 'Systolic',
                data: systolicValues,
                backgroundColor: 'transparent',
                borderColor: '#E66FD2',
                pointBackgroundColor: '#C26EB4',
                pointBorderWidth: 6,
                tension: 0.5,
            },
            {
                label: 'Diastolic',
                data: diastolicValues,
                backgroundColor: 'transparent',
                borderColor: '#8C6FE6',
                pointBackgroundColor: '#6EB4C2',
                pointBorderWidth: 6,
                tension: 0.5,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
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
                },
            },
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const chart = elements[0].element.$context.chart;
                const { datasetIndex, index } = elements[0];
                const value = chart.data.datasets[datasetIndex].data[index];

                const record = diagnosisHistory.find((rec) => {
                    if (datasetIndex === 0) {
                        return rec.blood_pressure.systolic.value === value;
                    }
                    return rec.blood_pressure.diastolic.value === value;
                });

                if (record) {
                    if (datasetIndex === 0) {
                        dispatch(setClickedSystolicValue(value));
                        dispatch(setSystolicLevels(record.blood_pressure.systolic.levels));
                    } else {
                        dispatch(setClickedDiastolicValue(value));
                        dispatch(setDiastolicLevels(record.blood_pressure.diastolic.levels));
                    }

                    dispatch(setRespiratoryRateValue(record.respiratory_rate.value));
                    dispatch(setRespiratoryRateLevels(record.respiratory_rate.levels));
                    dispatch(setTemperatureValue(record.temperature.value));
                    dispatch(setTemperatureLevels(record.temperature.levels));
                    dispatch(setHeartRateValue(record.heart_rate.value));
                    dispatch(setHeartRateLevels(record.heart_rate.levels));
                } else {
                    if (datasetIndex === 0) {
                        dispatch(setClickedSystolicValue(null));
                        dispatch(setSystolicLevels([]));
                    } else {
                        dispatch(setClickedDiastolicValue(null));
                        dispatch(setDiastolicLevels([]));
                    }

                    dispatch(setRespiratoryRateValue(null));
                    dispatch(setRespiratoryRateLevels([]));
                    dispatch(setTemperatureValue(null));
                    dispatch(setTemperatureLevels([]));
                    dispatch(setHeartRateValue(null));
                    dispatch(setHeartRateLevels([]));
                }
            }
        },
    };

    return (
        <div className="mt-[32px] flex flex-col bg-white rounded-[16px]">
            <h1 className="font-bold text-[24px] m-[20px] text-left">Diagnosis History</h1>
            <div className="flex flex-col gap-[20px]">
                <div className="bg-[#F4F0FE] flex gap-[32px] mx-[20px] rounded-[12px]">
                    <div className="w-[70%] mb-[16px] h-[300px] flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold p-[16px] text-[18px] text-left">Blood Pressure</h2>
                            <select className="p-[16px] border-none bg-transparent outline-none">
                                <option value="" className="text-[14px] text-right">Last 6 months</option>
                            </select>
                        </div>
                        <Line className="px-[16px]" data={data} options={options} />
                    </div>
                    <div className="w-[30%] flex flex-col gap-[16px] py-[16px] mx-[16px]">
                        <div className="flex flex-col gap-[8px] border-b-[1px] border-b-[#CBC8D4] border-b-w-[200px]">
                            <div className="flex gap-[4px] items-center">
                                <div className="bg-[#E66FD2] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                                <h3 className="text-left text-[14px] font-bold">Systolic</h3>
                            </div>
                            <div>
                                <p className="font-bold text-[22px] text-left">{clickedSystolicValue ?? 'Click a systolic point to see the value'}</p>
                                <p className="text-[14px] flex gap-[8px] pb-[16px]">
                                    <img src={ArrowUp} alt="" />
                                    {systolicLevels ?? 'Click a systolic point to see the levels'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex gap-[4px] items-center">
                                <div className="bg-[#8C6FE6] border-[1px] border-white w-[14px] h-[14px] rounded-[50%]"></div>
                                <h3 className="text-left text-[14px] font-bold">Diastolic</h3>
                            </div>
                            <div>
                                <p className="font-bold text-[22px]">{clickedDiastolicValue ?? 'Click a diastolic point to see the value'}</p>
                                <p className="text-[14px] flex gap-[8px]">
                                    <img src={ArrowDown} alt="" />
                                    {diastolicLevels ?? 'Click a diastolic point to see the levels'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[21px] w-full px-[20px] pb-[20px]">
                    <div className="bg-[#E0F3FA] w-1/3 flex flex-col p-[20px] gap-[16px] rounded-[12px]">
                        <div className=" w-[96px] h-[96px]">
                            <img className="w-full h-full" src={RespiratoryRate} alt="Respiratory Rate" />
                        </div>
                        <div className="flex flex-col gap-[16px]">
                            <div>
                                <h3 className="text-left font-medium text-[16px]">Respiratory Rate</h3>
                                <p className="font-bold text-left text-[30px]">{respiratoryRateValue ?? 'Click a point to see the respiratory rate'} bpm</p>
                            </div>
                            <div>
                                <p className="text-[14px] text-left">{respiratoryRateLevels ?? 'Click a point to see the levels'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#FFE6E9] w-1/3 flex flex-col gap-[16px] p-[20px] rounded-[12px]">
                        <div className=" w-[96px] h-[96px]">
                            <img className="w-full h-full" src={Temperature} alt="Respiratory Rate" />
                        </div>
                        <div className="flex flex-col gap-[17px]">
                            <div>
                                <h3 className="text-left font-medium text-[16px]">Temperature</h3>
                                <p className="font-bold text-left text-[30px]">{temperatureValue ?? 'Click a point to see the temperature'}°F</p>
                            </div>
                            <div>
                                <p className="text-[14px] text-left">{temperatureLevels ?? 'Click a point to see the levels'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#FFE6F1] w-1/3 flex flex-col gap-[16px] p-[20px] rounded-[12px]">
                        <div className=" w-[96px] h-[96px]">
                            <img className="w-full h-full" src={HeartBPM} alt="Heart Rate" />
                        </div>
                        <div className="flex flex-col gap-[17px]">
                            <div>
                                <h3 className="text-left font-medium text-[16px]">Heart Rate</h3>
                                <p className="font-bold text-left text-[30px]">{heartRateValue ?? 'Click a point to see the heart rate'} bpm</p>
                            </div>
                            <div>
                                <p className="text-[14px] text-left">{heartRateLevels ?? 'Click a point to see the levels'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticHistory;