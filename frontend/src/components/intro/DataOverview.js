import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Description.css';
import '../../style/DataGrid.css';


const DataOverview = () => {
  const [viewType, setViewType] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const tweetTableAttributes = ['tweet_id', 'country_id', 'tweet_date', 'anger_intensity', 'fear_intensity', 'joy_intensity', 'sadness_intensity'];
  const countryTableAttributes = ['country_id', 'country_name', 'mean_age', 'population'];
  const lockdownTableAttributes = ['country_id', 'lockdown_type', 'start_date'];
  const vaccinationTableAttributes = ['vaccination_id', 'country_id', 'reported_date', 'total_doses_administered'];
  const covidCasesTableAttributes = ['covid_cases_id', 'country_id', 'reported_date', 'confirmed_cases'];

  const tweetSources = ['COVID-19 Twitter Sentiment Dataset'];
  const countrySources = ['COVID-19 Useful Features by Country, COVID-19 Worldwide Daily Data'];
  const lockdownSources = ['COVID-19 Useful Features by Country'];
  const vaccinationSources = ['COVID-19 Vaccinations Dataset'];
  const covidCasesSources = ['COVID-19 Worldwide Daily Data'];
  const tweetDescription = 'The Tweet table contains individual tweets related to COVID-19 by users during the pandemic. The table has tweet_id, date, anger_intensity, fear_intensity, joy_intensity and sadness_intensity as its attributes. The tweet_id attribute is the primary key, uniquely identifying each tweet. The date attribute returns the date the tweet was posted. The anger_intensity, fear_intensity, joy_intensity and sadness_intensity attributes represent the values for each emotion.'
  const lockdownDescription = 'The Lockdown table contains the various strategies and implementation days by countries during the COVID-19 pandemic. The table has lockdown_type and start_date as its attributes. The lockdown_type attribute identifies what kind of lockdown strategy that country implemented (full, partial, no). In addition, the start_date attribute has information on the day the lockdown started for a particular country.'
  const countryDescription = 'The Country table contains different countries where users tweeted during the pandemic. The attributes of the Country entity set are Country ID, which is an unique attribute, the name of the country, the mean age of its citizens, and total population.'
  const vaccinationDescription = 'The Vaccination table contains data on the vaccines that were administered to people. Each record has a Vaccination_ID that is unique, the date on which it was administered and total overall doses administered. It also uses the country_id attribute as well.  '
  const covidCasesDescription = 'The Covid Cases table contains information relating to the number of confirmed covid cases that occurred in a country. Each record will contain information regarding date and covid case count, and will be uniquely identified by the primary key Covid_Cases_id. '
  const userData = [
    { id: 1, name: 'Alice', email: 'alice@example.com', joinedDate: '2021-01-01' },
    { id: 2, name: 'Bob', email: 'bob@example.com', joinedDate: '2021-02-15' },
    // ... more user data
  ];

  const getApiUrl = (type) => {
    let apiUrl
    switch (type) {
      
      case 'country':  
        apiUrl = `http://127.0.0.1:8080/country`
        return apiUrl;
      case 'lockdown':
        apiUrl = `http://127.0.0.1:8080/lockdown`      
        return apiUrl;
      case 'vaccination':
        apiUrl = `http://127.0.0.1:8080/vaccination`      
        return apiUrl;
      case 'covid-cases':
        apiUrl = `http://127.0.0.1:8080/covid-cases`      
        return apiUrl;
      case 'tweet':
          apiUrl = `http://127.0.0.1:8080/tweet`      
          return apiUrl;
      default:
        apiUrl = 'http://127.0.0.1:8080/country'
        return apiUrl
    }
  }

 
  useEffect(() => {
    //let APIurl = getApiUrl(viewType);
    let APIurl = 'http://127.0.0.1:8080/count';
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(APIurl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok ) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [viewType]);

  return(
    <main>
      <Link to="/" className="back-link">back</Link>
        <h1 className='page-header'>Data Overview</h1>
        <p className='page-description'>  Explore our database tables, their sources, and the volume of data they contain</p>
        {/* <div className="ellipses">
      <Link to="/source-overview" className="ellipse ellipse-overview">Dataset Sources</Link>
      <Link to="/database-overview" className="ellipse ellipse-trends">Database</Link>
    </div> */}
    <h1 className='page-header table-header'>Dataset Sources</h1>
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

          <h1 className='page-header table-header'>Database Tables</h1>
          <div className="table-selection">
        <label>
          <input
            type="radio"
            name="viewType"
            value="type"
            checked={viewType === 'country'}
            onChange={() => setViewType('country')}
          />
          Country
        </label>
        
        <label>
          <input
            type="radio"
            name="viewType"
            value="tweet"
            checked={viewType === 'tweet'}
            onChange={() => setViewType('tweet')}
          />
          Tweet
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="type"
            checked={viewType === 'lockdown'}
            onChange={() => setViewType('lockdown')}
          />
          Lockdown
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="type"
            checked={viewType === 'vaccination'}
            onChange={() => setViewType('vaccination')}
          />
          Vaccination
        </label>
        <label>
          <input
            type="radio"
            name="viewType"
            value="type"
            checked={viewType === 'covid-cases'}
            onChange={() => setViewType('covid-cases')}
          />
          Covid Cases
        </label>
        
        {/* <button onClick={applyViewType}>Apply</button> */}
  
      </div>
          {viewType === 'tweet' && <DatabaseTable numberOfTuples = {data[0].tweet} loading = {isLoading} attributes={tweetTableAttributes} data={data} sources = {tweetSources} tableName ={'Tweet Table'} description={tweetDescription}/>}
          {viewType === 'country' && <DatabaseTable numberOfTuples = {data[0].country} loading = {isLoading} attributes={countryTableAttributes} data={data} sources = {countrySources} tableName ={'Country Table'} description={countryDescription}/>}
          {viewType === 'lockdown' && <DatabaseTable numberOfTuples = {data[0].lockdown} attributes={lockdownTableAttributes} data={data} sources = {lockdownSources} tableName ={'Lockdown Table'} description={lockdownDescription}/>}
          {viewType === 'vaccination' && <DatabaseTable numberOfTuples = {data[0].vaccination} attributes={vaccinationTableAttributes} data={data} sources = {vaccinationSources} tableName ={'Vaccination Table'} description={vaccinationDescription}/>}
          {viewType === 'covid-cases' && <DatabaseTable numberOfTuples = {data[0].covid_cases} attributes={covidCasesTableAttributes} data={data} sources = {covidCasesSources} tableName ={'Covid Cases Table'} description={covidCasesDescription}/>}


      </main>
  )
  
};


const DataGrid = ({ title, description, link }) => {

  const handleButtonClick = () => {
    window.location.href = link; // Redirects to the data source link
  };
  return (
      <div className="grid-item">
        <a href={link} target="_blank" rel="noopener noreferrer" className="grid-header-link">
        <h2 className='grid-header'>{title}</h2>
        </a>
          <p className='grid-description'>{description}</p>
          <button onClick={handleButtonClick} className='button-overview'>View Data Source</button>
      </div>
  );
};

const DatabaseTable = ({ tableName, description, attributes, data, sources, loading, viewType, numberOfTuples }) => {
  // let numberOfTuples = 5; 
  
  // if(viewType === 'tweet'){
  //  numberOfTuples = data[0].tweet
  //  console.log(data[0].tweet)
  // }
  // else if(viewType === 'country'){
  //   numberOfTuples = data[0].country
  //   console.log(data[0].country)
  // }
  // else if(viewType === 'lockdown'){
  //  numberOfTuples = data[0].lockdown
  //  console.log(data[0].lockdown)
  // }
  // else if(viewType === 'vaccination'){
  //   numberOfTuples = data[0].vaccination
  //   console.log(data[0].vaccination)
  // }
  // else {
  //   numberOfTuples = data[0].covid_cases
  //   console.log(data[0].covid_cases)
  // }
  
  return (
    <div className="database-table">
      <h2>{tableName}</h2>
  <p>{description}</p>  
      
      <h3>Attributes:</h3>
      {/* <ul>
        <li>Tweet_ID</li>
        <li>Tweet_Date</li>
      </ul> */}
      <ul>
        {attributes.map((attribute, index) => (
          <li key={index}>{attribute}</li>
        ))}
      </ul>

      <h3>Sources:</h3>
  <ul >
        {sources.map((source, index) => (
          <li key={index}>{source}</li>
        ))}
    </ul>

      <h3>Data:</h3>
      {loading === 'true' ? <h1 className='table-loading'>Loading...</h1> : 
        <div>
      {/* <p>Total Number of Records: {numberOfTuples}</p>  */}
      <p>Total Number of Records: {numberOfTuples}</p> 
      {/* <table>
        <thead>
          <tr>
            {attributes.map((attribute, index) => (
              <th key={index}>{attribute}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {attributes.map((attribute, attrIndex) => (
                <td key={attrIndex}>{row[attribute]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>  */}
      </div>}
    
    </div>
  );
};

export default DataOverview;