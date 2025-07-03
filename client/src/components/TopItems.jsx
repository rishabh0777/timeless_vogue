import React, { useContext, useState, useEffect, useRef } from 'react';
import { DataContext, addCart, fetchData } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '../loaderComponents/ProductCardSkeleton';
import { useNavigate } from 'react-router-dom';

const TopItems = () => {
  const [newArrival, setNewArrival] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { products, setCart, setCartLength, setMyProductId } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [productId, setProductId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const info = {
    userId: user?._id,
    setCart,
    setCartLength,
    isLoggedIn,
    setIsLoggedIn
  };

  const addItemToCart = async () => {
    if (!user?._id || !productId) return;
    const cartData = {
      userId: user._id,
      productId: productId,
    };

    try {
      const data = await addCart(cartData);
      if (data) {
        await fetchData(info);
        console.log("Item added to cart from TopItems");
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
      const selectedCategory = "New Arrival";
      const filteredProducts = products.data.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setNewArrival(filteredProducts);

      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    }
  }, [products]);

  // Auto-scroll on small screens
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const interval = setInterval(() => {
      if (scroller.scrollLeft + scroller.offsetWidth >= scroller.scrollWidth) {
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroller.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSetMyProductId = (id) => {
    setMyProductId(id);
    navigate(`/product/${id}`);
  };

  return (
    <div className="w-full sm:min-h-[80svh] md:min-h-[160vh] relative overflow-hidden">
      <div className="w-[90%] min-h-[120vh] absolute md:top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
        <h1 className="md:text-[4vw] sm:text-[7vw] text-center py-2">Signature Collection</h1>

        {/* Grid layout for md and up */}
        <div className="hidden md:grid w-full  grid-cols-3 items-center place-items-center gap-4 mt-[8vh]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : newArrival.length > 0 ? (
            newArrival.map((arrival, index) => (
              <ProductCard
                key={index}
                item={arrival}
                price={`$ ${arrival.price}`}
                btnTxt="Add to cart"
                btnClick={() => setProductId(arrival._id)}
                onClick={() => handleSetMyProductId(arrival._id)}
                
              />
            ))
          ) : (
            <p className="text-center col-span-3">No New Arrivals Found</p>
          )}
        </div>

        {/* Horizontal slider for small screens */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto px-4 py-6 snap-x snap-mandatory scrollbar-hide"
        >
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} className="min-w-[75vw] snap-center" />
            ))
          ) : newArrival.length > 0 ? (
            newArrival.map((arrival, index) => (
              <ProductCard
                key={index}
                item={arrival}
                price={`$ ${arrival.price}`}
                btnTxt="Add to cart"
                btnClick={() => setProductId(arrival._id)}
                onClick={() => handleSetMyProductId(arrival._id)}
                className="min-w-[75vw] snap-center"
              />
            ))
          ) : (
            <p className="text-center">No New Arrivals Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopItems;
