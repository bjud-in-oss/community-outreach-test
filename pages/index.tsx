import type { NextPage } from 'next';
import Head from 'next/head';
import BranchManager from '../src/ui/branch-manager/BranchManager';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Branch Manager</title>
        <meta name="description" content="Branch management interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BranchManager />
      </main>
    </div>
  );
};

export default Home;
