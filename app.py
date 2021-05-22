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
     = "ympsazqytxgdyd:"+PostgresK + \
    "@ec2-54-152-185-191.compute-1.amazonaws.com:5432/d9pes28e80ohoe"

#engine = create_engine("postgres://"+connection_string)
#engine.table_names()
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+connection_string
data = SQLAlchemy(app)

schools = data.Table('schoolclosuresh', data.metadata, autoload= True, autoload_with= data.engine)
covid = data.Table('coviddatah', data.metadata, autoload= True, autoload_with= data.engine)

Session = sessionmaker(bind=data.engine)

@app.route('/')
def index():
    
    """Return the dashboard homepage"""
    return render_template('index.html')

@app.route('/json-data')
def jsondata():
    cols1 = covid.columns
    session = Session()
    results = session.query(cols1.date, cols1.iso_code, cols1.continent, \
            cols1.location, cols1.total_cases).all()
    results_dict = []
    for date, iso, continent, loc, cases in results:
        loop_dict = {}
        loop_dict["date"] = date
        loop_dict["iso_code"] = iso
        loop_dict["continent"] = continent
        loop_dict["location"] = loc
        loop_dict["total cases"] = cases
        results_dict.append(loop_dict)

    
    return jsonify(results_dict)

if __name__ == "__main__":
    app.run(debug=True)


#  [('AFG', 'Asia', 'Afghanistan', '2/24/2020', 1, 1, None, None, 
#     0.026, 0.026, None, None, None, None, None, None, None, None, None, 
#     None, None, None, None, None, None, None, None, 8.33, 38.928341, 54.422, 
#     18.6, 2.581, 1.337, 1803.987, None, 597.029, 9.59, 0.5, 64.83, 0.511)