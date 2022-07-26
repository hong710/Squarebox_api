const { updateUser } = require('../controllers/user.controller');
const { verifyAuth } = require('../utils/routes/verifyUser');

const router = require('express').Router();

router.patch('/:id',verifyAuth,updateUser)


module.exports = router
