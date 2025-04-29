export function saveChatHistory(history) {
  if (typeof window !== "undefined") {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }
}

export function getChatHistory() {
  if (typeof window !== "undefined") {
    const history = localStorage.getItem("chatHistory");
    return history ? JSON.parse(history) : [];
  }
}

export function clearChatHistory() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("chatHistory");
  }
}