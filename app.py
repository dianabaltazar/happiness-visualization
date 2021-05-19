# Import Dependencies
import pandas as pd 
import numpy as np

from config import PostgresK
import psycopg2

import sqlalchemy
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template

app = Flask(__name__)

# Create the connection engine
connection_string = f'vpiijrpdtosgpt:{PostgresK}@ec2-54-166-167-192.compute-1.amazonaws.com:5432/d1j88kvbcshh7l'
engine = create_engine(f'postgresql://{connection_string}')

engine.table_names()

# Naming our data
data = pd.read_sql('SELECT cd.*, sc.school_closures FROM coviddatah cd INNER JOIN  schoolclosuresh sc ON  sc.date = cd.date AND sc.iso_code = cd.iso_code',con=engine)

# To date type
data.loc[:,'date'] = pd.to_datetime(data.loc[:,'date'],format='%m/%d/%Y')

# Save a reference to those classes called `Station` and `Measurement`
location = data["location"]
date = data["date"]
total_cases = data["total_cases"]
extreme_poverty = data["extreme_poverty"]
median_age = data["median_age"]
school_closures = data["school_closures"]


# Create a session for the engine to manipulate data
session = Session(engine)


@app.route('/')
def index():
    """Return the dashboard homepage"""
    return render_template('index.html')

if __name__ == "__main__":
    app.run()