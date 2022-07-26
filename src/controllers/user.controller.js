//require model Object from models
const User = require('../models/User')
const CryptoJS = require('crypto-js');


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

module.exports = {
    updateUser
}