const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
require('dotenv').config();
const { Schema } = mongoose;
const userSchema = mongoose.Schema({
  firstLastName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mobileOrEmail: {
    type: String,
    required: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  country: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  viewedProduct: {
    type: Array,
    default: [],
  },
  history: [],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
