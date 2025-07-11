import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RatingChart({ data }) {
  const chartData = {
    labels: data.map(entry => entry.contestName),
    datasets: [
      {
        label: 'Rating',
        data: data.map(entry => entry.newRating),
        fill: false,
        borderColor: '#1976d2',
        backgroundColor: '#1976d2',
        tension: 0.2
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      x: { display: false },
      y: { beginAtZero: false }
    }
  };
  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h6" fontWeight={600} mb={2} color="primary.main">Rating History</Typography>
      <Line data={chartData} options={options} height={200} />
    </Paper>
  );
}

export default RatingChart; 