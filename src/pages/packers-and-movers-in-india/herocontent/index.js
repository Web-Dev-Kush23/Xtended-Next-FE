import Image from "next/image";
import React from "react";

const HeroContent = () => {
  return (
    <>
      <div id="right-panel">
        <h2>Xtended Space: Why We Are the Best Choice for Your Move</h2>
        <div id="features-grid">
          <div className="feature-item flex flex-col items-center" id="pickup">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Doorstep-pickup.webp"
              alt="Doorstep Pickup"
              width={200}
              height={200}
            />
            <h3>Doorstep Pickup</h3>
            <p>
              We offer convenient doorstep pickup services, ensuring a
              hassle-free start to your relocation process.
            </p>
          </div>
          <div className="feature-item flex flex-col items-center" id="cctv">
            <img
              src="images/why-we-choose/Three-layer-packaging-Damage-proof.png"
              alt="Three layer packaging"
            />
            <h3>Packaging</h3>
            <p>
              Our three-layer packaging system provides protection, keeping your
              belongings safe and damage-free.
            </p>
          </div>
          <div
            className="feature-item flex flex-col items-center"
            id="pest-fire-control"
          >
            <img
              src="images/why-we-choose/labour-assistance.png"
              alt="Labour assistance"
            />
            <h3>Labor Assistance</h3>
            <p>
              Our professional labor team is available to assist with all
              aspects of your move, making the process smooth and efficient.
            </p>
          </div>
          <div
            className="feature-item flex flex-col items-center"
            id="insurance"
          >
            <img
              src="images/why-we-choose/Insurance-coverage.png"
              alt="insurance coverage"
            />
            <h3>Insurance</h3>
            <p>
              We provide comprehensive insurance coverage for your belongings,
              giving you peace of mind during the move.
            </p>
          </div>
          <div
            className="feature-item flex flex-col items-center"
            id="affordable-price"
          >
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Affordable-price.webp"
              alt="affordable prices"
              width={100}
              height={100}
            />
            <h3>Affordable Pricing</h3>
            <p>
              Enjoy top-quality moving services at competitive and affordable
              prices, without any hidden costs.
            </p>
          </div>
          <div
            className="feature-item flex flex-col items-center"
            id="on-time-delivery"
          >
            <img
              src="images/why-we-choose/On-time-delivery.png"
              alt="on time shifting"
            />
            <h3>On-Time Shifting</h3>
            <p>
              We guarantee on-time shifting, ensuring your move is completed
              within the scheduled time frame.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroContent;
