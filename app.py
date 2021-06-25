# DEPENDENCIES
import pandas as pd
import numpy as np
import psycopg2
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

# FLASK APP
app = Flask(__name__)

# CREATING CONNECTION WITH ENGINE
connection_string = "ympsazqytxgdyd:"+"84f61aeda6880d7b357752a62d790ff878b9b80328a5e86c9436dae6fda1439f" + \
    "@ec2-54-152-185-191.compute-1.amazonaws.com:5432/d9pes28e80ohoe"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://"+connection_string
data = SQLAlchemy(app)

covid = data.Table('final', data.metadata,
                   autoload=True, autoload_with=data.engine)

Session = sessionmaker(bind=data.engine)

# HOME ROUTE
@app.route('/')
def index():
    """Return the dashboard homepage"""
    return render_template('index.html')

@app.route('/openings')
def openings():
    """Return the dashboard homepage"""
    return render_template('model.html')

# DOCUMENTATION ROUTE
@app.route('/documentation')
def documentation():
    """Return the dashboard homepage"""
    return render_template('documentation.html')

# JSON DATA ROUTE
@app.route('/json-data')
def jsondata():
    session = Session()
    cols1 = covid.columns
    
    results = session.query(cols1.iso_code, cols1.continent, cols1.location, cols1.date_, cols1.day_num, cols1.new_cases_per_million,\
        cols1.new_deaths_per_million, cols1.hosp_patients_per_million, cols1.new_tests_per_thousand, cols1.positive_rate,\
        cols1.people_vaccinated, cols1.population, cols1.population_density, cols1.median_age,\
        cols1.gdp_per_capita, cols1.hospital_beds_per_thousand, cols1.life_expectancy, cols1.school_closures, cols1.total_cases).all()
        

    results_dict = []
    for iso, continent, location, date, daynum, newcasesmillion, newdeathsmillion, patientsmillion, newteststhousand, positiverate,\
        peoplevaccinated, population, popdensity, medianage, gdp, bedsthousand, lifeexpec, school_closures, cases in results:
   
         loop_dict = {}
         loop_dict["iso_code"] = iso
         loop_dict["continent"] = continent
         loop_dict["location"] = location
         loop_dict["date"] = date
         loop_dict["day_count"] = daynum
         loop_dict["new_cases_per_million"] = newcasesmillion
         loop_dict["new_deaths_per_million"] = newdeathsmillion
         loop_dict["hospitalizations_per_million"]= patientsmillion
         loop_dict["new_test_per_thousand"] = newteststhousand
         loop_dict["positive_rate"] = positiverate
         loop_dict["people_vaccinated"] = peoplevaccinated
         loop_dict["population"] = population
         loop_dict["pop_density"] = popdensity
         loop_dict["medianage"] = medianage
         loop_dict["gdp"] = gdp
         loop_dict["hosp_beds_per_thousand"] = bedsthousand
         loop_dict["life_expectancy"] = lifeexpec
         loop_dict["school_closures"] = school_closures
         loop_dict["total_cases"] = cases

         results_dict.append(loop_dict)

    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)

