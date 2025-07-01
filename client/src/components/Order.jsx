import React, { useEffect } from "react";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { orders, fetchMyOrders, orderLoading, cancelOrder } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const handleCancel = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (confirmed) {
      await cancelOrder(id);
    }
  };

  return (
    <div className="min-h-[100vh] px-4 md:px-12 py-10 mt-[8vh]">
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {orderLoading ? (
        <p className="text-center text-zinc-500">Loading your orders...</p>
      ) : orders?.length === 0 ? (
        <div className="text-center">
          <p className="text-lg">You haven’t placed any orders yet.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "CANCELLED"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid gap-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-zinc-700">
                    <p>
                      {item.productId.title} x {item.quantity}
                    </p>
                    <p>₹{item.productId.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-zinc-600">Total:</p>
                  <p className="text-lg font-bold text-zinc-800">₹{order.totalAmount}</p>
                </div>

                <div className="flex gap-4">
                  {order.invoiceUrl && (
                    <a
                      href={order.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm bg-zinc-700 text-white rounded hover:bg-zinc-900"
                    >
                      Download Invoice
                    </a>
                  )}
                  {order.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
