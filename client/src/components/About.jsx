import React from 'react'

const About = () => {
    const services = [
        {
        id: 1,
        title: 'PREMIUM MENSWEAR',
        description: 'We offer a wide range of premium clothing for men, carefully curated to enhance your style and confidence. Our collection features high-quality fabrics, modern designs, and timeless fashion pieces that suit every occasion.'
    },
    {
        id: 2,
        title: 'OUR IDENTITY',
        description: 'At Timeless Vogue, we believe in creating fashion that empowers men to look their best. Our brand stands for sophistication, quality, and contemporary design, ensuring that every piece you wear reflects elegance and confidence.'
    },
    {
        id: 3,
        title: 'OUR COLLECTION',
        description: 'Discover our curated collection of premium menswear, from classic formal wear to trendy casuals. We focus on delivering timeless pieces that blend comfort with style, ensuring you stand out wherever you go.'
    },
    {
        id: 4,
        title: 'CUSTOMIZED FIT',
        description: `We understand that fit is everything. That’s why we offer tailored solutions to ensure your clothes fit you perfectly. Choose from our customization options to get a personalized touch to your style.`
    }
]
    return (
        <div className='w-full min-h-[120vh] pt-[10vh] flex flex-col items-center justify-center bg-[#f5f5f5]'>
            <h1 className='text-center text-[4vw] leading-[4vw]'>SERVICES <br /> WE OFFER</h1>
            <div className='w-[90%] min-h-[80vh] mt-[3vh] grid grid-cols-2 gap-2 justify-items-center items-center'>
                {
                    services&&services.map(service => (
                        <div key={service.id} className='w-[40vw] h-[40vh] bg-[#f5f5f5] flex flex-col items-center justify-center text-center gap-3 text-[0.99vw]'>
                            <h1 className='text-[3vw]'>{service.title}</h1>
                            <p>{service.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default About