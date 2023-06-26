const { Category } = require('../models/category');

class CategoryController {
  static async AddCategory(req, res) {
    try {
      const { name, description } = req.body;
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
      }
      const newCategory = new Category({ name, description });
      await newCategory.save();
      res.status(201).json({
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getAllCategories(req, res) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
