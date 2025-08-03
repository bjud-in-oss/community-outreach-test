import { useState } from 'react';

const CompleteTasksButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/complete-tasks', {
        method: 'POST',
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Completing...' : 'Complete Ready for Review Tasks'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompleteTasksButton;
