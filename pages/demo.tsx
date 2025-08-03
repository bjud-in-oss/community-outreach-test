import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { calculate, Operator } from '../lib/calculator';

const Demo: NextPage = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [operator, setOperator] = useState<Operator>('+');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    try {
      const res = calculate({ a, b, operator });
      setResult(res);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Calculator Demo</title>
        <meta name="description" content="Calculator Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Calculator Demo</h1>

        <div>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
          />
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value as Operator)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />
          <button onClick={handleCalculate}>=</button>
          <span>{result}</span>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
    </div>
  );
};

export default Demo;
