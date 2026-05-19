import Image from "next/image";
import React from "react";

const FlexibleStorage = () => {
  return (
    <>
      <div id="right-panel" className="p-4 html_article">
        <h2 className="text-2xl font-bold mb-4">
          India's Most Flexible Storage
        </h2>
        <div
          id="features-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div id="pickup" className="flex flex-col items-center text-center">
            <img
              src="/images/why-we-choose copy/door-step-service.png"
              alt="Doorstep service"
              className="w-24 h-24 mb-2"
            />
            <h3 className="text-lg font-semibold">Doorstep Service</h3>
            <p>
              Enjoy the convenience of our doorstep service. We pick up your
              items from your location, pack them securely, and transport them
              to our Storage Units.
            </p>
          </div>
          <div id="cctv" className="flex flex-col items-center text-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/cctv-24-hr.webp"
              alt="24x7 CCTV"
              className="w-24 h-24 mb-2"
              width={96}
              height={96}
            />
            <h3 className="text-lg font-semibold">24x7 CCTV</h3>
            <p>
              Our Storage Units are equipped with 24/7 CCTV surveillance,
              providing constant monitoring and ensuring the security of your
              belongings.
            </p>
          </div>
          <div
            id="pest-fire-control"
            className="flex flex-col items-center text-center"
          >
            <img
              src="/images/why-we-choose copy/Pest-control.png"
              alt="Pest Control"
              className="w-24 h-24 mb-2"
            />
            <h3 className="text-lg font-semibold">Pest Control</h3>
            <p>
              We ensure a pest-free environment with regular pest control
              measures, keeping your goods safe and secure.
            </p>
          </div>
          <div
            id="insurance"
            className="flex flex-col items-center text-center"
          >
            <img
              src="/images/why-we-choose copy/Insurance.png"
              alt="Insurance coverage"
              className="w-24 h-24 mb-2"
            />
            <h3 className="text-lg font-semibold">Insurance</h3>
            <p>
              We offer comprehensive insurance coverage for your goods, giving
              you peace of mind knowing that your belongings are protected.
            </p>
          </div>
          <div
            id="fire-control"
            className="flex flex-col items-center text-center"
          >
            <img
              src="/images/why-we-choose copy/fire-control.png"
              alt="fire control"
              className="w-24 h-24 mb-2"
            />
            <h3 className="text-lg font-semibold">Fire Control</h3>
            <p>
              Advanced fire control systems are in place to protect your stored
              items from any potential fire hazards.
            </p>
          </div>
          <div
            id="rcc-structure"
            className="flex flex-col items-center text-center"
          >
            <img
              src="/images/why-we-choose copy/RCC-structure- storage-units.png"
              alt="RCC Structured Storage units"
              className="w-24 h-24 mb-2"
            />
            <h3 className="text-lg font-semibold">
              RCC Structured Storage Units
            </h3>
            <p>
              Our Storage Units are built with robust RCC structures, providing
              maximum safety and durability for your stored items.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlexibleStorage;
