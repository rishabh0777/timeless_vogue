import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext, removeItem, fetchData, addCart } from "../contexts/DataContext";
import { fetchAddress, removeAddress } from "../contexts/AddressContext";
import { AuthContext } from "../contexts/AuthContext";
import { AddressContext } from "../contexts/AddressContext";
import Payment from './Payment';
import CartSkeleton from "../loaderComponents/CartSkeleton";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, setCartLength } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { addresses, setAddresses, selectedAddress, setSelectedAddress } = useContext(AddressContext);
  const user = JSON.parse(localStorage.getItem("user"));
 
  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const url = import.meta.env.VITE_API_BASE_URL


  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn,
  };

  const fetchAddresses = async () => {
    if (user) {
      const addr = await fetchAddress();
      setAddresses(Array.isArray(addr.data) ? addr.data : []);
    }
  };

  useEffect(() => {
    const fetchInitial = async () => {
      await Promise.all([fetchData(info), fetchAddresses()]);
      setIsLoading(false);
    };
    fetchInitial();
  }, []);

  const removeOneAddress = async (id) => {
    setAddressId(id);
    try {
      await removeAddress(id);
      fetchAddresses();
    } catch (error) {
      // console.log(error);
      throw error
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await removeItem({ userId: user._id, productId: id });
      await fetchData(info);
    } catch (error) {
      // console.error("Failed to remove item", error);
      throw error
    }
    setLoading(false);
  };

  const increaseQuantity = async (id) => {
    setLoading(true);
    await addCart({ userId: user._id, productId: id });
    await fetchData(info);
    setLoading(false);
  };

  const decreaseQuantity = async (id, qty) => {
    if (qty <= 1) return await remove(id);
    setLoading(true);
    try {
      await axios.put(`${url}/api/v1/products/cart/decrease-quantity`, {
        userId: user._id,
        productId: id,
      });
      await fetchData(info);
    } catch (error) {
      // console.error("Failed to decrease quantity", error);
      throw error
    }
    setLoading(false);
  };

  const totalPrice = cart?.items?.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  if (isLoading) return <CartSkeleton />;

  return (
    <div className="w-full min-h-[200vh] pt-[10vh] px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">CHECKOUT</h1>

      {user ? cart?.items?.length > 0 ? (
        <>
          {/* ✅ Headers */}
          <div className="hidden md:grid grid-cols-5 font-semibold text-sm text-zinc-600 pb-3">
            <p className="col-span-2">Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Subtotal</p>
          </div>

          {/* ✅ Cart Items */}
          {cart.items.map((item) => (
            <div key={item.productId._id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 border-t border-zinc-200">
              <div className="col-span-2 flex gap-4 items-start sm:items-center">
                <div className="w-20 h-20 bg-zinc-100 rounded overflow-hidden">
                  <img src={item.productId.image} alt={item.productId.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-sm sm:text-base">{item.productId.title}</h2>
                  <p className="text-xs text-zinc-600 line-clamp-2">{item.productId.description}</p>
                  <button onClick={() => remove(item.productId._id)} className="text-red-500 text-xs mt-1">
                    Remove
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="text-center text-sm sm:text-base">
                <span className="md:hidden font-medium block mb-1">Price:</span>
                ₹{item.productId.price}
              </div>

              {/* Quantity */}
              <div className="flex flex-col justify-center items-center gap-1">
                <span className="md:hidden font-medium mb-1">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(item.productId._id, item.quantity)} className="px-2 py-1 bg-zinc-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.productId._id)} className="px-2 py-1 bg-zinc-200 rounded">+</button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-center font-medium text-sm sm:text-base">
                <span className="md:hidden font-medium block mb-1">Subtotal:</span>
                ₹{(item.productId.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          {loading && <p className="text-center text-sm text-zinc-500 mt-4">Updating cart...</p>}

          {/* ✅ Total Amount */}
          <div className="mt-6 flex justify-end">
            <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[30%] bg-zinc-100 rounded-lg p-4">
              <div className="flex justify-between text-lg font-semibold mb-2">
                <p>Total Amount:</p>
                <p>₹{totalPrice?.toFixed(2)}</p>
              </div>
              <p className="text-sm text-zinc-600">This is the total cost of your selected items.</p>
            </div>
          </div>

          {/* ✅ Address Section */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Choose Delivery Address</h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr._id)}
                  className={`cursor-pointer w-[30%] min-w-[250px] border p-4 rounded-lg transition-all duration-200 ${
                    selectedAddress === addr._id
                      ? "border-green-600 bg-green-50 shadow"
                      : "border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  <p className="font-semibold text-zinc-800">{addr.name} - {addr.phone}</p>
                  <p className="text-sm text-zinc-700">{addr.addressLine}, {addr.city}</p>
                  <p className="text-sm text-zinc-700">{addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-zinc-700">{addr.country}</p>
                  <div className="flex justify-between items-center px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/address?edit=${addr._id}`);
                      }}
                      className="text-blue-600 text-sm mt-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeOneAddress(addr._id)}
                      className="text-red-600 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* ✅ Add New Address Styled as Card */}
              {addresses.length < 3 && (
                <div
                  onClick={() => navigate("/address")}
                  className="cursor-pointer w-[30%] min-w-[250px] flex items-center justify-center border border-zinc-300 p-4 rounded-lg bg-zinc-800 text-white hover:bg-zinc-900 transition"
                >
                  Add New Address
                </div>
              )}
            </div>
          </div>

          {/* ✅ Payment Section */}
          <div className="w-full mt-10">
            <Payment />
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
