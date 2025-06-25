import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";
import { DataContext, addCart, fetchData } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { products, setCart, setCartLength, setMyProductId } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myProducts, setMyProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productId, setProductId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn
  };

  const addItemToCart = async () => {
    if (!user?._id || !productId) {
      console.log("User or Product ID missing");
      return;
    }

    const cartData = {
      userId: user._id,
      productId: productId,
    };

    try {
      const data = await addCart(cartData);
      if (data) {
        await fetchData(info);
        console.log("Item added to cart from Shop");
      } else {
        console.log("Add to cart failed");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  useEffect(() => {
    if (productId) {
      addItemToCart();
    }
  }, [productId]);

  useEffect(() => {
    if (products && Array.isArray(products.data)) {
      const filteredProducts =
        selectedCategory === "All"
          ? products.data
          : products.data.filter((product) =>
              product.category.some(
                (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
              )
            );
      setMyProducts(filteredProducts);
    }
  }, [products, selectedCategory]);

  const handleSetMyProductId = (id) => {
    setMyProductId(id);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[70svh] pt-[10vh] relative">
        <div className="w-full h-[25vh] fixed z-500 bg-white py-4 text-center text-[4vw]">
          <h1>The Wardrobe</h1>
          <div className="w-full flex justify-between px-12">
            <div className="flex gap-4 text-[0.99vw]">
              {["All", "Top Wear", "Bottom Wear", "Winter Wear", "Summer", "Informal", "Formal"].map((category) => (
                <p
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer ${selectedCategory === category ? "font-bold" : ""}`}
                >
                  {category.toUpperCase()}
                </p>
              ))}
            </div>
            <select className="px-2 py-1 text-[0.99vw] rounded-md" name="filter">
              <option value="filter">Filter</option>
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="newest">Newest</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        </div>

        <div className="w-full absolute top-[30vh] overflow-scroll min-h-[100vh] py-10 px-12 grid grid-cols-3 gap-2 justify-items-center shadow-lg z-50">
          {myProducts &&
            myProducts.map((product) => (
              <ProductCard
                key={product._id}
                item={product}
                btnTxt={"Add to Cart"}
                price={`$ ${product.price}`}
                onClick={() => handleSetMyProductId(product._id)}
                btnClick={() => setProductId(product._id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
