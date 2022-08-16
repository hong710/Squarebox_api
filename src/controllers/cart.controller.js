const Cart = require("../models/Cart")

//Create a new Cart
const createCart= async (req, res) => {
    
    try{
        const newCart = await Cart.create(req.body)

        res.status(201).json(newCart)

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Get all user Carts
const getUserCarts= async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


//Get user Cart
const getCart= async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Update single Cart
const updateCart= async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(201).json(updateCart)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

//delete single Cart
const deleteCart= async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cart deleted successfully!"})

    }catch (e) {
        res.status(500).json({message: e.message})
    }
    
}


module.exports = {
    createCart,
    getUserCarts,
    getCart,
    updateCart,
    deleteCart,
}