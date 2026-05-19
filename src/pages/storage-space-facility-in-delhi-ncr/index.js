import React from "react";

import Herosection from "./herosection";
import Workflow from "./work-section";
import Videosec from "./videosec";
import ContactUs from "./contact-us";
import OurPartner from "./ourpartner";
import Service from "./service";
import FlexibleStorage from "./flexible-storage";
import Footer from "./footer";
import Head from "next/head";
import Faqs from "./faqs";
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
        <title>Storage Space Facility in Delhi NCR - Xtended Space</title>
        <meta
          name="description"
          content="Xtended Space provides reliable and affordable storage facility in Delhi NCR. Contact us for secure and flexible storage solutions in Delhi, Noida, Ghaziabad, Faridabad, and Gurugram."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="storage spaces near me, storage facility in delhi, storage facilities, household storage services, storage space for gurugram, strorage space for rent faridabad, household storage services Delhi, household storage space noida, household storage space faridabad, business inventory storage services Delhi, storage units near me, monthly storage units near me, storage storage units near me, storage facilities near me, storage for household items, storage for household goods, home storage facility, household good storage, "
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/storage-space-facility-in-delhi-ncr/"
        />
        <meta
          property="og:title"
          content="Reliable Storage Space in Noida, Gurugram, Delhi, Faridabad"
        />
        <meta
          property="og:description"
          content="Secure and affordable storage facilities in Delhi NCR. Flexible lease options. Contact us now!"
        />
        <meta
          property="og:image"
          content="/images/delhi-images-storage-space/secured-storage-space-in-noida-delhi-faridabad-gurgaon.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Reliable storage space services in Delhi NCR"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/storage-space-facility-in-delhi-ncr/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent Storage Space in Delhi NCR" />
        <meta
          name="twitter:description"
          content="Find secure and affordable storage solutions in Delhi NCR. Contact Xtended Space for more details."
        />
        <meta
          name="twitter:image"
          content="/images/delhi-images-storage-space/secured-storage-space-in-noida-delhi-faridabad-gurgaon.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Rent Storage Space in Delhi NCR"
        />
      </Head>
      <div className="packerWrapper">
        <Herosection />
        <Article />
        <Workflow />
        <Videosec />
        <FlexibleStorage />
        <ContactUs />
        <OurPartner />
        <Service />
        <Faqs />

        <Footer />
      </div>
    </>
  );
};

export default Home;
