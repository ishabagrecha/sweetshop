const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// temporary in-memory mock of registration (we’ll replace this with real API later)
app.post('/api/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  return res.status(201).json({ message: 'User registered successfully' });
});

describe('POST /api/auth/register', () => {
  it('should return 201 if user is registered successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should return 400 if any field is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: '', email: '', password: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields required');
  });
});
