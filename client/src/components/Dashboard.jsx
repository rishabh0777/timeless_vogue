import React from 'react';
import heroPoster from '../assets/Images/Poster/heroPoster.jpg';
import Category from './Category';
import TopItems from './TopItems';

const Dashboard = () => {
  return (
    <>
      <div className="w-full min-h-screen relative">
        <div className="w-[90%] max-h-[80vh] min-h-[70vh] bg-zinc-500 absolute top-[15vh] left-1/2 transform -translate-x-1/2 overflow-hidden">
          <h1 className="absolute z-[10] text-white text-[7vw] top-[15%] left-[3vw]">Timeless Vogue</h1>
          <p className="absolute z-[10] text-white text-[2vw] w-[45%] top-[45%] left-[3vw]">
            Unparalleled Sophistication, Endless Elegance – <span className="font-bold">Welcome to Timeless Vogue.</span>
          </p>
          <button className="absolute z-[10] text-white bg-zinc-900 rounded-lg top-[70%] py-4 px-5 left-[35%] cursor-pointer text-[1.3vw]">
            Discover Elegance
          </button>
          <img loading='lazy' className="w-full h-full absolute z-[8] object-cover object-top" src={heroPoster} alt="Hero Poster" />
        </div>
      </div>
      <Category />
      <TopItems />
    </>
  );
};

export default Dashboard;
