import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Community Outreach</title>
        <meta name="description" content="A platform for community outreach and engagement." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to the Community Outreach Platform!
        </h1>
        <p>
          Connecting communities, one outreach at a time.
        </p>
      </main>
    </div>
  );
};

export default Home;
