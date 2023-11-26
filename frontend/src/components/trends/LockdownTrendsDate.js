import React, { useState, useEffect } from 'react';
import '../../style/Description.css';
import LockdownDateAngryChart from '../charts/lockdown-date/LockdownDateAngryChart';
import LockdownDateJoyChart from '../charts/lockdown-date/LockdownDateJoyChart';
import LockdownDateFearChart from '../charts/lockdown-date/LockdownDateFearChart';
import LockdownDateSadnessChart from '../charts/lockdown-date/LockdownDateSadnessChart';





const LockdownTrendsDate= () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lateData, setLateData] = useState([]);
  const [earlyData, setEarlyData] = useState([]);

  let emotionalType = 'anger'

  const renderChart = (emotionalType) => {
    switch (emotionalType) {
      case 'anger':
        return <LockdownDateAngryChart data={data}/>;
      case 'joy':
        return <LockdownDateJoyChart data={data}/>;
      case 'fear':
        return <LockdownDateFearChart data={data}/>;
      case 'sadness':
        return <LockdownDateSadnessChart data={data}/>;
      default:
        return null;
    }
  };


  const lockdownTrendDateAPI = 'http://127.0.0.1:8080/lockdown-date-trend'
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(lockdownTrendDateAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok ) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setLateData(data.filter(item => item.lockdown_status === 'Late'));
        setEarlyData(data.filter(item => item.lockdown_status === 'Early'));
        console.log(data.filter(item => item.lockdown_status === 'Late'))
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


  
  

return(
  <div>

    {/* {renderChart(emotionalType)} */}
    <LockdownDateAngryChart data={data}/>
    <LockdownDateJoyChart data={data} />
    <LockdownDateFearChart data={data} /> 
    <LockdownDateSadnessChart data={data} />

    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lockdown Status</th>
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
              <td>{item.lockdown_status}</td>
              <td>{item.anger_trend.toFixed(3)}</td>
              <td>{item.fear_trend.toFixed(3)}</td>
              <td>{item.joy_trend.toFixed(3)}</td>
              <td>{item.sadness_trend.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

};

export default LockdownTrendsDate;