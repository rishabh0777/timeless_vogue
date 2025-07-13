import React, { useEffect } from "react";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { orders, fetchMyOrders, orderLoading, cancelOrder } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (confirmCancel) {
      await cancelOrder(orderId);
      await fetchMyOrders(); // Refresh after cancellation
    }
  };

  if (orderLoading) {
    return (
      <div className="min-h-screen mt-[10vh] px-6 py-10 animate-pulse space-y-6">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded shadow-md border border-zinc-200 space-y-4"
          >
            <div className="h-5 w-[40%] bg-zinc-300 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-300 rounded w-full"></div>
              <div className="h-4 bg-zinc-300 rounded w-[80%]"></div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="h-8 bg-zinc-300 rounded w-[30%]"></div>
              <div className="h-8 bg-zinc-300 rounded w-[30%]"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="min-h-screen mt-[10vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-lg text-zinc-600">You haven't placed any orders yet.</p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 mt-[10vh]">
      <h1 className="text-3xl font-bold text-center mb-8">My Orders</h1>
      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-base sm:text-lg font-semibold break-all">
                Order ID: {order._id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  order.status === "CANCELLED"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Items */}
            <div className="grid gap-2 text-sm text-zinc-700">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-4">
                  <p className="truncate w-[70%]">
                    {item.productId.title} x {item.quantity}
                  </p>
                  <p className="text-right font-medium">
                    ₹{item.productId.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
              {/* Total */}
              <div>
                <p className="text-sm text-zinc-600">Total Amount</p>
                <p className="text-lg font-bold text-zinc-800">₹{order.totalAmount}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {order.invoiceUrl && (
                  <a
                    href={order.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto text-center px-4 py-2 text-sm bg-zinc-700 text-white rounded hover:bg-zinc-900 transition"
                  >
                    Download Invoice
                  </a>
                )}
                {order.status !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="w-full sm:w-auto text-center px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
