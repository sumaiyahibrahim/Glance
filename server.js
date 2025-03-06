const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/chatbot', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.gemini.ai/chatbot', { message: userMessage });
        res.json({ reply: response.data.reply });
    } catch (error) {
        res.status(500).json({ reply: 'Sorry, I could not understand that.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
