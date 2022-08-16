const router = require('express').Router();

const {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    orderStats,
} = require('../controllers/order.controller')

const {
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');


router.post('/new', createOrder)
router.get('/all', getAllOrders)
router.get('/find/:userId', getOrder)
router.patch('/update/:id',verifyTokenAndAdmin, updateOrder)
router.delete('/delete/:id',verifyTokenAndAdmin, deleteOrder)
router.get('/stats', orderStats)



module.exports = router