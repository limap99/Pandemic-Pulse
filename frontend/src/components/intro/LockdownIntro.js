import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';

const LockdownIntro = () => (
    <main>
        <Link to="/" className="back-link">back</Link>
        <h1 className='page-header'>Lockdowns</h1>
        <p className='page-description'>  Explore how different lockdown strategies implemented by different countried affected public sentiment on Twitter</p>
        <div className="ellipses">
      <Link to="/lockdowns-overview" className="ellipse ellipse-overview">Overview</Link>
      <Link to="/lockdowns-trends" className="ellipse ellipse-trends">Trends</Link>
    </div>
      </main>
    );
export default LockdownIntro