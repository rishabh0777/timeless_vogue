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
            <div className='w-[95%] h-[40vh] tab:h-[60vh] md:h-[80vh] sm:mt-[12vh] md:mt-10 relative overflow-hidden'>
              <img src={heroPoster} alt="Hero Poster" className='w-full h-full object-cover  absolute rounded-lg inset-0 object-top' />
              <div className='w-[50vw] py-4 z-[10] absolute top-[20%] left-[5%] flex flex-col gap-5'>
                <h1 className="text-white sm:text-[7.5vw] md:text-[8vw] lg:text-[7vw] leading-none whitespace-none ">Timeless Vogue</h1>
              <p className='text-white sm:text-[2.6vw] md:text-[1.9vw] lg:text-[1.8vw] whitespace-none'>Unparalleled Sophistication, Endless <br /> Elelegance - Welcome to Timeless Vogue.</p>
              <button onClick={() => navigate('/shop')} className='sm:w-[20vw] text-white bg-zinc-800 sm:text-[1.8vw] tab:text-[1.6vw] md:text-[1.2vw] lg:text-[1.2vw] sm:px-4 sm:py-2 tab:px-3 tab:py-2 md:px-6 md:py-3 sm:py-3 rounded-lg hover:bg-zinc-900 transition-all whitespace-nowrap'>Discover Elegance</button>
              </div>
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
