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
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
    dots: false,

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
    dots: false,

        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      <div>
        <div className="ht1 marketingslider bg-white ">
            <img className="w-[50px] " src="/images/Security-Insurance.png" alt="storageimg" />
            <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Security & Insurance</h2>
            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
            Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div>
        <div className="ht1 marketingslider bg-white">
        <div className="sname pb-4">    <img className="w-[50px] " src="/images/Hasselfreemove-in.png" alt="storageimg" /></div>
            <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Hassel free move-in</h2>
            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
            Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div>
        <div className="ht1 marketingslider bg-white">
        <div className="sname pb-4">    <img className="w-[50px] " src="/images/Bookbestprice.png" alt="storageimg" /></div>
            <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Book it at the best price</h2>
            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
            Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div>
        <div className="ht1 marketingslider bg-white">
        <div className="sname pb-4">    <img className="w-[50px] " src="/images/Security-Insurance.png" alt="storageimg" /></div>
        <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Security & Insurance</h2>
            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
             Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div>
        <div className="ht1 marketingslider bg-white">
        <div className="sname pb-4">    <img className="w-[50px] " src="/images/Hasselfreemove-in.png" alt="storageimg" /></div>
        <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Hassel free move-in</h2>

            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
             Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div>
        <div className="ht1 marketingslider bg-white">
        <div className="sname pb-4">    <img className="w-[50px] " src="/images/Bookbestprice.png" alt="storageimg" /></div>
        <h2 className=" my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">Book it at the best price</h2>

            <p className="px-2 my-3 text-gray-700 text-[12px] md:text-[14px]">
             Through this website I can get the storage space with the type and specifications I want very easily, without a complicated process to be able to find information on the space we want.
            </p>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        
      </Slider>
    </div>
  );
}

export default Responsive;
