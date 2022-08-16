require('dotenv').config()
const mongoose = require('mongoose');

const Product =require ('../../../models/Product');
const data = require('./products.json')

const stringData = JSON.stringify(data)
const allProducts = JSON.parse(stringData)


mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connection opened!!'))
.catch (error => console.log('Error: '+error.message));    



const seedProduct = async ()=>{
    await Product.deleteMany({})
    for (let i= 0 ; i < allProducts.length ; i++) {
        try{
            const newProduct= await Product.create({
                title:allProducts[i].title,
                images:allProducts[i].images,
                o_price:allProducts[i].o_price,
                c_price:allProducts[i].c_price,
                description:allProducts[i].description,
                category:allProducts[i].category,
                quantity:allProducts[i].quantity,
                specs:allProducts[i].specs,
            })
            console.log(newProduct)
        }catch(e){
            console.log(e.message);
        }
    }
}

seedProduct()
.then(()=> console.log("seeding complete!")) 
.then(()=>mongoose.connection.close())
.then(()=> console.log("Connection closed!!")) 
