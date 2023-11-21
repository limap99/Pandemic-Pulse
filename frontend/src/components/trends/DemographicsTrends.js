import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';

const DemographicsTrends= () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8080/demographics-trends', {
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

  return (
    <main>
      <h1 className='page-header'>Demographics Trends</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Country</th>
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
                <td>{item.country_ID}</td>
                <td>{item.anger_avg.toFixed(2)}</td>
                <td>{item.fear_avg.toFixed(2)}</td>
                <td>{item.joy_avg.toFixed(2)}</td>
                <td>{item.sadness_avg.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
};

export default DemographicsTrends;