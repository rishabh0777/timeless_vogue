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
      await fetchMyOrders();
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 md:px-12 py-10 mt-[10vh]">
      {orderLoading ? (
        <div className="flex flex-col gap-8 animate-pulse">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="h-5 bg-zinc-300 rounded w-[60%]"></div>
                <div className="h-5 bg-zinc-300 rounded w-[30%]"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-zinc-300 rounded w-full"></div>
                <div className="h-4 bg-zinc-300 rounded w-[80%]"></div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                <div className="space-y-1">
                  <div className="h-4 bg-zinc-300 rounded w-20"></div>
                  <div className="h-5 bg-zinc-300 rounded w-32"></div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="h-8 bg-zinc-300 rounded w-full sm:w-32"></div>
                  <div className="h-8 bg-zinc-300 rounded w-full sm:w-32"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          <p className="text-lg">You haven’t placed any orders yet.</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>
          <div className="flex flex-col gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-zinc-200 rounded-lg p-6 shadow-md bg-white"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                  <h2 className="text-base sm:text-lg font-semibold break-all">
                    Order ID: {order._id}
                  </h2>
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

                <div className="grid gap-2 text-sm text-zinc-700">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between gap-4">
                      <p className="w-full sm:w-[70%] truncate">
                        {item.productId.title} x {item.quantity}
                      </p>
                      <p className="w-[30%] text-right">
                        ₹{item.productId.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
                  <div>
                    <p className="text-sm text-zinc-600">Total:</p>
                    <p className="text-lg font-bold text-zinc-800">₹{order.totalAmount}</p>
                  </div>

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
        </>
      )}
    </div>
  );
};

export default Order;
