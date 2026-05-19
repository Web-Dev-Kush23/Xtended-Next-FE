import React, { useState } from "react";
import Hero from "./herosection";
import HowItWork from "./how-it-work";
import VideoContent from "./videocontent";
import IndiaMost from "./indiamost";
import ContactUs from "./contactus";
import OurPartner from "./ourpartner";
import Services from "./services";

import Head from "next/head";
import { GoogleTagManager } from "@next/third-parties/google";
import Article from "./article";
import Faq from "./faq";
import Footer from "./footer";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png"
          type="image/x-icon"
        />
        <title>Warehouse Storage Services In Mumbai</title>
        <meta
          name="description"
          content="Reliable warehouse storage solutions in Mumbai. Store household goods or business inventory securely with Xtended Space. Contact us today."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="warehouse space for rent, warehouse solutions, warehouse storage space in thane, godown for rent in Mumbai, warehouse storage solutions"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/warehouse-storage-service-in-mumbai/"
        />
        <meta
          property="og:title"
          content="Warehouse Storage Services in Mumbai - Xtended Space"
        />
        <meta
          property="og:description"
          content="Secure and affordable warehouse storage services in Mumbai. Flexible lease options and professional service. Contact Xtended Space today for details."
        />
        <meta
          property="og:image"
          content="\images\warehouse-storage-service-in-mumbai.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="affordable Warehouse Storage service in Mumbai"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/warehouse-storage-service-in-mumbai/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent Secure Storage in Mumbai" />
        <meta
          name="twitter:description"
          content="Find secure and affordable warehouse storage services in Mumbai. Flexible leases and door-to-door service. Contact Xtended Space now."
        />
        <meta
          name="twitter:image"
          content="\images\warehouse-storage-service-in-mumbai.webp"
        />
      </Head>
      <div className="packerWrapper">
     
        <Hero />

        <HowItWork />
        <VideoContent />
        <IndiaMost />
        <ContactUs />
        <Article />
        <OurPartner />
        <Faq />
        <Services />
        <Footer />
      </div>
    </>
  );
};

export default Home;
