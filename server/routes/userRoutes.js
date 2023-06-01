const express = require('express');
const controller = require('../controller/userController');

const router = express.Router();

router.post('/sign_in', controller.signIn);

module.exports = router;
