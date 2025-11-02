const request = require('supertest');
const app = require('../src/app');
const db = require('./setup');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Auth routes', () => {
  test('register -> creates user', async () => {
    const res = await request(app).post('/api/auth/register')
      .send({ username: 't1', email: 't1@example.com', password: 'pass123' });
    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('t1@example.com');
  });

  test('login -> returns token', async () => {
    await request(app).post('/api/auth/register')
      .send({ username: 't2', email: 't2@example.com', password: 'pass123' });
    const res = await request(app).post('/api/auth/login')
      .send({ email: 't2@example.com', password: 'pass123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
