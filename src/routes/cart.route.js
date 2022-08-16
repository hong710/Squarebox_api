const router = require('express').Router();
const {
    createCart,
    getUserCarts,
    getCart,
    updateCart,
    deleteCart,
} = require('../controllers/cart.controller')

const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');

//CREATE CART 
router.post('/new', createCart)
router.get('/all',getUserCarts)
router.get('/find/:userId', getCart)
router.patch('/update/:id',verifyTokenAndAdmin, updateCart)
router.delete('/delete/:id',verifyTokenAndAdmin, deleteCart)


module.exports = router