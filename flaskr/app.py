# Import Dependencies
import pandas as pd
import numpy as np

from config import PostgresK
import psycopg2

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# Create the connection engine
connection_string = "ympsazqytxgdyd:"+PostgresK + \
    "@ec2-54-152-185-191.compute-1.amazonaws.com:5432/d9pes28e80ohoe"

app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+connection_string
data = SQLAlchemy(app)

schools = data.Table('schoolclosuresh', data.metadata,
                     autoload=True, autoload_with=data.engine)
covid = data.Table('coviddatah', data.metadata,
                   autoload=True, autoload_with=data.engine)

Session = sessionmaker(bind=data.engine)


@app.route('/')
def index():
    """Return the dashboard homepage"""
    return render_template('index.html')


@app.route('/json-data')
def jsondata():
    session = Session()

    cols1 = covid.columns
    results = session.query(cols1.date, cols1.iso_code, cols1.continent,
                            cols1.location, cols1.total_cases).all()

    results_dict = []
    for date, iso, continent, loc, cases in results:
        loop_dict = {}
        loop_dict["date"] = date
        loop_dict["iso_code"] = iso
        loop_dict["continent"] = continent
        loop_dict["location"] = loc
        loop_dict["total_cases"] = cases
        #loop_dict["school_closures"] = school

        results_dict.append(loop_dict)

    # cols2 = schools.columns
    # results2 = session.query(cols2.country, cols2.iso_code, cols2.date,
    #                          cols2.school_closures).all()

    # results_dict2 = []
    # for loc, iso, date, school in results2:
    #     loop_dict2 = {}
    #     loop_dict2["country"] = loc
    #     loop_dict2["iso_code"] = iso
    #     loop_dict2["date"] = date
    #     loop_dict2["school_closures"] = school

    #     results_dict2.append(loop_dict2)

    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)
