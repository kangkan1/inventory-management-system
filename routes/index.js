const express = require('express');

const router = express.Router()
const homeController = require('../controllers/home_controller')
const userController = require('../controllers/user_controller')

console.log('router loaded')

router.get('/', homeController.home)
router.post('/search', homeController.search)
router.get('/product', homeController.product)
router.get('/add', homeController.add)
router.get('/category', homeController.category)
router.post('/create', homeController.create)
// router.post('/create', homeController.create)
// router.use('/users', require('./users'))

module.exports = router