// routes/accounts.js
const express = require('express');
const router = express.Router();
const Account = require('../models/Account');

router.post('/', async (req, res) => {
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

module.exports = router;