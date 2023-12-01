import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
import CovidCasesAngryChart from '../charts/covid-cases/CovidCasesAngryChart';
import CovidCasesFearChart from '../charts/covid-cases/CovidCasesFearChart';
import CovidCasesJoyChart from '../charts/covid-cases/CovidCasesJoyChart';
import CovidCasesSadnessChart from '../charts/covid-cases/CovidCasesSadnessChart';
const CovidCasesTrends = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/covid-cases-trend', {
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
      <h1 className='page-header'>Covid Cases Trends</h1>
      Loading...
      </div>;
  }

  if (error) {
    return <div>
      <h1 className='page-header'>Covid Cases Trends</h1>
      Error: {error}</div>;
  }


return(
  <main>
      <h1 className='page-header'>Covid Cases Trends</h1>
      <p className='page-description'>   Explore how the spike and drop of COVID-19 case numbers affects public sentiment on twitter for each country,</p>

      <CovidCasesAngryChart data={data} country={'BRA'}/>
      <CovidCasesFearChart data={data}/>
      <CovidCasesJoyChart data={data}/>
      <CovidCasesSadnessChart data={data}/>
      <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Country ID</th>
            <th>Anger Delta</th>
            <th>Fear Delta</th>
            <th>Joy Delta</th>
            <th>Sadness Delta</th>
            <th>Covid Cases Delta</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.country_ID}</td>
              <td>{item.anger_delta.toFixed(2)}</td>
              <td>{item.fear_delta.toFixed(2)}</td>
              <td>{item.joy_delta.toFixed(2)}</td>
              <td>{item.sadness_delta.toFixed(2)}</td>
              <td>{item.covid_cases_delta.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>
)
};


export default CovidCasesTrends;