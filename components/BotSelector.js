import { useState } from "react";

export default function BotSelector({ onSelectBot }) {
  const [selectedBot, setSelectedBot] = useState("");

  const bots = [
    { name: "GPT-4", model: "gpt-4" },
    { name: "GPT-3.5", model: "gpt-3.5-turbo" },
    // Добавь своих ботов здесь
  ];

  const handleSelect = (bot) => {
    setSelectedBot(bot.name);
    onSelectBot(bot.model);
  };

  return (
    <div>
      <h2>Select a Bot</h2>
      {bots.map((bot, index) => (
        <button key={index} onClick={() => handleSelect(bot)}>
          {bot.name}
        </button>
      ))}
      {selectedBot && <p>Selected Bot: {selectedBot}</p>}
    </div>
  );
}