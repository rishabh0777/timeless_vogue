import React, { useState, useEffect, useContext } from 'react'
import ProductCard from './ProductCard'
import Navbar from './Navbar'
import { ProductContext } from '../contexts/ProductContext'


const Shop = () => {
  const { products } = useContext(ProductContext)
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    setAllProducts(products?.data)
    console.log(allProducts)
  }, [products])

   
  
  return (
    <>
    <Navbar />
    <div className='w-full min-h-[70svh] pt-[10vh] relative'>
     <div className='w-full h-[25vh] fixed z-500 bg-white py-4 text-center text-[4vw]'>
      <h1>The Wardrobe</h1>
      <div className='w-full flex justify-between px-12'>
      <div className='flex gap-4 text-[0.99vw]'>
            <p className='font-bold'>ALL</p>
            <p>TOP WEAR</p>
            <p>BOTTOM WEAR</p>
            <p>WINTER</p>
            <p>SUMMER</p>
            <p>INFORMAL</p>
            <p>FORMAL</p>
          </div>
          {/* filter select options  */}
          <select 
          className=' px-2 py-1 text-[0.99vw] rounded-md'
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
        {
          allProducts?.map((product, index) => (
            <ProductCard 
            key={index} 
            item={product} 
            btnTxt={'Add to Cart'}
            price={`$ ${product.price}`}
             />
          ))
        }

     </div>
    </div>
    </>
  )
}
0
export default Shop