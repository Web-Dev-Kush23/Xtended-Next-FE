import React, { useEffect, useState } from "react";
import Hubspot from "./hubspotpopup";
import FormModal from "@/sharedComponent/modal/formModal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import Image from 'next/image';
const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Location: "n/a",
  });
  const [errors, setErrors] = useState({
    nameError: '',
    mobileError: '',
    EmailError: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const urlTextMapping = {
    "/packers-and-movers-in-mumbai": { h2: "Buy Storage", h3: "Anytime & Anywhere" },
    "/storage-space-facility-in-delhi-ncr": { h2: "Store Securely", h3: "Your Items, Our Responsibility" },
    "/warehouse-storage-service-in-mumbai": { h2: "Affordable Storage", h3: "Easy & Convenient" },
    // Add more mappings for different URLs
  };
  useEffect(() => {
    // Save current page URL in localStorage
    const url = window.location.pathname;
    setCurrentPageUrl(url);
    localStorage.setItem("currentPageUrl", url);

    const submitted = localStorage.getItem("formSubmitted");
    if (!submitted) {
      const initialPopupTimer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(initialPopupTimer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    const reopenTimer = setTimeout(() => {
      const submitted = localStorage.getItem("formSubmitted");
      if (!submitted) {
        setIsVisible(true);
      }
    }, 100000);

    return () => clearTimeout(reopenTimer);
  };

  const validateMobile = (mobile) => /^0?[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === 'Mobile' && !validateMobile(value)) {
      setErrors(prevErrors => ({ ...prevErrors, mobileError: 'Please enter a valid mobile number.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, mobileError: '' }));
    }
    if (name === 'Email' && !validateEmail(value)) {
      setErrors(prevErrors => ({ ...prevErrors, emailError: 'Please enter a valid email address.' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, emailError: '' }));
    }
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      ...data,
      UTM_Source: utm_source || "",
      UTM_Medium: utm_medium || "",
      UTM_Campaign: utm_campaign || "",
      UTM_Content: utm_content || "",
      UTM_Term: utm_term || "",
      Gclid: gclid || "",
      Referrer: referrer || "",
    };
    setData(formData);

    setFormSubmitted(true);
    setHubspotFormSubmit(true);

    // Save form data to localStorage for use on other pages
    localStorage.setItem("formSubmitted", "true");
    localStorage.setItem("formData", JSON.stringify(data));

    setIsVisible(false);
  };
  const { h2, h3 } = urlTextMapping[currentPageUrl] || { h2: "Anytime & Anywhere", h3: "Buy Storage" };

  return (
    <div>
      <Hubspot 
        portalId="45810273"
        formId="468c83bf-682f-46f1-82c5-e9896d260460"
        hubspotFormSubmit={hubspotFormSubmit}
        data={{ ...data, currentPageUrl }}
      />
            <div className={isVisible ? "blur-sm" : ""}>
</div>
      {isVisible && (
        <div className="w-[100vw] h-[100vh] bg-[#000000c0]  top-[0] left-[0] fixed z-[999999999]">

        <div className="w-[90vw] lg:w-1/3 h-[500px] bg-white rounded-lg  z-[999999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-[2px] shadow-2xl absolute">
          <div className="right-1 p-2 absolute">
            <button onClick={handleClose} className="text-2xl">
              &times;
            </button>
          </div>
          <div className="text-center w-full h-2/5 flex flex-col justify-center items-center bg-[radial-gradient(#6ea2ef96,_white)]">
            <Image
            width={250}
            height={100}
            priority
            sizes="100vw"
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Images/pile-cardboard-boxes-floor-empty-apartment+1-min.webp"
              alt=""
            />
            <h3 className="text-[#1B1C57] text-[16px] md:text-[20px] ">{h3}</h3>
            <h2 className="text-[18px] md:text-[26px] text-[#1B1C57] font-bold">{h2}</h2>
          </div>
          <form onSubmit={handleSubmit} className="popupwebsite">
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <input
                type="text"
                onChange={onChange}
                placeholder="Enter Name"
                name="Name"
                className="rounded border w-full p-[10px]"
                required
              />
              <span className="error mb-2 text-red-500">{errors.nameError}</span>
            </div>
            <div>
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="text"
                onChange={onChange}
                name="Email"
                placeholder="Enter Email"
                className="rounded border w-full p-[10px]"
                required
              />
              <span className="error mb-2 text-red-500">{errors.emailError}</span>
            </div>
            <div>
              {/* <label htmlFor="phone">Phone Number</label> */}
              <div className="w-full flex gap-2 items-center">
                <span className="rounded border w-[50px] p-[10px]">+91</span>
                <input
                  type="tel"
                  onChange={onChange}
                  name="Mobile"
                  placeholder="Enter Number"
                  pattern="[0-9]*"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                  }}
                  className="rounded w-full border p-[10px]"
                  required
                />
              </div>
              {errors.mobileError && <div className="error mb-2 text-red-500">{errors.mobileError}</div>}
            </div>
            <button type="submit" className="rounded w-full border p-[10px] bg-blue-600 text-white">Submit</button>
          </form>
        </div>
        </div>

      )} 


    </div>

    
  );
};

export default Index;
