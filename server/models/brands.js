const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxlength: 100,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

const Brands = mongoose.model('Brands', brandSchema);

module.exports = { Brands };
