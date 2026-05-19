import React from "react";
import Slider from "react-slick";

function Responsive() {
  var settings = {
    // dots: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
    dots: false,

        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
    dots: false,

        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
        <a href="https://www.xtendedspace.com/blog/xtended-space-delivers-coca-cola-timely-quenching-the-thirst-of-millions/"> 
         <div class="itemblog bg-white rounded-lg  shadow-md w-[auto]  overflow-hidden">
            <img
               src="/images/banners/cocacola.webp"
              alt="Blog Image"
              class="w-full h-auto pb-4"
            />
            <div class="itemcontent p-6 pt-0 ">
              <h3 class="text-xl font-semibold text-gray-800 h-[80px]">
              Xtended Space Delivers Coca-Cola Timely, Quenching the Thirst of Millions!
              </h3>
              <p class="text-gray-600 h-[50px] md:h-[100px]  mt-2">
              In this scorching heat, a sip of beverage refreshes and satisfies the souls of millions. Coca-Cola is one of them. ...
              </p>
              <div class="flex justify-between items-center mt-4">
                <span class="text-[14px] text-gray-700 font-semibold">
              Supreet Kaur
                </span>
                <span class="text-[14px] text-gray-500 ml-auto">
                May 04, 2024
                </span>
              </div>
            </div>
          </div></a>
        </div>
        <div>
        <a href="https://www.xtendedspace.com/blog/xtended-space-seals-the-deal-with-rasna-a-win-win-partnership/">

          <div class="itemblog bg-white rounded-lg  shadow-md w-[auto]  overflow-hidden">
            <img
              src="/images/banners/rasna.jpg"
              alt="customers-feedback"
              class="w-full h-auto pb-4"
            />
            <div class="itemcontent p-6 pt-0">
              <h3 class="text-xl font-semibold text-gray-800 h-[80px]">
              Xtended Space Seals the Deal with Rasna a Win-Win Partnership!
              </h3>
              <p class="text-gray-600 h-[50px] md:h-[100px]  mt-2">
              Kudos to Xtended Space in partnership with Rasna, marking an unforgettable achievement for both companies. ... 
              </p>
              <div class="flex justify-between items-center mt-4">
                <span class="text-[14px] text-gray-700 font-semibold">
                Supreet Kaur
                </span>
                <span class="text-[14px] text-gray-500 ml-auto">
                May 03, 2024
                </span>
              </div>
            </div>
          </div>
          </a>
        </div>
        <div>
        <a href="https://www.xtendedspace.com/blog/xtended-space-partners-with-patanjali-ayurved/">

          <div class="itemblog bg-white rounded-lg shadow-md  w-[auto]  overflow-hidden">
           <img
              src="/images/banners/patanjali.jpeg"
              alt="Blog Image"
              class="w-full h-[auto] pb-4"
            />
            <div class="itemcontent p-6 pt-0">
              <h3 class="text-xl font-semibold text-gray-800 h-[80px]">
              Xtended Space Partners with Patanjali Ayurved!
              </h3>
              <p class="text-gray-600 h-[50px] md:h-[100px]  mt-2">
              Xtended Space has brought up a new solution for your skin and mental health by collaborating with partners...
               {/* Let's explore how it helps you declutter your life and embrace a more tranquil way of living. */}
              </p>
              <div class="flex justify-between items-center mt-4">
                <span class="text-[14px] text-gray-700 font-semibold">
                Supreet Kaur
                </span>
                <span class="text-[14px] text-gray-500 ml-auto">
                April 18, 2024
                </span>
              </div>
            </div>
          </div>
          </a>

        </div>
      </Slider>
    </div>
  );
}

export default Responsive;
