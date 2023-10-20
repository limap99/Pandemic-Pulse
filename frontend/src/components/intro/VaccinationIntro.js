import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
const VaccinationIntro = () => (
    <main>
        <h1 className='page-header'>Vaccination</h1>
        <p className='page-description'>  Explore the connection between vaccine rollout speed and public sentiment</p>
        {/* <div className="ellipses">
          <Link to="/covid-cases" className="ellipse">COVID-19 Cases</Link>
          <Link to="/lockdowns" className="ellipse">Lockdowns</Link>
          <Link to="/vaccination" className="ellipse">Vaccination</Link>
          <Link to="/demographics" className="ellipse">Demographics</Link>
        </div> */}
      </main>
    );

export default VaccinationIntro