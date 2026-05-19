import React, { useState } from "react";

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
import { GoogleTagManager } from "@next/third-parties/google";
import Faq from "./faq";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png"
          type="image/x-icon"
        />
        <title>Packers and Movers in Mumbai - Xtended Space</title>
        <meta
          name="description"
          content="Reliable packers and movers in Mumbai. Affordable, professional, and secure relocation services. Contact Xtended Space for a hassle-free move"
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="packers and movers services in mumbai, Relocation services in mumbai, Mumbai to Thane relocation, domestic movers and packers, affordable packers and movers"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/packers-and-movers-in-mumbai/"
        />
        <meta
          property="og:title"
          content="Xtended Space: Movers and Packers Mumbai"
        />
        <meta
          property="og:description"
          content="Top-rated movers and packers in Mumbai. Easy booking, secure moving, and on-time delivery. Choose Xtended Space for your next move."
        />
        <meta
          property="og:image"
          content="/images/packers-and-movers-in-mumbai.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="packers and movers service in Mumbai"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/packers-and-movers-in-mumbai/ "
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Affordable Packers and Movers Mumbai"
        />
        <meta
          name="twitter:description"
          content="Get affordable and professional packers and movers in Mumbai with Xtended Space. Safe, secure, and timely relocation services."
        />
        <meta
          name="twitter:image"
          content="/images/packers-and-movers-in-mumbai.webp"
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
        <Faq />
        <FooterMain />
      </div>
    </>
  );
};

export default Home;
