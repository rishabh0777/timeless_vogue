import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useOrder } from "./OrderContext";

// Create Context
export const PaymentContext = createContext();
export const usePayment = () => useContext(PaymentContext);

// Provider
export const PaymentProvider = ({ children }) => {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const { placeOrder } = useOrder();
  const url = import.meta.env.VITE_API_BASE_URL


 
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Initiate Payment
  const initiatePayment = async ({ totalAmount, cartItems, selectedAddr }) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) return alert("Razorpay SDK failed to load");

    try {
      const keyRes = await axios.get(`${url}/api/v1/payments/get-key`, getAuthHeader());
      const orderRes = await axios.post(`${url}/api/v1/payments/create-order`, {
        amount: totalAmount,
      }, getAuthHeader());

      const key = keyRes.data.key;
      const order = orderRes.data.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Timeless Vogue",
        description: "Order Payment",
        order_id: order.id, 

        handler: async function (response) {
          const invoice = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            address: selectedAddr,
            cartItems,
            total: totalAmount,
          });

          if (invoice) {
            const newOrder = await placeOrder({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              invoiceUrl: invoice,
              cartItems,
              totalAmount,
              shippingAddress: selectedAddr,
            });

            if (newOrder) {
              alert("✅ Order placed!");
              window.open(invoice, "_blank");
            } else {
              alert("❌ Order not placed.");
            }
          } else {
            alert("❌ Payment verification failed.");
          }
        },

        prefill: {
          name: selectedAddr.name,
          email: "demo@example.com", // or fetch from user state
          contact: selectedAddr.phone,
        },

        theme: {
          color: "#6366f1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      // console.error("💥 initiatePayment error:", error.message);
      throw error
    }
  };

  // ✅ Verify Payment
  const verifyPayment = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    address,
    cartItems,
    total,
  }) => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      const { data } = await axios.post(
        `${url}/api/v1/payments/verify-payment`,
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          address,
          cartItems,
          total,
        },
        getAuthHeader()
      );

      const invoice = data?.data?.invoiceUrl;
      setInvoiceUrl(invoice);
      return invoice;
    } catch (err) {
      const message = err.response?.data?.message || "Payment verification failed";
      setPaymentError(message);
      // console.error("❌ verifyPayment:", message);
      return null;
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        initiatePayment,
        paymentLoading,
        paymentError,
        invoiceUrl,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
