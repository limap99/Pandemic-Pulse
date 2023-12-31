import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Description.css';

const HomePage = () => (
  <main>
    <h1 className='page-header'>Pandemic Pulse</h1>
    <p className='page-description'>Learn how people’s feelings changed on Twitter during the COVID-19 pandemic. Take a look at how key events such as the increasing number of cases, lockdowns, and vaccination influenced how the population of different countries felt throughout the pandemic.</p>
    <div className="ellipses">
      <Link to="/covid-cases-trends" className="ellipse ellipse-intro-c19">COVID-19 Cases</Link>
      <Link to="/lockdowns-trends" className="ellipse ellipse-intro-loc">Lockdowns</Link>
    </div>
    <div className="ellipses">
      <Link to="/vaccination-trends" className="ellipse ellipse-intro-vac">Vaccination</Link>
      <Link to="/demographics-trends" className="ellipse ellipse-intro-dem">Demographics</Link>
    </div>
    <div className="data-overview">
      <Link to="/data-overview" className="ellipse data-overview">Data Overview</Link>
    </div>
  </main>
);

export default HomePage;
