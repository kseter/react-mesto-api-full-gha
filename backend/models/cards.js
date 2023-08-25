const mongoose = require('mongoose');
const validator = require('validator');
const { validationMessage } = require('../utils/contants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, validationMessage.requared],
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  link: {
    type: String,
    required: [true, validationMessage.requared],
    validate: {
      validator: (url) => validator.isURL(url),
      message: validationMessage.unvalidUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: '',
    ref: 'user',
  },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
