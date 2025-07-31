const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
console.log('SECURE_MODE:', process.env.SECURE_MODE);
console.log('isSecure:', process.env.SECURE_MODE === 'true');

const app = express();
const db = require('./db');

const isSecure = process.env.SECURE_MODE === 'true';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secure-notes-secret',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Inject secureMode flag
app.use((req, res, next) => {
  res.locals.secureMode = isSecure;
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

app.use('/', authRoutes);
app.use('/notes', noteRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT} | Secure mode: ${isSecure}`);
});