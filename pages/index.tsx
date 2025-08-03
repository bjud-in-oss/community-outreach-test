import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Agent } from '../src/agent/agent';
import { Context } from '../src/implementations/Context';

const Home: NextPage = () => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [response, setResponse] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const context = new Context();
    context.createSession().then(session => {
      setAgent(new Agent(context, session.id));
    });
  }, []);

  const handleSendMessage = async () => {
    if (agent) {
      const res = await agent.processMessage(message);
      setResponse(res);
      setMessage('');
    }
  };

  return (
    <div>
      <Head>
        <title>Jules Agent</title>
        <meta name="description" content="Jules Agent with Context Preservation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Jules Agent</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
        <pre>{response}</pre>
      </main>
    </div>
  );
};

export default Home;
