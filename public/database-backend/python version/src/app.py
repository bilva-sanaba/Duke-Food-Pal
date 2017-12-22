'''
Created on Nov 9, 2017

@author: Bilva
'''
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"