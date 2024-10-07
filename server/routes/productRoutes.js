const router = require('express').Router();
const controller = require('../controller/productController');
const isAdmin = require('../middleware/admin');
const authorizations = require('../middleware/authorization');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/add_product',
  authorizations,
  isAdmin,
  upload.array('images', 5),
  controller.AddProduct
);
router.get('/product_category:categoryId', controller.getProductByCategory);
router.get('/allproducts', controller.GetAllProducts);
router.get('/product/:productId', controller.getSingleProduct);
router.get('/product_search', controller.SearchProducts);

module.exports = router;
