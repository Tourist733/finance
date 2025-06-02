const express = require('express');
const cors = require('cors');
const next = require('next');
const { sequelize } = require('./config/db');
const Account = require('./models/Account');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

const server = express();

server.use(cors({
  origin: ['https://c4c7-103-19-231-215.ngrok-free.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
server.use(express.json());

server.get('/accounts', async (req, res) => {
  const { userId } = req.query;
  console.log(`GET /accounts?userId=${userId}`);
  if (!userId) {
    console.log('Missing userId');
    return res.status(400).json({ error: 'userId обязателен' });
  }
  try {
    const accounts = await Account.findAll({ where: { user_id: userId } });
    console.log(`Accounts found: ${JSON.stringify(accounts)}`);
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

server.post('/accounts', async (req, res) => {
  const { userId, name, balance } = req.body;
  console.log(`POST /accounts: ${JSON.stringify(req.body)}`);
  if (!userId || !name || isNaN(balance)) {
    console.log('Invalid data');
    return res.status(400).json({ error: 'Некорректные данные' });
  }
  try {
    const account = await Account.create({ user_id: userId, name, balance });
    console.log(`Account created: ${JSON.stringify(account)}`);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

server.all('*', (req, res) => {
  return handle(req, res);
});

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.prepare().then(() => {
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  });
}).catch((err) => {
  console.error('DB sync failed:', err);
});