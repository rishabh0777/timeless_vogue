import React, { useRef } from 'react';
import gsap from 'gsap';

const Card = ({ className, btnTxt, image, title, description, price }) => {
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
      ease: "power2.inOut",
    });
  };

  return (
    <div
      className={`bg-zinc-900 w-[25vw] min-h-[51vh] cursor-pointer p-0 relative overflow-hidden ${className}`}
      onMouseEnter={hoverEffect}
      onMouseLeave={leaveEffect}
    >
      {/* Background Image */}
      <img loading='lazy' className="w-full absolute" src={image} alt={title} />

     
      {/* Information Section */}
      <div
        ref={categoryInformationRef}
        className="w-full h-0 bg-white/10 backdrop-blur-md absolute z-[12] bottom-0 flex flex-col justify-center items-center text-center px-4 text-white overflow-hidden transition-all"
      >
        {/* Category Title */}
        <h2 className="text-lg font-semibold uppercase">{title}</h2>

        {/* Description */}
        <p className="text-sm opacity-80 mt-2">{description}</p>

        {/* Secondary Button */}
        <button className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all">
          {btnTxt} <span className="text-green-500">{price}</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
