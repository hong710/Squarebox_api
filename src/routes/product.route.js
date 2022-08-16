const router = require('express').Router();

const {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchRoute
} = require('../controllers/product.controller')

const {
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');

router.get('/search', searchRoute)
router.post('/new',verifyTokenAndAdmin, createProduct)
router.get('/all', getAllProducts)
router.get('/:id', getProduct)
router.patch('/update/:id',verifyTokenAndAdmin, updateProduct)
router.delete('/delete/:id',verifyTokenAndAdmin, deleteProduct)


module.exports = router