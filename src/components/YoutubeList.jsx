

import React, { useEffect, useState } from "react";
import { fetchUtubeData } from "../service/storageService";
import Image from 'next/image';
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import Link from "next/navigation";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";

const YoutubeList = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [utube, setUtube] = useState([])

  const fetchUtubeVideo = async () => {
    let res = await fetchUtubeData()
    setUtube(res?.success?.data)
  }

  useEffect(() => {
    fetchUtubeVideo()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % utube.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? utube.length - 1 : prevIndex - 1
    );
  };

  const handleViewAll = () => {
    router.push("/youtubelist")
  }

  return (
    <div className=" relative">
      <div className="overflow-hidden max-w-screen-xl mx-auto">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentSlide * (isMobile ? 100 : 24)}%)`,
          }}

        >
          {utube?.map((review, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 xl:w-1/3 flex-shrink-0  flex justify-center items-center"
            >
              <div className="rounded-lg relative mx-3 my-6 h-[200px]">
                <Image
                  className="rounded-lg h-full"
                  src={review.youTubeImagePath}
                  alt="review"
                  width={500}
                  height={200}
                />
                <a target="_blank" href={review.youtubeUrl} className="absolute rounded-lg inset-0 bg-gradient-to-b from-transparent opacity-80 z-10"></a>
                <a target="_blank" href={review.youtubeUrl} className="absolute top-1/3 left-[150px] z-50"><FaYoutube className="text-6xl text-red-500 p-2 rounded-xl bg-white z-50" /></a>
                <p className="absolute bottom-0 px-2 py-2 mb-1.5 rounded left-2 right-2 z-50 bg-blue-500 text-white text-md font-medium">{review?.youtubeTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="flex justify-center items-center w-fit mx-auto pb-2 gap-0">
        <button
          onClick={prevSlide}
          className="group p-2 flex justify-center items-center  border shadow border-indigo-600  w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-blue-700 -translate-x-16"
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
        <Button variant="outline" onClick={handleViewAll} className="border-blue-700 text-blue-700 font-medium px-6 py-2 hover:bg-blue-700 hover:text-white" >View all</Button>
        <button
          onClick={nextSlide}
          className="group p-2 flex justify-center items-center border shadow border-indigo-600 w-[50px] h-[50px] transition-all duration-500 rounded-full hover:bg-blue-700 translate-x-16"
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

export default YoutubeList;
