import Image from "next/image";
import React from "react";

const Workflow = () => {
  return (
    <>
      <div className="process html_article">
        <div className="process-info">
          <h2 className="text-[2rem]">How it Works?</h2>
          <p className="font-semibold ">
            Xtended Space, the ultimate relocation service platform in Delhi
            NCR, ensures your belongings are relocated safely.
          </p>
        </div>
        <div className="row">
          <div className="process-col flex flex-col items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/easy-booking.webp"
              alt="easy booking"
              width={100}
              height={100}
            />
            <h2>01</h2>
            <h3>Easy Booking</h3>
            <p className="html_article">
              Seamlessly book your move with our user-friendly process.
            </p>
          </div>
          <div className="process-col flex flex-col items-center ">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/doorstep-pickup-green.webp"
              alt="doorstep pickup"
              width={100}
              height={100}
            />
            <h2>02</h2>
            <h3>Doorstep Pickup</h3>
            <p className="html_article">
              We pick up your belongings right from your doorstep for maximum
              convenience.
            </p>
          </div>
          <div className="process-col flex flex-col items-center">
         <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Secure-Packing.png"
              alt="Secure Packing and Moving"
              width={500}
              height={500}
            />
            <h2>03</h2>
            <h3>Secure Packing and Moving</h3>
            <p className="html_article">
              Our professional team ensures your items are packed securely and
              moved safely.
            </p>
          </div>
          <div className="process-col flex flex-col items-center">
          <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/On-time-shifting.png"
              alt="on time shifting"
              width={500}
              height={500}
            />
            <h2>04</h2>
            <h3>On-Time Delivery</h3>
            <p className="html_article">
              We guarantee timely delivery of your belongings to your new
              location.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Workflow;
