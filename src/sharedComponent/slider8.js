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
        <div className="slider_sec  relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full px-6 py-3   border gap-1">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-15"/>
            <div className="text-sm  text-blue-600 mr-2">Household Items</div>   
            <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "/>
        <div className="text-sm  text-blue-600">Business inventory</div>   
         </div>
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="text-[#6B7280]">Description will come here in the slider about the warehouse and business Inventory as well.......</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-9"/>
                <span className="leading-7 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-2 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center gap-1 mt-3 mb-2 ">
                <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-red-500 font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg font-medium ">&#8377; 325 <span>/Day</span></div> 
            </div>
        </div>
        </div>
        <div className="slider_sec  relative border  p-4 mb-2 ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full px-6 py-3   border gap-1">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-15"/>
            <div className="text-sm  text-blue-600 mr-2">Household Items</div>   
            <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "/>
        <div className="text-sm  text-blue-600">Business inventory</div>   
         </div>
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="text-[#6B7280]">Description will come here in the slider about the warehouse and business Inventory as well.......</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-9"/>
                <span className="leading-7 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-2 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center gap-1 mt-3 mb-2 ">
                <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-red-500 font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg font-medium ">&#8377; 325 <span>/Day</span></div> 
            </div>
        </div>
        </div>
        <div className="slider_sec  relative border  p-4 mb-2 ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full px-6 py-3   border gap-1">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-15"/>
            <div className="text-sm  text-blue-600 mr-2">Household Items</div>   
            <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "/>
        <div className="text-sm  text-blue-600">Business inventory</div>   
         </div>
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="text-[#6B7280]">Description will come here in the slider about the warehouse and business Inventory as well.......</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-9"/>
                <span className="leading-7 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-2 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center gap-1 mt-3 mb-2 ">
                <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-red-500 font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg font-medium ">&#8377; 325 <span>/Day</span></div> 
            </div>
        </div>
        </div>
        <div className="slider_sec  relative border  p-4 mb-2 ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full px-6 py-3   border gap-1">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-15"/>
            <div className="text-sm  text-blue-600 mr-2">Household Items</div>   
            <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "/>
        <div className="text-sm  text-blue-600">Business inventory</div>   
         </div>
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="text-[#6B7280]">Description will come here in the slider about the warehouse and business Inventory as well.......</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-9"/>
                <span className="leading-7 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-2 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center gap-1 mt-3 mb-2 ">
                <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-red-500 font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg font-medium ">&#8377; 325 <span>/Day</span></div> 
            </div>
        </div>
        </div>
       
       
        
        
      </Slider>
    </div>
  );
}

export default Responsive;
