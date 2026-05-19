import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomPaging({ data: { propertyImages, propertyVideo } }) {
  // Check if propertyVideo has a valid video URL, else exclude it
  const videoExists = propertyVideo && propertyVideo.length > 0 && propertyVideo[0];
  const content = videoExists ? [propertyVideo[0], ...propertyImages.slice(0, 4)] : propertyImages.slice(0, 4);
  const isSingleSlide = content.length <= 1;

  const settings = {
    customPaging: function (i) {
      return (
        <div className="w-full h-12 sm:h-20 md:h-20 lg:h-24 overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105">
          <a className="block w-full h-full">
            {i === 0 && videoExists ? (
              <video
                className="w-full h-full object-cover"
                src={propertyVideo[0]}
                alt="thumbnail-video"
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={content[i]}
                alt={`thumbnail-${i}`}
              />
            )}
          </a>
        </div>
      );
    },
    dots: true,
    dotsClass: "custom-dots",
    infinite: !isSingleSlide,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: (
      <button className="slick-prev bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className="slick-next bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    ),
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <style>
        {`
          .custom-dots {
            display: flex !important;
            justify-content: center;
            gap: 8px;
            margin-top: 1rem;
            padding: 0;
            flex-wrap: wrap;
          }
          .custom-dots li {
            width: 25%;
            max-width: 120px;
            margin: 0;
          }
          .slick-slide img, .slick-slide video {
            object-fit: cover;
            border-radius: 0.5rem;
          }
          .slick-prev, .slick-next {
            z-index: 10;
            width: 40px;
            height: 40px;
            top: 50%;
            transform: translateY(-50%);
          }
          .slick-prev {
            left: 10px;
          }
          .slick-next {
            right: 10px;
          }
          @media (max-width: 640px) {
            .custom-dots li {
              width: 20%;
              max-width: 80px;
            }
            
          }
        `}
      </style>
      <Slider {...settings}>
        {content.map((item, index) => (
          <div key={index} className="w-full h-[200px] sm:h-[300px] md:h-[400px]  overflow-hidden rounded-lg">
            {index === 0 && videoExists ? (
              <video
                className="w-full h-full object-cover"
                src={propertyVideo[0]}
                autoPlay
                loop
                muted
                controls
              />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={item}
                alt={`slide-${index}`}
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;