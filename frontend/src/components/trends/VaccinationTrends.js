import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
import VaccinationAngerChart from '../charts/vaccination/VaccinationAngerChart';
import VaccinationFearChart from '../charts/vaccination/VaccinationFearChart';
import VaccinationJoyChart from '../charts/vaccination/VaccinationJoyChart';
import VaccinationSadnessChart from '../charts/vaccination/VaccinationSadnessChart';
const VaccinationTrends = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/vaccination-trend', {
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
      <h1 className='page-header'>Vaccination Trends</h1>
      Loading...
      </div>;
  }

  if (error) {
    return <div>
      <h1 className='page-header'>Vaccination Trends</h1>
      Error: {error}</div>;
  }


return(
  <main>
      <h1 className='page-header'>Vaccination Trend</h1>
      <VaccinationAngerChart data={data}/>
      <VaccinationFearChart data={data}/>
      <VaccinationJoyChart data={data}/>
      <VaccinationSadnessChart data={data}/>
      <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Country ID</th>
            <th>Anger Trend</th>
            <th>Fear Trend</th>
            <th>Joy Trend</th>
            <th>Sadness Trend</th>
            <th>Vaccination Trend</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.country_ID}</td>
              <td>{item.anger_trend.toFixed(2)}</td>
              <td>{item.fear_trend.toFixed(2)}</td>
              <td>{item.joy_trend.toFixed(2)}</td>
              <td>{item.sadness_trend.toFixed(2)}</td>
              <td>{item.total_doses_administered.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>
)
};


export default VaccinationTrends;