//require model Object from models
const User = require('../models/User')
const CryptoJS = require('crypto-js');
//helperFn
const { limitData } = require('../utils/helperFn');

//Update user
const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        
        const {password: updatedPassword, ...rest } = updatedUser._doc
        res.status(201).json(rest)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

//Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully!"})

    }catch (e) {
        res.status(500).json({message: e.message})
    }
}

//Get user by ID
const getUserByID = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const returnUser = limitData(user._doc, ["password"])
        res.status(200).json(returnUser);
    }catch(e){ 
        res.status(500).json({message: e.message})
    } 
}

/* 
Get all users using query to pass options
url localhost:4000/api/user/all
or localhost:4000/api/user/all?new=true&limit=4 
*/
const getUsers = async (req,res)=>{
    const newUserQuery = req.query.new;
    const newUserLimit = req.query.limit;
    try{
        const users = newUserQuery  
                    ? await User.find().sort({createdAt:-1}).limit(newUserLimit ||2) 
                    : await User.find();
        console.log(newUserLimit)
        const returnUsers = users.map(user=> limitData(user._doc, ['password']))
        res.status(200).json(returnUsers);
    }catch(e){ 
        res.status(500).json({message: e.message})
    } 
}

module.exports = {
    updateUser,
    deleteUser,
    getUserByID,
    getUsers,
}