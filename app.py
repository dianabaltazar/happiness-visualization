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
    results = session.query(cols1.date_, cols1.iso_code, cols1.continent, 
                            cols1.location, cols1.total_cases, cols1.school_closures, cols1.day_num).all()
    # results = session.query(cols1.date_, cols1.iso_code, cols1.continent, 
    #                         cols1.location, cols1.total_cases, cols1.school_closures, cols1.new_cases, cols1.total_deaths,
    #                         cols1.new_deaths, cols1.total_cases_per_million, cols1.new_cases_per_million, 
    #                         cols1.total_deaths_per_million, cols1.new_deaths_per_million, cols1.hosp_patients,
    #                         cols1.hosp_patients_per_million, cols1.weekly_icu_admissions, cols1.weekly_icu_admissions_per_million,
    #                         cols1.weekly_hosp_admissions, cols1.weekly_hosp_admissions_per_million, cols1.new_tests, 
    #                         cols1.total_tests, cols1.total_tests_per_thousand, cols1.new_tests_per_thousand, cols1.positive_rate,
    #                         cols1.total_vaccinations, cols1.people_vaccinated, cols1.people_fully_vaccinated, cols1.new_vaccinations,
    #                         cols1.stringency_index, cols1.population, cols1.population_density, cols1.median_age, cols1.aged_65_older,
    #                         cols1.aged_70_older, cols1.gdp_per_capita, cols1.extreme_poverty, cols1.cardiovasc_death_rate, 
    #                         cols1.diabetes_prevalence, cols1.hospital_beds_per_thousand, cols1.life_expectancy, 
    #                         cols1.human_development_index).all()

    results_dict = []
    for date, iso, continent, location, total_cases, school_closures, daynum in results:
    # for date, iso, continent, loc, cases, school, new_cases, total_deaths, new_deaths, cases_million, deaths_million,\
    #     new_deaths_million, hosp_patients, hosp_patients_per_million, weekly_icu_admissions, weekly_icu_admissions_per_million, \
    #     weekly_hosp_admissions, weekly_hosp_admissions_per_million, new_tests, total_test, total_tests_per_thousand,\
    #     new_tests_per_thousand, positive_rate, total_vaccionations, people_vacc, people_full_vacc, new_vaccinations, \
    #     stringency, population, pop_density, median_age, aged_65, aged_70, gdp, ext_poverty, cardio_death_rate, diabetes_prevalence,\
    #     hosp_beds_per1000, life_expec, human_dev_index in results:
         loop_dict = {}
         loop_dict["date"] = date
         loop_dict["iso_code"] = iso
         loop_dict["continent"] = continent
         loop_dict["location"] = location
         loop_dict["total_cases"] = total_cases
         loop_dict["school_closures"] = school_closures
         loop_dict["day_count"] = daynum
    #     loop_dict["new_cases"] =  new_cases
    #     loop_dict["total_deaths"] =  total_deaths
    #     loop_dict["new_deaths"] =  new_deaths
    #     loop_dict["cases_million"] =  cases_million
    #     loop_dict["deaths_million"] =  deaths_million
    #     loop_dict["new_deaths_million"] =  new_deaths_million
    #     loop_dict["hosp_patients"] =  hosp_patients
    #     loop_dict["hosp_patients_per_million"] =  hosp_patients_per_million
    #     loop_dict["weekly_icu_admissions"] =  weekly_icu_admissions
    #     loop_dict["weekly_icu_admissions_per_million"] =  weekly_icu_admissions_per_million
    #     loop_dict["weekly_hosp_admissions"] =  weekly_hosp_admissions
    #     loop_dict["weekly_hosp_admissions_per_million"] =  weekly_hosp_admissions_per_million
    #     loop_dict["new_tests"] =  new_tests
    #     loop_dict["total_test"] =  total_test
    #     loop_dict["total_tests_per_thousand"] =  total_tests_per_thousand
    #     loop_dict["new_tests_per_thousand"] =  new_tests_per_thousand
    #     loop_dict["positive_rate"] =  positive_rate
    #     loop_dict["total_vaccionations"] =  total_vaccionations
    #     loop_dict["people_vaccinated"] =  people_vacc
    #     loop_dict["people_full_vaccinated"] =  people_full_vacc
    #     loop_dict["new_vaccinations"] =  new_vaccinations
    #     loop_dict["stringency_index"] =  stringency
    #     loop_dict["population"] = population
    #     loop_dict["pop_density"] =  pop_density
    #     loop_dict["median_age"] = median_age
    #     loop_dict["aged_65"] =  aged_65
    #     loop_dict["aged_70"] =  aged_70
    #     loop_dict["gdp"] = gdp
    #     loop_dict["ext_poverty"] = ext_poverty
    #     loop_dict["cardio_death_rate"] = cardio_death_rate
    #     loop_dict["diabetes_prevalence"] = diabetes_prevalence
    #     loop_dict["hosp_beds_per1000"] = hosp_beds_per1000
    #     loop_dict["life_expec"] = life_expec
    #     loop_dict["human_dev_index"] = human_dev_index

         results_dict.append(loop_dict)

    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)


# "iso_code","continent","location","date","total_cases",
# "total_vaccinations","population", "median_age",
# "gdp_per_capita","hospital_beds_per_thousand", "school_closures"
