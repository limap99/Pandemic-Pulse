import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
import LineChart from './LineChart';
import LockdownTypeAngryChart from '../charts/lockdown-type/LockdownTypeAngryChart';
import LockdownTypeJoyChart from '../charts/lockdown-type/LockdownTypeJoyChart';
import LockdownTypeFearChart from '../charts/lockdown-type/LockdownTypeFearChart';
import LockdownTypeSadnessChart from '../charts/lockdown-type/LockdownTypeSadnessChart';
import { PureComponent } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';






const LockdownTrends= () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullLockdownData, setFullLockdownData] = useState([]);
  const [partialLockdownData, setPartialLockdownData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/lockdown-type-trend', {
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
        setFullLockdownData(data.filter(item => item.lockdown_status === 'FULL'));
        setPartialLockdownData(data.filter(item => item.lockdown_status === 'Partial'));
        console.log(data.filter(item => item.lockdown_status === 'FULL'))
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
      <h1 className='page-header'>Lockdown Trends</h1>
      Loading...
      </div>;
  }

  if (error) {
    return <div>
      <h1 className='page-header'>Lockdown Trends</h1>
      Error: {error}</div>;
  }


  
  

return(
  <main>
      <h1 className='page-header'>Lockdown Trends</h1>
      {/* <ResponsiveContainer  width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            // data={data.filter(item => item.lockdown_status === 'FULL')}
            data={data}
            dataKey="anger_trend"
            stroke="#FF0000"
            activeDot={{ r: 8 }}
          />
          {/* <Line
            type="monotone"
            data={data.filter(item => item.lockdown_status === 'Partial')}
            dataKey="anger_trend"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
          /> */}
          {/* Include other sentiments as needed */}
        {/* </LineChart> */}
      {/* // </ResponsiveContainer> */} 
      <LockdownTypeAngryChart data={data}/>
      <LockdownTypeJoyChart data={data} />
      <LockdownTypeFearChart data={data} />
      <LockdownTypeSadnessChart data={data} />
      <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lockdown Status</th>
            <th>Anger Sentiment</th>
            <th>Fear Sentiment</th>
            <th>Joy Sentiment</th>
            <th>Sadness Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.lockdown_status}</td>
              <td>{item.anger_trend.toFixed(2)}</td>
              <td>{item.fear_trend.toFixed(2)}</td>
              <td>{item.joy_trend.toFixed(2)}</td>
              <td>{item.sadness_trend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </main>
)

};

export default LockdownTrends;