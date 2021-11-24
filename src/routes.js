const router = require('express').Router()
const UserControler = require('./controllers/UserController')
const AdminController = require('./controllers/AdminController')
const AuthMidleware = require('../midlewares/AuthMidleware')

router.post('/', AdminController.login)
router.post('/create-user', AuthMidleware, UserControler.createUser)
router.get('/get-users', AuthMidleware, UserControler.getUsers)

module.exports = router