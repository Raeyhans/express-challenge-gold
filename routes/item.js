const express = require('express');
const router = express.Router();
const { mustloginJwt } = require('../middlewares/auth');
const item = require('../controllers/ItemController');

router.get('/', mustloginJwt, item.getItems);
router.post('/', mustloginJwt, item.createItem);
router.get('/:id', mustloginJwt, item.getItem);
router.put('/:id', mustloginJwt, item.editItem);
router.delete('/:id', mustloginJwt, item.deleteItem);

module.exports = router;