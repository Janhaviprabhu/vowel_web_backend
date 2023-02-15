const { Router } = require('express');
const { ProductModel } = require('../models/ProductModel');
const AdminRouter = Router()


// AdminRouter.get('/products', async (req, res) => {
//     try {
//         const products = await ProductModel.find();
//         res.send(products);
//     } catch (error) {
//         res.status(400).send({ "mesage": "Something Went Wrong" })
//     }
// })

AdminRouter.post('/create', async (req, res) => {
    const { title ,price,image } = req.body;
    try {
        const CreateProduct = await ProductModel({ title,price,image });
        await CreateProduct.save();
        res.send({ "message": "Product Posted Successfully!!" })
    } catch (error) {
        res.status(400).send({ "message": "Something Went Wrong, Try Again" });
    }
})

AdminRouter.patch('/edit/:id', async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    try {
        const UpdateProduct = await ProductModel.findByIdAndUpdate({_id:id},payload);
        await UpdateProduct.save();
        res.send({ "message": "Product Updated Successfully!!" })
    } catch (error) {
        res.status(400).send({ "message": "Something Went Wrong, Try Again" });
    }
})

AdminRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const DeleteProduct = await ProductModel.findByIdAndDelete({ _id: id });
        res.send({ "message": "Product Deleted Successfully!!" })
    } catch (error) {
        res.status(400).send({ "message": "Something Went Wrong, Try Again" });
    }
})




module.exports = { AdminRouter }

