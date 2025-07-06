import { Cashfree, CFEnvironment } from "cashfree-pg";
import crypto from "crypto";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import axios from "axios";

// ✅ Set Cashfree credentials
Cashfree.XClientId = process.env.CF_APP_ID;
Cashfree.XClientSecret = process.env.CF_SECRET_KEY;
Cashfree.XEnvironment = CFEnvironment.SANDBOX;

const generateOrderId = () => {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256").update(uniqueId).digest("hex");
  return hash.substring(0, 12);
};

// ✅ Create Payment Order
export const createPaymentOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    throw new ApiError(400, "Valid amount is required");
  }

  const orderId = generateOrderId();

  const request = {
    order_id: orderId,
    order_amount: amount,
    order_currency: "INR",
    customer_details: {
      customer_id: "customer123",
      customer_email: "customer123@gmail.com",
      customer_phone: "9876543210",
    },
  };

  try {
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    if (!response?.data?.payment_session_id) {
      throw new ApiError(500, "Failed to receive payment session from Cashfree");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          order_id: orderId,
          order_token: response.data.payment_session_id,
          order_url: response.data.payment_link,
        },
        "Payment order created successfully"
      )
    );
  } catch (error) {
    const msg = error?.response?.data?.message || error.message;
    throw new ApiError(500, msg);
  }
});

// ✅ Verify Payment Status
export const verifyPayment = asyncHandler(async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    throw new ApiError(400, "order_id is required");
  }

  try {
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CF_APP_ID,
          "x-client-secret": process.env.CF_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      }
    );

    const status = response.data?.order_status;
    const amount = response.data?.order_amount;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          order_id,
          payment_status: status,
          order_amount: amount,
          payment_id: order_id, // Use order_id as fallback if payment_id not provided
        },
        "Payment verified successfully"
      )
    );
  } catch (error) {
    const msg = error?.response?.data?.message || error.message;
    throw new ApiError(500, msg);
  }
});
