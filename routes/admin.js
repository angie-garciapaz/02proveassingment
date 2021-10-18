const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

// this must be the last middleware
router.post('/add-product', productsController.postAddProduct);

module.exports = router;