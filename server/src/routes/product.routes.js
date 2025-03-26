import { Router } from "express";
import {
  getProducts,
  addToCart,
  getCart,
  removeItemFromCart,
} from "../controllers/products.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getProducts);

// secured routes
router.route("/cart").post(verifyJWT, addToCart);
router.route("/cart/:userId").get(verifyJWT, getCart);
router
  .route("/cart/:userId/:remove-cart-item")
  .delete(verifyJWT, removeItemFromCart);

export default router;
