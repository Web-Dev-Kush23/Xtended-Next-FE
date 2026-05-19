import React from "react";

import Profilesec from "./about";
import Process from "./process";
import Video from "./video";
import MidContent from "./midcontent";
import Article from "./article";
import Partner from "./partner";
import FooterMain from "./footmain";
import HeroContent from "./herocontent";
import AboutUs from "./about";

import Form from "./form";
import Head from "next/head";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png"
          type="image/x-icon"
        />
        <title>Packers and Movers in India - Xtended Space</title>
        <meta
          name="description"
          content="Professional packers and movers services for home and office relocations across India. Trust Xtended Space for your moving needs."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="packers and movers, near me movers and packers, packers and movers near me, moving packers near me, near me packers and movers, packers & movers near me, home shifting services, household shifting services, house shifting services, house shifting services near me, household shifting services near me, home shifting services near me, movers and packers service, relocation services, household relocation service"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/packers-and-movers-in-india/"
        />
        <meta
          property="og:title"
          content="Professional Packers and Movers Services"
        />
        <meta
          property="og:description"
          content="Affordable and efficient movers and packers near you. Expert household shifting services. Book with Xtended Space for safe relocations."
        />
        <meta
          property="og:image"
          content="/images/india-relocation/packers-and-movers-in-india.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Top Packers and Movers in India"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/packers-and-movers-in-india/ "
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secure Home Shifting Services" />
        <meta
          name="twitter:description"
          content="Secure home shifting services in multiple locations. Reliable household relocation solutions with Xtended Space. Contact us today."
        />
        <meta
          name="twitter:image"
          content="/images/india-relocation/packers-and-movers-in-india.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Affordable Movers and Packers Near Me"
        />
      </Head>
      <div className="packerWrapper">
        <Form />
        <HeroContent />
        <AboutUs />
        <Process />
        <Video />
        <MidContent />
        <Article />
        <Partner />
        <FAQs />
        <FooterMain />
      </div>
    </>
  );
};

export default Home;
