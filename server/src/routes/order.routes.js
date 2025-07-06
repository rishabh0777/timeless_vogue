import express from "express";
import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  cancelOrder,
  getAllOrders,
} from "../controllers/order.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
// import { isAdmin } from "../middlewares/role.middlewares.js"; // Optional if needed

const router = express.Router();

// 🛒 User Routes
router.post("/create", verifyJWT, createOrder);
router.get("/my", verifyJWT, getMyOrders);
router.get("/:id", verifyJWT, getSingleOrder);
router.put("/cancel/:id", verifyJWT, cancelOrder);

// 🛠️ Admin Route (optional)
router.get("/admin/all", verifyJWT /*, isAdmin*/, getAllOrders);

export default router;
