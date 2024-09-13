from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)
message1 = ''

@app.route('/print', methods=['POST'])
def print_message():
    print(request)
    try:
        data = request.get_json()
        message = data.get('message', '')
        os.system(f'echo {message}')
        Label = send_data(message)
        print(Label)
        return jsonify({'label': Label})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    

def send_data(message):
    csv_file_path = '../classifier/data/microaggressions.csv'
    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        
        database = {}  
        
        for entry in csv_reader:  
            database[entry["sentence"]] = entry["label"]  
        def detect(message):
            if message in database:
                Label = database[message]
            else: 
                Label = "none"  
            return Label
        Label = detect(message)
        return Label
        
if __name__ == '__main__':
    app.run(port=5000)