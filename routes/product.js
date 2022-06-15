const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const product = require('../controllers/ProductController');

router.get('/', mustloginJwt, product.getProducts);
router.post('/', mustloginJwt, product.createProduct);
router.get('/:id', mustloginJwt, product.getProduct);
router.put('/:id', mustloginJwt, product.editProduct);
router.delete('/:id', mustloginJwt, product.deleteProduct);

module.exports = router;