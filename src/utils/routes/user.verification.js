
const jwt = require('jsonwebtoken');

/* helper fn for verify Token an verify User 
    - get header token
    - Check if token is exist
        - if exist
            - verify token (req, res, callbackFn)
                - callbackFn (error, payload)
                    - if error -> return 403
                    - else 
                        - if check payload value == res.params.value
                            - next()
                        else 
                            - return 403 
        - else ->return 401    

*/

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader){
        //split token from header Bearer token
        const token = authHeader.split(" ")[1]

        jwt.verify(token,process.env.JWT_KEY, (err,payload)=>{
            if (err) res.status(403).json({message: "Token is not valid!"});
            req.user = payload;
            next();
        }) 
    }else {
        return res.status(401).json({message:"You are not authenticated!"})
    }
}


const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, ()=>{
        if (req.user.id ===req.params.id) {
            next()
        }else {
            res.status(403).json("You are not allowed to access this data.")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if (req.user.isAdmin){
            next();
        }else{
            res.status(403).json({message: 'You are not an administrator.'})
        }
    })
}

module.exports ={
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin
}