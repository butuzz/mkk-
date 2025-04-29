export default async function handler(req, res) {
  const { messages, bot } = req.body;
  const systemPrompt = bot === 'funny'
    ? "Ты отвечаешь весело, дерзко, как Gen Z TikTokер."
    : "Ты классический AI-помощник.";

  const result = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    }),
  });

  const data = await result.json();
  res.status(200).json(data);
}