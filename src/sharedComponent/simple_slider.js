import React from "react";
import Slider from "react-slick";

function AutoPlay() {
  const settings = {
    dots: true,
    // dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 4000,
    autoplaySpeed: 2000,
    arrows: false,

    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for desktop devices
        settings: {
          slidesToShow: 2, // Adjust as needed for desktop
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Breakpoint for tablets
        settings: {
          slidesToShow: 1.05, // Adjust as needed for tablets
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480, // Breakpoint for mobile devices
        settings: {
          slidesToShow: 1.05, // Adjust as needed for mobile devices
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="flex flex-col w-[100px] h-[200px] bg-gray-50 justify-between rounded-[24px] mr-8 ml-8 px-[20px] py-[20px]">
          <div className="mt-3">
            <h1 className="font-bold text-xl">I Earned extra pocket money</h1>
          </div>
          <div className="mt-3">
            <p className="text-muted text-sm">
              Xtended Space made my home renovation stress-free! Their storage
              solutions are super secure and easy to access. I highly recommend
              you take the service.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center justify-between w-full mt-3">
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    height={50}
                    width={50}
                    className="rounded-full"
                    src="/images/HomeIcon/Tanay Pandya.webp"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p>Full Name</p>
                  <p className="text-muted text-[13px]">Manager Director</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold">4.6</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 w-[100px] h-[200px] justify-between rounded-[24px] mr-8 ml-8 px-[20px] py-[20px]">
          <div className="mt-3">
            <h1 className="font-bold text-xl">I Earned extra pocket money</h1>
          </div>
          <div className="mt-3">
            <p className="text-muted text-sm">
              I stored my office equipment with Xtended Space. The storage
              process was smooth. The team is professional with advanced
              technology.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center justify-between w-full mt-3">
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    height={50}
                    width={50}
                    className="rounded-full"
                    src="/images/HomeIcon/Tanay Pandya.webp"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p>Full Name</p>
                  <p className="text-muted text-[13px]">Manager Director</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold">4.6</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 w-[100px] h-[200px] justify-between rounded-[24px] mr-8 ml-8 px-[20px] py-[20px]">
          <div className="mt-3">
            <h1 className="font-bold text-xl">I Earned extra pocket money</h1>
          </div>
          <div className="mt-3">
            <p className="text-muted text-sm">
              Amazing service! Xtended Space provided the perfect storage
              solution for keeping everything safe and organized. I was happy to
              see the process.{" "}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center justify-between w-full mt-3">
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    height={50}
                    width={50}
                    className="rounded-full"
                    src="/images/HomeIcon/Tanay Pandya.webp"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p>Full Name</p>
                  <p className="text-muted text-[13px]">Manager Director</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold">4.6</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 w-[100px] h-[200px] justify-between rounded-[24px] mr-8 ml-8 px-[20px] py-[20px]">
          <div className="mt-3">
            <h1 className="font-bold text-xl">I Earned extra pocket money</h1>
          </div>
          <div className="mt-3">
            <p className="text-muted text-sm">
              I'm impressed with the flexibility Xtended Space offers. They
              accommodated all my storage needs with great care and efficiency
              when I needed to store my goods in Mumbai.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center justify-between w-full mt-3">
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    height={50}
                    width={50}
                    className="rounded-full"
                    src="/images/HomeIcon/Tanay Pandya.webp"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p>Full Name</p>
                  <p className="text-muted text-[13px]">Manager Director</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold">4.6</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="flex flex-col bg-gray-50 w-[100px] h-[200px] justify-between rounded-[24px] px-[20px] py-[20px]">
          <div className="mt-3">
            <h1 className="font-bold text-xl">I Earned extra pocket money</h1>
          </div>
          <div className="mt-3">
            <p className="text-muted text-sm">
              I stored my office equipment with Xtended Space. The storage
              process was smooth. The team is professional with advanced
              technology.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center justify-between w-full mt-3">
              <div className="flex items-center justify-center">
                <div className="">
                  <img
                    height={50}
                    width={50}
                    className="rounded-full"
                    src="/images/HomeIcon/Tanay Pandya.webp"
                    alt="image"
                  />
                </div>
                <div className="flex flex-col ml-4">
                  <p>Full Name</p>
                  <p className="text-muted text-[13px]">Manager Director</p>
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold">4.6</p>
              </div>
            </div>
            <div className=""></div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlay;