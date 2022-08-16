require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


//require routes
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const orderRoute = require('./routes/order.route');
const categoryRoute = require('./routes/category.route');

//essential middlwares
app.use(cors())
app.use(express.json());
require('express-file-logger')(app)


/*API end-points*/
//auth routes
app.use("/api/auth",authRoute)

//user routes
app.use("/api/user",userRoute) 

//product routes
app.use("/api/product",productRoute) 

//cart routes
app.use("/api/cart",cartRoute) 

//order routes
app.use("/api/order",orderRoute) 

//category routes
app.use ("/api/category",categoryRoute) 


mongoose.connect(process.env.MONGODB_URI)
.then(
    app.listen(process.env.PORT ||5000, ()=>{
        console.log('DB connection successful! \n'+
                    'Listening on port '+process.env.PORT || 5000);
    })
)
.catch (error => console.log('Error: '+error.message));    
