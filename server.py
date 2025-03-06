from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')

app = Flask(__name__)

# Sample training data
training_data = [
    ("Hello", "Hi there! How can I help you?"),
    ("What are your store hours?", "We are open from 9 AM to 9 PM."),
    ("Where are you located?", "We are located at 123 Main Street."),
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

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json['message']
    user_message_vectorized = vectorizer.transform([user_message])
    response = model.predict(user_message_vectorized)[0]
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(port=3000)
