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

covid = data.Table('mergedcovid', data.metadata,
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
                            cols1.location, cols1.total_cases, cols1.school_closures).all()

    results_dict = []
    for date, iso, continent, loc, cases, school in results:
        loop_dict = {}
        loop_dict["date"] = date
        loop_dict["iso_code"] = iso
        loop_dict["continent"] = continent
        loop_dict["location"] = loc
        loop_dict["total_cases"] = cases
        loop_dict["school_closures"] = school

        results_dict.append(loop_dict)

    return jsonify(results_dict)


if __name__ == "__main__":
    app.run(debug=True)
