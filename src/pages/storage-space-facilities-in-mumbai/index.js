import React from "react";
import Herosection from "./herosection";
import Workflow from "./work-section";
import Videosec from "./videosec";
import ContactUs from "./contact-us";
import OurPartner from "./ourpartner";
import Service from "./service";
import FlexibleStorage from "./flexible-storage";
import Head from "next/head";
import Article from "./article";
import Faq from "./faq";
import Footer from "./footer";
import VideoContent from "./videosec";

const Home = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/logo/xtendedspace-watermark.png"
          type="image/x-icon"
        />
        <title>Storage Facilities in Mumbai - Xtended Space</title>
        <meta
          name="description"
          content="Secure and affordable storage facilities in Mumbai. Flexible lease options and professional service. Contact Xtended Space today for details"
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="storage units, storage units near me, storage places near me, storage space near me, storage rental near me, storage areas near me, storage space in mumbai, storage facility in mumbai"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/storage-space-facilities-in-mumbai/"
        />
        <meta
          property="og:title"
          content="Mumbai Storage Solutions - Xtended Space"
        />
        <meta
          property="og:description"
          content="Reliable storage solutions in Mumbai. Store household goods or business inventory securely with Xtended Space. Contact us today."
        />
        <meta
          property="og:image"
          content="\images\secured-storage-space-in-mumbai.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="affordable Storage space service in Mumbai"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/storage-space-facilities-in-mumbai/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rent Secure Storage in Mumbai" />
        <meta
          name="twitter:description"
          content="Find secure and affordable storage facilities in Mumbai. Flexible leases and door-to-door service. Contact Xtended Space now."
        />
        <meta
          name="twitter:image"
          content="\images\secured-storage-space-in-mumbai.webp"
        />
        {/* <script src="/path/to/GoogleTagManager.js"></script> */}
      </Head>

      <div className="packerWrapper">
        <Herosection />

        <Workflow />
        <VideoContent />
        <FlexibleStorage />
        <ContactUs />
        <Article />
        <OurPartner />
        <Faq />
        <Service />
        <Footer />
      </div>
    </>
  );
};

export default Home;
