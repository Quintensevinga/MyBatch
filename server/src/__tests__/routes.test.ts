import supertest from 'supertest';

import { app } from '../../src/index';

describe('Main route', () => {
  test('Get all', async () => {
    const res = await supertest(app).get('/heal');
    expect(200);
  });
  test('Get all users', async () => {
    const res = await supertest(app).get('/users');
    expect(res.body).toEqual(['Goon', 'Tsuki', 'Joe']);
  });
});
