const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  id: Number,
  catagory: String,
  name: String,
  selected: Boolean,
  preceptor: String,
  date: String,
  whatWasLearned: String,
  hidden: Boolean
});

module.exports = mongoose.model('Condition', ConditionSchema);
