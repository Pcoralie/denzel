'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DenzelSchema = new Schema({
  _id: String,
  link: String,
  metascore: Number,
  poster:String,
  rating: Number,
  synopsis:String,
  title: String,
  votes: Number,
  year: Number,
  });

module.exports = mongoose.model('Movie', DenzelSchema);
