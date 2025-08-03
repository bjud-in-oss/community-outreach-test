export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const tasks: Task[] = [
  { id: 1, title: 'Implement user authentication', status: 'approved' },
  { id: 2, title: 'Design the database schema', status: 'approved' },
  { id: 3, title: 'Create the landing page', status: 'pending' },
  { id: 4, title: 'Set up the CI/CD pipeline', status: 'rejected' },
  { id: 5, title: 'Write unit tests for the API', status: 'pending' },
  { id: 6, title: 'Deploy the application to production', status: 'pending' },
];
