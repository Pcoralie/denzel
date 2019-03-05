'use strict';
module.exports = function(app) {
  var todoList = require('../src/controller');

  // movieList Routes
  app.route('/movies')
  // fetch a random must-watch movie
    .get(movieList.list_all_movies)
    .post(movieList.create_a_movie);


  app.route('/movies/:id')
  // GET /movies/:id
  //fetch a specific movie
    .get(movieList.read_a_movie)
    .put(movieList.update_a_movie)
    .delete(movieList.delete_a_movie);
    //POST /movies/:id
    //save a watched date and a review
    //date - the watched date
    //review - the personal review
    .post(movieList.review_a_movie);


    app.route('/movies/populate')
    //GET /movies/populate
    //populate the database with all the Denzel's movies from IMDB_URL
    // use the src/imdb.js ready to use exported function
};

// GET /movies/search
//search for denzel's movies
//limit - number of movies to return (default: 5)
//metascore - filter by metascore (default: 0)
