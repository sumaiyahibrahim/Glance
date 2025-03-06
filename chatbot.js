document.addEventListener('DOMContentLoaded', function () {
    var chatbotContainer = document.querySelector('.chatbot-container');
    var chatbotHeader = document.querySelector('.chatbot-header');
    var chatbotMessages = document.getElementById('chatbot-messages');
    var chatbotInput = document.getElementById('chatbot-input');
    var sendChatbotButton = document.getElementById('send-chatbot');
    var closeChatbotButton = document.getElementById('close-chatbot');

    sendChatbotButton.addEventListener('click', function () {
        var input = chatbotInput.value;
        var userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = input;
        chatbotMessages.appendChild(userMessage);
        chatbotInput.value = '';

        // Send user message to chatbot API
        axios.post('http://localhost:3000/chatbot', { message: input })
            .then(function (response) {
                var botMessage = document.createElement('div');
                botMessage.className = 'bot-message';
                botMessage.textContent = response.data.reply;
                chatbotMessages.appendChild(botMessage);
            })
            .catch(function (error) {
                var botMessage = document.createElement('div');
                botMessage.className = 'bot-message';
                botMessage.textContent = 'Sorry, I could not understand that.';
                chatbotMessages.appendChild(botMessage);
            });
    });

    closeChatbotButton.addEventListener('click', function () {
        chatbotContainer.style.display = 'none';
    });
});

document.getElementById('chatbot-send').addEventListener('click', function () {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (message) {
        addMessage('You', message);
        input.value = '';
        // Send user message to chatbot API
        axios.post('http://localhost:3000/chatbot', { message: message })
            .then(function (response) {
                addMessage('Bot', response.data.reply);
            })
            .catch(function (error) {
                addMessage('Bot', 'Sorry, I could not understand that.');
            });
    }
});

function addMessage(sender, message) {
    const messages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${sender}: ${message}`;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}
