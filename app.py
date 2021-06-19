# Import Dependencies
import pandas as pd
import numpy as np

# from config import PostgresK
import psycopg2


from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Create the connection engine
connection_string = "ympsazqytxgdyd:"+"84f61aeda6880d7b357752a62d790ff878b9b80328a5e86c9436dae6fda1439f" + \
    "@ec2-54-152-185-191.compute-1.amazonaws.com:5432/d9pes28e80ohoe"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://"+connection_string
data = SQLAlchemy(app)

covid = data.Table('mergedcovid2', data.metadata,
                   autoload=True, autoload_with=data.engine)

Session = sessionmaker(bind=data.engine)


@app.route('/')
def index():
    """Return the dashboard homepage"""
    return render_template('index.html')

@app.route('/documentation')
def documentation():
    """Return the dashboard homepage"""
    return render_template('documentation.html')


@app.route('/json-data')
def jsondata():
    session = Session()
    cols1 = covid.columns
    results = session.query(cols1.date, cols1.iso_code, cols1.continent,
                            cols1.location, cols1.total_cases, cols1.school_closures,
                            cols1.total_vaccinations, cols1.population, cols1.median_age,
                            cols1.gdp_per_capita, cols1.hospital_beds_per_thousand).all()

    results_dict = []
    for date, iso, continent, loc, cases, school, vaccines,\
            population, median_age, gdp_per_capita, beds in results:
        loop_dict = {}
        loop_dict["date"] = date
        loop_dict["iso_code"] = iso
        loop_dict["continent"] = continent
        loop_dict["location"] = loc
        loop_dict["total_cases"] = cases
        loop_dict["school_closures"] = school
        loop_dict["total_vaccinations"] = vaccines
        loop_dict["population"] = population
        loop_dict["median_age"] = median_age
        loop_dict["gdp"] = gdp_per_capita
        loop_dict["beds"] = beds

        results_dict.append(loop_dict)

    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)


# "iso_code","continent","location","date","total_cases",
# "total_vaccinations","population", "median_age",
# "gdp_per_capita","hospital_beds_per_thousand", "school_closures"
