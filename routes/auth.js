const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const isSecure = process.env.SECURE_MODE === 'true';

router.get('/', (req, res) => {
  if (req.session.userId) return res.redirect('/notes');
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = isSecure
    ? `SELECT * FROM users WHERE username = ?`
    : `SELECT * FROM users WHERE username = '${username}'`;

  db.get(query, isSecure ? [username] : [], (err, user) => {
    if (!user) return res.send('Invalid credentials');

    const isPasswordValid = isSecure
      ? bcrypt.compareSync(password, user.password)
      : user.password === password;

    if (isPasswordValid) {
      req.session.userId = user.id;
      res.redirect('/notes');
    } else {
      res.send('Invalid credentials');
    }
  });
});


router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPwd = isSecure ? bcrypt.hashSync(password, 10) : password;
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(query, [username, hashedPwd], function (err) {
    if (err) return res.send('User exists');
    req.session.userId = this.lastID;
    res.redirect('/notes');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = router;