import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardSkeleton from '../loaderComponents/CardSkeleton';

import blackBlazer from '../assets/Images/category/blackBlazer.jpg';
import casualSweatShirt from '../assets/Images/category/casualSweatShirt.jpg';
import jacket from '../assets/Images/category/jacket.jpg';

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[100svh] relative">
      <div className="w-[90%] h-[80vh] absolute top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
        <h1 className="text-[4vw] text-center py-2">Wardrobe Essentials</h1>
        <div className="w-full h-[80%] grid grid-cols-3 items-center place-items-center gap-2">
          {isLoading ? (
            // Show 3 skeletons while loading
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            <>
              <Card  
                image={casualSweatShirt} 
                title="Casual Comfort" 
                description="Effortless style meets all-day comfort in our cozy sweatshirts."
                btnTxt="Explore"
              />
              <Card 
                image={blackBlazer} 
                title="Power Dressing" 
                description="Elevate your formal look with sharp, tailored blazers."
                btnTxt="Explore"
              />
              <Card 
                image={jacket} 
                title="Winter Classics" 
                description="Stay warm and stylish with our premium winter collection."
                btnTxt="Explore"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
