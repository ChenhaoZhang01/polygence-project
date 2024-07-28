# %% Modules

from flask import Flask, request

# %% Application

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/echo")
def echo():
    message = request.args.get('message', default = 1, type = str)
    return "<p>I GOT THE MESSAGE: %s</p>" % (message)
