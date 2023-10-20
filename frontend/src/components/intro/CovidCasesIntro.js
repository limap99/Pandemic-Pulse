import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
const CovidCasesIntro = () => (
<main>
    <h1 className='page-header'>Covid-19 Cases</h1>
    <p className='page-description'>   Explore how the spike and drop of COVID-19 case numbers affects public sentiment on twitter for each country,</p>
    <div className="ellipses">
      <Link to="/covid-cases" className="ellipse ellipse-overview">Overview</Link>
      <Link to="/lockdowns" className="ellipse ellipse-trends">Trends</Link>
    </div>
  </main>
);

export default CovidCasesIntro;