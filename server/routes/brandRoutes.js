const router = require('express').Router();
const controller = require('../controller/brandController');
const isAdmin = require('../middleware/admin');
const authorizations = require('../middleware/authorization');

router.post('/add_brand', authorizations, isAdmin, controller.AddBrand);
router.get('/', controller.getAllBrands);

module.exports = router;
