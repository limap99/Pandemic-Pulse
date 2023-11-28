import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
const DemographicsOverview= () => {

  const data = [
    { country: 'South Korea', age: 44.5, population: 51784059 },
    { country: 'Canada', age: 40.6, population: 38781291 },
    { country: 'United Kingdom', age: 40.2, population: 66460344 },
    { country: 'United States', age: 37.6, population: 326687501 },
    { country: 'France', age: 41.2, population: 66977107 },
    { country: 'Brazil', age: 31.3, population: 209469333 },
  ];


return(
  <main>
    <Link to="/demographics" className="back-link">back</Link>
    <h1 className='page-header'>Demographics Overview</h1>
    
    <table>
      <thead>  
        <tr>    
        <th>Country</th>
        <th>Mean Age</th>
        <th>Population</th>
        </tr>  
      </thead>

      
      <tbody>
        {data.map((item) => (
          <tr key={item.country}> 
            <td>{item.country}</td>
            <td>{item.age}</td>
            <td>{item.population}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
)
};

export default DemographicsOverview;





