const mongoose = require('mongoose');
const validator = require('validator');
const { validationMessage } = require('../utils/contants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, validationMessage.minlength],
    maxlength: [30, validationMessage.maxlength],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => validator.isURL(url),
      message: validationMessage.unvalidUrl,
    },
  },
  email: {
    type: String,
    required: [true, validationMessage.requared],
    unique: true,
    validate: {
      validator(email) {
        validator.isEmail(email);
      },
      message: validationMessage.email,
    },
  },
  password: {
    type: String,
    required: [true, validationMessage.requared],
    select: false,
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
