const { 
    updateUser, 
    deleteUser,
    getUserByID,
    getUsers,
   
} = require('../controllers/user.controller');

const { 
    verifyTokenAndAuth,
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');
const router = require('express').Router();


//get user by ID only isAdmin=true
router.get('/find/:id',verifyTokenAndAdmin, getUserByID)

//get all users only isAdmin=true
router.get('/all', verifyTokenAndAdmin, getUsers)


//update
router.patch('/:id',verifyTokenAndAuth,updateUser)

//delete
router.delete('/:id',verifyTokenAndAuth,deleteUser)



module.exports = router
