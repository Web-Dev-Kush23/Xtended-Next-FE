import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo1 from "../../../public/images/assets-multiple-cities/Logo.svg";
import logo2 from "../../../public/images/assets-multiple-cities/logo1.svg";
import logo3 from "../../../public/images/assets-multiple-cities/logo2.svg";
import logo4 from "../../../public/images/assets-multiple-cities/logo3.svg";

import CallIcon from "../../../public/images/assets-multiple-cities/call-icon.svg";

const StorageComponent = ({ storageDetails }) => {
  const { location, contactNumber, description, title } = storageDetails;

  return (
    <>
      <div className="grid lg:grid-cols-2 sm:grid-col-1 place-items-center mt-[250px] mt-lg-5 py-4 px-3 w-full" style={{ marginTop:'280px' }}>
        <div className="ht1  font-semibold text-[#1B1C57] mb-[20px] lg:mb-0">
          <h1 className="text-center lg:text-start text-[18px] md:text-[32px]">
            {title}
            
           
          </h1>
          <p className="citylocation text-lime-500 font-bold">
              {location}
            </p>
        </div>
        <div className=" w-[80%] flex flex-col lg:items-start sm:items-center " style={{ width: '80%' }}>
          <p className="text-wrap text-[14px] md:text-[18px] text-[#1B1C57] text-start mb-[20px] px-80 lg:mb-0">
            {description}
          </p>
          <div className="flex flex-col lg:text-start sm:text-center ">
            <Link href="#" className="flex items-center justify-center mt-2">
              <Image src={CallIcon} alt="icon" width={32} className="mr-3" />
              <span className="text-[18px] md:text-[34px] text-blue-500 font-bold">
                {contactNumber}
              </span>
            </Link>
            <Link
              href="#"
              className="text-white rounded font-bold text-[20px] text-center bg-blue-500 py-2 mt-2"
            >
              <p className="">Call us Now</p>
            </Link>
          </div>
        </div>
      </div>
      <div id="scrollbarslide" className="h-auto w-100 overflow-auto mt-8 ">
  <div
    className="d-flex justify-evenly flex-nowrap gap-10  custom-width"
    // style={{ width: "200%" }}
    //  className="w-100 w-lg-100"
  >
    <Link href="#">
      <Image
        src={logo1}
        alt="logo"
        className="img-fluid w-lg-200 "
        // style={{ width: "100px" }}
      />
    </Link>
    <Link href="#">
      <Image
        src={logo2}
        alt="logo"
        className="img-fluid w-100 w-lg-200"
        // style={{ width: "100px" }}
      />
    </Link>
    <Link href="#">
      <Image
        src={logo3}
        alt="logo"
        className="img-fluid w-lg-200"
        // style={{ width: "100px" }}
      />
    </Link>
    <Link href="#">
      <Image
        src={logo4}
        alt="logo"
        className="img-fluid w-lg-200"
        // style={{ width: "100px" }}
      />
    </Link>
    <Link href="#">
      <Image
        src={logo4}
        alt="logo"
        className="img-fluid w-lg-200"
        // style={{ width: "100px" }}
      />
    </Link>
    <Link href="#">
      <Image
        src={logo4}
        alt="logo"
        className="img-fluid w-lg-200"
        // style={{ width: "100px" }}
      />
    </Link>
  </div>
</div>

      {/* <div id="scrollbarslide" className=" h-auto w-full overflow-x-auto">
        <div
          behavior="slide"
          direction="left"
          loop
          className="w-[200%] lg:w-[100%] "
        >
          <div className="w-full flex items-center justify-evenly ">
            <Link href="#">
              <Image
                src={logo1}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
            <Link href="#">
              <Image
                src={logo2}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
            <Link href="#">
              <Image
                src={logo3}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
            <Link href="#">
              <Image
                src={logo4}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
            <Link href="#">
              <Image
                src={logo4}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
            <Link href="#">
              <Image
                src={logo4}
                alt="logo"
                className="w-[100px] md:w-[150px]"
                priority
              />
            </Link>
          </div>
        </div>
      </div> */}
      <style jsx>{`
       .custom-width{
   width: 100%;
   }
   .citylocation{
   font-size: 100px
   }

   @media (max-width: 768px) {
   .custom-width{
   width: 200%;
   }
    .citylocation{
   font-size: 50px
   }
   }
   `}</style>
    </>
  );
};

export default StorageComponent;
