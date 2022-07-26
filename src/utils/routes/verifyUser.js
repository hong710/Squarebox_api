
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
const verifyAuth = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        //split token from header Bearer token
        const token = authHeader.split(" ")[1] 
        //(token,JWT_KEY, callbackFn)
        jwt.verify(token,process.env.JWT_KEY, (err,user)=>{
            if(err)
                res.status(403).json({message:"Token is invalid!"})
            else{
                req.user = user;
                if (req.user.id === req.params.id || req.user.isAdmin){
                    next();
                }else{
                    res.status(403).json({message:"User is not exist!"})
                }
            }
        })
    }else{
        return res.status(401).json({message:"You are not authenticated!"})
    }
}




module.exports ={
    verifyAuth
}