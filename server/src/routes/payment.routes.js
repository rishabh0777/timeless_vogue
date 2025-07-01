import { Router } from "express"
import {
  verifyPayment,
  createPaymentOrder
} from "../controllers/payment.controllers.js"


import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get('/get-key', verifyJWT, (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

//Secured routes
router.route('/create-order').post(verifyJWT, createPaymentOrder)
router.route('/verify-payment').post(verifyJWT, verifyPayment)

export default router;

 