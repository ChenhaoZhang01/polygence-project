from flask import Flask, request, jsonify
import os
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)
@app.route('/print', methods=['POST'])
def print_message():
    try:
        data = request.get_json()  # Get JSON data from the request
        message = data.get('message', '')  # Extract the message field
        os.system(f'echo {message}')  # Print the message to the Command Prompt
        return jsonify({'status': 'success', 'message': 'Message printed'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)