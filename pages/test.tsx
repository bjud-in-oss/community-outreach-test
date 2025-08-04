import type { NextPage } from 'next';
import Head from 'next/head';

const Test: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Test Page</title>
        <meta name="description" content="This is a test page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          This is a test page.
        </h1>
      </main>
    </div>
  );
};

export default Test;
