'use strict';
const imdb = require('../src/imdb');

const actor = 'nm0000243';
//DENZEL_IMDB_ID

require('../src/model');


var mongoose = require('mongoose'),
 Movie = mongoose.model('Movie');



 //GET movies/populate
exports.populate_the_db = async function(req, res){
  const movies = await imdb(actor);
  console.log(movies);

    //Movie.save(movies);
    Movie.insertMany(movies, function(err){
  //  Movie.save(movies, function(err){
      if(err)
        res.send(err);
      res.json(movies);
    });
  //src/imdb.js
};

//movies .get
exports.must_watch_movies =  function(req, res){
  //const awesome = movies.filter(movie => movie.metascore >= 70);
  Movie.find({}, function(err){
  if(err)
      res.send(err);
   res.json(movies);
  });
};



exports.list_all_movies = function(req, res) {
  Movie.find({}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};



// movies  .post
exports.create_a_movie = function(req, res) {
  var new_movie = new Movie(req.body);
  new_movie.save(function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};


// movies/:id .get
exports.read_a_movie = function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

// movies/:id .put
exports.update_a_movie = function(req, res) {
  Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

// movies/ : id   .delete
exports.delete_a_movie = function(req, res) {
  Movie.remove({
    _id: req.params.id
  }, function(err, movie) {
    if (err)
      res.send(err);
    res.json({ message: 'Movie successfully deleted' });
  });
};

//POST /movies/:id
//save a watched date and a review
//date - the watched date
//review - the personal review
exports.review_a_movie = function(req, res){
  //Movie.
};
