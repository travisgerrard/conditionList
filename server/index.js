import express from 'express';

// adding Mongo as database and then loading model
const config = require('./config/index.json');
require('./models/index').connect(config.dbUri);

const app = express();

const events = require('./routes/events');
app.use('/api/events', events);

app.listen(8080, () => console.log("Running on localhost:8080"));
