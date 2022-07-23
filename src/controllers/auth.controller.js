const mongoose = require('mongoose');

//http status code library
const httpStatus = require('http-status');
//crypto.js-encrypt the data library
const CryptoJS = require('crypto-js');


//require model Object from models
const User = require('../models/User')

//REGISTER USER
const registerUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTO_KEY).toString(),
    })

    try{
        const newUser = await user.save();
        return res.status(httpStatus.CREATED).json(newUser); 
    }catch(e){ 
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({error: e.message}); 
    } 
}

//LOGIN USER
const loginUser = async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})

        if (!user){
            return res.statusCode(httpStatus.NOT_FOUND).json({error:"User not found"})
        }else{
            //decrypt the password
            const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY)
            const password = hashPassword.toString(CryptoJS.enc.Utf8);

            if (req.body.password === password) {
                
                const {password: userPassword, ...other} = user._doc;

                return res.status(httpStatus.OK).json(other) //return user object but not password
            }else{
                return res.status(httpStatus.FORBIDDEN).json({login:false})
            }
        }

        

    }catch(e){

    }
}

//export to controller
module.exports = {
    registerUser,
    loginUser
}