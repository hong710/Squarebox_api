const router = require('express').Router();
const {
  registerUser,
  loginUser
} = require('../controllers/auth.controller')

//Register user
router.post("/register", registerUser)

router.post("/login", loginUser)

//export to server.js
module.exports = router
