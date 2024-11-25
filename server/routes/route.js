const router = require('express').Router();
const {signup, signin, reqsend} = require('../controllers/authController')

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/reqsend', reqsend)



module.exports = router