from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import nltk
from nltk.corpus import stopwords
from bs4 import BeautifulSoup
import requests

nltk.download('stopwords')

app = Flask(__name__)

# Sample training data
training_data = [
    ("Hello", "Hi there! How can I help you?"),
    ("Hi", "Hello! How can I assist you today?"),
    ("What are your store hours?", "We are open from 9 AM to 9 PM."),
    ("When do you open?", "We open at 9 AM every day."),
    ("When do you close?", "We close at 9 PM every day."),
    ("Where are you located?", "We are located at 123 Main Street."),
    ("What is your address?", "Our address is 123 Main Street."),
    ("Do you have any discounts?", "Yes, we have seasonal discounts. Please check our website for more details."),
    ("What is your return policy?", "You can return any item within 30 days of purchase."),
    ("How can I contact customer service?", "You can contact our customer service at support@example.com."),
]

# Prepare training data
X_train = [x[0] for x in training_data]
y_train = [x[1] for x in training_data]

# Vectorize the data
vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
X_train_vectorized = vectorizer.fit_transform(X_train)

# Train a simple model
model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

def scrape_details(query):
    # Example scraping function
    url = "https://example.com/search?q=" + query
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    # Extract relevant details from the page
    details = soup.find('div', class_='details').text
    return details

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    user_message_vectorized = vectorizer.transform([user_message])
    response = model.predict(user_message_vectorized)[0]
    
    # If the model cannot provide a response, scrape details
    if response == 'Sorry, I could not understand that.':
        response = scrape_details(user_message)
    
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(port=3000)
