import express from "express";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  getAllOrders,
} from "../controllers/order.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// User routes
router.route("/create").post( verifyJWT, createOrder);
router.route("/my").get(verifyJWT, getMyOrders);
router.route("/:id").get(verifyJWT, getSingleOrder);
router.route("/cancel/:id").put(verifyJWT, cancelOrder);

// Admin (optional)
router.route("/admin/all").get(verifyJWT, getAllOrders); // add isAdmin check if needed

export default router;
 