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

const exerciseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

const Exercise = mongoose.model('exercise', exerciseSchema);

const createAndSaveExercise = (data) => {
  return User.findById(data._id)
    .then((user) => {
      const exercise = new Exercise({
        userId: user._id,
        username: user.username,
        description: data.description,
        duration: data.duration,
        date: data.date,
      });

      return exercise.save();
    })
    .then((savedExerciseObj) => {
      return {
        username: savedExerciseObj.username,
        description: savedExerciseObj.description,
        duration: savedExerciseObj.duration,
        date: savedExerciseObj.date.toDateString(),
        _id: savedExerciseObj.userId,
      };
    })
    .catch((err) => {
      return { error: err };
    });
};

const dateQueryParams = (queryObj) => {
  let dateObj = {};

  if (queryObj.from) dateObj = { ...dateObj, $gte: queryObj.from };
  if (queryObj.to) dateObj = { ...dateObj, $lte: queryObj.to };

  return dateObj;
};

const retrieveExercisesLog = (userId, queryParams) => {
  const dateQuerySettings = dateQueryParams(queryParams);

  return Exercise.find({ userId: userId, date: dateQuerySettings })
    .then((exercises) => {
      const count = exercises.length;

      if (count === 0) throw new Error('No exercises in the log under this userId');

      const log = exercises.map((exercise) => {
        return {
          description: exercise.description,
          duration: exercise.duration,
          date: exercise.date.toDateString(),
        };
      });
      return {
        username: exercises[0].username,
        _id: exercises[0].userId,
        count: count,
        log: log,
      };
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
  findAllUsers()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/users/:_id/exercises', (req, res) => {
  const _id = req.params._id;
  const { description, duration, date } = req.body;

  const formattedDate = !date ? new Date() : new Date(date);
  const data = { _id, description, duration, date: formattedDate };

  createAndSaveExercise(data)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/users/:_id/logs', (req, res) => {
  const userId = req.params._id;
  let { from, to, limit } = req.query;

  if (to) to = new Date(to);
  if (from) from = new Date(from);
  if (limit) limit = parseInt(limit);

  const queryParams = { from, to, limit };

  retrieveExercisesLog(userId, queryParams)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
