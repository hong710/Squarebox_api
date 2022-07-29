const router = require('express').Router();

const { 
    updateUser, 
    deleteUser,
    getUserByID,
    getUsers,
    getUsersStats
   
} = require('../controllers/user.controller');

const { 
    verifyTokenAndAuth,
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');



//get user by ID only isAdmin=true
router.get('/find/:id',verifyTokenAndAdmin, getUserByID)

//get all users only isAdmin=true
router.get('/all', verifyTokenAndAdmin, getUsers)

//get user statistics only isAdmin=true
router.get('/stats', verifyTokenAndAdmin, getUsersStats)


//update
router.patch('/:id',verifyTokenAndAuth,updateUser)

//delete
router.delete('/:id',verifyTokenAndAuth,deleteUser)



module.exports = router
