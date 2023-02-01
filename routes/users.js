const express = require("express");
const router = express.Router();
const { register, login, update, getOne, getAll } = require("./handler/users");
/* GET users listing. */
router.get("/",getAll)
router.get("/:id", getOne);
router.post("/register", register);
router.post("/login", login);
router.put("/:id", update);

module.exports = router;
