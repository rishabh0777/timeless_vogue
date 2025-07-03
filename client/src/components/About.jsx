import React, { useEffect, useState } from 'react';
import AboutSkeleton from '../loaderComponents/AboutSkeleton';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        title: 'PREMIUM MENSWEAR',
        description:
          'We offer a wide range of premium clothing for men, carefully curated to enhance your style and confidence.',
      }, 
      {
        id: 2,
        title: 'OUR IDENTITY',
        description:
          'At Timeless Vogue, we believe in fashion that empowers men. We stand for sophistication and contemporary design.',
      },
      {
        id: 3,
        title: 'OUR COLLECTION',
        description:
          'From classic formals to trendy casuals, our collection blends comfort with timeless style.',
      },
      {
        id: 4,
        title: 'CUSTOMIZED FIT',
        description:
          'Perfect fit guaranteed. Get personalized tailoring options that elevate your look.',
      },
    ];

    setTimeout(() => {
      setServices(data);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) return <AboutSkeleton />;

  return (
    <div className="w-full min-h-screen pt-[12vh] pb-[5vh] bg-[#f5f5f5] px-4 flex flex-col items-center">
      {/* Heading */}
      <h1 className="text-center text-[8vw] sm:text-[6vw] md:text-[3vw] font-extrabold leading-tight mb-8">
        SERVICES <br className="sm:hidden" /> WE OFFER
      </h1>

      {/* Services Grid */}
      <div className="w-full sm:max-w-[90vw] md:max-w-[70vw] grid md:grid-cols-2 sm:grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="w-full bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3"
          >
            <h2 className="text-[6vw] md:text-[2vw] font-semibold">{service.title}</h2>
            <p className="text-[4.5vw] md:text-[1vw] text-gray-700 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
