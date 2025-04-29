
import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const newMessage = { user: input, bot: "" };
    setMessages([...messages, newMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    newMessage.bot = data.response;
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>User: {msg.user}</p>
            <p>Bot: {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
import openai from 'openai'; // Подключи библиотеку OpenAI

const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Убедись, что ты добавил ключ API в переменные окружения
});

async function getGPTResponse(message) {
  try {
    const completion = await openaiClient.completions.create({
      model: "text-davinci-003", // Убедись, что используешь правильную модель
      prompt: message,
      max_tokens: 150,
    });
    return completion.choices[0].text;
  } catch (error) {
    console.error(error);
    return "Error occurred.";
  }
}

export default getGPTResponse;
import { useState } from 'react';

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setChatHistory([...chatHistory, { type: "user", text: message }]);
    setMessage("");
    
    // Получаем ответ от GPT
    const response = await getGPTResponse(message);
    setChatHistory((prev) => [
      ...prev,
      { type: "bot", text: response },
    ]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Chat with GPT</h1>
        <div className="overflow-y-auto max-h-80 mb-4 p-4 bg-gray-50 rounded-lg">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`mb-3 ${message.type === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${
                  message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="input-field mr-3"
          />
          <button type="submit" className="px-6 py-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;