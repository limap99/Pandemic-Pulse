from flask import Flask, jsonify
import oracledb
from datetime import datetime
from complex_trend_queries.lockdown_type_trend_query import query as lockdown_type_trend_query
from complex_trend_queries.lockdown_date_trend_query import query as lockdown_date_trend_query
from flask_cors import CORS
from complex_trend_queries.covid_cases_trend import query as covid_cases_trend_query
from complex_trend_queries.demographics_age_trend_query import query as demographics_age_trend_query
from complex_trend_queries.demographics_population_trend_query import query as demographics_population_trend_query
from complex_trend_queries.weekly_vaccination_trend import query as weekly_vaccination_trend_query
from complex_trend_queries.data_overview import query as data_overview_query

app = Flask(__name__)
CORS(app)

pw = 'IDgyieNge4gljYWFSyopzIZI'
host = 'oracle.cise.ufl.edu' 
port = '1521'  
sid = 'orcl'
dsnStr = oracledb.makedsn("oracle.cise.ufl.edu", 1521, sid="orcl")
connection = oracledb.connect(user="limap", password="IDgyieNge4gljYWFSyopzIZI", dsn=dsnStr)
cursor = connection.cursor()
print("Successfully connected to Oracle Database")

@app.route('/')
def index():
    return "Welcome to the Flask Oracle API!"

@app.route('/data-overview', methods=['GET'])
def data_overview():
    cursor.execute(data_overview_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "tweet_count": row[0],  # Formatting datetime to date string
            "per_country_tweet_count": row[1],
            "country_count": row[2],
            "total_vaccination_count": row[3],
            "per_country_vaccination_count": row[4],
            "covid_cases_count": row[5],
            "per_country_covid_cases_count": row[6]
        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/lockdown-type-trend', methods=['GET'])
def lockdown_type_trend():
    cursor.execute(lockdown_type_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "lockdown_status": row[1],
            "sadness_trend": row[2],
            "joy_trend": row[3],
            "fear_trend": row[4],
            "anger_trend": row[5]
        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/lockdown-date-trend', methods=['GET'])
def lockdown_date_trend():
    cursor.execute(lockdown_date_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "lockdown_status": row[1],
            "sadness_trend": row[2],
            "joy_trend": row[3],
            "fear_trend": row[4],
            "anger_trend": row[5]
        } for row in result
    ]
    return jsonify(formatted_result)


@app.route('/covid-cases-trend', methods=['GET'])
def covid_cases_trend():
    cursor.execute(covid_cases_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "country_ID": row[1],
            "sadness_delta": row[2],
            "joy_delta": row[3],
            "fear_delta": row[4],
            "anger_delta": row[5],
            "covid_cases_delta": row[6]
        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/vaccination-trend', methods=['GET'])
def vaccination_trend():
    cursor.execute(weekly_vaccination_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),
            "country_ID": row[1],
            "total_doses_administered": row[2],
            "sadness_trend": row[3],
            "joy_trend": row[4],
            "fear_trend": row[5],
            "anger_trend": row[6]
        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/demographics-age-trend', methods=['GET'])
def demographics_age_trend():
    cursor.execute(demographics_age_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "mean_age": row[1],
            "sadness_trend": row[2],
            "joy_trend": row[3],
            "fear_trend": row[4],
            "anger_trend": row[5],
        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/demographics-population-trend', methods=['GET'])
def demographics_population_trend():
    cursor.execute(demographics_population_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "population": row[1],
            "sadness_trend": row[2],
            "joy_trend": row[3],
            "fear_trend": row[4],
            "anger_trend": row[5],
        } for row in result
    ]
    return jsonify(formatted_result)


if __name__ == '__main__':
    app.run(port=8080, debug=True)
