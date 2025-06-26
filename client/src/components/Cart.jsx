import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // ✅ Added here
import axios from "axios";
import { DataContext, removeItem, fetchData, addCart } from "../contexts/DataContext";
import { fetchAddress } from "../contexts/AddressContext";
import { AuthContext } from "../contexts/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅ Hook added
  const editId = searchParams.get("edit");  // ✅ Now this will work

  const { cart, setCart, setCartLength } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn,
  };

  const remove = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      await removeItem({ userId: user._id, productId: id });
      await fetchData(info);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
    setLoading(false);
  };

  const increaseQuantity = async (id) => {
    if (!id) return;
    setLoading(true);
    await addCart({ userId: user._id, productId: id });
    await fetchData(info);
    setLoading(false);
  };

  const decreaseQuantity = async (id, currentQty) => {
    if (!id) return;
    if (currentQty <= 1) {
      await remove(id);
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/v1/products/cart/decrease-quantity`, {
        userId: user._id,
        productId: id,
      });
      await fetchData(info);
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
    setLoading(false);
  };

  const totalPrice = cart?.items?.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

useEffect(() => {
  const fetchEditData = async () => {
    if (editId) {
      try {
        const { data } = await axios.get(`/api/v1/address/get`);
        const targetAddress = data.data.find(addr => addr._id === editId);
        if (targetAddress) setFormData(targetAddress);
      } catch (err) {
        setError("Unable to fetch address to edit.");
      }
    }
  };

  fetchEditData();
}, [editId]);


  return (
    <div className="w-full min-h-screen pt-[10vh] px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">CHECKOUT</h1>

      {user ? (
        cart?.items?.length > 0 ? (
          <>
            <div className="hidden md:grid grid-cols-5 font-semibold text-sm text-zinc-600 pb-3">
              <p className="col-span-2">Product</p>
              <p className="text-center">Price</p>
              <p className="text-center">Quantity</p>
              <p className="text-center">Subtotal</p>
            </div>

            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 border-t border-zinc-200"
              >
                <div className="col-span-2 flex gap-4 items-center">
                  <div className="w-20 h-20 rounded bg-zinc-100 overflow-hidden shrink-0">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-base">{item.productId.title}</h2>
                    <p className="text-xs text-zinc-600 line-clamp-2">
                      {item.productId.description}
                    </p>
                    <button
                      onClick={() => remove(item.productId._id)}
                      className="text-red-500 text-xs mt-1 w-fit"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm">${item.productId.price}</div>

                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.productId._id, item.quantity)}
                    className="px-2 py-1 bg-zinc-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId._id)}
                    className="px-2 py-1 bg-zinc-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="text-center font-medium text-sm">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-center text-sm text-zinc-500 mt-4">Updating cart...</p>
            )}

            {/* Red Section — Address Selector */}
            <div className="w-full min-h-[40vh] bg-red-500 px-4 md:px-12 py-6 mt-10 rounded-md">
              <h2 className="text-white text-xl font-semibold mb-4">Select Address</h2>

              <div className="w-full max-w-2xl bg-white p-4 rounded space-y-4 shadow">
                {addresses.length === 0 ? (
                  <div className="flex justify-between items-center">
                    <p className="text-zinc-700">No address found.</p>
                    <button
                      onClick={() => navigate("/address")}
                      className="px-4 py-2 bg-black text-white rounded"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <>
                    {addresses.map((addr) => (
                      <div
                        key={addr._id}
                        className="border rounded p-3 flex justify-between items-start"
                      >
                        <div className="text-sm text-zinc-800">
                          <p><strong>{addr.name}</strong> - {addr.phone}</p>
                          <p>{addr.addressLine}, {addr.city}</p>
                          <p>{addr.state} - {addr.pincode}</p>
                          <p>{addr.country}</p>
                        </div>
                        <button
                          onClick={() => navigate(`/address?edit=${addr._id}`)}
                          className="text-blue-600 text-sm underline"
                        >
                          Edit
                        </button>
                      </div>
                    ))}

                    {addresses.length < 3 && (
                      <button
                        onClick={() => navigate("/address")}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Add Address
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center md:items-end gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                Grand Total: ${totalPrice.toFixed(2)}
              </h2>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded hover:bg-green-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-12">
            <h1 className="text-2xl md:text-3xl">Your cart is empty</h1>
            <button
              onClick={() => navigate("/shop")}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Shop Now
            </button>
          </div>
        )
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-zinc-700 text-white text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          Login To Get Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
