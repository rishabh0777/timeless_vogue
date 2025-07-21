import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext, addCart, fetchData } from '../contexts/DataContext';
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { toast } from "react-hot-toast";

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, setCart, setCartLength } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const addToCart = async () => {
    if (!isLoggedIn || !user?._id) {
      toast.warn("Please login to add items to your cart");
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
        toast.success("Item added to cart!");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
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
      <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-12 mt-[10vh] gap-8">

        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[80%] md:w-[60%] h-[50vh] md:h-[70vh] rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[95%] md:w-[80%] h-full rounded-lg p-4 md:p-6 flex flex-col justify-start">
            <h1 className="text-[7vw] md:text-[2.5vw] font-bold">{product.title}</h1>
            <p className="text-[4.5vw] md:text-[1.2vw] mt-2">{product.description}</p>
            <p className="text-[6vw] md:text-[2vw] font-semibold mt-4">₹{product.price}</p>
            <button
              className="mt-6 px-6 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition duration-300 w-fit text-[4vw] md:text-[1vw]"
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
