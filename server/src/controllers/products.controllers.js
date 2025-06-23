import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Product from "../models/product.models.js";
import Cart from "../models/cart.models.js";

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    throw new ApiError(
      404,
      "Sorry we are unable to fetch Products at the moment please check your connection and try again"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});


//Add item to Cart

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId && !productId) {
    throw new ApiError(409, "UserId or ProductId not found");
  }
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }],
      });
    } else {
      const item = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }
    await cart.save();
    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Item added to cart successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "Sorry we are unable to add item to cart at the moment please try again later"
    );
  }
});

//Get user Cart
const getCart = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return next(new ApiError(400, "User ID is required"));
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }

    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + (item.productId?.price || 0) * item.quantity;
    }, 0);

    return res
      .status(200)
      .json(
        new ApiResponse(200, { cart, totalPrice }, "Cart fetched successfully")
      );
  } catch (error) {
    return next(new ApiError(500, "Internal server error"));
  }
});

// Remove item from cart
const removeItemFromCart = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!userId || !productId) {
      return next(new ApiError(400, "UserId and ProductId are required"));
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return next(new ApiError(404, "Product not found in cart"));
    }

    cart.items.splice(itemIndex, 1);
    cart.markModified("items");
    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Item successfully removed from cart"));
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return next(new ApiError(500, "Internal server error"));
  }
});


const decreaseCartQuantity = asyncHandler(async (req, res, next) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return next(new ApiError(400, "UserId and ProductId are required"));
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return next(new ApiError(404, "Cart not found"));
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return next(new ApiError(404, "Product not found in cart"));
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Cart quantity decreased successfully"));
  } catch (error) {
    return next(new ApiError(500, "Internal server error"));
  }
}
);

export { getProducts, addToCart, getCart, removeItemFromCart, decreaseCartQuantity };
