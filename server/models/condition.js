const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const ConditionSchema = new mongoose.Schema({
  catagory: String,
  name: String,
  selected: [ {
              user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
              isSelected: Boolean
            } ],
  post: [ {
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
    preceptor: String,
    date: String,
    whatWasLearned: String
  } ],
  hidden: Boolean,
  _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Condition', ConditionSchema);
