// import React from "react";
// import Slider from "react-slick";
// import Link from "next/link";
// import Image from "next/image";

// function Responsive() {
//   var settings = {
//     // dots: true,
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//     initialSlide: 0,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//           // dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//           dots: false,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1.2,
//           slidesToScroll: 1,
//           dots: false,
//         },
//       },
//     ],
//   };

//   const AWS_IMAGE_URL =
//     "https://xtendedspace.s3.ap-south-1.amazonaws.com/home/";

//   return (
//     <div id="s3slide" className="slider-container">
//       <Slider {...settings}>
//         <div>
//           <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
//             <Image
//               src={`${AWS_IMAGE_URL}xs-Relocation-home.webp`}
//               alt="relocation"
//               width={517}
//               height={494}
//             />
//             <h2 className="my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
//               Relocation Module
//             </h2>
//             <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
//               Explore smooth packing and moving services with Xtended Space.
//               Assurance of your comfortable nationwide relocation journey is
//               confirmed here.
//             </p>
//             <Link href="services/packers-and-movers">
//               <button className="my-3  rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
//                 Learn More
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div>
//           <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
//             <div className="sname">
//               <Image
//                 src={`${AWS_IMAGE_URL}xs-B2B-Storage-home.webp`}
//                 alt="storage"
//                 width={517}
//                 height={494}
//               />
//             </div>
//             <h2 className="my-3  text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
//               B2B Storage
//             </h2>
//             <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
//               Your ultimate solution for B2B warehouse storage requirements. It
//               saves your business inventory safely at budget-friendly prices and
//               makes you stress-free.
//             </p>
//             <Link href="services/business-storage">
//               <button className="my-3   rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
//                 Learn More
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div>
//           <div className="samename px-[30px] h-[516px]  max-w-[292px] md:max-w-[400px] rounded-xl">
//             <div className="sname">
//               <Image
//                 src={`${AWS_IMAGE_URL}xs-B2B-Logistic-home.webp`}
//                 alt="logistic"
//                 width={517}
//                 height={494}
//               />
//             </div>
//             <h2 className="my-3 text-[14px] md:text-[20px]  font-semibold text-[#1B1C57]">
//               B2B Logistics
//             </h2>
//             <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
//               Our doorstep transportation services make your business operations
//               smooth nationwide. Experience the logistics convenience of Xtended
//               Space.
//             </p>
//             <Link href="services/b2b-logistics">
//               <button className="my-3   rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
//                 Learn More
//               </button>
//             </Link>
//           </div>
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default Responsive;
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CarouselComponent = () => {
  const AWS_IMAGE_URL =
      "https://xtendedspace.s3.ap-south-1.amazonaws.com/home/";
  
  const slides = [
    {
      imageUrl: `${AWS_IMAGE_URL}xs-Relocation-home.webp`,
      altText: "relocation",
      title: "Relocation Services",
      description1:"Household Shifting ",
      description2:"Office Shifting ",
      description3:"PAN India shifting ",
      description4:"Vehicle Shifting ",
      link: "services/packers-and-movers",
    },
    {
      imageUrl: `${AWS_IMAGE_URL}xs-B2B-Storage-home.webp`,
      altText: "storage",
      title: "B2B Storage",
      description1:"Business Items ",
      description2:"Machinery/Equipments",
      description3:"Office Assets",
      description4:"IT Hardware",
      link: "services/business-storage",
    },
    {
      imageUrl: `${AWS_IMAGE_URL}xs-B2B-Logistic-home.webp`,
      altText: "logistic",
      title: "B2B Logistics",
      description1:"3PL",
      description2:"FTL",
      description3:"Last-Mile Delivery",
      description4:"Reverse Logistics",
      link: "services/b2b-logistics",
    },
    // {
    //   imageUrl: `${AWS_IMAGE_URL}xs-Relocation-home.webp`,
    //   altText: "relocation",
    //   title: "Relocation Module",
    //   description:
    //     "Explore smooth packing and moving services with Xtended Space. Assurance of your comfortable nationwide relocation journey is confirmed here.",
    //   link: "services/packers-and-movers",
    // },
    // {
    //   imageUrl: `${AWS_IMAGE_URL}xs-B2B-Storage-home.webp`,
    //   altText: "storage",
    //   title: "B2B Storage",
    //   description:
    //     "Your ultimate solution for B2B warehouse storage requirements. It saves your business inventory safely at budget-friendly prices and makes you stress-free.",
    //   link: "services/business-storage",
    // },
    // {
    //   imageUrl: `${AWS_IMAGE_URL}xs-B2B-Logistic-home.webp`,
    //   altText: "logistic",
    //   title: "B2B Logistics",
    //   description:
    //     "Our doorstep transportation services make your business operations smooth nationwide. Experience the logistics convenience of Xtended Space.",
    //   link: "services/b2b-logistics",
    // },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3); 
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); 
      } else {
        setSlidesToShow(1); 
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    if(currentSlide>2){
    setCurrentSlide(0)
    }else{
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full relative place-items-center">
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          
          style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="samename h-[516px] ]  rounded-xl flex-shrink-0 flex justify-center items-center"
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
           <div className=" bg-blue-100 px-[20px] rounded-lg w-4/5">
           <Image
                src={slide.imageUrl}
                alt={slide.altText}
                width={517}
                height={494}
              />
              <h2 className="my-3 ml-10 text-[14px] md:text-[20px] font-semibold text-[#1B1C57]">
                {slide.title}
              </h2>
              {/* <p className="my-3 h-[100px] text-gray-700 text-[12px] md:text-[14px]">
                {slide.description}
              </p> */}
              <ul className='list-disc ml-14 my-3 h-[100px] font-medium text-gray-700 text-[12px] md:text-[14px]'>
                <li>{slide.description1}</li>
                <li>{slide.description2}</li>
                <li>{slide.description3}</li>
                <li>{slide.description4}</li>
              </ul>
              <Link href={slide.link}>
                <button className="my-3 rounded-md py-[10px] px-4 text-[#1B1C57] font-bold">
                  Learn More
                </button>
              </Link>
           </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex md:hidden justify-center items-center left-0 right-0 w-fit mx-auto gap-6 mt-2">
        <button
          onClick={prevSlide}
          className="group p-2 flex justify-center items-center border border-solid border-indigo-600 w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-indigo-600 -translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="group p-2 flex justify-center items-center border border-solid border-indigo-600 w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-indigo-600 translate-x-16"
        >
          <svg
            className="h-5 w-5 text-indigo-600 group-hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M5.99984 4.00012L10 8.00029L5.99748 12.0028"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;

