const { Brands } = require('../models/brands');

class BrandsController {
  static async AddBrand(req, res) {
    try {
      const { name, category } = req.body;
      const existingBrand = await Brands.findOne({ name });
      if (existingBrand) {
        return res.status(400).json({ error: 'Brand already exists' });
      }
      const newBrand = new Brands({ name, category });
      await newBrand.save();
      res.status(201).json({
        message: 'Brand created successfully',
        brand: newBrand,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  static async getAllBrands(req, res) {
    try {
      const brands = await Brands.find();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = BrandsController;
