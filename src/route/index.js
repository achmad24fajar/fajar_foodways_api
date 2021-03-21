const express = require('express');

const router = express.Router();

const {getUsers, deleteUser} = require('../controller/UserController');
const {getProducts, getProductsByUser, getDetailProduct} = require('../controller/ProductController');
const {registerUser} = require('../controller/AuthController');
const { uploadFile } = require("../middlewares/upload");

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

router.get('/products', getProducts);
router.get('/products/:id', getProductsByUser);
router.get('/product/:id', getDetailProduct);

router.post('/register', uploadFile("imageFile", "videoFile"), registerUser);

module.exports = router