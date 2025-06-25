import React, { useRef } from 'react';
import gsap from 'gsap';

const ProductCard = ({ className, item, price, btnTxt, onClick, btnClick }) => {
  const categoryInformationRef = useRef(null);

  const hoverEffect = () => {
    gsap.to(categoryInformationRef.current, {
      height: "60%", // Expands smoothly
      duration: 0.7,
      ease: "power2.inOut",
    });
  };

  const leaveEffect = () => {
    gsap.to(categoryInformationRef.current, {
      height: "0%", // Shrinks back
      duration: 0.7,
      ease: "power2.inOut"
    });
  };

  return (
    <div
    
      className={`bg-zinc-900 w-[25vw] min-h-[51vh] cursor-pointer p-0 relative overflow-hidden ${className}`}
      onMouseEnter={hoverEffect}
      onMouseLeave={leaveEffect}
    >
      {/* Background Image */}
      <img onClick={onClick} loading="lazy" className="w-full absolute" src={item.image} alt={item.title} />

     
      {/* Information Section */}
      <div
        ref={categoryInformationRef}
        className="w-full h-0 bg-white/10 backdrop-blur-md absolute z-[12] bottom-0 flex flex-col justify-center items-center text-center px-4 text-white overflow-hidden transition-all"
      >
        {/* Category Title */}
        <h2 className="text-lg font-semibold uppercase">{item.title}</h2>

        {/* Description */}
        <p className="text-sm opacity-80 mt-2">{item.description}</p>

        {/* Secondary Button */}
        
      </div>
      <button 
        onClick={btnClick}
        className="mt-4 px-6 py-3 w-[60%] bg-white text-black absolute z-50 left-1/2 bottom-[1vh] transform -translate-x-1/2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all cursor-pointer">
          {btnTxt} <span className="text-green-500">{price}</span>
        </button>
    </div>
  );
};

export default ProductCard;
