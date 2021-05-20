# Import Dependencies

import pandas as pd 
import numpy as np

from config import PostgresK
import psycopg2

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Create the connection engine
connection_string = "vpiijrpdtosgpt:"+PostgresK+"@ec2-54-166-167-192.compute-1.amazonaws.com:5432/d1j88kvbcshh7l"

#engine = create_engine("postgres://"+connection_string)
#engine.table_names()
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://"+connection_string
data = SQLAlchemy(app)

schools = data.Table('schoolclosuresh', data.metadata, autoload= True, autoload_with= data.engine)
covid = data.Table('coviddatah', data.metadata, autoload= True, autoload_with= data.engine)



@app.route('/')
def index():
    
    """Return the dashboard homepage"""
    return render_template('index.html')

if __name__ == "__main__":
    app.run()