import jwt from 'jsonwebtoken'
const config = require('../config/index.json');
const User = require('mongoose').model('User');

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: "Failed to authenticate"
        });
      } else {
        console.log(decoded);
        // req.userId = decoded.id;
        // next();
        User.findOne({_id: decoded.id}, 'username email', function (err, user) {
          console.log(user);
          if(!user) {
            res.status(404).json({ error: "No such user" });
          } else {
            req.currentUser = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({
      error: "No token provided"
    });
  }
}
