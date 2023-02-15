const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
    },
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel