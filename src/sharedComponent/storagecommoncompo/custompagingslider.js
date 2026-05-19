import React, { Component } from "react";
import Slider from "react-slick";

const baseUrl = `/images/slider/`;

// /slider/slider-pagi-detail-1.jpg
function CustomPaging() {
  const settings = {
    customPaging: function(i) {
      return (
        <a className="">
          <img className="" src={`${baseUrl}/slider-detail-${i + 1}.jpg`} style={{ width: '400px' }} />
        </a>
      );
    },
    // public/images/slider/slider-pagi-1.jpg
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    arrows:false,

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return ( 
    <div className="slider-container"> 
      <div className="slider-container"> 
      <style>
        {`
          .slick-dots ul {
            padding: 0;
          }
          .slick-dots li {
            width: 24%;
            margin-right: 3px;
            margin-left: 0;
          }
        `}
      </style>
      <Slider {...settings}>
      {/* <ul style="display:block" class="slick-dots slick-thumb"><li class="slick-active"><a class="">
        <img class="" src="/images/slider//slider-pagi-1.jpg" style="width:400px"/></a></li><li class=""><a class="">
        <img class="" src="/images/slider//slider-pagi-2.jpg" style="width:400px"/></a></li><li class=""><a class="">
        <img class="" src="/images/slider//slider-pagi-3.jpg" style="width:400px"/></a></li><li class=""><a class="">
        <img class="" src="/images/slider//slider-pagi-4.jpg" style="width:400px;"/></a></li></ul> */}
          
              <div>
              <img
                  src="/images/storagelisting/storagelisting1.png"
                  alt="storagelisting1"
                />
              </div>
               <div>
               <img
                  src="/images/storagelisting/storagelisting2.png"
                  alt="storagelisting2"
                />
               </div>
               <div>
               <img
                  src="/images/storagelisting/storagelisting2.png"
                  alt="storagelisting2"
                />
               </div>
              <div>
              <img
                  src="/images/storagelisting/storagelisting4.png"
                  alt="storagelisting4"
                />
              </div>
             
      </Slider>
    </div>
    </div>
  );
}

export default CustomPaging;
