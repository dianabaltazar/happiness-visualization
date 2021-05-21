# Import Dependencies

from datetime import datetime

import numpy as np
import pandas as pd
import psycopg2

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import PostgresK

app = Flask(__name__)

# Create the connection engine
connection_string = "ympsazqytxgdyd:"+PostgresK + \
    "@ec2-54-152-185-191.compute-1.amazonaws.com:5432/d9pes28e80ohoe"

#engine = create_engine("postgres://"+connection_string)
# engine.table_names()
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+connection_string
data = SQLAlchemy(app)

# schools = data.Table('schoolclosuresh', data.metadata, autoload= True, autoload_with= data.engine)
# covid = data.Table('coviddatah', data.metadata, autoload= True, autoload_with= data.engine)


@app.route('/')
def index():
    schools = pd.read_sql_table(
        'schoolclosuresh', "postgres://"+connection_string)
    covid = pd.read_sql_table('coviddatah', "postgres://"+connection_string)

    merged = schools.merge(covid, how='inner')

    schoolsJSON = merged.iloc[0:5, :].to_json(orient="records")
    print(schoolsJSON)
    # for i in bla:
    #     print(i)
    """Return the dashboard homepage"""
    return schoolsJSON


if __name__ == "__main__":
    app.run()
