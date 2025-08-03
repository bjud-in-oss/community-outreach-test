import type { NextPage } from 'next';
import Head from 'next/head';
import DashboardComponent from '../components/Dashboard';

const Dashboard: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PR Approval Dashboard</title>
        <meta name="description" content="Visual approval dashboard for PR management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DashboardComponent />
      </main>
    </div>
  );
};

export default Dashboard;
