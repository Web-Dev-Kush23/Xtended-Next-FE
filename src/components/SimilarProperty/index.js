// components/SimilarProperties.jsx
import React from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const SimilarProperties = ({ properties = []}) => {
  if (!properties.length) return <p></p>;
  const uniqueProperties = properties.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
  const showCount = uniqueProperties.length;
  const settings = {
    dots: false,
    infinite: showCount > 3,
    speed: 500,
    autoplay: showCount > 3,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: Math.min(3, showCount),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, showCount),
        },
      },
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full  '>
      <Slider {...settings}>
        {properties.map((item) => {
          // Extract path after base domain
          const path = item.url?.includes("https://xtendedspace.com/store-with-a-host")
            ? item.url.split("https://xtendedspace.com/store-with-a-host")[1]
            : "";

          return (
            <div key={item?.id} className="">
              <div className="bg-white border-[1px] relative border-[#E5E5E5] rounded-[12px] shadow-md p-2 mx-2">
                <div className="relative">
                  {item?.propertyImage && (
                    <img src={item?.propertyImage} alt="Room" className="w-full h-[200px] object-cover rounded-[12px]" />
                  )}
                </div>
                <div className="">
                  <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                    <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#fef2db] p-1.5 rounded-lg mt-2">
                      <img src="/images/calculator/ph_house-fill.svg" alt="household1" className="w-6 h-6" />
                      <div className="text-sm whitespace-nowrap text-blue-600 mr-2">{item?.spaceType}</div>
                    </div>
                    <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#fef2db] p-1.5 rounded-lg mt-2">
                      <img src="/images/calculator/ph_house-fill.svg" alt="household1" className="w-6 h-6" />
                      <div className="text-sm whitespace-nowrap text-blue-600 mr-2">{item?.storageType}</div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2 mt-2">
                    <div className="flex ">
                      <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6" />
                      <span className="font-normal text-sm">{item?.city} {item?.addressLine2 ? `(${item.addressLine2})` : ""}</span>
                    </div>
                    {/* <div className="flex">
                      <span className="text-sm text-zinc-600 font-bold">₹{parseFloat(item.perSquareFeetAmount).toFixed(2)}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm">/sq.ft/day</span>
                    </div> */}
                      <div className="flex items-center text-sm">
                        {Array.from({length:Math.floor(item?.propertyReview)},(_,i)=>{return(<div className="flex items-center"><FaStar className="text-yellow-500 mr-1 text-[14px]"/></div>)})}  {!Number.isInteger(item?.propertyReview) && <FaRegStarHalfStroke className="text-yellow-500 mr-1 text-[14px]"/>} <span className="tex-[10px] text-yellow-500">({item?.propertyReview==0?"New":item?.propertyReview})</span>
                      </div>
                  </div>
                  <div className="flex justify-between items-center my-2 ">
                    <div className="flex gap-1 ">
                      <img src="/images/calculator/distance_vector.svg" alt="distance1" className="w-6 h-6" />
                      <span className="text-sm font-normal">
                        {item?.squareFeet} sq.ft
                      </span>
                    </div>
                    {(item?.storageType === "Shared" && item?.remainingSquareFeet !== item?.squareFeet && item?.remainingSquareFeet !== 0) && <div className="">
                      <span className="text-sm text-zinc-600 font-normal">{item?.remainingSquareFeet}(remaining sq.ft.) </span>
                    </div>}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/store-with-a-host/${path}`}
                      className="text-white font-semibold bg-[#338CFF] rounded leading-7  px-3 py-1 mr-5 cursor-pointer text-4 text-lg">
                      Book Now
                    </Link>
                    <div className="text-right">
  {/* <div className="flex flex-col items-end">
    <div className="flex items-center gap-1">
      {item.discountPercentage > 0 && (
        <span className="text-sm text-green-500 dark:text-zinc-400">{item.discountPercentage}% OFF</span>
      )}
      
    </div>
    <div className="flex items-center">
    {item.originalAmount >= item.rentalAmountPerDay && (
        <span className="line-through text-sm text-red-500 dark:text-zinc-400">₹{item.originalAmount}</span>
      )}
      <span className="text-lg font-bold text-zinc-600">₹{item.rentalAmountPerDay}</span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-1">/Day</span>
    </div>
  </div> */}
  <div className="">
                      <p className="text-sm text-zinc-600 font-bold">₹{(parseFloat(item.perSquareFeetAmount) * 50*30).toFixed(2)}/month</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm">(per 50 sqft.)</p>
                    </div>
</div>

                  </div>
                </div>


                
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  );
};

export default SimilarProperties;
