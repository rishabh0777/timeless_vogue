import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../contexts/DataContext';
import ProductCard from './ProductCard';

const TopItems = () => {
  const [newArrival, setNewArrival] = useState([]);
  const { products } = useContext(DataContext);

  useEffect(() => {
    if (products && Array.isArray(products.data)) {
      const selectedCategory = "New Arrival";
      const filteredProducts = products.data.filter((product) =>
        product.category.includes(selectedCategory)
      );
      setNewArrival(filteredProducts);
    }
  }, [products]);
  
  

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
