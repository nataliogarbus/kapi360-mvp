import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StrategicCompassProps {
  score: number; // Un valor numérico de 0 a 100
}

const StrategicCompass: React.FC<StrategicCompassProps> = ({ score }) => {
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#00DD82', '#374151'], // Verde para el score, gris para el resto
        borderColor: ['#00DD82', '#374151'],
        borderWidth: 1,
        circumference: 180, // Media dona
        rotation: 270, // Empezar desde abajo
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default StrategicCompass;
