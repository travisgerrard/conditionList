import express from 'express';
const router = new express.Router();
const User = require('mongoose').model('User');

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
    return res.json({ success: true });
  });
});


module.exports = router;
