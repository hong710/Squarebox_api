const Order = require("../models/Order");

//Create a new Order
const createOrder= async (req, res) => {
    
    try{
        const newOrder = await Order.create(req.body)

        res.status(201).json(newOrder)

    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Get all user Orders
const getAllOrders= async (req, res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}


//Get user Order
const getOrder= async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Update single Order
const updateOrder= async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true})
        res.status(201).json(updateOrder)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

//delete single Order
const deleteOrder= async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cart deleted successfully!"})

    }catch (e) {
        res.status(500).json({message: e.message})
    }
    
}

//Get monthly income

const orderStats = async (req, res) => {
    const date = new Date() //current date
    const lastMonth = new Date(date.setMonth(date.getMonth() -1)) //last month from current date
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() -1)) //2 months ago from current date
    try{
        const data = await Order.aggregate([
            {
                $match: {createdAt:{$gte: prevMonth}}
            },
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sale: "$amount"
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sale"}
                }
            }
        ])
        res.status(200).json(data)
        console.log("preMonth"+ prevMonth)
    }catch(e){
        res.status(500).json({message: e.message})
    }
}


module.exports = {
    createOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    orderStats
}