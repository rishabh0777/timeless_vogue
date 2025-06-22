import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext, addCart, fetchData } from '../contexts/DataContext';
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar";

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setCart, setCartLength } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addToCart = async () => {
    if(!isLoggedIn || !user?._id) {
      console.log("User not logged in or user ID missing");
      navigate("/login");
      return;
    }

    const cartData = {
      userId: user?._id,
      productId: id,
    };
    try {
      const data = await addCart(cartData);
      if (data) {
        await fetchData({
          isLoggedIn,
          userId: user._id,
          setCart,
          setCartLength,
        });
        console.log("Item added to cart");
      } else {
        console.log("Add to cart failed");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    if (products?.data?.length > 0) {
      const foundProduct = products.data.find((p) => p._id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) return <div className="p-10 text-xl">Loading product...</div>;

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex items-end">
        {/* Left: Product Image */}
        <div className="w-1/2 h-[90vh] py-4 px-4 flex flex-col items-center justify-center">
          <div className="w-[60%] h-[80%] rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-1/2 h-[90vh] flex items-center justify-start">
          <div className="w-[90%] h-[80%] rounded-lg p-6 flex flex-col items-start justify-start">
            <h1 className="text-[5vw] font-bold">{product.title}</h1>
            <p className="text-[2vw] mt-2">{product.description}</p>
            <p className="text-[5vw] font-semibold mt-4">${product.price}</p>
            <button
              className="mt-6 px-6 py-4 cursor-pointer bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition duration-300"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
