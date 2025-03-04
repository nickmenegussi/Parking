const express = require('express')
const {Teste, createLogin, createRegister} = require('../controllers/UserControllers')
const router = express.Router()

router.get('/user', Teste)
router.post('/user/register', createRegister)
router.post('/user/login', createLogin)

module.exports = router