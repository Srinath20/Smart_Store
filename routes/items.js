const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.post('/add', itemsController.addItem);
router.get('/', itemsController.getItems);
router.post('/buy/:id/:quantity', itemsController.buyItem);

module.exports = router;
