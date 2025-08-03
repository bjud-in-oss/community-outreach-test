import type { NextPage } from 'next';
import Head from 'next/head';
import ApprovalList from '../components/ApprovalList';

const ApprovalPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Visual Approval Dashboard</title>
        <meta name="description" content="Visual approval dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold mb-4">Visual Approval Dashboard</h1>
        <ApprovalList />
      </main>
    </div>
  );
};

export default ApprovalPage;
