import Link from "next/link";
import {useEffect, useState } from "react";
// import SimpleSlider4 from "@/sharedComponent/slider6";
import Testimonial from "@/sharedComponent/Testimonial";
import FormModal from "@/sharedComponent/modal/formModal";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import { SaveB2BStorageTypeData } from "@/service/storageService";
import Head from "next/head";
import Image from "next/image";
import tickmark from "../../../../public/images/offerlanding/tickmark.png";
import reliable from "../../../../public/images/offerlanding/b2b-logistic/reliable .png";
import safe_and_secure from "../../../../public/images/offerlanding/b2b-logistic/safe and secure .png";
import customize from "../../../../public/images/offerlanding/b2b-logistic/customize .png";
import proven_track from "../../../../public/images/offerlanding/b2b-logistic/proven track .png";
import GPS_Accessed_Carrier from "../../../../public/images/offerlanding/b2b-logistic/GPS Accessed Carrier-.png";
import Cost_Effective_Rates from "../../../../public/images/offerlanding/b2b-logistic/Cost-Effective Rates.png";
import Nationwide_Reach from "../../../../public/images/offerlanding/b2b-logistic/Nationwide Reach.png";
import _3pls_b from "../../../../public/images/offerlanding/b2b-logistic/3pls b.webp";
import Instant_Booking from "../../../../public/images/offerlanding/b2b-logistic/Instant Booking.png";
import Door_To_Door_Logistics from "../../../../public/images/offerlanding/b2b-logistic/Door To Door Logistics (1).png";
import Safe_Packing_and_Moving from "../../../../public/images/offerlanding/b2b-logistic/Safe Packing and Moving.png";
import Time_bound_delivery from "../../../../public/images/offerlanding/b2b-logistic/Time bound delivery.png";
import Myform from "../../../util/contactform";
import { useSearchParams } from "next/navigation";
import Hubspotb2b from "@/pages/hubspotb2b";
import { IoCall } from "react-icons/io5";
import { IoMdMailUnread } from "react-icons/io";
import { DecryptUserId } from "@/service/storageService"
import { localStorageManager } from "@/util/common";
import { sendDataToAPI } from "@/service/leads";
const ModalBody = ({ setModalShow }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={tickmark}
          alt="Tick Mark"
          priority
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-center mb-2">
          We will connect with you soon.
        </p>
        <p>Contact us at: </p>
        <div className="flex flex-col lg:flex-row items-center mb-6">
          <a
            className="flex items-center gap-1 font-bold p-2"
            href="tel:+919009000798"
          >
            <span className="bg-lime-500 p-2 rounded text-white">
              <IoCall />
            </span>{" "}
            +(91) 900 900 0798
          </a>
          <a
            className="flex items-center gap-1 font-bold p-2"
            href="mailto:info@xtendedspace.com"
          >
            <span className="bg-blue-500 p-2 rounded text-white">
              <IoMdMailUnread />
            </span>{" "}
            info@xtendedspace.com
          </a>
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
    ServiceType: "STORAGE",
    source: "B2B logistics",

  });
  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const [multipleError, setMultipleError] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [userId, setUserId] = useState("")
  const [refreshHeader, setRefreshHeader] = useState(false);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setErrors((prevErrors) => ({ ...prevErrors, checkError: "" }));
    }
  };

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
    if (!isChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkError:
          "Please agree to the terms and conditions before submitting.",
      }));
      return;
    }

    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
      // console.log(item, "allkeys", data[item]);
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
    const response = await SaveB2BStorageTypeData(formData);
    // console.log("response===", response);
    if (response.success) {
      // alert("Form data submitted successfully!");
      await sendDataToAPI(data); 
      setHubspotFormSubmit(true);

      setModalShow(true);
      const nameInput = document.getElementsByName("Name")[0]; 
      const emailInput = document.getElementsByName("Email")[0]; 
      const phoneInput = document.getElementsByName("Phone")[0]; 
      const msgInput = document.getElementsByName("Message")[0]; 

      if (nameInput && emailInput && phoneInput && msgInput) {
        nameInput.value = ""; 
        emailInput.value="";
        phoneInput.value="",
        msgInput.value=""
      }
      // router.push("/packers-and-movers-in-mumbai/thankyou"); // Navigate to thank you page on success
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);
      }
      //  document.getElementById("myform").reset();
      setError(response?.error?.text || "");
    }
    // console.log("response", error);
  };
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <Hubspotb2b
        portalId="45810273"
        formId="6be593cf-c631-4237-a954-7339df054ffe"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
      />
      <Head>
        <title>Trusted Logistics Services Providers for Businesses</title>
        <meta
          name="description"
          content="Looking for third-party logistics companies? Our transportation logistics services ensure your goods move efficiently. Contact us for reliable B2B logistics."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="logistics transportation, transport and logistics, third party logistics companies, 3rd party logistics companies, transportation logistics company, transportation & logistics company, logistics services providers, logistics transportation services, transportation logistics services, transportation and logistics services, b2b logistics, logistic services near me, transport logistics near me"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/services/b2b-logistics"
        />
        <meta
          property="og:title"
          content="Expert Logistics Transportation Services"
        />
        <meta
          property="og:description"
          content="Our logistics transportation services are tailored for businesses. Partner with us for efficient and secure transport solutions. Contact us for details."
        />
        <meta
          property="og:image"
          content="/images/offerlanding/b2b-logistic/b2b-logistics.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Expert Logistics Transportation Services"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/services/b2b-logistics/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Top Transportation & Logistics Company"
        />
        <meta
          name="twitter:description"
          content="We are a leading transportation logistics company offering comprehensive logistics services. Move your goods safely and on time with our expert team."
        />
        <meta
          name="twitter:image"
          content="/images/offerlanding/b2b-logistic/b2b-logistics.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Reliable B2B Logistics Transportation Services"
        />
      </Head>

      <HeaderMenu refresh={refreshHeader} />
      <div
        className="min-h-screen wbanner md:h-[auto]  p-4 md:p-4  flex flex-col justify-center items-center rounded-lg bg-cover bg-right-bottom "
        style={{
          backgroundImage:
            "url(/images/offerlanding/b2b-logistic/HeroBanner.jpg)",
        }}
      >
        <div class="flex flex-col md:flex-row items-start justify-evenly  md:p-4 ">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="  text-black font-extrabold  mb-4 text-[24px] md:text-[48px]">
              {" "}
              B2B logistics services{" "}
            </h1>
            <p class="text- text-[17px] md:text-[18px] font-bold  mb-6 md:py-4">
              Efficient B2B logistics solutions offering FTL, last-mile
              delivery, reverse logistics, and tailored supply chain management
              for seamless operations
            </p>
            <ul class="space-y-4">
              <li class="flex items-start">
                <Image src={reliable} alt="image" priority class="mr-2" />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Reliable logistics services</span>{" "}
                  for top brands like Coca-Cola, Rasna, and Patanjali.
                </span>
              </li>
              <li class="flex items-start">
                <Image src={safe_and_secure} alt="" priority class="mr-2" />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Safe and timely delivery</span>{" "}
                  across 'PAN' India.
                </span>
              </li>
              <li class="flex items-start">
                <Image src={customize} alt="" priority class="mr-2" />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">
                    Customized logistics solutions
                  </span>{" "}
                  tailored to your company's needs.
                </span>
              </li>
              <li class="flex items-start">
                <Image src={proven_track} priority alt="" class="mr-2" />
                <span class="text-black text-[13px] md:text-[16px] ">
                  <span className="font-bold">Proven track record</span> of
                  excellence with major corporations.
                </span>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/3 bg-white  p-6 rounded-lg shadow-lg ">
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
                <span className="error text-[12px] mb-2 text-red-500">
                  {errors.checkError}
                </span>
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

      <section id="third6" class="third6 my-4 mx-auto">
        <div class="ht1 w-full md:w-1/2 gap-2">
          <h2 className="my-2 text-[22px] md:text-[34px]  font-bold text-[#1B1C57]">
            Technology-driven Logistic Solutions
          </h2>

          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Xtended Space elevates your business with our comprehensive B2B
            transportation solution on a single platform. We help you run your
            business without facing transportation obstacles and make your
            journey unstoppable. So, let us take care of all your heavy lifting
            and experience the efficiency of our Technology-driven Logistic
            Solutions with us.{" "}
          </p>

          <div></div>
        </div>
        <div class="third6-img">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Technology-driven+Logistic+Solutions+for+Bulky+Items.webp"
            alt="image"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section class="course bg-blue-50 ">
        <div class="course1 w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            Why Pick Us
          </h2>
          {/* <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
          We drive up to your place, gather your selected inventory and stores in our warehouse. It’s that easy with our drive-up storage units. We provide peace of mind for your business storage inventory.  
          </p> */}
        </div>
        <div class="crow md:mt-[150px]">
          <div class="course-col shadow pb-4 px-2">
            <Image src={GPS_Accessed_Carrier} alt="" priority />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              GPS Accessed Carrier
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Assurance of precise tracking transportation for your goods.
            </p>
          </div>
          <div class="course-col shadow pb-4 px-2 md:mt-[-50px]">
            <Image src={Cost_Effective_Rates} alt="" priority />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Cost-Effective Rates
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Logistics solutions affordable without compromising quality.{" "}
            </p>
          </div>

          <div class="course-col shadow pb-4 px-2">
            <Image src={Nationwide_Reach} priority alt="" />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Nationwide Reach
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Easy delivery of your business inventory across the country.{" "}
            </p>
          </div>
        </div>
      </section>

      <div class="w-full lg:px-[10%] pt-6">
        <h2 className="capitalize text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
          Logistics Services Availability{" "}
        </h2>
        <p className="font-inter px-2  text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto] text-center">
        Our logistics services streamline your business operations. From inventory to equipment relocation, our comprehensive and reliable logistics solutions always help you.
        </p>
      </div>
      {/* </section> */}
      <section id="easystorage w-[100vw]" class="easystorage  py-2">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Full Truck Load
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Xtended Space Full Truckload (FTL) Solutions flawlessly handles
            large shipments by delivering your goods directly to your selected
            destination. Also, our eco-friendly logistics services support
            sustainable operations and help your business grow.
          </p>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            This single-stop destination streamlines faster transit, reduces
            handling costs, and improves supply chain efficiency.
          </p>
        </div>
        <div id="dncr" class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Full+Truck+Load.webp"
            width={500}
            height={500}
            priority
            alt=""
          />
        </div>
      </section>
      <section id="easystorage2" className="easystorage  py-2 ">
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          {/* <!-- <div class="colordiv"></div> --> */}
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Last+Mile+Delivery.webp"
            width={500}
            height={500}
            priority
            alt=""
          />
        </div>

        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57] ">
            Last Mile Delivery
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Xtended Space solves your last-mile delivery challenges by providing
            optimised routes that save you from traffic, high delivery costs,
            and tight time windows. We accommodate all your requirements by
            ensuring timely, and cost-effective deliveries.
          </p>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Our reliable and disruptive solutions satisfy you by dropping your
            goods to your selection destinations.
          </p>
        </div>
      </section>
      <section id="easystorage" class="easystorage  py-2 mb-4">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[34px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Reverse Logistics
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Reverse Logistics at Xtended Space promises a smooth relocation of
            your goods to your location for recycling. Our operational experts
            manage the timely returns of your items to streamline the entire
            reverse supply chain.
          </p>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            We support you in recovering business value, lessening waste, and
            maintaining operational efficiency with authentic and sustainable
            solutions.
          </p>
        </div>
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Reverse+Logistics.webp"
            width={500}
            height={500}
            priority
            alt=""
          />
        </div>
      </section>
      <section class="process bg-blue-50 py-4">
        <div class="process-info w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            Operational Procedure{" "}
          </h2>
          {/* <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">Xtended Space, the ultimate relocation service platform in Mumbai, ensures your belongings are relocated safely.</p> */}
        </div>
        <div class="row w-[100%] p-[5%] flex justify-between flex-wrap gap-5px">
          <div class="process-col flex flex-col justify-center items-center">
            <Image src={Instant_Booking} priority alt="easy booking" />
            <h2>01</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Instant Booking{" "}
            </h3>
            {/* <p class="html_article">Seamlessly book your move with our user-friendly process.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src={Door_To_Door_Logistics}
              priority
              alt="doorstep pickup"
            />
            <h2>02</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Vehicle Relocation Services{" "}
            </h3>
            {/* <p class="html_article">We pick up your belongings right from your doorstep for maximum convenience.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src={Safe_Packing_and_Moving}
              priority
              alt="Secure Packing and Moving"
            />
            <h2>03</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Safe Packing and Moving{" "}
            </h3>
            {/* <p class="html_article">Our professional team ensures your items are packed securely and moved safely.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image src={Time_bound_delivery} priority alt="on time shifting" />
            <h2>04</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              {" "}
              Time bound delivery{" "}
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

      <div className="Blogs py-4">
        <div className="self-center my-[50px] text-3xl font-semibold text-center capitalize text-blue-950 max:max-w-full">
          <h2 className=" text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
            Our Customers' Reviews
          </h2>
        </div>
        <Testimonial name={"b2blogistic"}/>
        
       
      </div>
      <div className=" w-full flex justify-center py-4">
        <Link href="/alltimelogistic" className="bg-[rgb(138,199,64)] text-white font-semibold p-3 px-4 rounded-md mx-auto">Track Shipment</Link>
      </div>
      <Myform />

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
