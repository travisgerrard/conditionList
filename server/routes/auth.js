import express from 'express';
const router = new express.Router();
const config = require('../config/index.json');
const User = require('mongoose').model('User');
import jwt from 'jsonwebtoken'

router.post('/', (req, res) => {
  const { identifier } = req.body;
  console.log(identifier);
  User.findOne({
    username: identifier
  }, function (err, existingUser) {
    console.log(existingUser);
    if (err || existingUser == null) {
      console.error(err);
      return res.status(401).json({ errors: {global: "Invalid credentials"} });
    }
    const token = jwt.sign({
      id: existingUser._id,
      username: existingUser.username
    }, config.jwtSecret);
    res.json({ token });
  });
});

module.exports = router;
