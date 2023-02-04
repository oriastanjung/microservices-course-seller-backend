const express = require('express');
const router = express.Router();
const {register, login, update} = require('./handler/users');
const verifyToken = require("../middlewares/verifyToken");

router.post('/register', register)
router.post('/login', login)
router.put('/', verifyToken,update)
module.exports = router;
