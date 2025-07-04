import React from 'react';
import ProductCardSkeleton from '../loaderComponents/ProductCardSkeleton';

const ProductCard = ({
  className,
  item,
  price,
  btnTxt,
  onClick,
  btnClick,
  isLoading,
  btnStyle,
}) => {
  if (isLoading) return <ProductCardSkeleton className={className} />;
 
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-md bg-white transition-transform hover:scale-[1.02] duration-300 ease-in-out w-[90vw] tab:w-[60vw] sm:w-[80vw] md:w-[25vw] h-[70vh] sm:pb-5 md:pb-10 ${className}`}
    >
      {/* Larger Image */}
      <div className="h-[68%] w-full overflow-hidden">
        <img
          src={item.image} 
          alt={item.title}
          loading="lazy"
          onClick={onClick}
          className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105 duration-500 ease-in-out"
        />
      </div>

      {/* Info */}
      <div className="h-[32%] w-full bg-white p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-1 flex-grow">
          <h2 className="text-xl font-serif font-semibold text-zinc-900 truncate">
            {item.title}
          </h2>
          <div className='w-full h-[6vh]'>
            <p className="text-[2.8vw] md:text-[1vw] tab:text-[1.5vw] text-zinc-600 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        <div className="mt-3">
          <button
            onClick={btnClick}
            className={`w-full bg-zinc-800 text-white text-base font-medium py-3 px-6 rounded-full hover:bg-zinc-800 transition-all ${btnStyle}`}
          >
            {btnTxt} <span className="text-green-400">{price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
