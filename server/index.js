import express from 'express';
import bodyParser from 'body-parser';
var path = require('path');


// Priority serve any static files.

// adding Mongo as database and then loading model
const config = require('./config/indexLocal.json');
require('./models/index').connect(config.dbUri);

const app = express();
app.use(express.static(path.resolve(__dirname, '../build')));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PUT');
  next();
});


const users = require('./routes/users');
app.use('/api/users', users);

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const diseases = require('./routes/diseases');
app.use('/api/diseases', diseases);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(8080, () => console.log("Running on localhost:8080"));
