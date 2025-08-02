import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/merge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Autonomous PR Merging</title>
        <meta name="description" content="Autonomous PR Merging" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Autonomous PR Merging</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter GitHub PR URL"
            className="p-2 border rounded"
          />
          <button
            onClick={handleMerge}
            className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Merging...' : 'Merge PR'}
          </button>
          {message && (
            <div className="p-4 bg-green-100 text-green-700 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
