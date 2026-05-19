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
     <link rel="shortcut icon" href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png" type="image/x-icon" />
     <title>Warehouse Storage Services In Delhi NCR</title>
    <meta name="description" content="Xtended Space provides reliable and affordable warehouse storage services in Delhi NCR. Contact us for secure and flexible storage solutions in Delhi, Noida, Ghaziabad, Faridabad, and Gurugram." />
    <meta name="author" content="Xtended Space" />
    <meta name="keywords" content="warehouse space for rent, warehouse solutions, warehouse storage space in noida, godown for rent in gurugram, warehouse storage solutions"/>
    <meta name="robots" content="noindex, nofollow"/>
    <link rel="canonical" href="https://www.xtendedspace.com/warehouse-storage-services-in-delhi-ncr/"/>
    <meta property="og:title" content="Rent Warehouse Space in Delhi NCR"/>
    <meta property="og:description" content="Reliable warehouse storage services in Delhi NCR. Safe and flexible storage solutions. Contact us today!"/>
    <meta property="og:image" content="/images/delhi-images-warehouse/warehouse-storage-service-in-delhi-noida-faridabad-gurugram.webp"/>
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="300" />
    <meta property="og:image:alt" content="Rent Warehouse Space in Delhi NCR" />
    <meta property="og:url" content="https://www.xtendedspace.com/warehouse-storage-services-in-delhi-ncr/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="Xtended Space" />
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="Secure Warehouse Solutions in Delhi NCR"/>
    <meta name="twitter:description" content="Find secure and affordable warehouse storage solutions in Delhi NCR. Contact Xtended Space for more details."/>
    <meta name="twitter:image" content="/images/delhi-images-warehouse/warehouse-storage-service-in-delhi-noida-faridabad-gurugram.webp"/>
    <meta name="twitter:image:alt" content="Affordable Warehouse Storage" />
  
    </Head>
    <div className="packerWrapper">

  
      <Herosection />
      <Article/>
        <Workflow />
      <Videosec />
      <FlexibleStorage />
      <ContactUs />
      <OurPartner />
      <Service />
      <Faqs/>
      

      <Footer/>
    
      </div>
      </>
    );
};

export default Home;
