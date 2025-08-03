import type { NextPage } from 'next';
import Head from 'next/head';
import Dashboard from '../components/Dashboard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Local Development Dashboard</title>
        <meta name="description" content="Local Development Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Dashboard />
      </main>
    </div>
  );
};

export default Home;
