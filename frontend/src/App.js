import React from 'react';
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'
import CovidCasesIntro from './components/intro/CovidCasesIntro';
import LockdownIntro from './components/intro/LockdownIntro';
import VaccinationIntro from './components/intro/VaccinationIntro';
import DemographicsIntro from './components/intro/DemographicsIntro';



const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/covid-cases" element={<CovidCasesIntro/>} />
        <Route path="/lockdowns" element={<LockdownIntro/>} />
        <Route path="/vaccination" element={<VaccinationIntro/>} />
        <Route path="/demographics" element={<DemographicsIntro/>} />
      </Routes>
    </div>
  </Router>
);

export default App;
