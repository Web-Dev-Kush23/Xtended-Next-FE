import React from "react";

const AboutUs = () => {
  return (
    <>
      <div id="about" className="about html_article">
        <div className="text-sec flex-col flex">
          <h2 className="text-[2rem] text-[#1B1C57] font-bold ">
            Best Packers and Movers Across India
          </h2>
          <br />
          <br />
          <p className="text-[28px] font-semibold leading-[22px] text-[black]">
            Xtended Space is a top-rated{" "}
            <strong>packers and movers service</strong> provider in multiple
            locations across India, including{" "}
            <strong>
              Chandigarh, Zirakpur, Ambala (HR), Ludhiana (PB), Vapi (Gujarat),
              Haridwar (UK), Roorkee (UK), Rudrapur (UK), Kanpur (UP), Lucknow
              (UP), Jhansi (UP), Meerut (UP), Gwalior (MP), Bengaluru
              (Karnataka), and Dehradun
            </strong>
            . We are known for our exceptional relocation services and
            commitment to customer satisfaction.
            <br />
            <br />
            Whether you’re moving your home or office within these locations or
            relocating from one city to another, our skilled professionals
            handle everything from packing to transporting your belongings
            safely. We use high-quality packaging materials and advanced
            equipment to ensure your items are protected during transit.
            <br />
            <br />
            What sets us apart is our personalized approach to each move,
            tailoring our services to meet your unique needs. For a smooth and
            efficient relocation experience across India, trust Xtended Space.
            Contact us today for expert assistance with your upcoming move.
          </p>
        </div>
        <div className="about-img">
          <img src="/images/india-relocation/XS-india-map.jpg" alt="About Us" />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
