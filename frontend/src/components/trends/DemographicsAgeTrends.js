import React, { useState, useEffect } from 'react';
import '../../style/Description.css';

import DemographicsAgeAngerChart from '../charts/demographics-age/DemographicsAgeAngerChart';
import DemographicsAgeJoyChart from '../charts/demographics-age/DemographicsAgeJoyChart';
import DemographicsAgeFearChart from '../charts/demographics-age/DemographicsAgeFearChart';
import DemographicsAgeSadnessChart from '../charts/demographics-age/DemographicsAgeSadnessChart';

const DemographicsAgeTrends= () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/demographics-age-trend', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  if (isLoading) {
    return <div>
      Loading...
      </div>;
  }

  if (error) {
    return <div>
      Error: {error}</div>;
  }

  return (
    <div>
      <DemographicsAgeAngerChart data={data}/>
      <DemographicsAgeJoyChart data={data}/>
      <DemographicsAgeFearChart data={data}/>
      <DemographicsAgeSadnessChart data={data}/>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mean_Age</th>
            <th>Anger Intensity</th>
            <th>Fear Intensity</th>
            <th>Joy Intensity</th>
            <th>Sadness Intensity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.mean_age}</td>
              <td>{item.anger_trend.toFixed(2)}</td>
              <td>{item.fear_trend.toFixed(2)}</td>
              <td>{item.joy_trend.toFixed(2)}</td>
              <td>{item.sadness_trend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default DemographicsAgeTrends;