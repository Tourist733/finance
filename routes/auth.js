// routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/telegram', async (req, res) => {
  const { id, first_name } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID пользователя обязателен' });
  }
  // Здесь можно добавить логику сохранения пользователя в БД, если нужно
  res.status(200).json({ success: true });
});

module.exports = router;