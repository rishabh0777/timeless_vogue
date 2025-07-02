import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import CardSkeleton from '../loaderComponents/CardSkeleton';

const Card = ({ className, btnTxt, image, title, description, price, isLoading, onClick, btnClick }) => {
  const categoryInformationRef = useRef(null);

  const hoverEffect = () => {
    if (window.innerWidth >= 768) {
      gsap.to(categoryInformationRef.current, {
        height: "60%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  const leaveEffect = () => {
    if (window.innerWidth >= 768) {
      gsap.to(categoryInformationRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768 && categoryInformationRef.current) {
      categoryInformationRef.current.style.height = '60%';
    }
  }, []);

  if (isLoading) return <CardSkeleton className={className} />;

  return (
    <div
      className={`bg-zinc-900 w-[90vw] sm:w-[70vw] h-[50vh] md:w-[25vw] aspect-[3/4] cursor-pointer overflow-hidden relative flex flex-col justify-end ${className}`}
      onMouseEnter={hoverEffect}
      onMouseLeave={leaveEffect}
    >
      {/* Image */}
      <img
        loading="lazy"
        onClick={onClick}
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Hover Info */}
      <div
        ref={categoryInformationRef}
        className="w-full h-0 md:h-0 bg-white/10 backdrop-blur-md absolute z-[12] bottom-0 flex flex-col justify-center items-center text-center px-4 text-white overflow-hidden md:transition-all"
      >
        <h2 className="text-lg font-semibold uppercase">{title}</h2>
        <p className="text-sm opacity-80 mt-2">{description}</p>
      </div>

      {/* Button */}
      <button
        onClick={btnClick}
        className="px-6 py-3 w-[60%] bg-white text-black absolute z-50 left-1/2 bottom-[1vh] transform -translate-x-1/2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
      >
        {btnTxt} <span className="text-green-500">{price}</span>
      </button>
    </div>
  );
};

export default Card;
