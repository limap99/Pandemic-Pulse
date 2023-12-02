import React, { useState, useEffect } from 'react';
import '../../style/Description.css';
import LockdownTrendsType from './LockdownTrendsType';
import LockdownTrendsDate from './LockdownTrendsDate';
import { Link } from 'react-router-dom';
import LockdownTypeAngryChart from '../charts/lockdown-type/LockdownTypeAngryChart';
import LockdownTypeJoyChart from '../charts/lockdown-type/LockdownTypeJoyChart';
import LockdownTypeFearChart from '../charts/lockdown-type/LockdownTypeFearChart';
import LockdownTypeSadnessChart from '../charts/lockdown-type/LockdownTypeSadnessChart';





const LockdownTrends= () => {


  const [viewType, setViewType] = useState('type'); // 'date' or 'type'



  

return(
  <main>
    <Link to="/" className="back-link">back</Link>
      <h1 className='page-header'>Lockdown Trends</h1>
      <p className='page-description'>  Compare how different lockdown strategies affected public sentiment on Twitter</p>

      
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
        {/* <button onClick={applyViewType}>Apply</button> */}
  
      </div>

      {viewType === 'date' ? <LockdownTrendsDate /> : <LockdownTrendsType />}

      {/* <LockdownTrendsDate/> */}
      {/* <LockdownTrendsType/> */}
      
  </main>
)

};

export default LockdownTrends;