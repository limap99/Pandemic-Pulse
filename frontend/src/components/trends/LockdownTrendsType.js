import React, { useState, useEffect } from 'react';
import '../../style/Description.css';
import LockdownTypeAngryChart from '../charts/lockdown-type/LockdownTypeAngryChart';
import LockdownTypeJoyChart from '../charts/lockdown-type/LockdownTypeJoyChart';
import LockdownTypeFearChart from '../charts/lockdown-type/LockdownTypeFearChart';
import LockdownTypeSadnessChart from '../charts/lockdown-type/LockdownTypeSadnessChart';





const LockdownTrendsType= () => {

  const [dataTrendType, setDataTrendType] = useState([]);
  const [dataTrendDate, setDataTrendDate] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullLockdownData, setFullLockdownData] = useState([]);
  const [partialLockdownData, setPartialLockdownData] = useState([]);
  let emotionalType = 'anger'


  const lockdownTrendTypeAPI = 'http://127.0.0.1:8080/lockdown-type-trend'

  const renderChart = (emotionalType) => {
    switch (emotionalType) {
      case 'anger':
        return <LockdownTypeAngryChart data={dataTrendType}/>;
      case 'joy':
        return <LockdownTypeJoyChart data={dataTrendType}/>;
      case 'fear':
        return <LockdownTypeFearChart data={dataTrendType}/>;
      case 'sadness':
        return <LockdownTypeSadnessChart data={dataTrendType}/>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseTrendType = await fetch(lockdownTrendTypeAPI, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!responseTrendType.ok ) {
          throw new Error('Network response was not ok');
        }
        const resultTrendType = await responseTrendType.json();
        setDataTrendType(resultTrendType);
        setFullLockdownData(dataTrendType.filter(item => item.lockdown_status === 'FULL'));
        setPartialLockdownData(dataTrendType.filter(item => item.lockdown_status === 'Partial'));
        console.log(dataTrendType.filter(item => item.lockdown_status === 'FULL'))
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

    <LockdownTypeAngryChart data={dataTrendType}/>
    <LockdownTypeJoyChart data={dataTrendType} />
    <LockdownTypeFearChart data={dataTrendType} />
    <LockdownTypeSadnessChart data={dataTrendType} />

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
          {dataTrendType.map((item, index) => (
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

export default LockdownTrendsType;