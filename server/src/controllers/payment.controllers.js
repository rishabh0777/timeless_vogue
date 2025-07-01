import Razorpay from "razorpay";
import crypto from "crypto";
import { generateInvoicePDF } from "../utils/generateInvoice.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// ✅ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Create Razorpay Order
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Invalid amount");
  }
 
  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  if (!order) {
    throw new ApiError(500, "Failed to create Razorpay order");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Payment order created"));
});

// ✅ Verify Razorpay Payment
export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    address,
    cartItems,
    total,
  } = req.body;

  const secret = process.env.RAZORPAY_SECRET;
  if (!secret) throw new ApiError(500, "Missing Razorpay secret");

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new ApiError(400, "Invalid Razorpay signature");
  }

  // Simplify cart items for invoice
  const simplifiedItems = cartItems.map((item) => ({
    name: item.productId?.title || item.name || "Unnamed Product",
    price: item.productId?.price || item.price || 0,
    quantity: item.quantity || 1,
  }));

  // ✅ Generate Invoice PDF
  try {
    const invoicePath = await generateInvoicePDF({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      address,
      cartItems: simplifiedItems,
      total,
    });

    const invoiceUrl = `${req.protocol}://${req.get("host")}/${invoicePath}`;

    return res.status(200).json(
      new ApiResponse(200, { invoiceUrl }, "Payment verified and invoice generated")
    );
  } catch (err) {
    console.error("Invoice generation failed:", err.message);
    throw new ApiError(500, "Invoice generation failed");
  }
});
