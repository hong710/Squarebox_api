const router = require('express').Router();

router.get('/usertest', (req, res)=>{
    res.send("user test is sucessfully created");
})


module.exports = router
