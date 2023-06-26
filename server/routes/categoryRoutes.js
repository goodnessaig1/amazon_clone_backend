const router = require('express').Router();
const controller = require('../controller/categoryController');
const isAdmin = require('../middleware/admin');
const authorizations = require('../middleware/authorization');

router.post('/add_category', authorizations, isAdmin, controller.AddCategory);
router.get('/', controller.getAllCategories);

module.exports = router;
