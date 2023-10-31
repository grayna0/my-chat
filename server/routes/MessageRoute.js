const {addMessage,getAllMessage} = require('../controller/messageController')
const router = require('express').Router()
router.post("/getmsg", getAllMessage)
router.post("/addmsg", addMessage)



module.exports = router;