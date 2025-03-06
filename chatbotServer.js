const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/chatbot', (req, res) => {
    const userMessage = req.body.message;
    // Here you can integrate with a real chatbot service like Dialogflow, OpenAI, etc.
    const botReply = `You said: ${userMessage}`;
    res.json({ reply: botReply });
});

app.listen(port, () => {
    console.log(`Chatbot server running on port ${port}`);
});
