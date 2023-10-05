const express = require('express');

const router = express.Router()
const homeController = require('../controllers/home_controller')
const userController = require('../controllers/user_controller')

console.log('router loaded')

router.get('/', homeController.home)
router.post('/search', homeController.search)
router.get('/product', homeController.product)
router.get('/add', homeController.add)
router.use('/users', require('./users'))

module.exports = router