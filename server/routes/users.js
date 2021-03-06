import express from 'express';
const router = new express.Router();
const User = require('mongoose').model('User');
const Condition = require('mongoose').model('Condition');
import master from  '../conditionJSON/master.json';

router.get('/:identifier', (req, res) => {
  User.findOne({
    username: req.params.identifier
  }, function (err, existingUser) {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    return res.status(200).json({ existingUser });
  })
});

router.post('/', (req, res) => {

  const user = User(req.body);
  console.log(req.body);
  user.save((err, savedUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ errors: {global: "something went wrong"} });
    }
    User.count({}, function(err, count){ //Create master on first user signup only
        if (count === 1) {
          for (let item of master) {
            item._creator = savedUser._id;
            console.log(item);
            var disease = Condition(item);
            disease.save((err, docs) => {
              if (err) {
                console.error(err);
                //return res.status(500).json({ errors: {global: "something went wrong"} });
              }
            });
          }
        }
    });

    console.log(savedUser._id);
    return res.json({ success: true });
  });
});


module.exports = router;
