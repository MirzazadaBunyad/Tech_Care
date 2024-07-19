import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import RespiratoryRateIcon from '../../../../public/assets/RespiratoryRate.svg';
import TemperatureIcon from '../../../../public/assets/temperature.svg';
import HeartBPMIcon from '../../../../public/assets/HeartBPM.svg';
import ArrowUp from '../../../../public/assets/ArrowUp.svg';
import ArrowDown from '../../../../public/assets/ArrowDown.svg';
import BloodPressureChart from '../BloodPressureChart/BloodPressureChart';
import MetricInfo from '../MetricInfo/MetricInfo';
import MetricCard from '../MetricCard/MetricCard';

const DiagnosticHistory = () => {
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
            <h1 className="font-bold text-[24px] m-[20px] text-left cursor-default">Diagnosis History</h1>
            <div className="flex flex-col gap-[20px]">
                <div className="bg-[#F4F0FE] flex gap-[32px] mx-[20px] rounded-[12px]">
                    <div className="w-[70%] mb-[16px] h-[300px] flex flex-col">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold p-[16px] text-[18px] text-left cursor-default">Blood Pressure</h2>
                            <select className="p-[16px] border-none bg-transparent outline-none">
                                <option value="" className="text-[14px] text-right">Last 6 months</option>
                            </select>
                        </div>
                        <BloodPressureChart diagnosisHistory={diagnosisHistory} options={options} />
                    </div>
                    <div className="w-[30%] flex flex-col gap-[16px] py-[16px] mx-[16px]">
                        <MetricInfo
                            color="#E66FD2"
                            label="Systolic"
                            value={clickedSystolicValue ?? 'Click a systolic point to see the value'}
                            levels={systolicLevels ?? 'Click a systolic point to see the levels'}
                            arrow={ArrowUp}
                        />
                        <MetricInfo
                            color="#8C6FE6"
                            label="Diastolic"
                            value={clickedDiastolicValue ?? 'Click a diastolic point to see the value'}
                            levels={diastolicLevels ?? 'Click a diastolic point to see the levels'}
                            arrow={ArrowDown}
                        />
                    </div>
                </div>
                <div className="flex gap-[21px] w-full px-[20px] pb-[20px]">
                    <MetricCard
                        className="bg-[#E0F3FA]"
                        icon={RespiratoryRateIcon}
                        title="Respiratory Rate"
                        value={respiratoryRateValue ?? 'Click a point to see the respiratory rate'}
                        levels={respiratoryRateLevels ?? 'Click a point to see the levels'}
                    />
                    <MetricCard
                        className="bg-[#FFE6E9]"
                        icon={TemperatureIcon}
                        title="Temperature"
                        value={temperatureValue ?? 'Click a point to see the temperature'}
                        levels={temperatureLevels ?? 'Click a point to see the levels'}
                    />
                    <MetricCard
                        className="bg-[#FFE6F1]"
                        icon={HeartBPMIcon}
                        title="Heart Rate"
                        value={heartRateValue ?? 'Click a point to see the heart rate'}
                        levels={heartRateLevels ?? 'Click a point to see the levels'}
                    />
                </div>
            </div>
        </div>
    );
};

export default DiagnosticHistory;
