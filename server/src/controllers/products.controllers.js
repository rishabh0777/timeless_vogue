import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import asyncHandler  from '../utils/asyncHandler.js';
import Product from '../models/product.models.js';

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