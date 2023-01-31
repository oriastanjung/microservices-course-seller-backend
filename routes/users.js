const express = require('express');
const router = express.Router();
const {register, login} = require('./handler/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register)
router.post('/login', login)

module.exports = router;
