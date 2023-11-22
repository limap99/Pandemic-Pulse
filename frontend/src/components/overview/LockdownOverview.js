import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../style/Description.css';
import { Grid } from 'gridjs-react';

import { Container, Item, Table } from 'semantic-ui-react'

const LockdownOverview= () => {
  const [viewType, setViewType] = useState('type'); // 'date' or 'type'

  const fetchDataBasedOnView = (view) => {
    // Implement your fetch logic here
    console.log(`Fetching data for ${view} view.`);
  };

  // This will be called when the 'Apply' button is clicked
  const applyViewType = () => {
    fetchDataBasedOnView(viewType);
  };

  const data = [
    { country: 'South Korea', type: 'Partial', date: 'Early' },
    { country: 'Canada', type: 'Partial', date: 'Early' },
    { country: 'United Kingdom', type: 'Full', date: 'Late' },
    { country: 'United States', type: 'Partial', date: 'Late' },
    { country: 'France', type: 'Full', date: 'Early' },
    { country: 'Brazil', type: 'Partial', date: 'Late' },
  ];

  // const DataTable = () => {
  //   return (
  //     <Grid>
  //       <Row>
  //         <Col>Country</Col>
  //         <Col>Lockdown Implementation Type</Col>
  //         <Col>Lockdown Implementation Timeline</Col>
  //       </Row>
  //       <Row>
  //         <Col>Country</Col>
  //         <Col>Lockdown Implementation Type</Col>
  //         <Col>Lockdown Implementation Timeline</Col>
  //       </Row>
  //       <Row>
  //         <Col>Country</Col>
  //         <Col>Lockdown Implementation Type</Col>
  //         <Col>Lockdown Implementation Timeline</Col>
  //       </Row>
  //     </Grid>
  //   );
  // };

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

export default LockdownOverview;





