import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
const VaccinationIntro = () => (
    <main>
      <Link to="/" className="back-link">back</Link>
        <h1 className='page-header'>Vaccination</h1>
        <p className='page-description'>  Explore the connection between vaccine rollout speed and public sentiment</p>
        <div className="ellipses">
      <Link to="/vaccination-overview" className="ellipse ellipse-overview">Overview</Link>
      <Link to="/vaccination-trends" className="ellipse ellipse-trends">Trends</Link>
    </div>
      </main>
    );

export default VaccinationIntro