const express = require('express');
const controller = require('../controller/userController');
const authorizations = require('../middleware/authorization');

const router = express.Router();

router.post('/sign_up', controller.sign_up);
router.post('/sign_in', controller.signIn);
router.get('/user_auth', authorizations, controller.userAuth);

module.exports = router;
