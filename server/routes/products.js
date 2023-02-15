const { Router } = require('express');
const { ProductModel } = require('../models/ProductModel');
const ProductRouter = Router()


ProductRouter.get('/get', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.send(products);
    } catch (error) {
        res.status(400).send({ "mesage": "Something Went Wrong" })
    }
})

module.exports=ProductRouter