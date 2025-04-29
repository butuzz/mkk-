
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