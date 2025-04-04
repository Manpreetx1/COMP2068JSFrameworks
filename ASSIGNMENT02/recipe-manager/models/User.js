const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  githubId: String // for GitHub OAuth if added later
});

module.exports = mongoose.model('User', userSchema);
