# Import Dependencies

import pandas as pd 
import numpy as np

from config import PostgresK
import psycopg2
#import sqlalchemy
#from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Create the connection engine
connection_string = "vpiijrpdtosgpt:"+PostgresK+"@ec2-54-166-167-192.compute-1.amazonaws.com:5432/d1j88kvbcshh7l"
connection_string = "vpiijrpdtosgpt:73f1af10cd6cfbe8e7063728c0c3cd6bf103d256144d8104aadc1e7c68e33063@ec2-54-166-167-192.compute-1.amazonaws.com:5432/d1j88kvbcshh7l"

#engine = create_engine("postgres://"+connection_string)
#engine.table_names()
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+connection_string
data = SQLAlchemy(app)

schools = data.Table('schoolclosuresh', data.metadata, autoload= True, autoload_with= data.engine)
covid = data.Table('coviddatah', data.metadata, autoload= True, autoload_with= data.engine)

#['schoolclosuresh', 'coviddatah']

# Naming our data
#data = pd.read_sql('SELECT cd.*, sc.school_closures FROM coviddatah cd INNER JOIN  schoolclosuresh sc ON  sc.date = cd.date AND sc.iso_code = cd.iso_code',con=engine)

# To date type
#data.loc[:,'date'] = pd.to_datetime(data.loc[:,'date'],format='%m/%d/%Y')

# Save a reference to those classes called `Station` and `Measurement`

# class Covid(data.Model):
#     iso_code = data.Column(data.String(120), unique=False, nullable=False)
#     continent = data.Column(data.String(120), nullable=False)
#     location = data.Column(data.String(120), nullable=False)
#     date = data.Column(data.DateTime, nullable=False)
#     total_cases = data.Column(data.Integer, unique=False, nullable=False)
#     total_vaccinations = data.Column(data.String(120), unique=False, nullable=False)
#     population = data.Column(data.Float, unique=False, nullable=False)
#     median_age = data.Column(data.Integer, unique=False, nullable=False)
#     gdp_per_capita = data.Column(data.Integer, unique=False, nullable=False)
#     hospital_beds_per_thousand = data.Column(data.String(120), unique=False, nullable=False)
#     school_closures = data.Column(data.Integer, unique=False, nullable=False)

    # primary_key=True 

#def __repr__(self):
        #return '<Covid %r>' % self.iso_code

# Create a session for the engine to manipulate data
#session = Session(engine)
# py = Covid()
# data.session.add(py)


@app.route('/')
def index():
    bla = data.session.query(covid).all()
    for x in bla:
        print(x.location)
    """Return the dashboard homepage"""
    return render_template('/templates/index.html')

if __name__ == "__main__":
    app.run()