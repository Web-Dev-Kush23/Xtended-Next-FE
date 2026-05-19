import Image from "next/image";
import React from "react";

const IndiaMost = () => {
  return (
    <>
      <div className="html_article">
        <div id=" right-panel">
          <h2>India's Most Flexible Storage</h2>

          <div id="features-grid">
            <div
              id="pickup"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="/images/why-we-choose/door-step-service.png"
                alt="Doorstep service"
              />
              <h3>Doorstep Service</h3>
              <p>
                Enjoy the convenience of our doorstep service. We pick up your
                items from your location, pack them securely, and transport them
                to our warehouse.
              </p>
            </div>
            <div
              id="cctv"
              className="flex flex-col justify-center items-center"
            >
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/cctv-24-hr.webp"
                alt="24x7 CCTV"
                width={200}
                height={200}
              />
              <h3>24x7 CCTV</h3>
              <p>
                Our Storage Units are equipped with 24/7 CCTV surveillance,
                providing constant monitoring and ensuring the security of your
                belongings.
              </p>
            </div>
            <div
              id="pest-fire-control"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="\images\why-we-choose copy 2\Pest-control.png"
                alt="Pest Control"
              />
              <h3>Pest Control</h3>
              <p>
                We ensure a pest-free environment with regular pest control
                measures, keeping your goods safe and secure.
              </p>
            </div>
            <div
              id="insurance"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="\images\why-we-choose copy 2\Insurance.png"
                alt="Insurance coverage"
              />
              <h3>Insurance</h3>
              <p>
                We offer comprehensive insurance coverage for your goods, giving
                you peace of mind knowing that your belongings are protected.
              </p>
            </div>
            <div
              id="insurance"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="\images\why-we-choose copy 2\fire-control.png"
                alt="fire control"
              />
              <h3>Fire Control</h3>
              <p>
                Advanced fire control systems are in place to protect your
                stored items from any potential fire hazards.
              </p>
            </div>
            <div
              id="insurance"
              className="flex flex-col justify-center items-center"
            >
              <img
                src="\images\why-we-choose copy 2\RCC-structure- Warehouse.png"
                alt="RCC Structured Warehouse"
              />
              <h3>RCC Structured Warehouse</h3>
              <p>
                Our warehouses are built with robust RCC structures, providing
                maximum safety and durability for your stored items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndiaMost;
