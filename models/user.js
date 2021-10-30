const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

// const User = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema);
