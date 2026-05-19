import Link from "next/link";
import {useEffect, useState } from "react";
import { localStorageManager } from "@/util/common";
import SimpleSlider4 from "@/sharedComponent/slider6";
import { SaveB2BStorageTypeData } from "@/service/storageService";
import FormModal from "@/sharedComponent/modal/formModal";
import Hubspotb2b from "@/pages/hubspotb2b";
import { DecryptUserId } from "@/service/storageService"
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Head from "next/head";
import Myform from "../../../util/contactform";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoCall } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import citiesData from '@/components/storagespaceData';
import dynamic from "next/dynamic";
import Testimonial from "@/sharedComponent/Testimonial";
import { sendDataToAPI } from "@/service/leads";
const Searchlocation = dynamic(() => import("../../searchlocation"));

const ModalBody = ({ setModalShow }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/offerlanding/tickmark.png"
          alt="Tick Mark"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-center mb-2">
          We will connect with you soon.
        </p>
        <p>Contact us at: </p>
    <div className="flex flex-col lg:flex-row items-center mb-6">
    <a className="flex items-center gap-1 font-bold p-2" href="tel:+919009000798"><span className="bg-lime-500 p-2 rounded text-white"><IoCall /></span> +(91) 900 900 0798</a>
    <a className="flex items-center gap-1 font-bold p-2" href="mailto:info@xtendedspace.com"><span className="bg-blue-500 p-2 rounded text-white"><IoMdMailUnread /></span> info@xtendedspace.com</a>
    </div>
        <div
          onClick={() => {
            window.location.reload();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Back
        </div>
      </div>
    </>
  );
};
export default function Home() {
  const [data, setData] = useState({
    Message: "n/a",
    ServiceType: "B2B storage",
    source: "B2B storage",

  });
  const cities = Object.values(citiesData); 
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [multipleError, setMultipleError] = useState();
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [refreshHeader, setRefreshHeader] = useState(false);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {setErrors((prevErrors) => ({...prevErrors,checkError: "",}));}};
    
  
  // function capitalizeFirstChar(str) {
  //   if (!str) return str;
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // }
  const [userId, setUserId] = useState("")

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMultipleError("");
  };

  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");
  useEffect(() => {
    const fetchUserData = async () => {
        if (typeof window !== "undefined") {
            const queryUserId = new URLSearchParams(window.location.search).get("userId");

            if (queryUserId) {
                setUserId(queryUserId);
                try {
                    const response = await DecryptUserId(`?userId=${queryUserId}`);
                    if (response?.success) {
                        localStorageManager?.setValue("userDetails", JSON.stringify(response.success.data));
                        const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                        setUserId(userData?.userId);
                        setRefreshHeader(true);
                    } else {
                        console.error("Error decrypting User ID:", response?.error);
                    }
                } catch (error) {
                    console.error("Error in DecryptUser Id API call:", error);
                }
            } else {
                const userData = JSON.parse(localStorageManager?.getValue("userDetails") || "{}");
                setUserId(userData?.userId);
            }
        }
    };

    fetchUserData();
}, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) {setErrors((prevErrors) => ({...prevErrors, checkError: "Please agree to the terms and conditions before submitting.",})); return;}
  
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
     
    });
    if (utm_source) {
      formData.append("UTM_Source", utm_source);
      formData.append("UTM_Medium", utm_medium);
      formData.append("UTM_Campaign", utm_campaign);
      formData.append("UTM_Content", utm_content);
      formData.append("UTM_Term", utm_term);
      formData.append("Gclid", gclid);
      formData.append("Referrer", referrer);
    }
    // try {
    const response = await SaveB2BStorageTypeData(formData);
    if (response.success) {
      await sendDataToAPI(data); 
      setHubspotFormSubmit(true);
      setModalShow(true);

      // setData({ Message: "n/a", ServiceType: "B2B storage" });
      // setHubspotFormSubmit(true);
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response.error?.errors);
      }
      setError(response?.error?.text || "");
    }
    // }
    // catch (error) {
    //   console.error("Error!", error.message);
    //   setError("An unexpected error occurred.");
    // }
  };
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <Hubspotb2b
        portalId="45810273"
        formId="000c53c0-945e-416e-aec8-f2ea448eec06"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
      />
      <Head>
        <title>Business Storage Solutions - Secure and Spacious</title>
        <meta
          name="description"
          content="Need storage space for your business? Our large, secure storage units are perfect for all commercial needs. Contact us today and our team will assist you."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="storage unit facilities, warehouse storage space for rent, big storage units, self storage business, self storage for business, storage facility business, self storage unit business, large storage units, large storage space, large storage facilities, large self storage units, big self storage units, commercial storage units, commercial storage space, storage unit commercial, commercial storage facilities, business storage unit, commercial storage space for rent, business storage units near me, large commercial storage units, business storage for rent, business storage space for rent, large storage units near me, large storage units for rent"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/services/business-storage/"
        />
        <meta
          property="og:title"
          content="Secure Business Storage - Large Units Available"
        />
        <meta
          property="og:description"
          content="Find the perfect storage solution for your business. Our large, secure units are available for rent. Submit your contact details and our team will connect with you."
        />
        <meta
          property="og:image"
          content="/images/offerlanding/b2b-storage/business-storage.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="secure b2b storage units" />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/services/business-storage/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Commercial Storage Space for Businesses"
        />
        <meta
          name="twitter:description"
          content="Looking for commercial storage space? Our facilities offer large, secure units for rent. Fill out our contact form and our team will get in touch."
        />
        <meta
          name="twitter:image"
          content="/images/offerlanding/b2b-storage/business-storage.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Commercial Storage Space for Businesses"
        />
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
                    "I recently had the pleasure of using Xtended Space's logistics and storage facility, and I couldn’t be more satisfied with the service. The entire process was seamless from start to finish. The staff were professional, friendly, and always ready to assist with any inquiries or concerns. The facility itself is modern, secure, and well-organized, ensuring that all items are stored safely and efficiently. The level of transparency and communication maintained by xtended Space is commendable, making it easy to track and manage stored goods. I highly recommend xtended Space to anyone in need of reliable logistics and storage solutions. Thank you for exceeding my expectations",
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

      <HeaderMenu refresh={refreshHeader}/>
      <div
        className="min-h-screen wbanner md:h-[auto]  p-4 md:p-4  flex flex-col justify-center items-center rounded-lg bg-cover bg-right-bottom "
        style={{
          backgroundImage:
            "url(/images/offerlanding/b2b-storage/HeroBanner.jpg)",
        }}
      >
        <div class="flex flex-col md:flex-row items-start justify-evenly  md:p-4 w-full ">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="  text-black font-extrabold  mb-4 text-[24px] md:text-[48px]">
              {" "}
              B2B Storage
            </h1>
            <p class="text-black font-bold text-[17px] md:text-[18px]  mb-6 md:py-4">
            A storage platform for your manufactured items, office assets, and raw materials to make your life stress-free.
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <img
                  src="/images/offerlanding/b2b-storage/secure storage 6.png"
                  alt=""
                  class="mr-2"
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Secure storage solutions</span>{" "}
                  Get smooth storage solutions in your city
                </span>
              </li>
              <li class="flex items-start">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/full+safety+7.webp"
                  alt="fullsafety"
                  class="mr-2"
                  width={20}
                  height={20}
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Full safety and security</span>{" "}
                  for your valuable goods.
                </span>
              </li>
              <li class="flex items-start">
                <img
                  src="/images/offerlanding/b2b-storage/Storage options 8.png"
                  alt=""
                  class="mr-2"
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Flexible storage options</span> to
                  meet your business requirements.
                </span>
              </li>
              <li class="flex items-start">
                <img
                  src="/images/offerlanding/b2b-storage/trusted by 9.png"
                  alt=""
                  class="mr-2"
                />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">
                    Trusted by leading companies
                  </span>{" "}
                  for our robust storage infrastructure.
                </span>
              </li>
            </ul>
          </div>
          <div class="md:w-1/3 bg-white  p-6 rounded-lg shadow-lg ">
            <h2 class="text-xl font-bold text-zinc-900  mb-4 text-center">
              {" "}
              Enquire now
            </h2>
            {/* <p class="text-black  mb-4">Get Video Lectures, QBank & Mock Tests for Free</p> */}
            {/* <Myform /> */}
            <form className="space-y-4" id="myform" onSubmit={handleSubmit}>
              <input
                type="text"
                name="Name"
                placeholder="Your Name*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your first name"
                onChange={onChange}
              />
              {multipleError && multipleError.Name && (
                <p className="text-sm text-red-500">{multipleError.Name[0]}</p>
              )}

              <input
                type="email"
                name="Email"
                placeholder="Your email address*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your email address"
                onChange={onChange}
              />
              {multipleError && multipleError.Email && (
                <p className="text-base text-red-500">
                  {multipleError.Email[0]}
                </p>
              )}
              <input
                type="text"
                name="Phone"
                placeholder="Your contact no*"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                aria-label="Your contact number"
                maxLength={10}
                onChange={onChange}
              />
              {multipleError && multipleError.Phone && (
                <p className="text-sm text-red-500">{multipleError.Phone[0]}</p>
              )}
              <textarea
                placeholder="Message"
                id="message"
                rows="1"
                name="Message"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                onChange={onChange}
              ></textarea>
              {multipleError && multipleError.Message && (
                <p className="text-base text-red-500">
                  {multipleError.Message[0]}
                </p>
              )}
                                      <div className="form-checkbox py-2">
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
      className="form-checkbox-input"
    />
     <div className="">
   <p className="text-[12px] text-[#374151]">
                              By continuing, you agree to our
                              <a href="/terms-and-conditions" target="_blank">
                                <span className="text-blue-500 underline ml-1 mr-1">
                                  Terms & Conditions
                                </span>
                              </a> 
                              and 
                              <a href="/privacy-policy" target="_blank">
                                <span className="text-blue-500 underline ml-1">
                                   Privacy Policy
                                </span>
                              </a>
                            </p>
   </div>
  </div>
<span className="error text-[12px] mb-2 text-red-500">{errors.checkError}</span>

</div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <section id="third6" class="third6 my-4">
        <div class="ht1 w-full md:w-1/2 gap-2">
          <h2 className="my-2 text-[22px] md:text-[34px]  font-bold text-[#1B1C57]">
            Your Storage Problem Solver
          </h2>

          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Your ultimate solution for B2B warehouse storage requirements
          </p>
          <ul class="list-disc pl-5 flex-wrap flex justify-between  md:flex-col">
            <li className="w-[40%] md:w-full py-1 md:py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
              Storage Consultation
            </li>
            <li className="w-[40%] md:w-full py-1 md:py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
              Warehouse Fulfillment
            </li>
            <li className="w-[40%] md:w-full py-1 md:py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
              Cost Effective
            </li>
            <li className="w-[40%] md:w-full py-1 md:py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
              Time-Savvy
            </li>
            <li className="w-[40%] md:w-full py-1 md:py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Agile and Adaptable 
            </li>
          </ul>
          <div></div>
        </div>
        <div class="third6-img">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Your+Storage+Problem+Solver.webp"
            alt="b2bwarehouse"
            className="w-[90%] m-[auto]"
            width={600}
            height={600}
          />
        </div>
      </section>
      <section class="course bg-blue-50 ">
        <div class="course1 w-full lg:px-[10%]">
          <h2 className="text-[18px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
          Our Storage Services for Different Industries Heading
          </h2>
          <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
          We pack your selected belongings, load them and store them safely in our advanced warehouse. Our B2B services store your manufactured items, office assets and raw materials.
          </p>
        </div>
        <div class="crow md:mt-[150px]">
          <div class="course-col shadow pb-4 px-6">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Construction+Equipment+Storage.webp"
              alt="construction"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Construction Equipment
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Concrete mixers, Iron roads, cement stacks & bricks are safely in
              our warehouse.
            </p>
          </div>
          <div class="course-col shadow pb-4 px-6 md:mt-[-50px]">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Office+and+Manufactured+Furniture.webp"
              alt="office"
              width={150}
              height={150}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              office Furniture Storage
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Storing your office furniture saves you money and provides you
              convenience.
            </p>
          </div>

          <div class="course-col shadow pb-4 px-6">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/House+Inventory+Storage.webp"
              alt="houseinventory"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Horeca Inventory
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Whether you are a hotelier or small cafe owner, our storage
              service is available.
            </p>
          </div>
        </div>
      </section>

      <div class="w-full lg:px-[10%] pt-6">
        <h2 className="capitalize text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
          Types of Business Storage
        </h2>
        <p className="font-inter px-2  text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto] text-center">
          We assure you of smooth storage in our warehouse. Our committed team
          makes your business storage journey hassle-free.
        </p>
      </div>
      {/* </section> */}
      <section id="easystorage w-[100vw]" class="easystorage  py-2">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
          Furniture Storage
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
          Your heavy almirahs, dining tables, and television racks are safe in our warehouse. Our secure services support you from packing to storing in the warehouse.   

            <br />
            Store your delicate and expensive electronic appliances (air conditioners, refigerators, televisions, and other essentials).    
          </p>
        </div>
        <div id="dncr" class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Furniture+Storage.webp"
            alt="small"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section id="easystorage2" className="easystorage  py-2 ">
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          {/* <!-- <div class="colordiv"></div> --> */}
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Material+Storage.webp"
            alt="medium"
            width={500}
            height={500}
          />
        </div>

        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57] ">
          Material Storage 
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
          Whether you put seasonal material or declutter your workspace for some room, our small commercial storage units are great for storing boxes and small-size furniture items. 
          </p>

          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
          Our operational team quickly stores your material (stationery, paper glasses, soap). Experience the difference by getting your material packed with Xtended Space.   

          </p>
        </div>
      </section>
      <section id="easystorage" class="easystorage  py-2 mb-4">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
          Documentation Storage 
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
          Xtended Space safeguards your official documents, folders and files in our spacious warehouse. The camera surveillance and fire alarm 24/7 monitors your belongings and helps in keeping them damage free
          </p>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
          Our convenient storage solutions ensure the safety of your business essentials. So, safely secure your goods at Xtended Space.   
          </p>
        </div>
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <img
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Documentation+Storage.webp"
            alt="largesizebusiness"
            width={400}
            height={400}
          />
        </div>
      </section>
      <section class="process bg-blue-50 py-4">
        <div class="process-info w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            How Does it Works?
          </h2>
          <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
            Xtended Space makes your B2B storage journey simple.
          </p>
        </div>
        <div class="row w-[100%] p-[5%] flex justify-between flex-wrap gap-5px">
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Rapid+Booking.webp"
              alt="easy booking"
              width={300}
              height={300}
            />
            <h2>01</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Rapid Booking
            </h3>
            {/* <p class="html_article">Seamlessly book your move with our user-friendly process.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Doorstep+Pickup+Service.webp"
              alt="doorstep pickup"
              width={300}
              height={300}
            />
            <h2>02</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Doorstep Pickup Service
            </h3>
            {/* <p class="html_article">We pick up your belongings right from your doorstep for maximum convenience.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Secure+Packing+and+Transportation.webp"
              alt="Secure Packing and Moving"
              width={300}
              height={300}
            />
            <h2>03</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Secure Packing and Transportation
            </h3>
            {/* <p class="html_article">Our professional team ensures your items are packed securely and moved safely.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Flexible+Delivery.webp"
              alt="on time shifting"
              width={300}
              height={300}
            />
            <h2>04</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Flexible Delivery
            </h3>
            {/* <p class="html_article">We guarantee timely delivery of your belongings to your new location.</p> */}
          </div>
        </div>
        <div class="con2">
          {/* <img src="./images/1.png" alt="" /> */}
          <video
            width="320"
            height="240"
            poster="/images/vedio/fallback.jpg"
            controls
          >
            <source
              src="/images/vedio/29 MAY 2024 XTENDED SPACE WEBSITE LOW RES_1.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <div className="Blogs">
        <div className="self-center my-[50px] text-3xl font-semibold text-center capitalize text-blue-950 max:max-w-full">
          <h2 className=" text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
            Our Customers' Reviews
          </h2>
        </div>
        {/* <SimpleSlider4 /> */}
        <Testimonial name={"business-storage"}/>
      </div>
      <Myform />
      <div className="">
  <Searchlocation cities={cities}/>
</div>
      <Footer />
      <FormModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"mm"}
        title=""
      />
    </div>
  );
}
