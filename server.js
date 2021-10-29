const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env['MONGO_URI'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', userSchema);

const createAndSaveUser = (username) => {
  // TODO: might need to check whether a user exists first
  const user = new User({
    username: username,
  });

  return user
    .save()
    .then((savedUserObj) => {
      return { username: savedUserObj.username, _id: savedUserObj._id };
    })
    .catch((err) => {
      return { error: err };
    });
};

const findAllUsers = () => {
  return User.find({})
    .then((users) => {
      const modifiedUsersArr = users.map((user) => {
        return { _id: user._id, username: user.username };
      });
      return modifiedUsersArr;
    })
    .catch((err) => {
      return { error: err };
    });
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/users', (req, res) => {
  const username = req.body.username;
  createAndSaveUser(username)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/users', (req, res) => {
  // res.json({ TEST: 'GET /api/users works' });
  findAllUsers()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
