import express from 'express';

const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/users', require('./routes/users'));

app.listen(
  process.env.PORT || 3001,
  () => console.log('Example app listening on port 3000!')
);
