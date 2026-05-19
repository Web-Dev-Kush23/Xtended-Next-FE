import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import citiesData from "@/components/storagespaceData";
import Image from "next/image";
import { contact_us } from "@/service/homePageService";
import { useRouter } from "next/router";
import HeroMatrix from "@/components/HeroMatrix";
import YoutubeList from "@/components/YoutubeList";
import Testimonial from "@/sharedComponent/Testimonial";
import { AWS_IMAGE_URL } from "../../config/constants";
import { HandleLocalStorage } from "@/components/HandleLocalStorage";
import Hubspot from "../popupform/hubspotpopup";
import { sendDataToAPI } from "@/service/leads";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const SimpleSlider = dynamic(() => import("@/sharedComponent/slider2"));
const SimpleSlider1 = dynamic(() => import("@/sharedComponent/slider3"));
const SimpleSlider3 = dynamic(() => import("@/sharedComponent/slider5"));
const SimpleSlider4 = dynamic(() => import("@/sharedComponent/slider6"));
const HeaderMenu = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("../../components/footer"));

// const AWS_IMAGE_URL = "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/";

export default function Home() {
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);

  const router = useRouter();
  const cities = Object.values(citiesData);
  const [formData, setFormData] = useState({
    subject: "Empty",
    source: "homepage",
    city: "Empty",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [multipleError, setMultipleError] = useState();

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setErrors((prevErrors) => ({ ...prevErrors, checkError: "" }));
    }
  };

  const trimNumber = (s) => s.replace(/^0+/, "") || "0";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phoneNumber" ? trimNumber(value) : value,
    }));
    setMultipleError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkError:
          "Please agree to the terms and conditions before submitting.",
      }));
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    const response = await contact_us(formData);
    if (response.success) {
      await sendDataToAPI(formData);
      setHubspotFormSubmit(true);

      setShowSuccessMessage(true);
      document.getElementById("myform").reset();
    } else if (
      response?.error?.title === "One or more validation errors occurred."
    ) {
      setMultipleError(response?.error?.errors);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const back = router.query.back;
    if (back === "false") {
      router.replace(router.asPath, undefined, { shallow: true });
      window.history.pushState(null, null, window.location.href);
    }
  }, [router]);

  return (
    <>
      <Hubspot
        portalId="45810273"
        formId="468c83bf-682f-46f1-82c5-e9896d260460"
        hubspotFormSubmit={hubspotFormSubmit}
        data={formData}
      />
      <Head>
        <title>
          {" "}
          #1 Rated Storage & Moving Service in India - Xtended Space
        </title>
        <meta
          name="description"
          content="Xtended Space offers safe storage solutions and reliable packers and movers services across India for a hassle-free experience."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com" />
        <meta
          property="og:title"
          content="Affordable Storage & Packing Moving Services India"
        />
        <meta
          property="og:description"
          content="Get budget-friendly storage and professional moving services with Xtended Space, ensuring secure and smooth relocations in India."
        />
        <meta
          property="og:image"
          content="/images/xtended-space-storage-and-relocation-service.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Secure Storage & Relocation Services India"
        />
        <meta property="og:url" content="https://www.xtendedspace.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reliable Storage & Movers Services India"
        />
        <meta
          name="twitter:description"
          content="Choose Xtended Space for top-notch storage solutions and packers and movers services, making your storage and relocation easy and stress-free."
        />
        <meta
          name="twitter:image"
          content="/images/xtended-space-storage-and-relocation-service.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Xtended Space Storage & Packers Movers India"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org/",
              "@type": "WebSite",
              url: "https://www.xtendedspace.com/",
              potentialAction: {
                "@type": "SearchAction",
                target: [
                  "https://www.xtendedspace.com/easy-storage",
                  "https://www.xtendedspace.com/affordable-storage",
                  "https://www.xtendedspace.com/services/packers-and-movers",
                  "https://www.xtendedspace.com/services/business-storage",
                  "https://www.xtendedspace.com/services/b2b-logistics?q={search_term_string}",
                ],
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-[1550px] mx-auto w-full">
        <HeaderMenu />
        <section className="h-[50vh] md:h-[64vh] relative">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/homebanner.webp"
            alt="Background Image"
            fill
            style={{ objectFit: "cover" }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10"></div>
          <div className="text-box w-[90%] md:w-[848px] grid place-items-center relative z-20">
            <h1 className="text-[24px] md:text-[48px] font-bold capitalize">
              Your Storage and Relocation Partner
            </h1>
            <p className="text-[14px] md:text-[20px] text-white w-[85%] md:w-[80%] mx-auto py-2">
              A platform that makes your storage, relocation, and logistics
              journey smooth with cost-effective rates
            </p>
            <Link
              href="/store-with-a-host"
              className="hero-btn cursor-pointer w-[140px] md:w-[200px] h-[40px] md:h-[52px] rounded-lg text-[16px] md:text-[19px] flex justify-center items-center text-white bg-[#007bff] capitalize"
            >
              Book Now
            </Link>
            
          </div>
        </section>

        <HeroMatrix />

        <section className="course mt-0 md:mt-0 bg-white py-8">
          <div className="course1">
            <h2 className="text-[18px] font-inter md:text-[34px] font-semibold text-[#1b1c57] capitalize">
              Get Unutilised Storage Space at a Reasonable Price
            </h2>
            <p className="font-inter px-2 text-[12px] md:text-[18px] text-[#1b1c57] py-3 m-auto">
              Secure a convenient storage space at a price that fits your
              budget.
            </p>
          </div>
          <div className="crow gap-2">
            {[
              { src: "Verified+Host-.webp", title: "Verified Host" },
              { src: "SecuredandInsured.webp", title: "Secured & Insured" },
              { src: "StressFreeMoveIn.webp", title: "Stress-free move-in" },
              { src: "NearBy.webp", title: "Near-by Flexible & Affordable" },
            ].map((item, index) => {
              const offsetClass =
                index === 1 || index === 3
                  ? "md:mt-[100px] mt-[10px]"
                  : "mt-[10px]";
              const delayClass =
                index === 1 || index === 3
                  ? "animate-delay-500"
                  : "animate-delay-0";

              return (
                <div
                  key={index}
                  className={`course-col shadow animate-float ${offsetClass} ${delayClass}`}
                >
                  <Image
                    src={`${AWS_IMAGE_URL}${item.src}`}
                    alt={item.title}
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  <h3 className="capitalize text-[#1b1c57] font-semibold mb-[20px] my-[10px] md:mb-[22px] px-10 text-[18px] md:text-[20px]">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        <section className="h-auto py-[20px] bg-sky-50">
          <div className="p-[20px]">
            <h2 className="capitalize text-[18px] md:text-[34px] font-semibold text-center text-[#1B1C57]">
              We Store Memories & Emotions
            </h2>
            <p className="text-[12px] md:text-[18px] text-[#1b1c57] py-3 m-auto px-2 text-center">
              The protection & security of your valuables are of utmost
              importance to us.
            </p>
            <div className="flex items-center justify-evenly md:mt-10 flex-wrap">
              {[
                {
                  src: "Householditems1.webp",
                  title: "Household Items",
                  description:
                    "A safe & secure home for all your household goods. From your double bed to the smallest of household items.",
                },
                {
                  src: "BusinessInventory.webp",
                  title: "Business Inventories",
                  description:
                    "Your business expansion made easy. A dedicated & customized storage solutions for your business.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="m-3 flex items-center justify-between py-[5px] max-w-[450px] max-h-[85px] text-left"
                >
                  <Image
                    className="w-[100px] store-icon"
                    src={`${AWS_IMAGE_URL}${item.src}`}
                    alt={item.title}
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  <div className="ml-3">
                    <h2 className="capitalize text-[16px] md:text-[24px] font-semibold text-[#1B1C57] text-left">
                      {item.title}
                    </h2>
                    <p className="text-gray-700 md:pt-4 text-[12px] md:text-[18px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container3 ">
          <div className="">
            <h2 className=" text-[18px] md:text-[34px]  font-semibold text-center text-[#1B1C57]">
              Store with a Host Vs Store at a Warehouse
            </h2>
            <p className="text-[12px] md:text-[18px] m-[auto] px-2  text-[#1b1c57] py-3 text-center">
              Nearby & pocket friendly world-class storage facilities as per
              your needs.
            </p>
          </div>
          <div className="con2">
            <video
              width="320"
              height="240"
              poster="./images/vedio/fallback.jpg"
              controls
            >
              <source src="./images/vedio/xtendedspace.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <div className="text-center bg-gray-100 py-8">
          <h2 className="capitalize text-[18px] md:text-[34px] font-semibold text-center text-[#1B1C57]">
            Storage Options
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="buttons flex justify-center md:gap-10">
              <Link href="store-with-a-host" rel="noopener noreferrer">
                <button className="text-white cursor-pointer text-[14px] md:text-[32px] font-semibold bg-blue-600 p-auto h-[40px] md:h-[80px] lg:h-[100px] block w-[160px] md:w-[350px] lg:w-[400px] rounded-xl app-store">
                  Store with a Host{" "}
                </button>
              </Link>
              <Link href="store-at-a-warehouse" rel="noopener noreferrer">
                <button className="text-white cursor-pointer text-[14px] md:text-[32px] font-semibold bg-lime-500 p-auto h-[40px] md:h-[80px] lg:h-[100px] block w-[160px] md:w-[350px] lg:w-[400px] rounded-xl google-play">
                  Store at a Warehouse
                </button>
              </Link>
            </div>
          </div>
        </div>

        <section className="container3 max-w-screen-xl mx-auto">
          <div className="con1">
            <h2 className="text-[18px] md:text-[34px] font-semibold text-center text-[#1B1C57]">
              Our Wide Range of Services
            </h2>
            <p className="text-[12px] md:text-[18px] text-[#1b1c57] px-2 py-3 m-auto text-center">
              We provide dedicated, secure, reliable and tailored services that
              meet your needs, all at a competitive price
            </p>
          </div>
          <SimpleSlider1 />
        </section>

        <div className="patner text-center bg-gray-100 py-8 item-center">
          <h2 className="text-[18px] md:text-[34px] font-semibold text-center text-[#1B1C57]">
            Serving Corporate Giants
          </h2>
          <SimpleSlider />
        </div>

        <section id="listapp" className="third1 p-4 md:py-0 md:px-2">
          <div className="home-text md:w-[45vmax] w-[30vmax]">
            <h2 className="text-[17px] md:text-[48px] font-[800] text-black md:my-2 capitalize">
              Earn Passive Income with Xtended Space.
            </h2>
            <p className="text-[10px] md:text-[18px] text-[#1b1c57] md:my-4">
              Enjoy an extra way of earning at Xtended Space simply by listing
              your unused space for rent. Whether you have a vacant garage,
              basement or office space, conveniently earn thousands of rupees
              monthly.
            </p>
            <div className="mt-2 md:mt-8">
              <div className="buttons flex mt-0 md:mt-[20px] bg-blue-500 w-[100px] md:w-[200px] h-[30px] md:h-[50px] item-center justify-center rounded-md text-white text-[12px] md:text-[20px]">
                <Link href="/list-storage" className="m-auto">
                  List Your Space
                </Link>
              </div>
            </div>
          </div>
          <div className="about-img w-[38vw] md:w-[40vw]">
            <Image
              id="mobile1"
              className="hidden md:block"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/passiveincomep2.webp"
              alt="image"
              width={300}
              height={300}
              loading="lazy"
            />
            <Image
              id="mobile2"
              className="block md:hidden h-5"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/passiveincomep2.webp"
              alt="image"
              width={300}
              height={300}
              loading="lazy"
            />
          </div>
        </section>

        {/* <section className="bg-blue-600 pl-6 md:pl-16 py-2 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-2">

            <div className="w-full md:w-1/2 ">
              <div className="text-3xl md:text-4xl font-bold leading-[40px] ">
                <p className="leading-[40px]">Find & Book Your Storage</p>
                <p className="leading-[40px]">
                  Effortlessly, Anytime,
                  <br />
                </p>{" "}
                Anywhere
              </div>

       
           


              <div className="mt-8 flex gap-2 flex-wrap items-center justify-between ">

                <div>
                    <a
                href=""
                className="mt-6 inline-block bg-white text-blue-600 font-semibold py-3 px-5 rounded-full shadow hover:bg-gray-100 transition "
              >
                Click here to download
              </a>
                <div className="flex   gap-4 py-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.xtendedspaceapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/googlepay.svg"
                      alt="Get it on Google Play"
                      className="h-12"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/xtended-space/id1671530684"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/images/playstore.svg"
                      alt="Download on the App Store"
                      className="h-12"
                    />
                  </a>
                </div>
                </div>


                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/qrcode.jpeg"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="rounded h-28 w-28 object-cover"
                  />
                  <span className="text-sm text-white mt-2">
                    Scan to Download
                  </span>
                </div>
              </div>
            </div>


           <div className="w-full md:w-2/3 flex justify-end">
              <Image
                src="/images/handImage.png"
                alt="App Mockup"
                width={200}
                height={200}
                className="object-contain w-full max-w-[80%]"
              />
            </div> 
          </div>
        </section> */}

        <div className="Blogs">
          <div className="self-center custom my-[50px] text-3xl font-semibold text-center capitalize text-blue-950 max:max-w-full">
            <h2 className="text-[18px] md:text-[34px] font-semibold text-center text-[#1B1C57]">
              Our Customer's Reviews
            </h2>
          </div>
          {/* <SimpleSlider4 /> */}
          <Testimonial name={"homepage"} />
        </div>
        <div className="patner text-center pt-[40px] md:py-[40px]">
          <h2 className="text-[18px] md:text-[34px] md-4 md:mb-5 font-semibold text-[#1B1C57] capitalize">
            Featured in
          </h2>
          <SimpleSlider3 />
        </div>

        <div className="patner text-center pt-[40px] md:py-[40px] bg-gray-50">
          <h2 className="text-[18px] md:text-[34px] md-4 md:mb-5 font-semibold text-[#1B1C57] capitalize">
            See our videos
          </h2>
          <YoutubeList />
        </div>

        <section
          id="third"
          className="third sm:px-4 md:px-20 bg-sky-50 py-8 mt-0"
        >
          <div className="home-text">
            <div className="ht1">
              <h2 className="text-[18px] md:text-[32px] font-bold text-[#1b1c57] capitalize">
                Get in touch with us
              </h2>
              <p className="text-[12px] text-[#1b1c57] py-3 md:text-[18px]">
                Xtended Space smoothens your storage needs with just a click
                away by providing you pickup to secure storage and convenient
                redelivery.
              </p>
            </div>
            <div className="w-full md:flex-col my-2 flex-wrap hidden md:block">
              {[
                {
                  src: "email.svg",
                  label: "Email",
                  value: "info@xtendedspace.com",
                },
                {
                  src: "phone-1.svg",
                  label: "Call Us",
                  value: "+(91) 900 900 0798",
                },
                {
                  src: "clock.svg",
                  label: "Time",
                  value: "Mon - Sun (24 X 7)",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="contact-item mt-4 gap-2 mr-2 flex items-center"
                >
                  <Image
                    className="w-[28px] md:w-[46px]"
                    src={`${AWS_IMAGE_URL}${item.src}`}
                    alt={item.label}
                    width={28}
                    height={28}
                    loading="lazy"
                  />
                  <p className="text-[12px] md:text-[14px] text-[#1b1c57] font-semibold">
                    {item.label}: <br /> {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-img mx-auto">
            <div className="container">
              <form id="myform" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      name="name"
                      required
                      onChange={handleChange}
                    />
                    {multipleError?.Name && (
                      <p className="text-sm text-red-500">
                        {multipleError.Name[0]}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      required
                      onChange={handleChange}
                    />
                    {multipleError?.Email && (
                      <p className="text-base text-red-500">
                        {multipleError.Email[0]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone<span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your mobile no."
                      name="phoneNumber"
                      required
                      onChange={handleChange}
                    />
                    {multipleError?.PhoneNumber && (
                      <p className="text-sm text-red-500">
                        {multipleError.PhoneNumber[0]}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">
                      City<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Enter your city"
                      name="city"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea
                      id="message"
                      rows="3"
                      placeholder="Your Message"
                      name="message"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div className="form-checkbox py-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox-input"
                    />
                    <p className="text-[12px] text-[#374151]">
                      By continuing, you agree to our
                      <Link
                        href="/terms-and-conditions"
                        target="_blank"
                        className="text-blue-500 underline ml-1 mr-1"
                      >
                        Terms & Conditions
                      </Link>
                      and
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        className="text-blue-500 underline ml-1"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                  <span className="error text-[12px] mb-2 text-red-500">
                    {errors.checkError}
                  </span>
                </div>
                <div className="form-row">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
                {showSuccessMessage && (
                  <p className="success-message text-green-500 font-semibold py-2 px-2">
                    Thank you for contacting us! Our Team will contact you soon!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
        <Footer />
        <HandleLocalStorage />
      </div>
    </>
  );
}
