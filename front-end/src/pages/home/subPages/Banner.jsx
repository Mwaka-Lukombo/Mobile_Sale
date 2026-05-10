import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const Banner = () => {

  const slides = [
    {
      status: "Em produção",
      productId: 1,
      image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.landing-big_2x.jpg",
      description: {
        title: "iPhone 15 Pro Max",
        subtitle: "Titânio. Forte. Leve. Incrível.",
        content: "O chip mais rápido de um smartphone. Camera Pro. Design em titânio.",
      },
    },
    {
      status: "Lançamento",
      productId: 2,
      image: "https://article.images.consumerreports.org/image/upload/w_652,f_auto,q_auto,ar_16:9,c_lfill/v1737572842/prod/content/dam/CRO-Images-2025/Electronics/CR-Tech-Inlinehero-samsung-galaxy-s25-launch-0125",
      description: {
        title: "iPhone 12",
        subtitle: "Leve e poderoso.",
        content: "Com esse smartphone você pode registrar momentos incríveis.",
      },
    },
    {
      status: "Lançamento",
      productId: 3,
      image: "https://images.samsung.com/africa_pt/smartphones/galaxy-s25/images/galaxy-s25-share-image.jpg",
      description: {
        title: "Samsung S25",
        subtitle: "Alumínio e vidro premium.",
        content: "O mais recente modelo da Samsung com câmeras incríveis.",
      },
    },
  ];

  return (
    <div className='w-full h-[450px] md:h-[500px] lg:h-[550px] mt-4 overflow-hidden  rounded-xl'>
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
        className='banner-swiper w-full h-[400px]'
      >
        {slides.map((item, index) => (
          <SwiperSlide key={item.productId || index}>
            <div className='w-full h-[400px] relative overflow-hidden bg-black flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-10 py-8 md:py-0 rounded-xl'>
              
              {/* BLUE GLOW BACKGROUND */}
              <div className='absolute inset-0 z-0'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-600/40 blur-[140px] rounded-full'></div>
                <div className='absolute right-[15%] top-[20%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-blue-500/30 blur-[120px] rounded-full'></div>
                <div className='absolute left-[10%] bottom-[10%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-blue-400/20 blur-[100px] rounded-full'></div>
              </div>

              {/* LEFT CONTENT */}
              <div className='w-full md:w-1/2 flex flex-col gap-2 sm:gap-3 md:gap-4 text-white z-10 text-center md:text-left'>
                
                <span className='bg-blue-600/20 border border-blue-500 text-blue-300 text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full w-fit backdrop-blur-md mx-auto md:mx-0'>
                  {item.status}
                </span>

                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                  {item.description.title}
                </h1>

                <h2 className='text-xl sm:text-2xl md:text-3xl text-gray-300'>
                  {item.description.subtitle}
                </h2>

                <p className='text-gray-400 text-sm sm:text-base max-w-[500px] leading-relaxed mx-auto md:mx-0'>
                  {item.description.content}
                </p>

                {/* BOTÕES EM COLUNA NO CELULAR E LINHA NO DESKTOP */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center md:justify-start'>
                  <button className='bg-blue-600 hover:bg-blue-700 transition px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium shadow-lg shadow-blue-600/30 text-sm sm:text-base'>
                    Comprar agora
                  </button>

                  <button className='border border-white/20 bg-white/5 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white hover:text-black transition text-sm sm:text-base'>
                    Ver detalhes
                  </button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className='w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-full flex items-center justify-center relative z-10 mt-6 md:mt-0'>
                <div className='absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] bg-blue-500/30 blur-[120px] rounded-full'></div>
                
                <img
                  src={item.image}
                  alt={item.description.title}
                  className='relative z-10 max-h-[180px] sm:max-h-[220px] md:max-h-[90%] object-contain drop-shadow-[0_20px_80px_rgba(37,99,235,0.45)] hover:scale-105 transition duration-500'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};