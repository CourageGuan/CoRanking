const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);

module.exports = router;