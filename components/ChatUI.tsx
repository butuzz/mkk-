import { useEffect, useRef, useState } from 'react';
import Message from './Message';
import BotsSwitcher from './BotsSwitcher';
import ExploreGPT from './ExploreGPT';

export default function ChatUI() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Привет! Чем займёмся сегодня?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bot, setBot] = useState('funny'); // 'funny' или 'classic'
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages, bot }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Что-то пошло не так...';
    setMessages([...newMessages, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMessages([...messages, { role: 'user', content: `📷 Фото: ${file.name}` }]);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h1>GPT-Помощник</h1>
      <BotsSwitcher bot={bot} setBot={setBot} />
      <ExploreGPT />
      <div style={{ marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <Message key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <Message role="assistant" content="Печатает..." />}
      </div>
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Напиши что-нибудь..."
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
        <button onClick={handleSend}>Отправить</button>
        <button onClick={() => fileInputRef.current?.click()}>Фото</button>
        <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} />
      </div>
    </div>
  );
}