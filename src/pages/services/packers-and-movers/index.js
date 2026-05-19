import { useEffect, useState } from "react";
import SimpleSlider4 from "@/sharedComponent/slider6";
import { FaLongArrowAltRight } from "react-icons/fa";
import Head from "next/head";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Button, Form, Spinner } from "react-bootstrap";
import AutocompleteInput from "@/components/Autocomplete";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import { getUserId, localStorageManager } from "@/util/common";
import { useRouter } from "next/router";
import Breadcrumbs from "../../profile/Breadcrumb";
import dynamic from "next/dynamic";
const Searchlocation = dynamic(() => import("../../searchlocation"));
import citiesData from "@/components/citiesData";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Testimonial from "@/sharedComponent/Testimonial";
import { DecryptUserId } from "@/service/storageService";
import { sendPackerMoverData } from "@/service/packermover";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import { faqData } from "@/data/faqs";

export default function Home() {
  const router = useRouter();
  const [packerData, setPackerData] = useState({
    fromLocation: "",
    toLocation: "",
    configuration: "",
  });
  const [userId, setUserId] = useState("");
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [error, setError] = useState(false);
  const [isHome, setIshome] = useState(true);
  const [loader, setLoader] = useState(false);
  const cities = Object.values(citiesData);
  const [refreshHeader, setRefreshHeader] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const queryUserId = new URLSearchParams(window.location.search).get(
          "userId"
        );

        if (queryUserId) {
          setUserId(queryUserId);
          try {
            const response = await DecryptUserId(`?userId=${queryUserId}`);
            if (response?.success) {
              localStorageManager?.setValue(
                "userDetails",
                JSON.stringify(response.success.data)
              );
              const userData = JSON.parse(
                localStorageManager?.getValue("userDetails") || "{}"
              );
              setUserId(userData?.userId);
              setRefreshHeader(true);
            } else {
              console.error("Error decrypting User ID:", response?.error);
            }
          } catch (error) {
            console.error("Error in DecryptUser Id API call:", error);
          }
        } else {
          const userData = JSON.parse(
            localStorageManager?.getValue("userDetails") || "{}"
          );
          setUserId(userData?.userId);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleCheck = async () => {
    let xsMoverDetails = {
      deliveryAddress: {
        city: packerData?.toLocation,
      },
      pickupAddress: {
        city: packerData?.fromLocation,
      },
      storageRequirement: packerData?.configuration,
      StorageType: isHome ? "Home" : "Office",
    };
    localStorageManager.setValue(
      "xsMoverDetails",
      JSON.stringify(xsMoverDetails)
    );

    if (
      !packerData.fromLocation ||
      !packerData.toLocation ||
      !packerData.configuration
    ) {
      setError(true);
    } else {
      setError(false);
      setLoader(true);
      let formData = new FormData();
      formData.append("ApplicationUserId", getUserId());
      formData.append("StorageRequirement", packerData?.configuration);
      formData.append("StorageType", isHome ? "Home" : "Office");
      formData.append("CityFrom", packerData?.fromLocation);
      formData.append("CityTo", packerData?.toLocation);
      let res = await sendPackerMoverData(formData, "?stage=1");
      if (res.success) {
        const pacmovId = res?.success?.data?.value?.packersAndMovers?.id;
        router.push(
          `/services/packers-and-movers/move-details?pmId=${pacmovId}`
        );
      }
      setLoader(false);
    }
  };

  const onSubmit = async (e) => {
    if (!getUserId()) {
      setLoginModal(true);
      return;
    } else {
      handleCheck();
    }
  };

  const handleType = (type) => {
    setIshome(type === "home");
    setPackerData({
      fromLocation: "",
      toLocation: "",
      configuration: "",
    });
  };

  useEffect(() => {
    if (
      packerData?.fromLocation !== "" &&
      packerData?.toLocation !== "" &&
      packerData?.configuration !== ""
    ) {
      setError(false);
    }
  }, [packerData]);

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>Get 10% Off Packers & Movers Service – Xtended Space</title>
        <meta
          name="description"
          content="Professional packers and movers services. Safe shifting of household items and goods. Xtended Space ensures a smooth move. Contact us now!"
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content=", packers and movers near me, moving packers near me, packers & movers near me, home shifting services, household shifting services, packers and movers in new mumbai, household shifting services near me, packers and movers services, shifting service, shifting household items, shifting of household goods, shifting household goods, local packers & movers, local movers packers, relocation services, shifting services near me"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/services/packers-and-movers/"
        />
        <meta property="og:title" content="Affordable Local Packers & Movers" />
        <meta
          property="og:description"
          content="Trusted local packers & movers near me. Comprehensive shifting services for household goods. Choose Xtended Space for hassle-free relocation."
        />
        <meta
          property="og:image"
          content="/images/offerlanding/relocation/packers-and-movers.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Affordable Packers & Movers" />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/services/packers-and-movers/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Professional Moving Packers Near you"
        />
        <meta
          name="twitter:description"
          content="Efficient moving packers near me. Quality packers & movers for household shifting services. Book Xtended Space for secure relocation."
        />
        <meta
          name="twitter:image"
          content="/images/offerlanding/relocation/packers-and-movers.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Professional Moving Packers Near you"
        />
     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "http://schema.org/",
      "@type": "Product",
      "name": "Packers and Movers",
      "image": "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
      "description":
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
          name: "Packers and Movers",
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

      <HeaderMenu refresh={refreshHeader} />
      <section className="packer-mover-banner justify-center">
        <div className="md:block absolute top-2 left-14 hidden ">
          <div className="flex items-center text-white">
            <a href="/" className="font-medium leading-8 text-[#fff] text-sm">
              Home
            </a>
            <span className="mx-1">
              <MdKeyboardDoubleArrowRight size={25} />
            </span>
            <a
              href="/services/packers-and-movers"
              className="font-medium leading-8 text-[#fff] text-sm"
            >
              Packers & Movers
            </a>

            {/* <Breadcrumbs packer={true}/> */}
          </div>
        </div>
        <div className="">
          <div className="w-full mb-3">
            <h1 className="text-[20px] text-white text-center md:text-[40px] font-bold capitalize leading-8 md:leading-[55px]">
              Best Packers and Movers in India
            </h1>
          </div>
          <div className="bg-gray-50 rounded-md p-[25px]">
            <div className="pl-6">
              <span
                onClick={() => handleType("home")}
                className={`${
                  isHome
                    ? "text-blue-500 text-sm font-bold underline"
                    : "text-gray-800 text-sm font-normal"
                } cursor-pointer`}
              >
                HOME
              </span>
              <span
                onClick={() => handleType("office")}
                className={`${
                  !isHome
                    ? "text-blue-500 text-sm font-bold underline"
                    : "text-gray-800 text-sm font-normal"
                } px-3 cursor-pointer`}
              >
                OFFICE
              </span>
            </div>
            <div className="block md:flex justify-between items-center  rounded-md p-[3px] md:p-[10px]">
              <div className="w-full md:w-40 lg:w-60 my-2 md:mx-3">
                <AutocompleteInput
                  label="Pick-up Location"
                  value={packerData.fromLocation}
                  setPackerData={setPackerData}
                  field="fromLocation"
                  reset={isHome}
                />
              </div>
              <div className="w-full md:w-40 lg:w-60 my-2 md:mx-3">
                <AutocompleteInput
                  label="Drop Location"
                  value={packerData.toLocation}
                  setPackerData={setPackerData}
                  field="toLocation"
                  reset={isHome}
                />
              </div>

              {isHome ? (
                <div className="w-full md:w-40 lg:w-60 my-2 md:mx-3">
                  <Form.Select
                    value={packerData.configuration}
                    className="px-4 py-2.5 border-gray-500"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setPackerData((prevData) => ({
                        ...prevData,
                        configuration: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected>
                      Select your house type
                    </option>
                    <option value="Few">Few Items</option>
                    <option value="1 RK">1 RK</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="moreThan4bhk">More than 4 BHK</option>
                  </Form.Select>
                </div>
              ) : (
                <div className="w-full md:w-40 lg:w-60 my-2 md:mx-3">
                  <Form.Select
                    value={packerData.configuration}
                    className="px-4 py-2.5 border-gray-500"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setPackerData((prevData) => ({
                        ...prevData,
                        configuration: e.target.value,
                      }))
                    }
                  >
                    <option value="" selected>
                      Select your office type
                    </option>
                    <option value="I will add individual items">
                      I will add individual items
                    </option>
                    <option value="Upto 10 Employees">Upto 10 employees</option>
                    <option value="Upto 20 Employees">Upto 20 employees</option>
                    <option value="More than 20 Employees">
                      More than 20 Employees
                    </option>
                  </Form.Select>
                </div>
              )}
              <div className="relative">
                <Button
                  disabled={loader}
                  className="lg-px-10 md:w-auto w-full md:px-5 px-10 py-2.5 justify-center md:justify-start flex items-center"
                  variant="primary"
                  onClick={() => onSubmit()}
                >
                  Get Quotes{" "}
                  <FaLongArrowAltRight className="text-white text-2xl ml-2" />
                  {loader && (
                    <Spinner
                      animation="border"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "6px",
                      }}
                    />
                  )}
                </Button>

                {error && (
                  <p className="absolute text-red-500 ">
                    All Field is required !
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section id="third6" class="third6 my-4 mx-auto">
        <div class="ht1 w-full md:w-1/2 gap-2">
          <h2 className="my-2 text-[22px] md:text-[34px]  font-bold text-[#1B1C57]">
            Best Packers and Movers
          </h2>

          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Explore smooth packing and moving services with Xtended Space.
            Assurance of your comfortable nationwide relocation journey is
            confirmed here.
          </p>
          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            Our triple-layer premier packaging and door-to-door logistics
            service make you stress-free. If you want space downsizing or
            relocation assistance, we are here for you.
          </p>
          <p className="py-2 text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
            We believe in providing a smooth transition to our secure warehouse
            facility during your move. We make your moving and packing service
            damage-free and smooth.
          </p>
          <div></div>
        </div>
        <div class="third6-img">
          <Image
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/best+packers+and+movers.webp"
            alt="bestmovers"
            width={500}
            height={500}
          />
        </div>
      </section>
      <section class="course bg-blue-50 ">
        <div class="course1 w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            Reasons to choose us
          </h2>
        </div>
        <div class="crow md:mt-[150px]">
          <div class="course-col shadow pb-4 px-6">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Budget-Friendly%20Pricing.webp"
              alt="budget"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Budget-Friendly Pricing
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Get affordable movers and packers services at Xtended Space.
            </p>
          </div>
          <div class="course-col shadow pb-4 px-6 md:mt-[-50px]">
            <img
              src="/images/offerlanding/relocation/Nationwide Moving.png"
              alt=""
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Nationwide Moving
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Xtended Space provides a nationwide transition solution.
            </p>
          </div>

          <div class="course-col shadow pb-4 px-6">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Door%20to%20Door%20Logistics22.webp"
              alt="doortodoor"
              width={200}
              height={200}
            />
            <h3 className="capitalize text-[#1b1c57] font-semibold   mt-[10px] md:mt-[10px] text-[18px] md:text-[22px]">
              Door to Door Logistics
            </h3>
            <p className=" text-gray-700 md:pt-2 text-[14px] md:text-[15px] px-2">
              Enjoy the seamless process from your place to the destination.{" "}
            </p>
          </div>
        </div>
      </section>

      <div class="w-full lg:px-[10%] pt-6">
        <h2 className="capitalize text-[22px] md:text-[34px]  font-bold text-center text-[#1B1C57]">
          Packing and Moving Services
        </h2>
        <p className="font-inter px-2  text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto] text-center">
          We assure you a smooth pack and move to your new destination. Our
          committed team ensures your items are moved with care and makes your
          move stress-free.
        </p>
      </div>
      {/* </section> */}
      <section id="easystorage w-[100vw]" class="easystorage  py-2">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Relocation of Household items
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Our expert packers and movers make your room shifting service
            efficient by packing and moving your belongings and ensuring they
            reach your new place.
          </p>
        </div>
        <div id="dncr" class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <img
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/household+goods.webp"
            alt=""
          />
        </div>
      </section>
      <section id="easystorage2" className="easystorage  py-2 ">
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          {/* <!-- <div class="colordiv"></div> --> */}
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/office+reloaction.webp"
            alt=""
            width={500}
            height={500}
          />
        </div>

        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57] ">
            Office Relocation Services
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Are you looking for office relocation? Xtended Space's moving
            service is the ultimate solution. It reduces your transition stress
            by efficiently packing and moving, and timely setup at the new
            location.
          </p>
        </div>
      </section>
      <section id="easystorage" class="easystorage  py-2 mb-4">
        <div class=" ht1 w-[80vw] md:w-[45vw]">
          <h2 className="py-2 mb-0 md:mb-[32px] text-[18px] md:text-[30px] capitalize  font-bold text-[#1B1C57]">
            Vehicle Relocation Services
          </h2>
          <p className="text-[17px] md:text-[20px] mb-[30px] text-[#73788C]">
            Xtended Space makes your two and four-wheeler shifting journey
            effortless. The operational team safely drops your vehicles at your
            decided destination. We ensure you a secure move with our effective
            moving services.
          </p>
        </div>
        <div class="ht1 w-[80vw] md:w-[45vw] h-[auto]">
          <Image
            className="w-[90%] m-[auto]"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/vehicle+relocation.webp"
            alt="doortodoor"
            width={500}
            height={500}
          />
        </div>
      </section>    
      <section class="process bg-blue-50 py-4">
        <div class="process-info w-full lg:px-[10%]">
          <h2 className="text-[22px] font-inter md:text-[34px] font-bold text-[#1b1c57] capitalize">
            How it Works?
          </h2>
          <p className="font-inter px-2 text-[17px] md:text-[18px] text-[#1b1c57] py-3 m-[auto]">
            Xtended Space is the ultimate relocation service platform. It
            ensures the safe relocation of your belongings.
          </p>
        </div>
        <div class="row w-[100%] p-[5%] flex justify-between flex-wrap gap-5px ">
          <div class="process-col flex flex-col justify-center items-center">
            <img
              src="/images/offerlanding/relocation/Quick Booking.png"
              alt="easy booking"
            />
            <h2>01</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Quick Booking
            </h3>
            {/* <p class="html_article">Seamlessly book your move with our user-friendly process.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Doorstep%20Pickup.webp"
              alt="doorstep pickup"
              width={200}
              height={200}
            />
            <h2>02</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Doorstep Pickup
            </h3>
            {/* <p class="html_article">We pick up your belongings right from your doorstep for maximum convenience.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <img
              src="/images/offerlanding/relocation/Secure Packing & Moving.png"
              alt="Secure Packing and Moving"
            />
            <h2>03</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Secure Packing & Moving
            </h3>
            {/* <p class="html_article">Our professional team ensures your items are packed securely and moved safely.</p> */}
          </div>
          <div class="process-col flex flex-col justify-center items-center">
            <Image
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Timely+Delivery.webp"
              alt="timelydelivery"
              width={200}
              height={200}
            />
            <h2>04</h2>

            <h3 class="capitalize h-[50px] text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Timely Delivery
            </h3>
          </div>
        </div>
        <div class="con2">
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
        <Testimonial name={"packers-and-movers"} />
      </div>
      <Faqs FAQData={faqData.packersAndMovers} />
      {loginModal && (
        <LoginModal
          show={loginModal}
          onHide={() => setLoginModal(false)}
          setLoginModal={setLoginModal}
          setRegisterModal={setRegisterModal}
          packersMovers={true}
          packerMoverSave={handleCheck}
          callback={"services/packers-and-movers"}
        />
      )}

      <RegisterModal
        show={registerModal}
        onHide={() => setRegisterModal(false)}
        setRegisterModal={setRegisterModal}
        callback={"services/packers-and-movers"}
        packersMovers={true}
        packerMoverSave={handleCheck}
      />
      <Searchlocation cities={cities.filter((x) => x.parentId == "")} />

      <Footer />
    </div>
  );
}
