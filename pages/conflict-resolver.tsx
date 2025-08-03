import type { NextPage } from 'next';
import Head from 'next/head';
import { ConflictResolver } from '../lib/ConflictResolver';
import { PullRequest } from '../lib/PullRequest';
import { useState, useEffect } from 'react';

const ConflictResolverPage: NextPage = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const prs = [
      new PullRequest(1),
      new PullRequest(2),
      new PullRequest(3),
      new PullRequest(4),
      new PullRequest(5),
    ];
    const conflictLogs = ConflictResolver.handleConflicts(prs);
    setLogs(conflictLogs);
  }, []);

  return (
    <div>
      <Head>
        <title>Conflict Resolver</title>
        <meta name="description" content="Conflict Resolver" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Conflict Resolver Logs</h1>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default ConflictResolverPage;
