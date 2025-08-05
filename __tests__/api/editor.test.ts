import { createMocks } from 'node-mocks-http';
import handler from '../../pages/api/editor';

jest.mock('@google/generative-ai');

describe('/api/editor', () => {
  it('returns a message and a 200 status code', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        content: 'test content',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        code: 'mocked content',
      })
    );
  });
});
