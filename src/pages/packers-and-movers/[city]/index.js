// /pages/packers-and-movers/[city].js

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import SimpleSlider from "@/sharedComponent/landingcomponent/simple_slider";
import Vedio from "@/sharedComponent/landingcomponent/video";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import Contact from "@/components/multicities/contact";
import User from "@/components/multicities/User";
import Banner from "@/components/multicities/Banner";
import citiesData from "@/components/citiesData";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
// import emailIcon from "../../../public/images/assets-multiple-cities/emailIcon.svg";
// import CallIconWhite from "../../../public/images/assets-multiple-cities/callIconWhite.svg";
// import Myform from "../../../util/contactform";
import Myform from '@/util/contactform';

const Searchlocation = dynamic(() => import("../../searchlocation"));

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

  const [filterData, setFilterData] = useState([]);
  const { headData } = cityData;
  const cities = Object.values(citiesData);
  

  // useEffect(() => {
  //   if(cities?.length>0){
  //     if (city) {
  //       setFilterData(cities?.filter((subcity) => subcity?.parentId === city));
  //     } else {
  //       setFilterData(cities) 
  //     }
  //   }
  // }, [city]);

  useEffect(() => {
    if (cities?.length > 0) {
      if (city) {
        const currentCityData = citiesData[city.toLowerCase()];
  
        // Filter cities that are either subcities of the current city or have no parent
        const filteredCities = cities.filter((subcity) => 
          subcity?.parentId === city || subcity?.parentId === ""
        );
  
        // If there are no filtered cities, include the current city itself
        if (filteredCities.length === 0 && currentCityData) {
          filteredCities.push(currentCityData);
        }
  
        setFilterData(filteredCities);
      } else {
        setFilterData(cities);
      }
    }
  }, [city]);


  return (
    <>
      <Head>
  <link
    rel="shortcut icon"
    href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
    type="image/x-icon"
  />
  <title>{headData.title}</title>
  <meta name="description" content={headData.description} />
  <meta name="author" content="Xtended Space" />
  <meta name="keywords" content={headData.keywords} />
  <link rel="canonical" href={headData.canonical} />
  <link rel="alternate" href={headData.canonical} hreflang="en-in" />
  <meta property="og:title" content={headData.title} />
  <meta property="og:description" content={headData.description} />
  <meta property="og:image" content={headData.og.image} />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="300" />
  <meta property="og:image:alt" content={headData.title} />
  <meta property="og:url" content={headData.canonical} />
  <meta property="og:type" content="website" />
  <meta name="twitter:title" content={headData.title} />
  <meta name="twitter:description" content={headData.description} />
  <meta name="twitter:image" content={headData.og.image} />
  <meta name="twitter:image:alt" content={headData.title} />

  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "Product",
      name: "Packers and Movers",
      image: "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
      description:
        "Xtended Space takes the hassle out of moving! As expert packers and movers, we ensure a seamless relocation experience with care and efficiency. From packing to delivery, we handle your belongings like our own. Choose Xtended Space for stress-free moves that prioritize your peace of mind every step of the way!",
      brand: {
        "@type": "Brand",
        name: "Xtended Space",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "1000",
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
          name: "Packers and Movers",
          author: {
            "@type": "Person",
            name: "Gautam Kumar",
          },
          datePublished: "2024-08-23",
          reviewBody:
            "Very Nice Experience, I relocate my household from Dwarka to Patna. Packing and their staff are very supportive. Thank you Xtended Space.",
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
            name: "Pawan Vijay",
          },
          datePublished: "2025-01-09",
          reviewBody:
            "Packers and Movers services of Xtended Space is really very good. I took the services for asset movement of office premises. Their staff was very good and supportive. They were very well trained and handled everything smoothly. I didn't face any challenge. Highly recommend this service provider.",
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

</Head>

      
      <meta property="og:site_name" content="Xtended Space" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
       

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
          <div className="h-auto flex flex-col items-center justify-items-center lg:px-10 py-2">
            <div className="rounded-[10px] lg:rounded-[40px] py-[20px]  sm:text-center lg:text-start flex flex-col lg:flex-row-reverse place-items-center  bg-[#F7F9FC]">
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
                <h3 className="font-bold capitalize text-[20px] md:text-[34px] py-4 text-[#1B1C57]">
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
        <div className="h-auto py-[25px] px-[25px] lg:px-[50px]">
          <div className="">
            <h2 className="font-bold capitalize text-[18px] md:text-[32px] py-2 text-[#1B1C57]  text-center">
              {cityData.storageData.title}
            </h2>
            {/* <p className="mb-6 text-justify text-[14px] md:text-[17px] text-[#73788C]">
              {cityData.storageData.description}
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-[50px] ">
            {cityData.storageData.services.map((service, index) => (
              <div key={index}>
                <h3 className="font-semibold mt-2 capitalize text-[16px] md:text-[24px] py-2 text-[#1B1C57] flex items-center">
                  <span className="text-[24px] lg:text-[44px] p-2 mr-2">
                    <Image
                      src={service.icon}
                      priority
                      height={50}
                      width={50}
                      alt={`${service.title} Icon`}
                    />
                  </span>
                  {service.title}
                </h3>
                <p className="text-justify text-[14px] md:text-[17px] text-[#73788C] leading-[174%] ">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:px-[50px]">
          <div className="flex flex-col md:flex-row justify-center gap-[25px] md:gap-[50px] items-center bg-[#F7F9FC] p-4 my-4 rounded">
            <div className="">
              <h3 className="text-[#1B1C57] font-bold  text-[14px] md:text-[18px] p-2  text-center">
                Call us now on
              </h3>
              <Link
                href="tel:+919009000798"
                className="font-bold text-white text-justify text-[14px] md:text-[18px] flex items-center justify-center gap-2 p-2 w-[300px] bg-blue-500 rounded"
              >
                <span>
                  <Image
                    src='https://xtendedspace.s3.ap-south-1.amazonaws.com/packers-and-movers/callIconWhite.svg'
                    alt="icon"
                    width={32}
                    height={20}
                    className="mr-3"
                  />
                </span>
                9009000798
              </Link>
            </div>
            <div className="">
              <h3 className="text-[#1B1C57] font-bold  text-[14px] md:text-[18px] p-2  text-center">
                Mail us now on
              </h3>
              <Link
                href="mailto:info@xtendedspace.com"
                className="font-bold text-white text-justify text-[14px] md:text-[18px] flex items-center justify-center gap-2 p-2 w-[300px] bg-lime-500 rounded"
              >
                <span>
                  <Image
                    src='/images/assets-multiple-cities/emailIcon.svg'
                    alt="icon"
                    width={32}
                    height={40}
                    className="mr-3"
                  />
                </span>
                info@xtendedspace.com
              </Link>
            </div>
          </div>
        </div>
        <section className="text-white bg-[#338CFF] text-center lg:h-[300px] p-[25px] lg:px-[50px] ">
          <h2 className="text-[18px] md:text-[32px] font-bold mb-4">
            How it Works?
          </h2>
          <div className="flex flex-col lg:flex-row justify-evenly items-center px-[100px] lg:h-[220px]">
            {cityData.stepsData.map((step) => (
              <div
                key={step.id}
                className="lg:w-[200px] flex items-center flex-col py-4"
              >
                <Image
                  className={
                    step.rotate
                      ? " rotate-90 lg:rotate-0 w-[80px] lg:w-[100px] lg:mb-[50px] "
                      : ""
                  }
                  src={step.imgSrc}
                  alt={step.label || `Step ${step.id}`}
                  height={100}
                  width={100}
                  priority
                />
                {step.label && (
                  <p className=" text-[16px] lg:text-[22px] font-semibold lg:h-[100px] lg:w-[180px] py-2">
                    {step.label}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* <h2 class="text-[18px] md:text-[32px]   my-6   font-semibold text-[#1B1C57] capitalize text-center">Why Choose Us?</h2>
<div className="bg-card dark:bg-card-foreground p-[25px] lg:p-[50px] rounded-lg bg-gray-50">
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
          <h3 className="font-semibold capitalize text-[16px] md:text-[24px] text-[#1B1C57]">
            {feature.title}
          </h3>
          <p className="text-[14px] md:text-[17px] text-[#73788C]">
            {feature.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div> */}
        <section>
          <h2 class="text-[18px] md:text-[32px]   my-6   font-semibold text-[#1B1C57] capitalize text-center">
            Why Choose Us?
          </h2>
          <div className="lg:px-[50px]">
            <div className="bg-card dark:bg-card-foreground px-[25px] lg:px-[50px] rounded-lg bg-[#F7F9FC]">
              <div className="space-y-4 lg:flex flex-wrap items-center">
                {cityData.serviceFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-muted dark:bg-card p-2 lg:p-4 rounded-lg flex flex-col  items-center lg:items-start lg:gap-4 lg:w-1/2"
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
                      <p className="text-justify text-[14px] md:text-[17px] text-[#73788C] ">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Vedio videoData={cityData.videoData} />

        {/* <Contact /> */}
        <SimpleSlider testimonials={cityData.testimonials} />
        <Faqs FAQData={cityData.FAQData} />
        <div className="bg-gray-50 py-2">
          <Myform />
        </div>
          {/* <section className="grid place-items-center my-12 ">
          <div className="flex flex-col lg:items-start justify-center flex-wrap w-[90%] ">
            <h2 className="text-[#1B1C57] text-[18px] md:text-[32px] font-bold mb-4">
              House shifting services near you
            </h2>
          </div>

          {cityData?.sections?.map((section, index) => (
            <div key={index} className="flex flex-col items-start justify-center flex-wrap w-[90%] mt-6">
              <h3 className="text-[#1B1C57] text-[16px] md:text-[20px] font-bold mb-3">
                {section?.title}
              </h3>
              <ul className="mb-4 flex gap-4 flex-wrap text-[#1B1C57] text-justify text-[14px] md:text-[18px]">
                {section?.locations?.map((location, idx) => (
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
        </section>  */}

        
        <div className="">
          <Searchlocation cities={filterData} cityPath={city}/>
        </div>
        <Footer />
      </div>
    </>
  );
};

// Helper function to capitalize the first letter
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default CityPage;
