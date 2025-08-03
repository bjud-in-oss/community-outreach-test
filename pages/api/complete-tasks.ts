import type { NextApiRequest, NextApiResponse } from 'next';

type Task = {
  id: number;
  name: string;
  status: string;
};

const tasks: Task[] = [
  { id: 1, name: 'Task 1', status: 'Ready for review' },
  { id: 2, name: 'Task 2', status: 'In progress' },
  { id: 3, name: 'Task 3', status: 'Ready for review' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const completedTasks = tasks.filter(
      (task) => task.status === 'Ready for review'
    );
    completedTasks.forEach((task) => {
      task.status = 'completed';
    });
    res.status(200).json({ message: 'Tasks completed successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
