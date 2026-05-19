import Link from "next/link";
import { useState } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Arrow from "../../../public/images/home/Arrow Down.webp";

import SimpleSlider4 from "@/sharedComponent/slider6";
import WhatSetsUsApart from "../../../public/images/list-storage/C.png";
import Head from "next/head";
import Breadcrumbs from "../profile/Breadcrumb";
import Testimonial from "@/sharedComponent/Testimonial";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import { faqData } from "@/data/faqs";
export default function Home() {
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <Head>
       <title>List Your Space for Rent - Xtended Space</title>
        <meta
          name="description"
          content="List your unused indoor space on Xtended Space and start earning passive income today. Secure, easy, and hassle-free process!"
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="List your space, Rent unused space, Passive income from property, Rent storage space, Earn money with empty space, Host storage space, Space rental platform, Property listing for rent, Secure space rental, Verified rental space listings"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/list-storage"
        />
        <meta property="og:title" content="Rent Out Your Empty Space Today" />
        <meta
          property="og:description"
          content="Turn your vacant space into a goldmine. List on Xtended Space and connect with renters for extra income. Simple steps to get started!"
        />
        <meta
          property="og:image"
          content="/images/storagelisting/list-storage-xs.avif"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Turn Unused Space into Income - Xtended Space"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/list-storage"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Host with Xtended Space - Start Earning"
        />
        <meta
          name="twitter:description"
          content="Maximize your empty space's potential. List it on Xtended Space for free and start earning passive income now!"
        />
        <meta
          name="twitter:image"
          content="/images/storagelisting/list-storage-xs.avif"
        />
        <meta
          name="twitter:image:alt"
          content="Earn Passive Income with Xtended Space"
        />
      </Head>

      <HeaderMenu />
      {/* <section class="flat-title ">
                <div class="flat-titlec3">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="title-inner style">
                                <div class="title-group fs-14"><a class="home fw-6" href="index.html">Home</a>

                                    <a class="home fw-6" href="#">List Storage</a>

                                    <span>List Storage Form</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
      <section>
        
        <div className="liststoragebanner">
        <div className="md:block absolute top-2 left-14 hidden ">
        <div className="flex text-white">
          <a
            href="/"
            className="font-medium leading-8 text-[#fff] text-sm"
          >
            Home
          </a>

          <Breadcrumbs packer={true}/>
        </div>
      </div>
          <div className="lstext h-[auto] md:w-[60vw]">
            {" "}
            {/* Use className instead of class */}
            <h1 className="text-[24px] md:text-[48px] font-bold">
              List Your Property And Earn Passive Income
            </h1>
            {/* <a href="#" className="ls-btn">Explore near you</a>  */}
            <Link
              href="list-storage/storage-form"
              className="is-btn text-[16px] md:text-[19px] font-semibold "
            >
              List Your Space
            </Link>
          </div>
        </div>
      </section>

      <section id="liststorage1" class="liststorage pt-3 mx-auto">
        <div class="liststorage-img">
          {/* <!-- <div class="colordiv"></div> --> */}
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/A.webp"
            alt="banner"
            width={500}
            height={500}
          />
        </div>

        <div class="liststorage-text md:pr-2">
          <h2 className="">
            Become a Host at <span className="text-blue-500">Xtended</span>{" "}
            <span className="text-[#8DC63F]">Space</span>
          </h2>
          <p>
            Did you know that your unused space can be goldmine for passive
            income ? That’s right! All it takes is a reliable vacant space
            marketplace that values every inch, no matter the size.{" "}
          </p>
          {/* <Link
            href="list-storage/storage-form"
            class=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded transition duration-300 ease-in-out hidden md:inline-block"
          >
            List Your space
          </Link> */}
        </div>
      </section>
      <section id="liststorage" class="liststorage">
        <div class="liststorage-text">
          <h2>Where are we serving right now? </h2>
          <p>
            Xtended Space P2P services are available in different states like
            Delhi, Haryana, Uttar Pradesh, Uttarakhand, Punjab, Maharashtra,
            Gujarat, Karnataka, and Rajasthan. Easily list your vacant space and
            connect you with renters to generate extra income.{" "}
          </p>
        </div>
        <div class="liststorage-img">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Warehouse+Service+Reach+Across+Delhi+NCR.webp"
            alt="liststorage"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section id="liststorage2" class="liststorage">
        <div id="lsimage" class="liststorage-img">
          {/* <!-- <div class="colordiv"></div> --> */}
          <Image src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/What+sets+us+apart.webp" width={500} height={500} className="" priority />

          {/* <img className=" h-[250px]" src="/images/list-storage/What sets us apart.png" alt=""/> */}
        </div>

        <div class="liststorage-text">
          <h2>What sets us apart?</h2>
          <p>
            We guarantee the best value for your space, if you’re ready to
            maximize the potential of your empty space.
          </p>
          <div className="flex flex-col md:flex-row">
          <Image
        src={Arrow}
        className=""
        priority/> 
        <Link
              href="#spec"
              class="inline-block text-[14px] md:text-[20px] font-semibold  text-blue-400 py-2 px-2 rounded transition duration-300 ease-in-out"
            >
              {" "}
              keep scrolling down!
            </Link>
          </div>
        </div>
      </section>
      <section
        id="spec"
        className="spec w-[auto] h-[auto] p-[10px] md:p-[100px] bg[]"
      >
        <div className="flex w-full md:w-[60vw] p-[10px] h-[150px] justify-start items-center">
          <Image
            className="w-[80px] mr-4"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/locked1.svg"
            alt="locked"
            width={80}
            height={80}
          />
          <h3 className="text-[18px] md:text-[40px] font-medium text-[#1b1c57]">
            Space must be Indoor & Lockable for better safety
          </h3>
        </div>
        <div className="flex w-auto md:w-[85vw] p-[10px] h-[150px] mr justify-end items-center">
          <Image
            className="w-[80px] mr-4"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/gallery1.svg"
            alt="gallery"
            width={80}
            height={80}
          />
          <h3 className="text-[18px] md:text-[40px] font-medium text-[#1b1c57] ">
            Share images of Indoor & Lockable
          </h3>
        </div>
      </section>
      <section className="w-[auto] h-[auto]  md:mt-0   md:p-[50px] lg:px-[100px] bg-blue-50 pb-[20px]">
        <div className=" ">
          {" "}
          <div className="ht1">
            <h2 className="text-2xl p-3 md:text-5xl  md:w-[60%] md:mb-5 text-left text-[#1B1C57]  font-[600]">
              How to list your space on{" "}
              <span className="text-blue-500">Xtended</span>{" "}
              <span className="text-[#8DC63F]">Space</span>
            </h2>
          </div>
          <div class="flex flex-wrap gap-[10px] md:gap-[50px] justify-between h-[auto] m-[auto]   max-w-[90vw]   md:border-black rounded-3xl">
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3  ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57]">
                1. Log in / Create account
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                {" "}
                Log in to fill in details
              </p>
            </div>
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3 ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] ">
                2. Identity Proof
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                You’ll need to Provide your identity proof
              </p>
            </div>
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3 ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] ">
                3. Images / Videos
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                Share images/video of your empty property
              </p>
            </div>
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3  ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                4. Verifying your details
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                Then your details will be shared with our team
              </p>
            </div>
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3  ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                5. Approved
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                After review it’ll be submitted automatically
              </p>
            </div>
            <div class="max-h-[250px] shadow-2xl border  rounded-2xl bg-white w-[100%] md:w-[45%] p-3  ">
              <h2 class="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                6. List your space
              </h2>

              <p className="text-gray-700 text-[14px] md:text-[20px]">
                Your space will have access to be on our website.
              </p>
            </div>
          </div>
          {/* <div className="text-center mt-[50px]">
            {" "}
            <Link
              href="list-storage/storage-form"
              class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-10 rounded transition duration-300 ease-in-out"
            >
              List Your space
            </Link>
          </div> */}
        </div>
      </section>
      <div className="Blogs mb-4">
        <div className="self-center my-[50px] text-[18px] md:text-[32px] font-semibold text-[#1B1C57] text-center p-[2px] capitalize  max:max-w-full">
        List Your Property and Earn Passive income
        </div>
        {/* <SimpleSlider4 /> */}
        <Testimonial name={"list-storage"}/>
      </div>
     
       <Faqs FAQData={faqData?.ListYourSpace} />


      <Footer />
    </div>
  );
}
