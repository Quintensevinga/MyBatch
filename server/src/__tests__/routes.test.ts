import supertest from 'supertest';
import { createServer } from '../server';

const app = createServer();
const request = supertest(app);
describe('Main route', () => {
  test('Get all', async () => {
    const res = await request.get('/health');
    expect(res.status).toBe(200);
  });
  test('Get all users', async () => {
    const res = await supertest(app).get('/users');
    expect(res.body).toEqual(['Goon', 'Tsuki', 'Joe']);
    expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
  });
  test('post all users', async () => {
    const bodyData = [
      {
        username: 'username',
      },
      {
        password: 'password',
      },
      {},
    ];
    for (const body of bodyData) {
      const response = await request.post('/users').send(body);
      expect(response.statusCode).toBe(400);
    }
  });

  it('gets the test endpoint', async () => {
    const response = await request.get('/test');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
  });
});
