const express = require('express');
const controller = require('../controller/userController');
const authorizations = require('../middleware/authorization');
const isAdmin = require('../middleware/admin');
const validation = require('../middleware/validation');

const router = express.Router();

router.post('/sign_up', validation.signup, controller.sign_up);
router.post('/sign_in', validation.signIn, controller.signIn);
router.get('/user_auth', authorizations, controller.userAuth);
router.patch('/make_admin', authorizations, isAdmin, controller.makeAdmin);

module.exports = router;
