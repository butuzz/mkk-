import Head from 'next/head';
import ChatUI from '../components/ChatUI';

export default function Home() {
  return (
    <>
      <Head>
        <title>My ChatGPT</title>
      </Head>
      <main>
        <ChatUI />
      </main>
    </>
  );
}