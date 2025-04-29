type Props = { bot: string; setBot: (b: string) => void };

export default function BotsSwitcher({ bot, setBot }: Props) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label>Режим: </label>
      <select value={bot} onChange={(e) => setBot(e.target.value)}>
        <option value="funny">Gen Z прикольчик</option>
        <option value="classic">Классический GPT</option>
      </select>
    </div>
  );
}