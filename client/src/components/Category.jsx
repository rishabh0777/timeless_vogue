import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import CardSkeleton from '../loaderComponents/CardSkeleton';

import blackBlazer from '../assets/Images/category/blackBlazer.jpg';
import casualSweatShirt from '../assets/Images/category/casualSweatShirt.jpg';
import jacket from '../assets/Images/category/jacket.jpg';

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Auto scroll on small screens
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    const interval = setInterval(() => {
      if (scroller.scrollLeft + scroller.offsetWidth >= scroller.scrollWidth) {
        scroller.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroller.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[80svh] relative">
      <div className="w-[90%] min-h-[80vh] absolute md:top-[15vh] sm:top-[3vh] left-1/2 transform -translate-x-1/2 rounded-xl">
        <h1 className="md:text-[4vw] sm:text-[8vw] text-center py-2">Wardrobe Essentials</h1>

        {/* Horizontal slider on small screens, grid on md+ */}
        <div className="hidden md:grid w-full h-[80%] md:grid-cols-3 gap-4 place-items-center">
          {isLoading ? (
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

        {/* SM horizontal slider with center snapping and partial preview */}
<div
  ref={scrollRef}
  className="md:hidden w-full flex overflow-x-auto gap-4 px-6 py-6 scroll-smooth snap-x snap-mandatory scrollbar-hide"
>
  {isLoading ? (
    <>
      <CardSkeleton className="min-w-[75vw] snap-center" />
      <CardSkeleton className="min-w-[75vw] snap-center" />
      <CardSkeleton className="min-w-[75vw] snap-center" />
    </>
  ) : (
    <>
      <Card
        image={casualSweatShirt}
        title="Casual Comfort"
        description="Effortless style meets all-day comfort in our cozy sweatshirts."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
      <Card
        image={blackBlazer}
        title="Power Dressing"
        description="Elevate your formal look with sharp, tailored blazers."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
      <Card
        image={jacket}
        title="Winter Classics"
        description="Stay warm and stylish with our premium winter collection."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
      <Card
        image={casualSweatShirt}
        title="Casual Comfort"
        description="Effortless style meets all-day comfort in our cozy sweatshirts."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
      <Card
        image={blackBlazer}
        title="Power Dressing"
        description="Elevate your formal look with sharp, tailored blazers."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
      <Card
        image={jacket}
        title="Winter Classics"
        description="Stay warm and stylish with our premium winter collection."
        btnTxt="Explore"
        className="min-w-[75vw] snap-center"
      />
    </>
  )}
</div>

      </div>
    </div>
  );
};

export default Category;
