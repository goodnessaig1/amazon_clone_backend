const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      maxlength: 2200,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    about: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    features: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    price: {
      required: true,
      type: Number,
      maxlength: 10000,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    shipping: {
      required: true,
      type: Boolean,
      default: true,
    },
    available: {
      required: true,
      type: Boolean,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brands',
      required: true,
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    publish: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
