const mongoose = require('mongoose');

const tutoSchema = mongoose.Schema(
{
  title: { type: String, required: true },
  description: { type: String, required: true },
  published: { type: Boolean, required: true },
});

module.exports = mongoose.model('tutorial', tutoSchema);