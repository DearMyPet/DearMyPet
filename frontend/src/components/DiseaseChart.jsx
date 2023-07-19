import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            color: 'rgba(255, 255, 255, 1)',
            fullSize: true,
            text: '2023',
        },
    },
    scales: {
      x: {
        grid: {
            display: false,
        },
        ticks: {
            color: 'rgba(255, 255, 255, 5)',
        },
      },
      y: {
        grid: {
            display: false,
        },
        ticks: {
            display: false,
        },
      },
    },
    layout: {
        padding: {
            top: 10,
            bottom: 10,
        },
    },
};

const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const data = {
    labels,
    datasets: [
        {
            barPercentage: 1,
            barThickness: 8,
            backgroundColor: [
                'rgba(80, 140, 233, 1)',
                'rgba(236, 92, 104, 1)',
                'rgba(239, 165, 68, 1)',
                // 'rgba(23, 197, 61, 1)'
            ],
            borderRadius: 20,
            borderSkipped: false,
            data: [3,2,3,1,5,2,7,9,0,3,2,4],
        }
    ],
  };

const DiseaseChart = () => {
    return(
        <div className="chartContainer">
            <Bar options={options} data={data} /> 
        </div>
    )
}

export default DiseaseChart;