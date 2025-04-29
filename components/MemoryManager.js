import { useState } from "react";

export default function MemoryManager({ history, onClearHistory }) {
  return (
    <div>
      <h2>Chat History</h2>
      <div>
        {history.map((entry, index) => (
          <div key={index}>
            <p>User: {entry.user}</p>
            <p>Bot: {entry.bot}</p>
          </div>
        ))}
      </div>
      <button onClick={onClearHistory}>Clear History</button>
    </div>
  );
}