const mongoose = require('mongoose');

// Ther user model schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  }
});

module.exports = mongoose.model('User', UserSchema);
