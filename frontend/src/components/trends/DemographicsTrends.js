import React, { useState, useEffect } from 'react';
import '../../style/Description.css';
import DemographicsAgeTrends from './DemographicsAgeTrends';
import DemographicsPopulationTrends from './DemographicsPopulationTrends';

const DemographicsTrends= () => {

  const [viewType, setViewType] = useState('age'); // 'age' or 'population'

  return (
    <main>
      <h1 className='page-header'>Demographics Trends</h1>

      <div className="view-selector">
        <label>
          <input
            type="radio"
            name="viewType"
            value="age"
            checked={viewType === 'age'}
            onChange={() => setViewType('age')}
          />
          age
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="population"
            checked={viewType === 'population'}
            onChange={() => setViewType('population')}
          />
          population
        </label>
  
      </div>

      {viewType === 'age' ? <DemographicsAgeTrends /> : <DemographicsPopulationTrends />}
    </main>
  )
};

export default DemographicsTrends;