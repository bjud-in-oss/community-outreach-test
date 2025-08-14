import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { JulesAutomationAgent, RepositoryAnalysis } from '../src/jules-agent';

interface TestPageProps {
  analysis: RepositoryAnalysis;
}

const Test: NextPage<TestPageProps> = ({ analysis }) => {
  return (
    <div>
      <Head>
        <title>Test Page - System Analysis</title>
        <meta name="description" content="System analysis results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>System Analysis</h1>

        <h2>Project Type</h2>
        <p>{analysis.projectType}</p>

        <h2>Key Dependencies</h2>
        <ul>
          {analysis.keyDependencies.map(dep => (
            <li key={dep.name}>{dep.name}: {dep.version}</li>
          ))}
        </ul>

        <h2>Testing Setup</h2>
        <p>Framework: {analysis.testingSetup.framework || 'Not specified'}</p>
        {analysis.testingSetup.testingLibrary && (
          <p>Library: {analysis.testingSetup.testingLibrary}</p>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const agent = new JulesAutomationAgent();
  const analysis = await agent.analyzeRepository();

  return {
    props: {
      analysis,
    },
  };
};

export default Test;
