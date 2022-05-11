const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  reviewIs: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = model('Comment', commentSchema);