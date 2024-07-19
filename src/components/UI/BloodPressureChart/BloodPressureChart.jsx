import { Line } from 'react-chartjs-2';
import { parse, format } from 'date-fns';
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

const BloodPressureChart = ({ diagnosisHistory, options }) => {
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

    return <Line className="px-[16px]" data={data} options={options} />;
};

export default BloodPressureChart;
