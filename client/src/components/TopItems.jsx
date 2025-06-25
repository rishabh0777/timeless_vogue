import React, { useContext, useState, useEffect } from 'react';
import { DataContext, addCart, fetchData } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const TopItems = () => {
  const [newArrival, setNewArrival] = useState([]);
  const { products, setCart, setCartLength, setMyProductId } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

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
      const selectedCategory = "New Arrival";
      const filteredProducts = products.data.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setNewArrival(filteredProducts);
    }
  }, [products]);

  const handleSetMyProductId = (id) => {
    setMyProductId(id);
    navigate(`/product/${id}`);
  };



  return (
    <div>
      <div className="w-full min-h-[150svh] relative">
        <div className="w-[90%] min-h-[80vh] absolute top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
          <h1 className="text-[4vw] text-center py-2">Signature Collection</h1>
          <div className="w-full h-[80%] grid grid-cols-3 items-center place-items-center gap-2 mt-[8vh] space-y-4">
            {newArrival.length > 0 ? (
              newArrival.map((arrival, index) => (
                <ProductCard
                  key={index}
                  item={arrival}
                  price={`$ ${arrival.price}`}
                  btnTxt="Add to cart"
                  btnClick={() => { setProductId(arrival._id) }}
                  onClick={() => handleSetMyProductId(arrival._id)}
                />
              ))
            ) : (
              <p className="text-center col-span-3">No New Arrivals Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopItems;
