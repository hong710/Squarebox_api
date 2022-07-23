require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//require routes
const authRoute = require('./routes/auth.route');

//essential middlwares
app.use(express.json());


/*API end-points*/
//auth routes
app.use("/api/auth",authRoute) 



mongoose.connect(process.env.MONGODB_URI)
.then(
    app.listen(process.env.PORT ||5000, ()=>{
        console.log('DB connection successful! \n'+
                    'Listening on port '+process.env.PORT || 5000);
    })
)
.catch (error => console.log('Error: '+error.message));    
