import React from "react";

const AboutUs = () => {
  return (
    <>
      <div id="about" className="html_article about">
        <div className="text-sec flex-col flex">
          <h2 className="text-[2rem] text-[#1B1C57] font-bold ">
            Best Packers and Movers in Mumbai
          </h2>
          <br />
          <br />
          <p className="text-[28px] font-semibold leading-[22px] text-[black]">
            Xtended Space is a top-rated packers and movers service provider in
            Mumbai. We are known for our exceptional relocation services and
            commitment to customer satisfaction.
            <br />
            <br />
            Whether you’re moving your home or office within Mumbai or
            relocating from Mumbai to anywhere in India, our skilled
            professionals handle everything from packing to transporting your
            belongings safely. We use high-quality packaging materials and
            advanced equipment to ensure your items are protected during
            transit.
            <br />
            <br />
            What sets us apart is our personalized approach to each move,
            tailoring our services to meet your unique needs. For a smooth and
            efficient relocation experience in Mumbai, trust Xtended Space.
            Contact us today for expert assistance with your upcoming move.
          </p>
        </div>
        <div className="about-img">
          <img src="/images/relocation/shared image (4).jpg" alt="About Us" />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
