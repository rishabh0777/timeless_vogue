import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import asyncHandler  from '../utils/asyncHandler.js';
import Product from '../models/product.models.js';
import Cart from '../models/cart.models.js'

// Get all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    throw new ApiError(404, "Sorry we are unable to fetch Products at the moment please check your connection and try again");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

//Add Products to cart 
export const addProductToCart = asyncHandler(async (req, res) => {
   const {price, qty, productName, image, description} = req.body;
   if(!price || !qty || !productName || !image || !description){
    throw new ApiError(400, "Please fill all the fields");
   }
   const cart = await Cart.create({
    price,
    qty,
    productName,
    image,
    description
   })
   if(!cart){
    throw new ApiError(400, "Sorry we are unable to add product to cart at the moment please try again");
   }
   return res
   .status(200)
   .json(new ApiResponse(200, cart, "Product added to cart successfully"));
})