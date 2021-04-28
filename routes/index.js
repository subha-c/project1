var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')
var orderController = require('../controllers/order')
var foodController = require('../controllers/food')
var ingredientController = require('../controllers/ingredient')
var config = require('../config/db');

router.post('/api/v1/user/signup', userController.signup);
router.post('/api/v1/user/signin', userController.signin);
router.post('/api/v1/user/password/reset', config.tokenVerify, userController.pwdreset);
router.post('/api/v1/user/deactivate', config.tokenVerify, userController.deactivate);

router.post('/api/v1/food/order', config.tokenVerify, orderController.orderfood);
router.get('/api/v1/food/order/list', config.tokenVerify, orderController.orderfoodlist);

router.post('/api/v1/food/save', foodController.addfood);
router.get('/api/v1/food/list', foodController.foodlist);

router.post('/api/v1/ingredient/add', ingredientController.addingredient);
router.get('/api/v1/ingredient/list', ingredientController.ingredientlist);
router.get('/api/v1/ingredient/vendor/list/:vendorName', ingredientController.vendoringredientlist);

module.exports = router;