// nodemon will help us to keep track of changes to our application by watching changed files and automatically restart the server
//npm install --save-dev nodemon
// express will be used to create the server
//npm install express --save

var express = require('express'),
  app = express(),
  port = process.env.PORT || 9292,
  mongoose = require('mongoose'),
  Task = require('./src/model'),
  bodyParser = require('body-parser');

  // mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Denzeldb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./src/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

//npm run start

//npm install mongoose --save

// Mongoose is what we will use to interact with a MongoDB instance
