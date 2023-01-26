const express = require('express');
const router = express.Router();
const {create, getAll, deleteOne, getOne} = require('./handler/media');

router.post('/', create);
router.get("/", getAll)
router.get("/:id", getOne)
router.delete('/:id', deleteOne)

module.exports = router;
