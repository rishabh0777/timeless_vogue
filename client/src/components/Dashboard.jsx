import React, { useEffect, useState } from 'react';
import Category from './Category';
import TopItems from './TopItems';
import SearchBar from './SearchBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import heroPoster from '../assets/Images/Poster/heroPoster.jpg';

import HeroSkeleton from '../loaderComponents/HeroSkeleton';
import CategorySkeleton from '../loaderComponents/CategorySkeleton';
import TopItemsSkeleton from '../loaderComponents/TopItemsSkeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <HeroSkeleton />
          <CategorySkeleton />
          <TopItemsSkeleton />
        </>
      ) : (
        <>
          <div className="w-full sm:min-h-[60vh] tab:h-[90vh] md:min-h-screen relative flex flex-col justify-center items-center">
            <div className='w-[95%] h-[30vh] tab:h-[60vh] md:h-[80vh] sm:mt-[12vh] md:mt-10 relative overflow-hidden'>
              <img src={heroPoster} alt="Hero Poster" className='w-full h-full object-cover  absolute rounded-lg inset-0 object-top' />
              <h1 className="absolute z-10 text-white sm:text-[7.5vw] md:text-[8vw] lg:text-[7vw] sm:left-[3%] sm:-translate-x-[3%] md:left-[10%] md:-translate-x-[10%] md:top-[20%] md:-translate-y-[20%]  sm:top-[30%] sm:-translate-y-[30%]">Timeless Vogue</h1>
              <p className='absolute z-10 text-white sm:text-[2.6vw] md:text-[1.9vw] lg:text-[2vw] sm:left-[3%] md:left-[10%] md:-translate-x-[10%] sm:top-[50%] md:-translate-y-[45%] md:top-[45%]'>Unparalleled Sophistication, Endless <br /> Elelegance - Welcome to Timeless Vogue.</p>
              <button onClick={() => navigate('/shop')} className='absolute z-10 text-white bg-zinc-800 sm:text-[2.3vw] tab:text-[1.4vw] md:text-[1.3vw] sm:left-[24%] sm:-translate-x-[24%]  md:left-[35%] md:-translate-x-[35%] sm:top-[68%] md:top-[70%] sm:px-4 sm:py-2 md:px-6 sm:py-3 rounded-lg hover:bg-zinc-900 transition-all'>Discover Elegance</button>
            </div>
            <SearchBar className="tab:hidden" />
          </div>
          <Category />
          <TopItems />
        </>
      )}
    </>
  );
};

export default Dashboard;
