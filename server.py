from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your Gemini AI API key
GEMINI_API_KEY = 'your_gemini_api_key'
GEMINI_API_URL = 'https://api.gemini.ai/v1/chat'

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    headers = {
        'Authorization': f'Bearer {GEMINI_API_KEY}',
        'Content-Type': 'application/json'
    }
    data = {
        'message': user_message
    }
    response = requests.post(GEMINI_API_URL, headers=headers, json=data)
    response_data = response.json()
    reply = response_data.get('reply', 'Sorry, I could not understand that.')
    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(port=3000)
