
const express = require("express");
const router = express.Router();
const { create, getOne } = require("./handler/refreshTokens");
/* GET users listing. */
// router.get("/",getAll)
router.post("/",create);
router.get("/",getOne)

module.exports = router;
