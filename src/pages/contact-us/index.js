import { contact_us } from "@/service/homePageService";
import Link from "next/link";
import { useState } from "react";
import HeaderMenu from "@/components/header/header";
import Image from "next/image";
import Footer from "@/components/footer";
import Head from "next/head";
import { MdDoubleArrow } from "react-icons/md";
import { useRouter } from "next/router";
import Spinner from 'react-bootstrap/Spinner';
import Hubspot from "../popupform/hubspotpopup";
import { sendDataToAPI } from "@/service/leads";
import Breadcrumbs from "../profile/Breadcrumb";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    source: "contact_us",
    city: "",
  });
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);

  const [loader, setLoader] = useState(false)
  const [error, setError] = useState();
  const [errors, setErrors] = useState({})
  const [multipleError, setMultipleError] = useState({});
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {setErrors((prevErrors) => ({...prevErrors,checkError: "",}));}};
    
  
  function trimNumber(s) {
    while (s.substr(0, 1) == '0' && s.length > 1) { s = s.substr(1, 9999); }
    return s;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phoneNumber") {
      newValue = trimNumber(value);

      // setFormData({ ...formData, [name]: trimNumber(value) });

    }
    setFormData({ ...formData, [name]: value });
    setError();
    setMultipleError({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {setErrors((prevErrors) => ({...prevErrors, checkError: "Please agree to the terms and conditions before submitting.",})); return;}

    setLoader(true)
    formData.name = formData.first_name + " " + formData.last_name;
    const response = await contact_us(formData);
    if (response.success) {
      await sendDataToAPI(formData); 
      setHubspotFormSubmit(true);

      // alert("we will get you soon!");
      setLoader(false)
      router.push("/thankyou")
      // setFormData("")
    } else {
      // setError(response.error)
      // setMultipleError(response.error);
      setLoader(false)
      if (response?.error?.title === "One or more validation errors occurred.") {
        setMultipleError(response.error.errors)
        setLoader(false)
      }
    }
  };

  return (
    <>
       <Hubspot 
        portalId="45810273"
        formId="468c83bf-682f-46f1-82c5-e9896d260460"
        hubspotFormSubmit={hubspotFormSubmit}
        data={ formData }
      />
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
        <title>Contact Xtended Space - Relocation & Storage Space Services</title>
        <meta name="description" content="Get in touch with Xtended Space for professional relocation and storage solutions. We're here to assist with your moving and storage needs." />
        <meta name="author" content="Xtended Space" />
        {/* <meta name="keywords" content="Secure storage, Packers and movers, Relocation services, Storage solutions, Moving services, Affordable storage, Household storage, Business storage, B2B storage, Storage India, Movers India, Safe storage, Professional packers, Reliable movers, Nationwide relocation"/> */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.xtendedspace.com/contact-us" />
        <link rel="alternate" href="https://www.xtendedspace.com/contact-us" hreflang="en-in" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta property="og:image:alt" content="Xtended Space Storage & Packers Movers India" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Xtended Space - Relocation & Storage Space Services" />
        <meta property="og:url" content="https://www.xtendedspace.com/contact-us" />
        <meta property="og:image" content="https://web.xtendedspace.com/images/logo.png" />
        <meta property="og:description" content="Get in touch with Xtended Space for professional relocation and storage solutions. We're here to assist with your moving and storage needs." />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Xtended Space - Relocation & Storage Space Services" />
        <meta name="twitter:site" content="@https://www.xtendedspace.com/contact-us" />
        <meta name="twitter:description" content="Get in touch with Xtended Space for professional relocation and storage solutions. We're here to assist with your moving and storage needs." />
        <meta name="twitter:image" content="https://web.xtendedspace.com/images/logo.png" />
        <meta name="twitter:image:alt" content="Xtended Space Logo" />

      </Head>
      <HeaderMenu />
      {/* <div class=" py-4 pl-[50px] items-center flex-wrap hidden lg:flex absolute left-[50px] top-[100px] z-10">
  <ul class="flex items-center">
	<li class="inline-flex items-center">
	  <Link href="/" class="text-white hover:text-blue-500 ">
		Home
	  </Link>
      <div className="w-5 h-auto fill-current mx-2 text-white"><MdDoubleArrow /></div>
	  </li>
	<li class="inline-flex items-center">
	  <Link href="" class="text-white hover:text-blue-500">
		Contact Us
	  </Link>
	 </li>
  </ul>
</div> */}
 
      <section className="contactbanner">
        <div className="flex items-center justify-start ml-4 mb-4 ">
                <li key="home" className="flex items-center justify-start">
                    <Link href="/" legacyBehavior>
                        <a className="">Home</a>
                    </Link>
                </li>
                <Breadcrumbs />
            </div>
        <div className="contactcontent">
          
          <h1 className="text-gray-600">We Value your response</h1>
          <p className="">If you need any assistance, our team will soon respond to you... </p>
        </div>
      </section>
      <section className="w-[auto] h-[auto] md:mx-[50px] ">
        <div class="max-w-[100vw]  md:h-[auto] bg-white gap-5 flex-col-reverse md:flex-row  flex justify-between">
          <div class=" md:w-[50vw] h-[auto]   p-[20px]  justify-between">
            <div className="w-[auto] h-[250px] ">
              <div className="flex gap-4 py-4">
                <Image
                  className="w-6"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/bxs_phone-call.svg"
                  alt="phone"
                  width={24}
                  height={24}
                />  
            
              <Link href="tel:+919009000798" className="flex items-center mt-2">
                  <span className="text-[20px]"> +(91) 900 900 0798</span>
                </Link>
               
              </div>
              <div className="flex gap-4 py-4">
                <img
                  className="w-6"
                  src="/images/icon/ic_sharp-email.svg"
                  alt=""
                />
                 <Link href="mailto:info@XtendedSpace.com" className="text-[20px]">
                 info@XtendedSpace.com
                </Link>
                
              </div>
              <div className="flex gap-4 py-4">
                <img className="w-6" src="/images/icon/Location.svg" alt="" />
                <h3 className="text-[20px] ">
                  A-96, Sector - 63 Noida-201301, A Block,
                  Noida, Uttar Pradesh
                </h3>
              </div>
            </div>
            {/* <div className="flex gap-3">
              <a href="#">
                <img
                  className=" p-2 rounded-[50%]"
                  src="/images/icon/twitter.svg"
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  className=" p-2 rounded-[50%]"
                  src="/images/icon/instagram.svg"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  className=" p-2 rounded-[50%]"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/discord.svg"
                  alt="discord"
                  width={50}
                  height={50}
                />
              </a>
            </div> */}
          </div>

          <div class="md:w-[50vw]  h-[300px] relative ">
            <div class="card price-sec  md:w-full p-3 absolute z-10 top-[-100px] md:top-[-160px] mx-3    md:right-0 storage-price pb-0">
              {/* <div class=" "> */}
              <form action="#" onSubmit={handleSubmit} method="POST">
                <div class="grid grid-cols-2 gap-2 md:gap-4 md:px-10">
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="first_name"
                      class="block mb-1"
                    >
                      First Name:
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Enter First Name"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="last_name"
                      class="block mb-1"
                    >
                      Last Name:
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Enter Last Name"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="email"
                      class="block mb-1"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                    {multipleError?.Email && (
                      <p className="text-sm text-red-500">{multipleError?.Email}</p>
                    )}
                  </div>
                  <div class="mb-4">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="phone"
                      class="block mb-1"
                    >
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      placeholder="Enter Number"
                      class="w-full p-2 border-b border-gray-300  focus:outline-none"
                      onChange={handleChange}
                      required
                    />
                    {multipleError?.PhoneNumber && (
                      <p className="text-sm text-red-500">{multipleError?.PhoneNumber}</p>
                    )}
                  </div>
                  {/* <div class="mb-4">
               <label for="subject" class="block mb-1">Subject:</label>
               <select id="subject" name="subject" class="w-full p-2 border border-gray-300 rounded" required>
                  <option value="">Select Subject</option>
                  <option value="general_enquiry">General Enquiry</option>
               </select>
            </div> */}

                  {/* <div class="mb-4 col-span-2">
                    <label class="block mb-1  text-[#1B1C57] text-xl font-bold">
                      Select Subject:
                    </label>
                    <div class=" justify-between flex ">
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                    </div>
                    <div class=" justify-between flex ">
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="general"
                        /> 
                        General Enquiry
                      </label>
                      <label className="flex  text-[#1B1C57] text-sm font-normal  justify-start items-center ">
                        <input
                          className="w-5"
                          type="radio"
                          name="subject"
                          onChange={handleChange}
                          value="deepak"
                        /> 
                        General Enquiry
                      </label>
                    </div>
                  </div> */}
                  <div class="mb-4 col-span-2">
                    <label
                      className="block  text-[#1B1C57] text-sm font-normal"
                      for="message"
                      class="block mb-1"
                    >
                      Message:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="1"
                      placeholder="Type Message.."
                      class="w-full p-2 border-b border-gray-300 focus:outline-none "
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-checkbox py-2 col-span-2">
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
<span className="error text-[12px] col-span-2 mb-2 text-red-500">{errors.checkError}</span>

</div>

                </div>

                <div class="text-center  mb-4">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {loader ? (
                      <>
                        Submitting
                        <Spinner animation="border" style={{ width: "25px", height: "25px", marginLeft: "10px" }} />
                      </>
                    ) : (
                      "Submit"
                    )}                  </button>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
