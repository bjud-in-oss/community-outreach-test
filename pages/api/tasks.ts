import type { NextApiRequest, NextApiResponse } from 'next';

let tasks = [
  { id: 1, title: 'Implement Feature X', status: 'Pending Approval' },
  { id: 2, title: 'Fix Bug Y', status: 'Completed' },
  { id: 3, title: 'Refactor Component Z', status: 'To Do' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const newTask = {
      id: tasks.length + 1,
      title,
      status: 'To Do',
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'PUT') {
    const { id, status } = req.body;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex > -1) {
      tasks[taskIndex].status = status;
      res.status(200).json(tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
