const request = require('supertest');
const app = require('../src/app');
const db = require('./setup');
const User = require('../src/models/User');

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

async function createUserAndToken(role='admin') {
  const user = await User.create({ username: 'adm', email: `a-${Date.now()}@x.com`, password: 'pass123', role });
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'testsecret', { expiresIn: '1h' });
  return token;
}

describe('Sweets routes', () => {
  test('admin can create and get sweets', async () => {
    const token = await createUserAndToken('admin');
    const create = await request(app).post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Ladoo', category: 'Indian', price: 20, quantity: 10 });
    expect(create.statusCode).toBe(201);
    const list = await request(app).get('/api/sweets').set('Authorization', `Bearer ${token}`);
    expect(list.statusCode).toBe(200);
    expect(list.body.length).toBe(1);
  });

  test('purchase decreases quantity', async () => {
    const token = await createUserAndToken('admin');
    const create = await request(app).post('/api/sweets')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Barfi', category: 'Indian', price: 10, quantity: 2 });
    const id = create.body._id;
    const buy = await request(app).post(`/api/sweets/${id}/purchase`).set('Authorization', `Bearer ${token}`);
    expect(buy.statusCode).toBe(200);
    expect(buy.body.sweet.quantity).toBe(1);
  });
});
