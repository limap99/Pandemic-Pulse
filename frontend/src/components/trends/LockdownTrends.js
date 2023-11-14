import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';



const LockdownTrends= () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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