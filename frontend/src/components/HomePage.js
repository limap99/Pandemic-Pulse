import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Description.css';

const HomePage = () => (
  <main>
    <h1 className='page-header'>Pandemic Pulse</h1>
    <p className='page-description'>Learn how people’s feelings changed on Twitter during the COVID-19 pandemic. Take a look at how key events such as the increasing number of cases, lockdowns, and vaccination influenced how the population of different countries felt throughout the pandemic.</p>
    <div className="ellipses">
      <Link to="/covid-cases" className="ellipse">COVID-19 Cases</Link>
      <Link to="/lockdowns" className="ellipse">Lockdowns</Link>
      <Link to="/vaccination" className="ellipse">Vaccination</Link>
      <Link to="/demographics" className="ellipse">Demographics</Link>
    </div>
  </main>
);

export default HomePage;
