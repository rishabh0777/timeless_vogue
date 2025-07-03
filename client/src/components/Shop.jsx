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
  const [selectedFilter, setSelectedFilter] = useState("filter");

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
    if (!user?._id || !productId) return;
    const cartData = { userId: user._id, productId: productId };
    try {
      const data = await addCart(cartData);
      if (data) await fetchData(info);
    } catch (err) {
      // console.error("Error adding to cart:", err);
      throw err
    }
  };

  useEffect(() => {
    if (productId) addItemToCart();
  }, [productId]);

  useEffect(() => {
    if (products && Array.isArray(products.data)) {
      let filteredProducts = selectedCategory === "All"
        ? [...products.data]
        : products.data.filter((product) =>
          product.category.some(
            (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
          )
        );

      // Apply basic filter logic (you can expand this)
      if (selectedFilter === "price") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (selectedFilter === "newest") {
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Bring searched item to top
      if (searchedProductId) {
        const index = filteredProducts.findIndex((p) => p._id === searchedProductId);
        if (index !== -1) {
          const [item] = filteredProducts.splice(index, 1);
          filteredProducts.unshift(item);
        }
      }

      setMyProducts(filteredProducts);
      setTimeout(() => setIsLoading(false), 1200);
    }
  }, [products, selectedCategory, selectedFilter, searchedProductId]);

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
        <div className="w-full min-h-[90svh] pt-[10vh] relative pb-10">
          {/* Header and filters */}
          <div className="w-full fixed md:top-[9vh] z-100 bg-white py-4 text-center shadow-md">
            <div className="max-w-[95%] md:max-w-[90%] xl:max-w-[1200px] mx-auto">
              <h1 className="md:text-[4vw] sm:text-[7vw] font-bold mb-2 sm:hidden md:flex">The Wardrobe</h1>

              {/* Mobile: Unified dropdown */}
              <div className="flex items-center justify-between md:hidden w-full px-2">
                <h1 className="md:text-[4vw] sm:text-[7vw] font-bold md:hidden md:flex">The Wardrobe</h1>

                <select
                  className="w-[30vw] px-3 py-2 rounded-md shadow text-[3vw]"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (["Filter", "Top Wear", "Bottom Wear", "Winter Wear", "Summer", "Informal", "Formal"].includes(value)) {
                      setSelectedCategory(value);
                      setIsLoading(true);
                    } else {
                      setSelectedFilter(value);
                      setIsLoading(true);
                    }
                  }}
                >
                  <optgroup label="Categories">
                    {["Filter", "Top Wear", "Bottom Wear", "Winter Wear", "Summer", "Informal", "Formal"].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Filters">
                    <option value="popularity">Popularity</option>
                    <option value="price">Price</option>
                    <option value="newest">Newest</option>
                    <option value="discount">Discount</option>
                  </optgroup>
                </select>
              </div>

              {/* Desktop: category & filter separated */}
              <div className="hidden md:flex w-full justify-between items-center gap-3">
                <div className="flex gap-3 text-[1vw] whitespace-nowrap px-1">
                  {["All", "Top Wear", "Bottom Wear", "Winter Wear", "Summer", "Informal", "Formal"].map((category) => (
                    <p
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsLoading(true);
                      }}
                      className={`cursor-pointer px-2 py-1 rounded-md transition-all ${selectedCategory === category
                          ? "font-bold underline underline-offset-4"
                          : ""
                        }`}
                    >
                      {category.toUpperCase()}
                    </p>
                  ))}
                </div>

                <select
                  className="px-3 py-2 rounded-md border text-[1vw]"
                  name="filter"
                  onChange={(e) => {
                    setSelectedFilter(e.target.value);
                    setIsLoading(true);
                  }}
                >
                  <option value="filter">Filter</option>
                  <option value="popularity">Popularity</option>
                  <option value="price">Price</option>
                  <option value="newest">Newest</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full absolute top-[30vh] md:top-[40vh] px-4 md:px-0">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center min-h-[100vh]">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : myProducts.length > 0 ? (
                myProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    item={product}
                    btnTxt="Add to Cart"
                    price={`$ ${product.price}`}
                    onClick={() => handleSetMyProductId(product._id)}
                    btnClick={() => setProductId(product._id)}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-xl">No products found in this category.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
