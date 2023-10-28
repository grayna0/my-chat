const {register,login} = require('../controller/useController')
const router = require('express').Router()
router.post("/register", register)
router.post("/login", login)


module.exports = router;