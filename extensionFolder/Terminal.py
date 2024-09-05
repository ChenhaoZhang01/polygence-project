from flask import Flask, request, jsonify
import os
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)


@app.route('/print', methods=['POST'])
def print_message():
    try:
        data = request.get_json()
        message = data.get('message', '')  
        os.system(f'echo {message}')  
        return jsonify({'status': 'success', 'message': 'Message printed'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

data1 = 'null'
@app.route('/data', methods=['GET'])
def send_data():
    csv_file_path = '../classifier/data/microaggressions.csv'
    with open(csv_file_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
        dataset = [row for row in csv_reader]
        global message
        detect(message)
        def detect(sentence):
            if sentence in dataset:
                global data1
                Label = dataset[sentence]
                if Label == 1:
                    data1= 1
                    pass
                elif Label == 2:
                    data1 = 2
                    pass
                elif Label ==3:
                    data1 = 3
                    pass
                elif Label == 0:
                    data1 = 0
                    pass
                pass
            pass
    print(data1)
    return jsonify({data1})
        




if __name__ == '__main__':
    app.run(port=5000)