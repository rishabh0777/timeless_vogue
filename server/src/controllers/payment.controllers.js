import razorpay from "../utils/razorpay.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";
import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import crypto from "crypto"


export const createPaymentOrder = asyncHandler(async(req, res)=>{
  const {amount} = req.body;

  if(!amount || 0){
    throw new ApiError(400, "Invalid amount");
  }
  const options = {
    amount: amount*100,
    currency: "INR",
    reciept: "reciept_"+Date.now();
  };
  const order = await razorpay.orders.create(options);

  if(!order){
    throw new ApiError(500, "Failed to create payment order");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, order, "Payment completed successfully"));

 })

export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    address,
    cartItems,
    total
  } = req.body;

  const secret = process.env.RAZORPAY_SECRET;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (!isAuthentic) {
    throw new ApiError(400, "Payment verification failed");
  }

  // ✅ Generate PDF Invoice
  const invoicePath = generateInvoicePDF({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    address,
    cartItems,
    total
  });

  // Respond with download link (assuming public static path)
  const invoiceUrl = `${req.protocol}://${req.get("host")}/${invoicePath}`;

  res.status(200).json(
    new ApiResponse(200, { invoiceUrl }, "Payment verified and invoice generated")
  );
});