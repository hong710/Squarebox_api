const router = require('express').Router();
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller')

const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin
} = require('../utils/routes/user.verification');

//CREATE CART 
router.post('/new',verifyTokenAndAdmin, createCategory)
router.get('/all',getCategories)
router.patch('/update/:id',verifyTokenAndAdmin,  updateCategory)
router.delete('/delete/:id',verifyTokenAndAdmin, deleteCategory)


module.exports = router