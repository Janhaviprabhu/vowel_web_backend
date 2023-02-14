const mongoose = require('mongoose')

const ProductSchema= mongoose.Schema({
title:String,
price:Number,
quantity:Number,
image:String
})

const ProductModel=mongoose.model("products",ProductSchema)

module.exports={ProductModel}


