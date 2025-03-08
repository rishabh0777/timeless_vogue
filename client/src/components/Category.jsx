import React from 'react'
import Card from './Card';
import blackBlazer from '../assets/Images/category/blackBlazer.jpg';
import casualSweatShirt from '../assets/Images/category/casualSweatShirt.jpg';
import jacket from '../assets/Images/category/jacket.jpg';

const Category = () => {
  return (
    <div>
       {/* Category Section */}
      <div className="w-full h-[100svh] relative">
        <div className="w-[90%] h-[80vh] absolute top-[15vh] left-1/2 transform -translate-x-1/2 rounded-xl">
          <h1 className="text-[4vw] text-center py-2">Wardrobe Essentials</h1>
          <div className="w-full h-[80%] grid grid-cols-3 items-center place-items-center gap-2">
            <Card 
              image={casualSweatShirt} 
              title="Casual Comfort" 
              description="Effortless style meets all-day comfort in our cozy sweatshirts."
              buttonText="Explore Collection"
            />
            <Card 
              image={blackBlazer} 
              title="Power Dressing" 
              description="Elevate your formal look with sharp, tailored blazers."
              buttonText="Explore Collection"
            />
            <Card 
              image={jacket} 
              title="Winter Classics" 
              description="Stay warm and stylish with our premium winter collection."
              buttonText="Explore Collection"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category