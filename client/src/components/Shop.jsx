import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "../loaderComponents/ProductCardSkeleton";
import Navbar from "./Navbar";
import { DataContext, addCart, fetchData } from "../contexts/DataContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ShopSkeleton from "../loaderComponents/ShopSkeleton";

const Shop = () => {
  const { products, setCart, setCartLength, setMyProductId } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [myProducts, setMyProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productId, setProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const searchedProductId = searchParams.get("item");

  const user = JSON.parse(localStorage.getItem("user"));

  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn,
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
      let filteredProducts = [];

      if (selectedCategory === "All") {
        filteredProducts = [...products.data];
      } else {
        filteredProducts = products.data.filter((product) =>
          product.category.some(
            (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
          )
        );
      }

      // Prioritize searched product (if any)
      if (searchedProductId) {
        const index = filteredProducts.findIndex((p) => p._id === searchedProductId);
        if (index !== -1) {
          const [item] = filteredProducts.splice(index, 1);
          filteredProducts.unshift(item); // Bring it to the top
        }
      }

      setMyProducts(filteredProducts);

      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }
  }, [products, selectedCategory, searchedProductId]);

  // Optional: Clean URL by removing ?item after showing
  useEffect(() => {
    if (searchedProductId) {
      const timeout = setTimeout(() => {
        navigate("/shop", { replace: true });
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleSetMyProductId = (id) => {
    setMyProductId(id);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <ShopSkeleton />
      ) : (
        <div className="w-full min-h-[70svh] pt-[10vh] relative">
          {/* Header and category filters */}
          <div className="w-full h-[25vh] fixed z-500 bg-white py-4 text-center text-[4vw]">
            <h1>The Wardrobe</h1>
            <div className="w-full flex justify-between px-12">
              <div className="flex gap-4 text-[0.99vw]">
                {["All", "Top Wear", "Bottom Wear", "Winter Wear", "Summer", "Informal", "Formal"].map((category) => (
                  <p
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsLoading(true); // Re-trigger loader
                    }}
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

          {/* Products List */}
          <div className="w-full absolute top-[30vh] overflow-scroll min-h-[100vh] py-10 px-12 grid grid-cols-3 gap-2 justify-items-center shadow-lg z-50">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : myProducts.length > 0
              ? myProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    item={product}
                    btnTxt={"Add to Cart"}
                    price={`$ ${product.price}`}
                    onClick={() => handleSetMyProductId(product._id)}
                    btnClick={() => setProductId(product._id)}
                  />
                ))
              : <p className="col-span-3">No products found in this category.</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
