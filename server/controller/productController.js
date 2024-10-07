const { Brands } = require('../models/brands');
const cloudinary = require('cloudinary');
require('dotenv').config();
const { Product } = require('../models/product');
const { Category } = require('../models/category');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

class ProductController {
  static async AddProduct(req, res) {
    try {
      const {
        name,
        price,
        about,
        features,
        description,
        category,
        brand,
        available,
        publish,
      } = req.body;

      const imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
      const product = new Product({
        name,
        price,
        about,
        features,
        description,
        category,
        brand,
        available,
        publish,
        images: imageUrls,
      });
      await product.save();
      res
        .status(201)
        .json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error('Error creating product', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  static async getProductByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const products = await Product.find({ category: categoryId }).sort({
        createdAt: -1,
      });
      const category = await Category.findById(categoryId);
      const brands = await Brands.find({ category: categoryId });
      res.json({ products, category, brands });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async GetAllProducts(req, res) {
    try {
      const products = await Product.find()
        .populate('category')
        .populate('brand');
      res.json(products);
    } catch (err) {
      console.error('Error getting products:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  static async getSingleProduct(req, res) {
    try {
      const productId = req.params.productId;
      const product = await Product.findById({ _id: productId })
        .populate('brand')
        .populate('category');
      const brand = product?.brand;
      const category = product?.category;
      const brandDetails = await Brands.findById(brand);
      const categoryDetails = await Category.findById(category);
      res.json({ product, brandDetails, categoryDetails });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async SearchProducts(req, res) {
    try {
      const { name } = req.query;

      if (name !== '') {
        const regex = new RegExp(name, 'i');
        const products = await Product.find({ name: regex })
          .populate('category')
          .populate('brand');
        res.json(products);
      } else {
        res.json([]);
      }
    } catch (error) {
      console.error('An error occurred while searching for products:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while searching for products.' });
    }
  }
}

module.exports = ProductController;
