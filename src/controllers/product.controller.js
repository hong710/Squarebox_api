const Product = require("../models/Product")

//Create a new Product
const createProduct = async (req, res) => {

    try {
        const newProduct = await Product.create({
            title: req.body.title,
            des: req.body.des,
            img: req.body.img,
            categories: req.body.categories,
            price: req.body.price
        })

        res.status(201).json(newProduct)

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get all Products with query
// product/all?new=true&category=food
const getAllProducts = async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get single Product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Update single Product
const updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(201).json(updateProduct)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

//delete single Product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully!" })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }

}

//custome route with query parameters
// product/search?top_deals=true
const searchRoute = async (req, res) => {
    const searchQuery = req.query
    try {
        if("category" in searchQuery) {
            const products = await Product.aggregate([
                {
                  '$lookup': {
                    'from': 'categories', 
                    'localField': 'category', 
                    'foreignField': 'match', 
                    'as': 'result'
                  }
                }, {
                  '$match': {
                    'result': {
                      '$elemMatch': {
                        'slug': searchQuery.category
                      }
                    }
                  }
                }
              ])
            res.status(200).json(products)

        }else if ("topdeals" in searchQuery) {
                {
                const products = await Product.aggregate(
                    [
                        {
                            '$project': {
                                '_id': 1,
                                'title': 1,
                                'discount': {
                                    '$subtract': [
                                        '$o_price', '$c_price'
                                    ]
                                },
                                'o_price': 1,
                                'c_price': 1,
                                'quantity': 1,
                                "images":1,
                                "category": 1,
                            }
                        }, {
                            '$match': {
                                'discount': {
                                    '$gt': 50
                                }
                            }
                        }
                    ]
                )
                    console.log("category" in searchQuery)
                    res.status(200).json(products)
                }
          }  
        
        
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchRoute
}


