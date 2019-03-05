'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DenzelSchema = new Schema({
  title: {
    type: String,
    required: 'the title of the movie '
  },
  view_date: {
    type: Date,
    default: Date.now
  },
  metascore: {
      type: Number,
      default: 0
  }
});

module.exports = mongoose.model('Movie', DenzelSchema);
