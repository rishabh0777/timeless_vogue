import fs from "fs";
import path from "path";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import Order from "../models/order.models.js";
import { generateInvoicePDF } from "../utils/generateInvoice.js";

/**
 * @desc    Create new order after successful payment
 * @route   POST /api/v1/orders/create
 * @access  Private
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { paymentId, orderId, cartItems, totalAmount, shippingAddress } = req.body;
  const userId = req.user._id;

  if (
    !paymentId ||
    !orderId ||
    !Array.isArray(cartItems) ||
    cartItems.length === 0 ||
    !totalAmount ||
    !shippingAddress
  ) {
    throw new ApiError(400, "Missing required order data.");
  }

  const items = cartItems.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  }));

  // ✅ Generate invoice PDF and get URL
  const invoicePath = await generateInvoicePDF({
    orderId,
    paymentId,
    address: shippingAddress,
    cartItems: cartItems.map((item) => ({
      name: item.productId.title,
      quantity: item.quantity,
      price: item.productId.price,
    })),
    total: totalAmount,
  });

  const invoiceUrl = `${process.env.BACKEND_URL}/invoices/${path.basename(invoicePath)}`;

  // ✅ Save order
  const order = await Order.create({
    userId,
    items,
    totalAmount,
    shippingAddress,
    razorpayOrderId: orderId,         // renamed field usage (keep it or rename field)
    razorpayPaymentId: paymentId,
    invoiceUrl,
    status: "paid",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created and invoice generated"));
});

/**
 * @desc    Get all orders of logged-in user
 * @route   GET /api/v1/orders/my
 * @access  Private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .populate("items.productId");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched user orders successfully"));
});

/**
 * @desc    Get single order by ID
 * @route   GET /api/v1/orders/:id
 * @access  Private
 */
export const getSingleOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const order = await Order.findOne({ _id: id, userId }).populate("items.productId");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Fetched order details successfully"));
});

/**
 * @desc    Cancel an order and delete invoice
 * @route   PUT /api/v1/orders/cancel/:id
 * @access  Private
 */
export const cancelOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const order = await Order.findOne({ _id: id, userId });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status !== "paid") {
    throw new ApiError(400, "Only paid orders can be cancelled");
  }

  // ✅ Delete the invoice file if exists
  if (order.invoiceUrl) {
    const filename = order.invoiceUrl.split("/").pop();
    const filepath = path.join("public", "invoices", filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  order.status = "cancelled";
  order.invoiceUrl = ""; // clear invoice URL
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order cancelled and invoice deleted"));
});

/**
 * @desc    (Optional Admin) Get all orders
 * @route   GET /api/v1/orders/admin/all
 * @access  Private (Admin)
 */
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate("userId")
    .populate("items.productId");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Fetched all orders (admin)"));
});
