import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';



const VaccinationSadnessChart = ({data, country}) => {

  // Format your data to fit into the chart
  const chartData = {
    labels: data.filter(item => item.country_ID === `${country}`).map(item => item.date), // Assuming 'date' is the property in your data
    datasets: [
      {
        label: 'Vaccination Trend',
        data: data.filter(item => item.country_ID === `${country}`).map(item => item.total_doses_administered), // Assuming 'value' is the float value
        borderColor: 'teal',
        backgroundColor: 'teal',
        yAxisID: 'y'
      },
      {
        label: 'Joy Trend',
        data: data.filter(item => item.country_ID === `${country}`).map(item => item.sadness_trend), // Assuming 'value' is the float value
        borderColor: 'red',
        backgroundColor: 'red',
        yAxisID: 'y1'
      }
    ],
    
  };
  
  const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    stacked: false,
    maintainAspectRatio: false, // Allows custom sizing
    plugins: {
      title: {
        display: true,
        text: 'Vaccination and Emotional Intensity Over Time',
        font: {
          size: 18
        }
      },
      legend: {
        position: 'top', // Adjust legend position
      }


    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          type: 'linear',
          display: true,
          text: 'Vaccination'
        },
        position: 'right',
        id: "y1"
      },
      y1: {
        title: {
            type: 'linear',
            display: true,
            text: 'Sadness Trend'
        },
        position: 'left',
        id: "y"
      }
    }
  };

  return (
    <div style={{ width: '60%', margin: '0 auto' }}>
      <Line data={chartData} options={options} height={400} />
    </div>
  );
};

export default VaccinationSadnessChart;