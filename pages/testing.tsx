import type { NextPage } from 'next';
import Head from 'next/head';
import { QRCodeCanvas } from 'qrcode.react';

const Testing: NextPage = () => {
  const deploymentUrl = 'https://my-deployment.vercel.app';

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Head>
        <title>Live Testing Dashboard</title>
        <meta name="description" content="Live testing dashboard for the project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Live Testing Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h2>Deployment Status</h2>
            <p>Status: <span style={{ color: 'green' }}>Live</span></p>
            <p>URL: <a href={deploymentUrl}>{deploymentUrl}</a></p>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '1rem', textAlign: 'center' }}>
            <h2>QR Code</h2>
            <p>Scan to view on your device</p>
            <QRCodeCanvas value={deploymentUrl} />
          </div>

          <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h2>Performance Metrics</h2>
            <p>Loading Time: 1.2s</p>
            <p>First Contentful Paint: 0.8s</p>
            <p>Time to Interactive: 1.5s</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Testing;
