import React from "react";
import Slider from "react-slick";

function MultipleItems() {
  const settings = {
    // dots: true,
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
           dots: false

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
           dots: false

          }
        }
      ]
  };
  return (
    <div className="slider-container md:px-[50px]">
      <Slider {...settings}>
      <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2 ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        
        

        </div>
        
     
       
        
        
        <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        </div>
        <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        </div>
        <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        </div>
        <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        </div>
        <div>
        <div className="slider_sec mx-2 bg-white mr- w-[1/3] relative border  p-4 mb-2  ">
         <img src="/images/calculator/Imageslider.svg" alt="calc1" className="w-full md:w-[650px]"/>
         <img src="/images/calculator/rating4.svg" alt="rating1" className=" rating_slider absolute w-12 h-auto top-0 right-0 "/>
         <div className="middle_seccalculatorstorage flex   w-full py-3 gap-3">
            <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full">
            <img src="/images/calculator/ph_house-fill.svg" alt="household1"className="w-full md:w-15"/>
            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">Household Items</div></div>   
           <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-1 py-2 rounded-full"> <img src="/images/calculator/fluent_desk.svg"alt="fluent_desk1 "className="w-full"/>
        <div className="text-sm whitespace-nowrap text-blue-600">Business inventory</div> </div> 
              </div> 
         
         <div className="bottom_detail leading-7  mb-2 mt-2">
            <div className="font-normal text-sm text-[#6B7280] h-[100px]"> Lorem Ipsum Lorem ipsum dolor kiusum tea off france ameriac india and many more hello amor nan ana milai lorem ipsum kha gelau sit amet consectetur....</div>

            <div className="flex mb-2 mt-2">
                <img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6"/>
                <span className="leading-5 font-medium">Manipuri Bazar</span>
            </div>
            <div className="flex gap-1 mb-2 mt-2">
                <img src="/images/calculator/distance_vector.svg" alt="distance1" className="9"/>
                <span className="leading-7 font-medium">48</span>
                <span className="font-medium leading-7">sqft</span> 
            </div>
            <div className="flex justify-between  items-center  mt-3 mb-2 ">
                <button className="text-white font-semibold bg-[#338CFF] rounded-md leading-7 p-2 px-4 py-2.5 mr-5">Book Now</button>
               <div className="flex justify-evenly items-center"><del className="text-[#E29A9A] font-extralight"> &#8377; 500</del></div> 
               <div className="text-lg  text-[#374151] font-semibold ">&#8377; 325 <span className="text-[#374151] font-normal text-sm">/Day</span></div> 
            </div>
        </div>
        </div>
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;
