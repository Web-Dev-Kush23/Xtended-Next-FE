import React from 'react';
import { Carousel } from 'antd';
import img from "../../public/images/slider/XS may5.jpg";
import Image from "next/image";

const contentStyle = {

  background: '#364d79',
  position: "relative",
  height: "auto",
};
const App = () => (
  <Carousel autoplay>
    {/* <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute  bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute  bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div> */}
    {/* <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
            className=" h-[100%]"
            src={img}
            alt="image"
            priority></Image>
             <div className="w-full  p-4 md:p-8  md:text-left absolute  bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div> */}
    <div>
      <h3 style={contentStyle} className='h-[200px] md:h-auto'><Image
     
           height={800}
           width={700}
            src={img}
            alt="image"
            priority></Image>
            <div className='absolute top-10 left-0'>
            <div className="flex justify-center items-center pt-4">
                  <a href="/">
                    <img
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
                      alt=""
                      className="w-[200px] h-auto"
                    />
                  </a>
                </div>
            </div>
             <div className="w-full  p-4 md:p-8  md:text-left absolute  bottom-0 bg-opacity-50 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Store Household Items</h2>
            <p className="text-sm md:text-base mb-4">
              Whether it's your childhood toys, memories from an old house, or
              <br /> anything close to your heart...
            </p>
            <p className="text-xs md:text-sm">
              Copyright © 2023 Xtended Space. All Rights Reserved.
            </p>
          </div>
            </h3>
         
    </div>
  
  </Carousel>
);
export default App;