const express = require("express");
const { register, login, whoami } = require("../controller/auth");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/whoami", whoami);

module.exports = {
  authRouter: router,
};
