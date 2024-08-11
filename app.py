# %% Modules
import time
from flask import Flask, request, jsonify
from flask_cors import CORS

# %% Application

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/echo')
def echo():
    message = request.args.get('message')
    if message:
        return f'MESSAGE: {message}'
    else:
        return 'No message provided!'

