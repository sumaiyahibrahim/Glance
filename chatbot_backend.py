from flask import Flask, request, jsonify
import nltk
from nltk.chat.util import Chat, reflections

app = Flask(__name__)

# Sample pairs for NLTK Chat
pairs = [
    [
        r"my name is (.*)",
        ["Hello %1, How can I assist you today?",]
    ],
    [
        r"what is your name ?",
        ["My name is GlanceBot.",]
    ],
    [
        r"how are you ?",
        ["I'm doing good. How about you?",]
    ],
    [
        r"sorry (.*)",
        ["It's alright.", "No problem.",]
    ],
    [
        r"i'm (.*) doing good",
        ["Nice to hear that.", "How can I assist you today?",]
    ],
    [
        r"what is the price of (.*)",
        ["The price of our products ranges from ₹1,245 to ₹4,150.",]
    ],
    [
        r"do you accept (.*) cards?",
        ["We accept credit cards, debit cards, and PayPal.",]
    ],
    [
        r"where are you located?",
        ["We are located at 123 Main Street, Anytown, USA.",]
    ],
    [
        r"how can I contact support?",
        ["You can reach our support team at support@glance.com.",]
    ],
    [
        r"what are your store hours?",
        ["Our store is open from 9 AM to 9 PM, Monday to Saturday.",]
    ],
    [
        r"do you offer discounts?",
        ["We have seasonal discounts. Please check our homepage for current offers.",]
    ],
    [
        r"what payment methods do you accept?",
        ["We accept credit cards, debit cards, and PayPal.",]
    ],
    [
        r"do your products come with a warranty?",
        ["Our products come with a 1-year warranty.",]
    ],
    [
        r"how can I get support?",
        ["You can reach our support team at support@glance.com.",]
    ],
    [
        r"quit",
        ["Bye! Take care.", "Have a great day!",]
    ],
]

chat = Chat(pairs, reflections)

@app.route("/chatbot", methods=["POST"])
def chatbot():
    user_message = request.json.get("message")
    response = chat.respond(user_message)
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(debug=True)
