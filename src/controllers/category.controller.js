const Category = require("../models/Category")

//Create a new Category
const createCategory= async (req, res) => {
    
    try{
        const newCategory= await Category.create(req.body)

        res.status(201).json(newCategory)

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Get all Category
const getCategories= async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Update Category
const updateCategory= async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(201).json(updateCategory)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

//delete Category
const deleteCategory= async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Category deleted successfully!"})

    }catch (e) {
        res.status(500).json({message: e.message})
    }
    
}


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}