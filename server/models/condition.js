const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const ConditionSchema = new mongoose.Schema({
  id: Number,
  catagory: String,
  name: String,
  selected: Boolean,
  preceptor: String,
  date: String,
  whatWasLearned: String,
  hidden: Boolean,
  _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Condition', ConditionSchema);
