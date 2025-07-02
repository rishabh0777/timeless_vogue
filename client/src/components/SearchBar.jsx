import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';

const SearchBar = ({className}) => {
  const { products } = useContext(DataContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Normalize product list
  const productList = Array.isArray(products?.data) ? products.data : products;

  useEffect(() => {
    console.log('Products:', productList); // Debug: Check if product data is available
  }, [products]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = productList.filter((product) =>
      product?.title?.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // limit to 5
  };

  const handleSelect = (productId) => {
    navigate(`/shop?item=${productId}`);
    setQuery('');
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    const match = productList.find((product) =>
      product?.title?.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      handleSelect(match._id);
    } else {
      alert('No matching product found');
    }
  };

  return (
    <div className={`w-full sm:h-[10vh] md:h-[5vh] px-4 sm:mt-5 md:mt-0 z-[999] ${className}`}>
      <div className='gap-4 relative w-full'>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          className='bg-white shadow rounded-lg w-full sm:px-2 sm:py-4 md:py-2 outline-none text-black'
        />
        <i
          onClick={handleSearchClick}
          className="ri-search-line cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
        ></i>

        {suggestions.length > 0 && (
          <ul className="absolute top-[105%] left-0 w-full bg-white border shadow-md z-[999] rounded-lg max-h-[200px] overflow-y-auto">
            {suggestions.map((product) => (
              <li
                key={product._id}
                onClick={() => handleSelect(product._id)}
                className="px-4 py-2 text-sm hover:bg-zinc-100 cursor-pointer text-black"
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
