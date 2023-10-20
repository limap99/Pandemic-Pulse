import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';

const LockdownIntro = () => (
    <main>
        <h1 className='page-header'>Lockdowns</h1>
        <p className='page-description'>  Explore how different lockdown strategies implemented by different countried affected public sentiment on Twitter</p>
        {/* <div className="ellipses">
          <Link to="/covid-cases" className="ellipse">COVID-19 Cases</Link>
          <Link to="/lockdowns" className="ellipse">Lockdowns</Link>
          <Link to="/vaccination" className="ellipse">Vaccination</Link>
          <Link to="/demographics" className="ellipse">Demographics</Link>
        </div> */}
      </main>
    );
export default LockdownIntro