import { createContext, useContext, useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import {useNavigate} from "react-router-dom"
export const PaymentContext = createContext();
export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const url = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate()

  const initiatePayment = async ({ totalAmount, cartItems, selectedAddr }) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddr));

      const cashfree = await load({ mode: "sandbox" }); // "production" for live

      const res = await axios.post(
        `${url}/api/v1/payments/create-order`,
        { amount: totalAmount },
        { withCredentials: true }
      );

      const { order_token, order_id } = res.data.data;
      if (!order_token || !order_id) {
        throw new Error("Failed to create payment session");
      }

      await cashfree.checkout({
        paymentSessionId: order_token,
        redirectTarget: "_modal",
      });

      await verifyAndCreateOrder(order_id);
    } catch (err) {
      setPaymentError(err.message || "Something went wrong");
      throw err;
    } finally {
      setPaymentLoading(false);
    }
  };

  const verifyAndCreateOrder = async (order_id) => {
    try {
      const verifyRes = await axios.post(
        `${url}/api/v1/payments/verify-payment`,
        { order_id },
        { withCredentials: true }
      );

      const payment = verifyRes.data.data;

      if (payment.payment_status === "PAID") {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const shippingAddress = JSON.parse(localStorage.getItem("selectedAddress"));

       const res= await axios.post(
          `${url}/api/v1/orders/create`,
          {
            cartItems,
            shippingAddress,
            totalAmount: payment.order_amount,
            paymentId: payment.payment_id,
            orderId: payment.order_id,
          },
          { withCredentials: true }
        );
        if(!res) alert("order not created")
        alert("✅ Order placed and invoice generated!");
      navigate('/order')
      } else {
        alert("❌ Payment failed or still pending.");
      }
    } catch (err) {
      alert("Verification or order placement failed");
    }
  };

  return (
    <PaymentContext.Provider
      value={{ initiatePayment, paymentLoading, paymentError }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
