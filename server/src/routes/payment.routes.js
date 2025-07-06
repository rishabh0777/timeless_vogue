import { Router } from "express";
import {
  createPaymentOrder,
  verifyPayment
} from "../controllers/payment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createPaymentOrder);
router.route("/verify-payment").post(verifyJWT, verifyPayment);

export default router;
