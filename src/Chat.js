import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState } from 'react';
import './styles.css';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);

    try {
      const result = await model.generateContent(input);
      const botMessage = result.response.text();
      setMessages([...newMessages, { text: botMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { text: 'Error occurred. Try again!', sender: 'bot' }]);
    } finally {
      setInput('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>
            <pre className="response-text">{msg.text}</pre>
            {msg.sender === 'bot' && (
              <button className="btn btn-outline-secondary copy-btn" onClick={() => copyToClipboard(msg.text)}>
                Copy
              </button>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">Send</button>
      </form>
    </div>
  );
};

export default Chat;
