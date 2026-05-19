import React from "react";
import Slider from "react-slick";
import Image  from "next/image";
import { BsPersonCircle } from "react-icons/bs";

function AutoPlay({ testimonials }) {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    // speed: 4000,
    // autoplaySpeed: 2000,
    arrows: false,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for desktop devices
        settings: {
          slidesToShow: 2, // Adjust as needed for desktop
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Breakpoint for tablets
        settings: {
          slidesToShow: 1.05, // Adjust as needed for tablets
          slidesToScroll: 1,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1.05, // Adjust as needed for mobile devices
          slidesToScroll: 1,
          autoplay: true,
          // dots: false,
        },
      },
    ],
  };
  const limitText = (text, wordLimit) => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };
  return (
    <section className="text-center py-[25px]  md:py-[50px] md:pr-[50px] bg-gray-100">
    <h2 className=" text-[18px] md:text-[32px]   mb-4   font-semibold text-[#1B1C57] capitalize">
      What Our User Say About Us
    </h2>
    <div className="slider-container mb-4 ">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="overflow-x-auto">
            <div className="flex flex-col h-[220px] bg-white justify-evenly rounded-[24px] ml-8 p-[20px]">
              {/* <div className="mt-3">
                <h2 className="font-bold text-[#1B1C57] text-[14px] md:text-[20px] text-start">
                  {testimonial.title}
                </h2>
              </div> */}
              <div className="mt-3">
                <p className="text-muted text-[#1B1C57] text-[12px] md:text-[14px] text-start min-h-[100px]">
                  {limitText(testimonial.content, 25)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center justify-center">
                   <div className="font-bold text-[35px] lg:text-[50px] text-blue-400 ">
                   <BsPersonCircle />
                   </div>
                    <div className="flex flex-col ml-4 ">
                      <p className="text-[12px] md:text-[14px] font-bold text-[#1B1C57] text-left">
                        {testimonial.name}
                      </p>
                      <p className="text-muted text-[12px] md:text-[14px]  text-[#1B1C57] text-left">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                
  {/* <p className="text-xl font-bold">{testimonial.rating}</p> */}
  <div
    className="rating"
    style={{ '--rating': testimonial.rating  * 20 }} 
  ></div>


                </div>
                <div className=""></div>
              </div>
            </div>
            
          </div>
          
        ))}
              
      </Slider>
    </div>
    </section>
  );
}

export default AutoPlay;
