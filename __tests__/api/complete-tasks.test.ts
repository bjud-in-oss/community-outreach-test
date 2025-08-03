import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/complete-tasks';

describe('/api/complete-tasks', () => {
  it('should return 200 and a success message for POST requests', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Tasks completed successfully',
    });
  });

  it('should return 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Method not allowed',
    });
  });
});
