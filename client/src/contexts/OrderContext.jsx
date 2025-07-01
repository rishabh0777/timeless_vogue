import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create Context
export const OrderContext = createContext();

// Hook for consuming context
export const useOrder = () => useContext(OrderContext);

// Provider Component
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Place New Order
  const placeOrder = async ({
    razorpayOrderId,
    razorpayPaymentId,
    invoiceUrl,
    cartItems,
    totalAmount,
    shippingAddress,
  }) => {
    setOrderLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/v1/orders/create", {
        razorpayOrderId,
        razorpayPaymentId,
        invoiceUrl,
        cartItems,
        totalAmount,
        shippingAddress,
      });

      if (response.data?.data) {
        return response.data.data; // return the order object
      } else {
        throw new Error("Order creation failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  // ✅ Fetch Current User Orders
  const fetchMyOrders = async () => {
    setOrderLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/v1/orders/my");
      setOrders(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setOrderLoading(false);
    }
  };

  // ✅ Cancel an Order
  const cancelOrder = async (orderId) => {
    setOrderLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/v1/orders/cancel/${orderId}`);
      // Refresh orders after cancellation
      await fetchMyOrders();
      return response.data?.data;
    } catch (err) {
      setError(err.response?.data?.message || "Cancel failed");
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderLoading,
        error,
        placeOrder,
        fetchMyOrders,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
