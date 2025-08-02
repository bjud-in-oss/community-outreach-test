import { createMocks } from 'node-mocks-http';
import handler from '../status';

describe('/api/status', () => {
  test('returns a message', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Status check complete',
    });
  });
});
