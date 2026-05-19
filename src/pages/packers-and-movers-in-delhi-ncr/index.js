import React from "react";

import Herosection from "./herosection";
import Workflow from "./work-section";
import Videosec from "./videosec";
import ContactUs from "./contact-us";
import OurPartner from "./ourpartner";
// import Service from "./service";
import FlexibleStorage from "./flexible-storage";
import Footer from "./footer";
import Head from "next/head";
import Faqs from "./faqs";
import AboutUs from "./about";
import Article from "./article";
const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png"
          type="image/x-icon"
        />
        <title>Packers and Movers in Delhi NCR - Xtended Space</title>
        <meta
          name="description"
          content="Xtended Space provides reliable and affordable packers and movers services in Delhi NCR. Contact us for secure and hassle-free relocation in Delhi, Noida, Gurugram, Faridabad, and Ghaziabad."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="packers and movers delhi, packers and movers within delhi, packers and movers in noida, packers and movers gurgaon, packers and movers near me, movers and packers in dwarka, packers and movers in greater noida"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/packers-and-movers-in-delhi-ncr/"
        />
        <meta
          property="og:title"
          content="Best Packers and Movers in Delhi NCR"
        />
        <meta
          property="og:description"
          content="Top-rated packers and movers in Delhi NCR. Reliable relocation services in Delhi, Noida, Gurugram, and Faridabad. Contact Xtended Space for a smooth move."
        />
        <meta
          property="og:image"
          content="/images/delhi-images-relocation/packers-and-movers-in-delhi-noida-gurugram-faridabad.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Best Packers and Movers in Delhi NCR"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/packers-and-movers-in-delhi-ncr/ "
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reliable Packers and Movers in Delhi NCR"
        />
        <meta
          name="twitter:description"
          content="Professional packers and movers in Delhi. Safe, efficient, and affordable moving services. Trust Xtended Space for your relocation needs."
        />
        <meta
          name="twitter:image"
          content="/images/delhi-images-relocation/packers-and-movers-in-delhi-noida-gurugram-faridabad.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Packers and movers in gurgaon, delhi, noida, faridabad"
        />
      </Head>
      <div className="packerWrapper">
        <Herosection />
        <FlexibleStorage /> 

        <Article />

        <AboutUs />

        <Workflow />
        <Videosec />

        <ContactUs />
        <OurPartner />
        {/* <Service /> */}

        <Faqs />

        <Footer />
      </div>
    </>
  );
};

export default Home;
