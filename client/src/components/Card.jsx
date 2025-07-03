import React from 'react';
import CardSkeleton from '../loaderComponents/CardSkeleton';

const Card = ({
  className,
  btnTxt,
  image,
  title,
  description,
  price,
  isLoading,
  onClick,
  btnClick,
}) => {
  if (isLoading) return <CardSkeleton className={className} />;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-md bg-white transition-transform hover:scale-[1.02] duration-300 ease-in-out w-[90vw] sm:w-[70vw] md:w-[24vw] h-[70vh] sm:pb-5 md:pb-10 ${className}`}
    >
      {/* Image */}
      <div className="h-[68%] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          onClick={onClick}
          className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105 duration-500 ease-in-out"
        />
      </div>

      {/* Info + Button */}
      <div className="h-[32%] p-5 flex flex-col justify-between bg-white">
  <div className="flex flex-col gap-1 flex-grow">
    <h2 className="text-xl font-serif font-semibold text-zinc-900 truncate">
      {title}
    </h2>
    <div className='w-full h-[6vh]'>
      <p className="text-[2.8vw] md:text-[1vw] text-zinc-600 line-clamp-2">
      {description}
    </p>
    </div>
  </div>

  <div className="mt-3">
    <button
      onClick={btnClick}
      className="w-full bg-zinc-800 text-white text-base font-medium py-3 px-6 rounded-full hover:bg-zinc-800 transition-all"
    >
      {btnTxt} <span className="text-green-400">{price}</span>
    </button>
  </div>
</div>

    </div>
  );
};

export default Card;
