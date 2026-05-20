import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

export const Banner = () => {

  // To update
  const slides = [
    {
      status: "Em produção",
      productId: 1,
      image: "/i15.png",
      description: {
        title: "iPhone 15 Pro Max",
        subtitle: "Titânio. Forte. Leve. Incrível.",
        content: "O chip mais rápido de um smartphone. Camera Pro. Design em titânio.",
      },
    },
    {
      status: "Lançamento",
      productId: 2,
      image: "/s25.png",
      description: {
        title: "S25 Ultra",
        subtitle: "Leve e poderoso.",
        content: "Celular com incríveis toques da Samsung.",
      },
    },
    {
      status: "Lançamento",
      productId: 3,
      image: "/i12.png",
      description: {
        title: "Iphone 12",
        subtitle: "Alumínio.",
        content: "Experimente o Apple inteligence na sua potência máxima.",
      },
    },
  ];

  return (
    <div className='w-full h-[400px] lg:h-full overflow-hidden rounded-xl'>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className='banner-swiper w-full  lg:h-[450px]'
      >
        {slides.map((item, index) => (
          <SwiperSlide key={item.productId || index}>
            <div className='w-full  lg:h-[450px] relative overflow-hidden bg-black flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-10 py-8 md:py-0 rounded-xl'>
              
              {/* BLUE GLOW BACKGROUND */}
              <div className='absolute inset-0 z-0'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/40 blur-[140px] rounded-full'></div>
                <div className='absolute right-[15%] top-[20%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/30 blur-[120px] rounded-full'></div>
                <div className='absolute left-[10%] bottom-[10%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-blue-400/20 blur-[100px] rounded-full'></div>
              </div>

              {/* LEFT CONTENT */}
              <div className='w-full md:w-1/2 flex flex-col gap-2 sm:gap-3 md:gap-4 text-white z-10 text-center md:text-left'>
                
                <span className='bg-blue-600/20 border border-blue-500 text-blue-300  text-sm px-3 sm:px-4 py-1 rounded-full w-fit backdrop-blur-md mx-auto md:mx-0'>
                  {item?.status}
                </span>

                <h1 className='text-3xl  font-bold leading-tight'>
                  {item?.description?.title}
                </h1>

                <h2 className='text-xl text-gray-300'>
                  {item?.description?.subtitle}
                </h2>

                <p className='text-gray-400 text-sm max-w-[500px] leading-relaxed mx-auto md:mx-0'>
                  {item?.description?.content}
                </p>

                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center md:justify-start'>
                  <button className='bg-blue-600 hover:bg-blue-700 transition px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg shadow-blue-600/30 
                  text-sm
                  '>
                    Comprar agora
                  </button>

                  <Link to={`/smartphones/${item?.productId}`} className='border border-white/20 bg-white/5 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white hover:text-black transition text-xs '>
                    Ver detalhes
                  </Link>
                </div>
              </div>

              {/*  IMAGE */}
              <div className='w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-full flex items-center justify-center relative z-10 mt-6 md:mt-0'>
                <div className='absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] bg-blue-500/30 blur-[120px] rounded-full'></div>
                
                <img
                  src={item.image}
                  alt={item.description.title}
                  className='relative z-10 max-h-[200px] sm:max-h-[280px] md:max-h-[70%] object-contain drop-shadow-[0_20px_80px_rgba(37,99,235,0.45)] hover:scale-105 transition duration-500'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};