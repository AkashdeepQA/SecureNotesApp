const express = require('express');
const router = express.Router();
const db = require('../db');
const sanitizeHtml = require('sanitize-html');
const isSecure = process.env.SECURE_MODE === 'true';

router.use((req, res, next) => {
  if (!req.session.userId) return res.redirect('/');
  next();
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM notes WHERE user_id = ?`, [req.session.userId], (err, notes) => {
    res.render('dashboard', { notes });
  });
});

router.post('/add', (req, res) => {
  let { title, content } = req.body;
  if (isSecure) title = sanitizeHtml(title);
  if (isSecure) content = sanitizeHtml(content);

  db.run(`INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)`, [req.session.userId, title, content], () => {
    res.redirect('/notes');
  });
});

router.get('/view/:id', (req, res) => {
  const query = isSecure ?
    `SELECT * FROM notes WHERE id = ? AND user_id = ?` :
    `SELECT * FROM notes WHERE id = ${req.params.id}`;

  db.get(query, isSecure ? [req.params.id, req.session.userId] : [], (err, note) => {
    if (!note) return res.send('Note not found or access denied');
    res.render('note', { note });
  });
});

module.exports = router;