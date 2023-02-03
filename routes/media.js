const express = require('express');
const router = express.Router();
const {create, getAll, deleteOne, getOne} = require('./handler/media');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', create);
router.get("/", verifyToken ,getAll)
router.get("/:id", getOne)
router.delete('/:id', deleteOne)

module.exports = router;
