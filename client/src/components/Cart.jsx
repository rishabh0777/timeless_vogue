import React, { useContext, useEffect, useState } from "react";
import { DataContext, removeItem, fetchData } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, cartLength, setCartLength } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [productId, setProductId] = useState();

  const userAndProductId = {
    userId: user?._id,
    productId,
  };
  // cart data fetching information for function
  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn,
  };

  // function to remove item from cart

  useEffect(() => {
    const remove = async () => {
      if (productId) {
        await removeItem(userAndProductId);
        await fetchData(info);
      }
    };
    remove();
  }, [productId]);

  return (
    <div className="w-full min-h-screen pt-[10vh]">
      <h1 className="text-[4vw] text-center">CHECKOUT</h1>

      {user ? (
        <div className="w-full min-h-[20vh] px-12 flex flex-col">
          <div className="w-full h-[5vh] flex border-b-2 border-zinc-500 text-[0.9vw]">
            <div className="w-[60%]">
              <p>Products</p>
            </div>
            <div className="w-[40%] flex justify-evenly">
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          </div>
          {/*Cart item Cards*/}

          {cart?.items?.length > 0 ? (
            cart.items.map((Cart, index) => (
              <div key={index} className="w-full min-h-[30vh] flex">
                <div className="w-[60%] h-[28vh] overflow-hidden gap-12 flex items-center justify-between px-12">
                  <div className="w-[11vw] h-[23vh] bg-zinc-500">
                    <img
                      loading="lazy"
                      className="w-full"
                      src={Cart.productId.image}
                      alt={Cart.title}
                    />
                  </div>
                  <div className="h-[28vh] py-2 flex flex-col items-center gap-4 justify-center text-center">
                    <h2 className="font-bold">{Cart.productId.title}</h2>
                    <p>{Cart.productId.description}</p>
                  </div>
                  <div
                    onClick={() => setProductId(Cart.productId)}
                    className="w-[10%] h-[28vh] py-2 flex items-center gap-4"
                  >
                    <i className="ri-delete-bin-3-fill text-[1.2vw] text-red-500 cursor-pointer"></i>
                  </div>
                </div>
                <div className="w-[40%] h-[28vh] flex items-center justify-evenly">
                  <p>${Cart.productId.price}</p>
                  <p>{Cart.quantity} Qty</p>
                  <p>${Cart.productId.price * Cart.quantity}</p>{" "}
                  {/* Fixed total price calculation */}
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center mt-12">Your Cart is empty</h1>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-zinc-700 text-white text-[1.3vw] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          Login To Get Cart
        </button>
      )}
    </div>
  );
};

export default Cart;
