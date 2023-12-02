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
  const [viewType, setViewType] = useState('BRA');



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
      <p className='page-description'>   Explore how the weekly change in reported COVID-19 case numbers affects public sentiment on twitter for each country,</p>
      <div className="view-selector">
        <label>
          <input
            type="radio"
            name="viewType"
            value="BRA"
            checked={viewType === 'BRA'}
            onChange={() => setViewType('BRA')}
          />
          Brazil
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="CAN"
            checked={viewType === 'CAN'}
            onChange={() => setViewType('CAN')}
          />
          Canada
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="FRA"
            checked={viewType === 'FRA'}
            onChange={() => setViewType('FRA')}
          />
          France
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="KOR"
            checked={viewType === 'KOR'}
            onChange={() => setViewType('KOR')}
          />
          South Korea
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="GBR"
            checked={viewType === 'GBR'}
            onChange={() => setViewType('GBR')}
          />
          United Kingdom
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="USA"
            checked={viewType === 'USA'}
            onChange={() => setViewType('USA')}
          />
          United States
        </label>
  
      </div>

      <CovidCasesAngryChart data={data} country={viewType}/>
      <CovidCasesFearChart data={data} country={viewType}/>
      <CovidCasesJoyChart data={data} country={viewType}/>
      <CovidCasesSadnessChart data={data} country={viewType}/>
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