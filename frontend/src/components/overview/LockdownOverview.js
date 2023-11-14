import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
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

return(
  <main>
    <h1 className='page-header'>Lockdown Overview</h1>
    
    <div className="view-selector">
        <label>
          <input
            type="radio"
            name="viewType"
            value="date"
            checked={viewType === 'date'}
            onChange={() => setViewType('date')}
          />
          Date
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="type"
            checked={viewType === 'type'}
            onChange={() => setViewType('type')}
          />
          Type
        </label>
        <button onClick={applyViewType}>Apply</button>
      </div>

      <div className="data-table">
        <h2>Lockdown Dates Table</h2>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Lockdown Type</th>
              {/* Include other headers if necessary */}
            </tr>
          </thead>
          <tbody>
            {/* Map through your data and create table rows */}
            {/* This is just placeholder content */}
            <tr>
              <td>South Korea</td>
              <td>Full</td>
            </tr>
            <tr>
              <td>Canada</td>
              <td>Partial</td>
            </tr>
            {/* ...other rows */}
          </tbody>
        </table>
      </div>
  </main>
)
};

export default LockdownOverview;