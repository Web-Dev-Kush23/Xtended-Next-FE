import Image from "next/image";
import React, { useState, useEffect } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("Mumbai to Mumbai");
  useEffect(() => {
    // Function to update the text after a delay
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "Mumbai to Mumbai"
          ? "Mumbai to Pan India"
          : "Mumbai to Mumbai"
      );
    }, 3000); // Change text after 3 seconds (3000 milliseconds)

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(interval);
  }, []); // Run this effect only once after the component mounts

  return (
    <>
      <section className="header" id="header">
        <div className="navbar">
          <Image
            className="logo"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/xtended-space-white-logo.png"
            alt="Xtended Space Logo"
            width={150}
            height={150}
          />
          <div className="contact-info">
            <a href="tel:+919009000798">
              <span className="icon">
                <i className="ri-phone-fill"></i>
              </span>
              <span className="text"> +(91) 900 900 0798</span>
            </a>
          </div>
        </div>
        {/* <img class="logo" src=".https://xtendedspace.s3.ap-south-1.amazonaws.com/home/xtended-space-white-logo.png" alt="Xtended Space Logo"></img> */}
        <div className="header-content">
          <div className="header-title">
            <h1>PACKERS AND MOVERS</h1>
            <div id="textContainer">
              <div id="textContainer">
                <span>{displayText}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-form">
          <div className="form-container">
            <form action="thank-you.html" method="post" id="quoteForm">
              <div className="form-top py-2">
               
                <h4>
                  Festive Offer!
                </h4>
              </div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="name"
                required
                onInput="validateInput()"
              />
              <br />
              <div className="error" id="nameError"></div>
              <input
                type="tel"
                id="mobile"
                placeholder="Mobile"
                name="mobile"
                required
                onInput="validateMobile(this)"
              />
              <br />
              <div className="error" id="mobileError"></div>
              <select
                id="location"
                name="location"
                required
                onInput="validateInput()"
                className="w-full md:w-[355px] h-full py-3  md:py-0 md:h-[55px]"
              >
                <option value="" disabled selected>
                  Select your PickUp location
                </option>
                <option value="South Mumbai">South Mumbai</option>
                <option value="Western Suburbs">Western Suburbs</option>
                <option value="Eastern Suburbs">Eastern Suburbs</option>
                <option value="Central Mumbai">Central Mumbai</option>
                <option value="Thane">Thane</option>
                <option value="Navi Mumbai">Navi Mumbai</option>
              </select>
              <br />
              <div className="error" id="locationError"></div>
              <input type="hidden" name="pageUrl" id="pageUrl" value="" />
              <button type="button" onClick="submitForm()" id="submitButton">
                 Get Flat 30% OFF <br /> <span className='text-[15px]'>Upto ₹ 5000</span>
              </button>
            </form>
          </div>
        </div>
        <div className="slidingservice">
          <div className="header-images">
            <div className="header-image">
              <img
                src="images/relocation-image/household-tem-shifting.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/packer-and-movers-household-shifting.webp"
                alt="packing and moving services"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/Packers-movers-three-layer-packing.webp"
                alt="warehouse storage space"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-doorstep-pickup.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-moving.webp"
                alt="packing and moving services"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-packaging.webp"
                alt="warehouse storage space"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-packed.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-store-warehouse.webp"
                alt="packing and moving services"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/Storage-space-packing-goods.webp"
                alt="warehouse storage space"
              />
            </div>
            <div className="header-image">
              <img
                src="images/relocation-image/relocation-item-moving.webp"
                alt="warehouse storage space"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
