import React, { useState, useEffect, useContext } from 'react';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import { ProductContext } from '../contexts/ProductContext';

const Shop = () => {
  const { products } = useContext(ProductContext);
  const [myProducts, setMyProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (products && Array.isArray(products.data)) {
      const filteredProducts = selectedCategory === 'All'
        ? products.data
        : products.data.filter((product) =>
            product.category.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
          );
      setMyProducts(filteredProducts);
    }
  }, [products, selectedCategory]);

  return (
    <>
      <Navbar />
      <div className='w-full min-h-[70svh] pt-[10vh] relative'>
        <div className='w-full h-[25vh] fixed z-500 bg-white py-4 text-center text-[4vw]'>
          <h1>The Wardrobe</h1>
          <div className='w-full flex justify-between px-12'>
            <div className='flex gap-4 text-[0.99vw]'>
              <p onClick={() => setSelectedCategory("All")} className='font-bold cursor-pointer'>ALL</p>
              <p onClick={() => setSelectedCategory("Top Wear")} className='cursor-pointer'>TOP WEAR</p>
              <p onClick={() => setSelectedCategory("Bottom Wear")} className='cursor-pointer'>BOTTOM WEAR</p>
              <p onClick={() => setSelectedCategory("Winter Wear")} className='cursor-pointer'>WINTER</p>
              <p onClick={() => setSelectedCategory("Summer Wear")} className='cursor-pointer'>SUMMER</p>
              <p onClick={() => setSelectedCategory("Informal")} className='cursor-pointer'>INFORMAL</p>
              <p onClick={() => setSelectedCategory("Formal")} className='cursor-pointer'>FORMAL</p>
            </div>
            {/* filter select options  */}
            <select 
              className='px-2 py-1 text-[0.99vw] rounded-md'
              name="filter" id="">
              <option value="filter">Filter</option>
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="newest">Newest</option>
              <option value="discount">Discount</option>
            </select>
          </div>
        </div>
        <div className='w-full absolute top-[30vh] overflow-scroll min-h-[100vh] py-10 px-12 grid grid-cols-3 gap-2 justify-items-center shadow-lg z-50'>
          {myProducts && myProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              item={product} 
              btnTxt={'Add to Cart'}
              price={`$ ${product.price}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;