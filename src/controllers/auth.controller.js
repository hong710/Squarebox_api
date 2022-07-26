const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

//helper functions
const { encryptStr, decryptStr } = require('../utils/helperFn');

//require model Object from models
const User = require('../models/User');


//REGISTER USER
const registerUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        //encrypt the password using Crypto.js
        password: encryptStr(req.body.password, process.env.CRYPTO_KEY) ,
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
            return res.status(httpStatus.NOT_FOUND).json({error:"User not found"})
        }else{
            //decrypt the password
            const password = decryptStr(user.password, process.env.CRYPTO_KEY)

            if (req.body.password === password) {
                //implementation jwt
                const accessToken = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                }, process.env.JWT_KEY, {expiresIn:'3d'})
                
                const {password: userPassword, ...other} = user._doc;
                //return user object but not password
                return res.status(httpStatus.OK).json({...other,accessToken}) 
            }else{
                return res.status(httpStatus.FORBIDDEN).json({login:false})
            }
        }

    }catch(e){
        return res.status(500).json({error:e.message});
    }
}

//export to routes
module.exports = {
    registerUser,
    loginUser
}