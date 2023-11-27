import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
import '../../style/DataGrid.css';


const DataOverview = () => (
    <main>
      <Link to="/" className="back-link">back</Link>
        <h1 className='page-header'>Data Overview</h1>
        <div className="grid-container">
                <DataGrid 
                    title="COVID-19 Twitter Sentiment Dataset"
                    description="Our primary dataset, sourced from A*STAR researchers, comprises tweets about COVID-19 tagged with emotional intensity scores and key details like origin country and timestamps."
                    link= "https://www.openicpsr.org/openicpsr/project/120321/version/V12/view"
                />
                <DataGrid 
                    title="COVID-19 Worldwide Daily Data"
                    description="Offered by John Hopkins University, this dataset provides daily updates on COVID-19 cases, recovery, and mortality rates across countries"
                    link= "https://www.kaggle.com/datasets/altadata/covid19"

                />
                <DataGrid 
                    title="COVID-19 Useful Features by Country"
                    description="This dataset focuses on country-specific COVID-19 details, including lockdown dates and types, aiding in understanding the varying responses to the pandemic."
                    link= "https://www.kaggle.com/datasets/ishivinal/covid19-useful-features-by-country"

                />
                <DataGrid 
                    title="COVID-19 Vaccinations Dataset"
                    description="Sourced from Our World in Data and other databases, this dataset tracks the U.S. vaccination rollout, offering insights into how vaccination rates influenced public sentiment."
                    link= "https://data.world/ourworldindata/covid-19-vaccinations"

                />
          </div>
        
      </main>
    );
    const DataGrid = ({ title, description, link }) => {
      return (
          <div className="grid-item">
            <a href={link} target="_blank" rel="noopener noreferrer" className="grid-header-link">
            <h2 className='grid-header'>{title}</h2>
            </a>
              <p className='grid-description'>{description}</p>
              <button className='button-overview'>View Data Overview</button>
          </div>
      );
  };

export default DataOverview