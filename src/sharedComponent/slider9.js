import { isMobile } from "@/util/common";
import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    // dots: true,
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: isMobile(),
    speed: 2000,
    autoplaySpeed: 2000,
    arrows:false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoint according to your mobile view
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: false

          
        }
      },
      {
         breakpoint: 1024,
         settings: {
        
         //   infinite: true,
           autoplay: false,
           dots: false
         }
       },
   
    ]
  };
  return (
    <div className="slider-container">
        <div className='statWrapper absolute  w-[100%]  h-[auto] '>
        <div className=' wrapper w-full md:w-[1550px]'>
           
      <Slider {...settings}>
        <div>
        <div className='px-0 md:px-4  '>
            <div className='flex pl-10 gap-3 md:gap-4 md:pl-10 '>
                <img src="/images/home/stat/1K Peoples1.png" className='firstFirst m-2 w-[176px] md:w-[auto] h-[75px] md:h-[auto]   ' alt="slider1"/>
                <img src="/images/home/stat/4k1.png" className='firstSec m-2 w-[116px] md:w-[auto] h-[75px] md:h-[auto] ' alt="slider1"/>
            </div>
            <div className='flex gap-3 md:gap-4'>
                <img src="/images/home/stat/host1.png" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>
                <img src="/images/home/stat/56kfirst1.png" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>
            </div>
           </div>
        </div>
        <div className="px-0 md:px-4  ">
       <div className="flex gap-2 md:gap-0 h-[auto]'>"> <div className=''><img src="/images/home/stat/safety1.png" alt="slider1" className='m-2 w-[196px] md:w-[auto] h-[141px] md:h-[auto]  '/></div>
        <div className=' '>
            <div className='flex'>
            <img src="/images/home/stat/ikhost1.png" alt="slider1" className='m-2 w-[176px] md:w-[auto] h-[55px] md:h-[auto] '/>

            </div>
            <div className='flex justify-center'>
            <img src="/images/home/stat/56k1.png" alt="slider1" className='m-2 w-[176] md:w-[auto] h-[75px] md:h-[auto] '/>
            </div>
           </div></div>
        </div>
      
    
      </Slider>
      </div>
        </div>
    </div>
  );
}

export default AutoPlay;
