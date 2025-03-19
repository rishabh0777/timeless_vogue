import mongoose from "mongoose";
import User from "./user.models.js";
import Product from "./product.models.js"

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps: true})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart