import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

const TestingPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Live Testing</title>
        <meta name="description" content="Live testing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Live Testing for Task {id}</h1>
        <div className="p-4 border rounded-md">
          <p>This is the live testing environment for task {id}.</p>
          <p>Here, you can interact with the new feature or bug fix.</p>
        </div>
      </main>
    </div>
  );
};

export default TestingPage;
