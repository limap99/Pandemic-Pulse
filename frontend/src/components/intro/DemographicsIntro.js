import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';


const DemographicsIntro = () => (
    <main>
        <h1 className='page-header'>Demographics</h1>
        <p className='page-description'>  Explore how user from countries with different demographics reacted differently during the pandemic</p>
        <div className="ellipses">
      <Link to="/demographics-overview" className="ellipse ellipse-overview">Overview</Link>
      <Link to="/demographics-trends" className="ellipse ellipse-trends">Trends</Link>
    </div>
      </main>
    );

export default DemographicsIntro