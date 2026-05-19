import React from "react";

import Herosection from "./herosection";
import Workflow from "./work-section";
import VideoContent from "./videosec";
import ContactUs from "./contact-us";
import Article from "./Article";
import OurPartner from "./ourpartner";
// import Service from "./service";
import FlexibleStorage from "./flexible-storage";
import Footer from "./footer";
import Head from "next/head";
import FAQs from "./FAQs";

const Home = () => {
  return (
    <>
      <Head>
      <link rel="shortcut icon" href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png" type="image/x-icon" />
      <title>Secure Storage Rental Solutions</title>
<meta name="description" content="Find secure and reliable storage rental solutions with Xtended Space. Affordable storage units and warehouse spaces available near you. Get a quote today!" />
<meta name="author" content="Xtended Space" />
<meta name="keywords" content="storage space near me, storage units near me, storage rooms near me, storage rental near me, monthly storage units near me, storage units close by me, warehouse for rent, godown for rent near me, storage unit facilities, warehouse for rent near me, rent a warehouse near me" />
<meta name="robots" content="noindex, nofollow" />
<link rel="canonical" href="https://www.xtendedspace.com/storage-space-services-in-india/" />
<meta property="og:title" content="Top Warehouse Storage Services in India" />
<meta property="og:description" content="Xtended Space provides top warehouse storage services across India. Safe, secure, and affordable storage solutions for your belongings. Inquire now!" />
<meta property="og:image" content="/images/india/secured-storage-space-in-india.webp" />
<meta property="og:image:type" content="image/webp" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="300" />
<meta property="og:image:alt" content="Top Warehouse Storage Services in India" />
<meta property="og:url" content="https://www.xtendedspace.com/storage-space-services-in-india/" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Xtended Space" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Affordable Storage Units for Rent" />
<meta name="twitter:description" content="Looking for storage units near you? Xtended Space offers secure and affordable storage units for rent. Perfect for household and business storage needs." />
<meta name="twitter:image" content="/images/india/secured-storage-space-in-india.webp" />
<meta name="twitter:image:alt" content="Affordable Storage Units for Rent" />




</Head>
    <div className="packerWrapper">

  
      <Herosection />
      <Workflow />
      <VideoContent />
      <FlexibleStorage />
      <ContactUs />
      <Article />
      <OurPartner />
      <FAQs />
      {/* <Service /> */}
      <Footer/>
      </div>
      </>
    );
};

export default Home;
