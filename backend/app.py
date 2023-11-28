from flask import Flask, jsonify
import oracledb
from datetime import datetime
from complex_trend_queries.lockdown_type_trend_query import query as lockdown_type_trend_query
from complex_trend_queries.lockdown_date_trend_query import query as lockdown_date_trend_query
from flask_cors import CORS
from complex_trend_queries.covid_cases_trend import query as covid_cases_trend_query
from complex_trend_queries.demographics_trend_query import query as demographics_trend_query

from complex_trend_queries.weekly_vaccination_trend import query as weekly_vaccination_trend_query
from complex_trend_queries.data_overview import tweet_query as tweet_query
from complex_trend_queries.data_overview import country_query as country_query
from complex_trend_queries.data_overview import lockdown_query as lockdown_query
from complex_trend_queries.data_overview import vaccination_query as vaccination_query
from complex_trend_queries.data_overview import covid_cases_query as covid_cases_query
from complex_trend_queries.data_overview import count_query as count_query

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

print("hello!")

@app.route('/')
def index():
    return "Welcome to the Flask Oracle API!"

@app.route('/count', methods=['GET'])
def count():
    cursor.execute(count_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "tweet": row[0],
            "vaccination": row[1],  
            "lockdown": row[2],
            "country": row[3],
            "covid_cases": row[4]

        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/tweet', methods=['GET'])
def tweet():
    cursor.execute(tweet_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "tweet_id": row[0],
            "tweet_date": row[1].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "sadness_intensity": row[2],
            "joy_intensity": row[3],
            "fear_intensity": row[4],
            "anger_intensity": row[5],
            "country_id": row[6],

        } for row in result
    ]
    return jsonify(formatted_result)
@app.route('/country', methods=['GET'])
def country():
    cursor.execute(country_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "country_id": row[0],
            "country_name": row[1],  # Formatting datetime to date string
            "mean_age": row[2],
            "population": row[3],
    

        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/lockdown', methods=['GET'])
def lockdown():
    cursor.execute(lockdown_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "lockdown_type": row[0],
            "start_date": row[1].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "country_id": row[2],

        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/vaccination', methods=['GET'])
def vaccination():
    cursor.execute(vaccination_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "vaccination_id": row[0],
            "reported_date": row[1].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "total_doses_administered": row[2], 
            "country_id": row[3]

        } for row in result
    ]
    return jsonify(formatted_result)

@app.route('/covid-cases', methods=['GET'])
def covidCases():
    cursor.execute(covid_cases_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "covid_cases_id": row[0],
            "reported_date": row[1].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "confirmed_cases": row[2],
            "country_id": row[3],

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

@app.route('/demographics-trends', methods=['GET'])
def demographics_trend():
    cursor.execute(demographics_trend_query)
    result = cursor.fetchall()
    formatted_result = [
        {
            "date": row[0].strftime("%Y-%m-%d"),  # Formatting datetime to date string
            "country_ID": row[1],
            "sadness_avg": row[2],
            "joy_avg": row[3],
            "fear_avg": row[4],
            "anger_avg": row[5],
        } for row in result
    ]
    return jsonify(formatted_result)


if __name__ == '__main__':
    app.run(port=8080, debug=True)
