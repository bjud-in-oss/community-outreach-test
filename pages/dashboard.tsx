import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import TaskCard from '../components/TaskCard';
import { tasks as initialTasks, Task } from '../data/tasks';

const Dashboard: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleApprove = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'approved' } : task));
  };

  const handleReject = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'rejected' } : task));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Visual Approval Dashboard</title>
        <meta name="description" content="Task approval and management dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Visual Approval Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onApprove={handleApprove} onReject={handleReject} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
