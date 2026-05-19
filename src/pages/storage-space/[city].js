// /pages/packers-and-movers/[city].js

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import SimpleSlider from "@/sharedComponent/landingcomponent/simple_slider";
import Vedio from "@/sharedComponent/landingcomponent/video";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import Contact from "@/components/multicities/contact";
import User from "@/components/multicities/User";
import Banner from "@/components/multicities/Banner";
import citiesData from "@/components/storagespaceData";
import dynamic from "next/dynamic";
import Image from 'next/image';
import emailIcon from "../../../public/images/assets-multiple-cities/emailIcon.svg";
import CallIconWhite from "../../../public/images/assets-multiple-cities/callIconWhite.svg";
import Link from 'next/link';
import Myform from "../../util/contactform";

const Searchlocation = dynamic(() => import("../searchlocation"));

export async function getStaticPaths() {
  const paths = Object.keys(citiesData).map((city) => ({
    params: { city },
  }));

  return {
    paths,
    fallback: false, 
  };
}

export async function getStaticProps({ params }) {
  const { city } = params;

  const cityData = citiesData[city.toLowerCase()];

  if (!cityData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      city,
      cityData,
    },
  };
}

const CityPage = ({ city, cityData }) => {
  const { headData } = cityData;
 const cities = Object.values(citiesData);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png" type="image/x-icon" />
        <title>{headData.title}</title>
        <meta name="description" content={headData.description} />
        <meta name="author" content="Xtended Space" />
        <meta name="keywords" content={headData.keywords} />
        <link rel="canonical" href={headData.canonical} />
        <meta property="og:title" content={headData.title} />
        <meta property="og:description" content={headData.description} />
        <meta property="og:image" content={headData.og.image} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <link rel="alternate" href={headData.canonical} hreflang="en-in" />
        <meta property="og:image:alt" content={headData.title} />
        <meta property="og:url" content={headData.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={headData.title} />
        <meta name="twitter:description" content={headData.description} />
        <meta name="twitter:image" content={headData.og.image} />
        <meta name="twitter:image:alt" content={headData.title} />


        {/* <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Storage Space Services",
      "image": "https://www.xtendedspace.com//images/offerlanding/b2b-storage/business-storage.webp",
      "description": "Xtended Space is a trusted provider of comprehensive storage solutions and packers and movers services in India. We specialize in offering secure, affordable, and hassle-free relocation and storage experiences for individuals, families, and businesses.",
      "url": "https://www.xtendedspace.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 386,
        "worstRating": 1,
        "bestRating": 5
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Roopak Malik"
          },
          "datePublished": "2024-08-23",
          "reviewBody": "Smooth and easy experience. With one phone call, details were taken, storage cost estimate given, and within a day the team came home. They packed the furniture to be stored very well and transported it to their warehouse. Very convenient.",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 4.4,
            "worstRating": 1,
            "bestRating": 5
          }
        }
      ]
    })
  }}
/> */}

<script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "http://schema.org/",
        "@type": "Product",
        name: "Self Storage and Business Storage Solution",
        image:
          "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
        description:
          "Xtended Space is a trusted provider of comprehensive storage solutions and packers and movers services in India. We specialize in offering secure, affordable, and hassle-free relocation and storage experiences for individuals, families, and businesses.",
        brand: {
          "@type": "Brand",
          name: "Xtended Space",
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: "500",
          highPrice: "50000",
          url: "https://www.xtendedspace.com",
          availability: "https://schema.org/InStock",
          offerCount: "1",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.4",
          ratingCount: "392",
          reviewCount: "392",
          worstRating: "1",
          bestRating: "5",
        },
        review: [
          {
            "@type": "Review",
            name: "Warehouse Storage Solution",
            author: {
              "@type": "Person",
              name: "Tanvi",
            },
            datePublished: "2025-05-01",
            reviewBody:
              "I found this team while looking for a affordable warehouse facility in Gurgaon. After evaluating available options, I chose XtendedSpace. Writing this positive review after receiving my household items from them after storing for 1.5 years. Except for minor breakage of few tea/coffee mugs, everything received as packed.",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              worstRating: "1",
              bestRating: "5",
            },
          },
          {
            "@type": "Review",
            name: "Packers and Movers ",
            author: {
              "@type": "Person",
              name: "Swanjan Setu",
            },
            datePublished: "2025-03-05",
            reviewBody:
              "I recently had the pleasure of using Xtended Space's logistics and storage facility, and I couldn’t be more satisfied with the service. The entire process was seamless from start to finish. The staff were professional, friendly, and always ready to assist with any inquiries or concerns. The facility itself is modern, secure, and well-organized, ensuring that all items are stored safely and efficiently. The level of transparency and communication maintained by Xtended Space is commendable, making it easy to track and manage stored goods. I highly recommend Xtended Space to anyone in need of reliable logistics and storage solutions. Thank you for exceeding my expectations",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              worstRating: "1",
              bestRating: "5",
            },
          },
        ],
      }),
    }}
  />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: headData.faq.map(item => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer
                }
              }))
            })
          }}
        />
      </Head>

      <div className="max-w-[1550px] mx-auto w-full">
        <HeaderMenu />
        <Banner
          title={cityData.title}
          description={cityData.description}
          addType={cityData.addType}
          location={cityData.location}
          callheading={cityData.callheading}
        />
        <section>
          <div className="h-auto  flex flex-col items-center justify-items-center lg:px-10">
            <div className="rounded-[10px] lg:rounded-[40px] py-[20px] sm:text-center lg:text-start flex flex-col lg:flex-row-reverse place-items-center mb-[30px] mt-[30px] bg-blue-50">
              <div className="w-full grid place-items-center lg:w-1/2">
                <Image
                  width={1000}
                  height={1000}
                  src={cityData.sectionData.imageSrc}
                  alt={cityData.sectionData.altText}
                  priority
                  className="w-full h-auto lg:w-[500px]  object-contain px-4"
                />
              </div>
              <div className="w-full flex lg:items-start items-center justify-center flex-col px-4 lg:w-1/2">
                <h3 className="font-bold capitalize text-[20px] md:text-[34px]  text-[#1B1C57] py-2">
                  {cityData.sectionData.title}
                </h3>
                {cityData.sectionData.description.map((para, index) => (
                  <p
                    key={index}
                    className="text-justify text-[14px] md:text-[17px] text-[#1B1C57] mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="h-auto px-[25px] lg:px-[50px] py-4">
          <div className="">
            <h2 className="font-bold capitalize text-[18px] md:text-[32px] py-2 text-[#1B1C57] mb-4 text-center">
              {cityData.storageData.title}
            </h2>
            <p className="mb-6 text-[14px] md:text-[17px] text-[#73788C]">
              {cityData.storageData.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-[50px] ">
            {cityData.storageData.services.map((service, index) => (
              <div key={index}>
                <h3 className="font-semibold mt-2 capitalize text-[16px] md:text-[24px] py-2 text-[#1B1C57] flex items-center">
                  <span className="text-[24px] lg:text-[44px] p-2 mr-2">
                    <Image src={service.icon} priority height={50} width={50} alt={`${service.title} Icon`} />
                  </span>
                  {service.title}
                </h3>
                <p className="text-justify text-[14px] md:text-[17px] text-[#73788C] leading-[174%]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>


        <div className="h-auto py-[25px] px-[25px] lg:px-[50px] bg-[#eef5f651]">
          <div className="">
            <h2 className="font-bold capitalize text-[18px] md:text-[32px] py-2 text-[#1B1C57] mb-4 text-center">
              {cityData.businessStorageData.title}
            </h2>
            <p className="mb-6 text-[14px] md:text-[17px] text-[#73788C]">
              {cityData.businessStorageData.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-[50px]  ">
            {cityData.businessStorageData.items.map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold mt-2 capitalize text-[16px] md:text-[24px] py-2 text-[#1B1C57] flex items-center">
                  <span className="text-[24px] lg:text-[44px] p-2 mr-2">
                    <Image src={item.icon} priority height={50} width={50} alt={item.title} />
                  </span>
                  {item.title}
                </h3>
                <p className="text-justify text-[14px] md:text-[17px] text-[#73788C] leading-[174%] ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:px-[50px] pt-4">
        <div className="flex flex-col md:flex-row justify-center gap-[25px] md:gap-[50px] items-center bg-[#F7F9FC] rounded p-4 ">
          <div className=""><h3 className="text-[#1B1C57] font-bold text-[14px] md:text-[18px] p-2  text-center">Call us now on</h3>
            <Link
              href="tel:+919009000798"
              className="font-bold text-white text-[14px] md:text-[18px] flex items-center justify-center gap-2 p-2 w-[300px] bg-blue-500 rounded"
            >
              <span><Image
                src={CallIconWhite}
                alt="icon"
                width={32}
                className="mr-3"
              /></span>
              9009000798
            </Link>

          </div>
          <div className=""><h3 className="text-[#1B1C57] font-bold text-[14px] md:text-[18px] p-2  text-center">Mail us now on</h3>
            <Link
              href="mailto:info@xtendedspace.com"
              className="font-bold text-white text-[14px] md:text-[18px] flex items-center justify-center gap-2 p-2 w-[300px] bg-lime-500 rounded"
            >
              <span><Image src={emailIcon} alt="icon" width={32} className="mr-3" /></span>
              info@xtendedspace.com
            </Link>

          </div>

        </div>
        </div>
        <h2 class="text-[18px] md:text-[32px]   my-6   font-bold text-[#1B1C57] capitalize text-center">Why Choose Us?</h2>
      <div className="lg:px-[50px]">
      <div className="bg-card dark:bg-card-foreground p-[25px] lg:p-[50px] rounded-lg bg-[#F7F9FC]">
          <div className="space-y-4">
            {cityData.serviceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-muted dark:bg-card p-2 lg:p-4 rounded-lg flex flex-col lg:flex-row items-center lg:items-start lg:gap-4"
              >
                <Image
                  src={feature.icon}
                  priority
                  height={50}
                  width={50}
                  alt={feature.title}
                />
                <div className="lg:flex flex-col items-start text-center lg:text-start ht1">
                  <h3 className="font-semibold capitalize text-[16px] md:text-[24px] text-[#1B1C57] py-2">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] md:text-[17px] text-[#73788C]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <Vedio videoData={cityData.videoData} />
        {/* <Contact /> */}
        <SimpleSlider testimonials={cityData.testimonials} />
        <Faqs FAQData={cityData.FAQData} />
        <div className="bg-[#F7F9FC] py-2">
          <Myform />
        </div>
        {/* <section className="grid place-items-center my-12 hidden">
          <div className="flex flex-col lg:items-start justify-center flex-wrap w-[90%] ">
            <h2 className="text-[#1B1C57] text-[18px] md:text-[32px] font-bold mb-4">
              House shifting services near you
            </h2>
          </div>

          {cityData.sections.map((section, index) => (
            <div key={index} className="flex flex-col items-start justify-center flex-wrap w-[90%] mt-6">
              <h3 className="text-[#1B1C57] text-[16px] md:text-[20px] font-bold mb-3">
                {section.title}
              </h3>
              <ul className="mb-4 flex gap-4 flex-wrap text-[#1B1C57] text-[14px] md:text-[18px]">
                {section.locations.map((location, idx) => (
                  <li
                    key={idx}
                    className="mr-2 list-none relative before:content-['•'] before:text-blue-500 before:absolute before:-left-5"
                  >
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section> */}
        <div className="">
  <Searchlocation cities={cities} cityPath={city}/>
</div>
        <Footer />
      </div>
    </>
  );
};

// Helper function to capitalize the first letter
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default CityPage;
