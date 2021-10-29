const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', (req, res) => {
  res.json({ TEST: 'GET /api/users works' });
});

app.post('/api/users', (req, res) => {
  res.json({ TEST: 'POST /api/users/:username works' });
});

app.post('/api/users/:_id/exercises', (req, res) => {
  res.json({ TEST: 'POST /api/users/:_id/exercises works' });
});

app.get('/api/users/:_id/logs', (req, res) => {
  res.json({ TEST: 'GET /api/users/:_id/logs works' });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
