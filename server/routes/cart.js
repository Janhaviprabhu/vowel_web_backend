const express = require("express");
const { Router } = require('express');
const CartRouter = Router()
const CartModel= require("../models/CartModel")



CartRouter.get('/get',async(req,res)=>{
    try {
        let items = await CartModel.find({
            user: req.body.user_id,
        }).populate("product");
        res.send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }

}) 

CartRouter.post('/addtocart',async(req,res)=>{
    try {
        let cartItem = await CartModel.findOne({
            $and: [{ user: req.body.user_id }, { product: req.body.product }],
        });
        if (cartItem) {
            let item = await CartModel.findByIdAndUpdate(
                cartItem.id,
                {
                    qty: cartItem.qty + req.body.qty,
                },
                {
                    new: true,
                }
            );
            return res.json({
                msg: "Product is already in the cart quantity increases",
                data: item,
                status: "info",
            });
        } else {
            let item = await CartModel.create({
                ...req.body,
                user: req.body.user_id,
            });
            return res.json({
                msg: "Product added to the cart",
                data: item,
                status: "success",
            });
        }
    } catch (e) {
        res.status(500).send({ msg: e.message });
    }

}) 
CartRouter.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        let deletedData = await CartModel.findByIdAndDelete(id);
        res.status(200).json({
            msg: "Product deleted successfullu..!!",
            data: deletedData,
        });
    } catch (er) {
        res.status(500).send({ msg: e.message });
    }

})

CartRouter.patch('/update/:id',async(req,res)=>{
    const id = req.params.id;

    try {
        let cartItem = await CartModel.findOne({ _id: id });
        if (cartItem) {
            let item = await CartModel.findByIdAndUpdate(
                cartItem.id,
                {
                    qty: cartItem.qty + req.body.qty,
                },
                {
                    new: true,
                }
            );
            return res.json({
                msg: "Quantity increased successfully",
                data: item,
            });
        } else {
            res.status(404).json({ msg: "Something went wrong" });
        }
    } catch (er) {
        res.status(500).json({ msg: er.message });
    }

}) 

module.exports = {CartRouter};