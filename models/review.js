const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  title: { type: String, required: true },
  movieTitle: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = model('Review', reviewSchema);