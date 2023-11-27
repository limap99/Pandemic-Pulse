import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
const DemographicsOverview= () => {

  const data = [
    { country: 'South Korea', type: 'Partial', date: 'Early' },
    { country: 'Canada', type: 'Partial', date: 'Early' },
    { country: 'United Kingdom', type: 'Full', date: 'Late' },
    { country: 'United States', type: 'Partial', date: 'Late' },
    { country: 'France', type: 'Full', date: 'Early' },
    { country: 'Brazil', type: 'Partial', date: 'Late' },
  ];


return(
  <main>
    <Link to="/lockdowns" className="back-link">back</Link>
    <h1 className='page-header'>Lockdown Overview</h1>
    
    <table>

      
<thead>

        
<tr>

          
<th>Country</th>

          
<th>Lockdown Implementation Type</th>

          
<th>Lockdown Implementation Timeline</th>

        
</tr>

      
</thead>

      
<tbody>
        {data.map((item) => (
          <tr
 
key={item.country}>

            
<td>{item.country}</td>

            
<td>{item.type}</td>

            
<td>{item.date}</td>

          
</tr>
        ))}
      </tbody>

    
</table>

  </main>
)
};

export default DemographicsOverview;





