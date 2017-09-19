import express from 'express';
import bodyParser from 'body-parser';

// adding Mongo as database and then loading model
const config = require('./config/index.json');
require('./models/index').connect(config.dbUri);

const app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE, PUT');
  next();
});


const users = require('./routes/users');
app.use('/api/users', users);

const auth = require('./routes/auth');
app.use('/api/auth', auth);

const diseases = require('./routes/diseases');
app.use('/api/diseases', diseases);

app.listen(8080, () => console.log("Running on localhost:8080"));
