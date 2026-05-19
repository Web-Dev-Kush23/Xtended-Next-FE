import Image from "next/image";
import React from "react";

const FooterMain = () => {
  return (
    <>
      <div className="footer">
        <div className="footerdiv">
          <div className="space-y-2  ">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/xtended-space-white-logo.png"
              alt="Xtended Space Logo"
              className="h-8"
              width={150}
              height={150}
            />
            <p className="">
              Xtended Space stores your belongings in a secure storage unit.
              Additionally, it provides you door-to-door logistics services.
            </p>
          </div>
          <div className="footersection ">
            <h3 className="">Location</h3>
            <ul className="space-y-1">
              <li>
                <a href="#header">Packers and Movers in Chandigarh</a>
              </li>
              <li>
                <a href="#header">Packers and Movers in Haridwar</a>
              </li>
              <li>
                <a href="#header">Packers and Movers in Lucknow</a>
              </li>
              <li>
                <a href="#header">Packers and Movers in Jhansi</a>
              </li>
              <li>
                <a href="#header">Packers and Movers in Bengaluru</a>
              </li>
              <li>
                <a href="#header">Packers and Movers in Dehradun</a>
              </li>
            </ul>
          </div>

          <div className="footersection ">
            <h3 className="">Contact Us</h3>
            <div className="space-y-1">
              <div className="contactdiv  space-x-2">
                <a href="https://maps.app.goo.gl/9TWF2uvH32zTQpJh6">
                  {/* <span><i className="ri-map-pin-fill"></i></span> */}
                  <span>
                    A-96 , 3rd Floor , Sector -63 Noida-201301, A Block, Sector
                    63, Noida, Uttar Pradesh 201307
                  </span>
                </a>
              </div>
              <div className="contactdiv  space-x-2">
                <a href="tel:+919009000798">
                  {/* <span><i className="ri-phone-fill"></i></span> */}
                  <span> +(91) 9009000798</span>
                </a>
              </div>
              <div className="contactdiv  space-x-2">
                <a href="mailto:info@xtendedspace.com">
                  {/* <span><i className="ri-mail-unread-line"></i></span> */}
                  <span>info@xtendedspace.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="footerlast text-center text-zinc-400 text-sm mt-8">
          Copyright © 2024 Xtended Space. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default FooterMain;
