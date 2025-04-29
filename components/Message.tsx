type Props = { role: string; content: string };

export default function Message({ role, content }: Props) {
  const isUser = role === 'user';
  return (
    <div style={{
      textAlign: isUser ? 'right' : 'left',
      background: isUser ? '#d1e7dd' : '#f8d7da',
      padding: '10px 15px',
      margin: '5px 0',
      borderRadius: 8,
    }}>
      <b>{isUser ? 'Ты' : 'GPT'}:</b> {content}
    </div>
  );
}