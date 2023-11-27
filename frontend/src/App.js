import React from 'react';
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'
import CovidCasesIntro from './components/intro/CovidCasesIntro';
import LockdownIntro from './components/intro/LockdownIntro';
import VaccinationIntro from './components/intro/VaccinationIntro';
import DemographicsIntro from './components/intro/DemographicsIntro';
import CovidCasesOverview from './components/overview/CovidCasesOverview';
import LockdownOverview from './components/overview/LockdownOverview';
import VaccinationOverview from './components/overview/VaccinationOverview';
import DemographicsOverview from './components/overview/DemographicsOverview';
import CovidCasesTrends from './components/trends/CovidCasesTrends';
import LockdownTrends from './components/trends/LockdownTrends';
import VaccinationTrends from './components/trends/VaccinationTrends';
import DemographicsTrends from './components/trends/DemographicsTrends';
import DataOverview from './components/intro/DataOverview';


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
        <Route path="/covid-cases-overview" element={<CovidCasesOverview/>} />
        <Route path="/lockdowns-overview" element={<LockdownOverview/>} />
        <Route path="/vaccination-overview" element={<VaccinationOverview/>} />
        <Route path="/demographics-overview" element={<DemographicsOverview/>} />
        <Route path="/covid-cases-trends" element={<CovidCasesTrends/>} />
        <Route path="/lockdowns-trends" element={<LockdownTrends/>} />
        <Route path="/vaccination-trends" element={<VaccinationTrends/>} />
        <Route path="/demographics-trends" element={<DemographicsTrends/>} />
        <Route path="/data-overview" element={<DataOverview/>} />
      
      </Routes>
    </div>
  </Router>
);

export default App;
