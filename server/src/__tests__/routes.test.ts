import supertest from 'supertest';
import { createServer } from '../server';
const app = createServer();
const request = supertest(app);
describe('Main route', () => {
  test('Get all', async () => {
    const res = await request.get('/heal');
    expect(200);
  });
  test('Get all users', async () => {
    const res = await supertest(app).get('/users');
    expect(res.body).toEqual(['Goon', 'Tsuki', 'Joe']);
  });

  it('gets the test endpoint', async () => {
    const response = await request.get('/test');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('pass!');
  });
});
