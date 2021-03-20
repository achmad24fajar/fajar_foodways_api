const express = require('express');

const router = express.Router();

const {getUsers, deleteUser} = require('../controller/UserController');

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router