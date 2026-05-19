import React, { useState, useEffect, useCallback } from "react";
import { SaveMumbai } from "@/service/homePageService";
import { useRouter } from "next/router";
import { submitForm } from "@/util/common";
import { useSearchParams } from "next/navigation";
import Hubspot from "@/pages/hubspot";
import Image from "next/image";
import { IoCall } from "react-icons/io5";
import img from "../../../../public/images/santaimg1.jpg"
import { sendDataToAPI } from "@/service/leads";
const Herosection = () => {
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [utm, setUtm] = useState({});

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "", })); }
  };

  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Location: "",
    source: "Storage Mumbai",
    AddType: "STORAGE",
  });
  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    locationError: "",
  });
  const [displayText, setDisplayText] = useState(" Perfect For your Household Needs");
  const [multipleError, setMultipleError] = useState();
  // const [error, setError] = useState();
  const [scrollY, setScrollY] = useState(false);
  const [isBtnEnable, setBtnEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onScroll = useCallback((event) => {
    setScrollY(window.pageYOffset > 180);
  }, []);
  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, []);

  useEffect(() => {
    if (
      data.Name &&
      data.Mobile &&
      data.Location &&
      validateEmail(data.Email)
    ) {
      if (
        (data.Mobile.charAt(0) === "0" && data.Mobile.length === 11) ||
        data.Mobile.length === 10
      ) {
        setBtnEnabled(true);
      } else {
        setBtnEnabled(false);
      }
    } else {
      setBtnEnabled(false);
    }
  }, [data]);
  const validateMobile = (mobile) => /^0?[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "Perfect For your Business Needs"
          ? " Perfect For your Household Needs"
          : "Perfect For your Business Needs"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "Mobile" && !validateMobile(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobileError: "Please enter a valid mobile number.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, mobileError: "" }));
    }
    if (name === "Email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: "" }));
    }
    setGeneralError("");
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
    const utmParams = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_content: searchParams.get("utm_content"),
      utm_term: searchParams.get("utm_term"),
      gclid: searchParams.get("gclid"),
      referrer: searchParams.get("referrer"),
    };
    setUtm(utmParams);
  }, [searchParams]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "Please agree to the terms and conditions before submitting.", })); return; }

    if (isSubmitting) return;
    setIsSubmitting(true);
    if (data.Name && validateMobile(data.Mobile) && data.Location) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      if (utm_source) {
        formData.append("UTM_Source", utm_source);
        formData.append("UTM_Medium", utm_medium);
        formData.append("UTM_Campaign", utm_campaign);
        formData.append("UTM_Content", utm_content);
        formData.append("UTM_Term", utm_term);
        formData.append("Gclid", gclid);
        formData.append("Referrer", referrer);
      }
      try {
        const response = await SaveMumbai(formData);
        // console.log("response===", response);
        submitForm(formData);

        if (response.success) {
          await sendDataToAPI(data, utm); 
          setHubspotFormSubmit(true);
          // setTimeout(() => {
          //   if (response.success) {
          //     router.push("/storage-space-facilities-in-mumbai/thankyou");
          //   }
          // }, 250);
          document.getElementById("myform").reset();
          // router.push("/storage-space-facilities-in-mumbai/thankyou");
        } else {
          if (
            response?.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response.error?.errors);
          }
          if (response?.error?.errors) {
            setGeneralError(response.error.errors);
          }
          //  document.getElementById("myform").reset();
          setErrors((prevErrors) => ({
            ...prevErrors,
            formError: response.error.text || "An Error occurred",
          }));
        }
      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors({
        nameError: !data.Name ? "Name is required." : "",
        mobileError: !validateMobile(data.Mobile)
          ? "Please enter a valid mobile number."
          : "",
        locationError: !data.Location ? "Location is required." : "",
        emailError: !validateEmail(data.Email)
          ? "Please enter a valid email address."
          : "", // Email validation error
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Hubspot
        portalId="45810273"
        formId="1bd2ed24-e84f-47b0-bf7c-f22352a2cfe5"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
        utm={utm}


      />

      <div className="landingnav flex justify-between h-[80px] items-center sticky top-0 z-50 bg-white w-[100%]">
        <div className="">
          <img
            className="logo"
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
            alt="Xtended Space Logo"
          />
        </div>
        <div className="">
          <a className="flex items-center gap-2" href="tel:+919009000798">
            <div className=" h-8 w-8 lg:bg-blue-500 rounded-full text-[20px] flex justify-center text-blue-500 lg:text-white">
              <IoCall className="m-auto" />
            </div>
            <span className="text font-bold"> +(91) 900 900 0798</span>
          </a>
        </div>
      </div>
      <section
        className="header"
        id="header"
        style={{ backgroundImage: "url(https://xtendedspace.s3.ap-south-1.amazonaws.com/static/banners.jpg)" }}
      >

        {/* <img src='https://xtendedspace.s3.ap-south-1.amazonaws.com/home/xtended-space-white-logo.png'alt='Xtended Space Logo'/> */}
        <div className="header-content">
          <div className="header-title">
            <h1>Storage Facilities In Mumbai</h1>
            <div id="textContainer">
              <div id="textContainer">
                <span>{displayText}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-form">
          <div className="form-container">
            <form id="myform" className="p-0 bg-white" onSubmit={handleSubmit}>
            <div className="form-top py-2">
                <h4>
                  Get a Free Quote!
                </h4>
           
              </div>
              {/* <div className="form-top pt-0">
                <img src={img.src} className="mb-3"/>
              </div> */}
              <div className="px-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="Name"
                  required
                  onChange={onChange}
                />
                {multipleError && multipleError.Name && (
                  <p className="text-base text-red-500">
                    {multipleError.Name[0]}
                  </p>
                )}
                <br />

                <div className="error mb-2" id="nameError"></div>

                <input
                  type="tel"
                  id="mobile"
                  placeholder="Mobile"
                  name="Mobile"
                  required
                  maxLength={10} // Restricts input to 10 digits
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                  onChange={onChange}
                />
                <br />
                {errors.mobileError && (
                  <div className="error mb-2  text-red-500">
                    {errors.mobileError}
                  </div>
                )}
                {multipleError && multipleError.Mobile && (
                  <p className="text-sm text-red-500">
                    {multipleError?.Mobile[0]}
                  </p>
                )}

                <div className="error mb-2" id="mobileError"></div>
                <input
                  type="text"
                  id="Email"
                  placeholder="Email"
                  name="Email"
                  required
                  onChange={onChange}
                />
                <br />
                <span className="error mb-2 text-red-500">
                  {errors.emailError}
                </span>

                {/* {multipleError && multipleError.Email && (
                  <p className="text-base text-red-500 mb-2">
                    {multipleError.Email[0]}
                  </p>
                )} */}
                <div className="error mb-2" id="EmailError"></div>

                <select
                  id="location "
                  name="Location"
                  required
                  className="py-3"
                  onChange={onChange}
                >
                  <option value="" disabled selected>
                    Pickup Location
                  </option>
                  <option value="South Mumbai">South Mumbai</option>
                  <option value="Western Suburbs">Western Suburbs</option>
                  <option value="Eastern Suburbs">Eastern Suburbs</option>
                  <option value="Central Mumbai">Central Mumbai</option>
                  <option value="Thane">Thane</option>
                  <option value="Navi Mumbai">Navi Mumbai</option>
                </select>
                <br />
                {multipleError && multipleError.Location && (
                  <p className="text-sm text-red-500">
                    {multipleError?.Location[0]}
                  </p>
                )}
                {generalError && (
                  <p className="text-base text-red-500 mb-2">{generalError}</p>
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
                          <span className="text-blue-500 underline mx-1">
                            Terms & Conditions
                          </span>
                        </a>
                        and
                        <a href="/privacy-policy" target="_blank">
                          <span className="text-blue-500 underline mx-1">
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
                  disabled={!isBtnEnable || isSubmitting}
                  
                  className={
                    isBtnEnable && isChecked
                      ? `font-bold  mb-4 text-[20px]  w-full h-auto py-10 rounded-lg animation-btn text-white `
                      : "disable-btn mb-4   text-white text-center w-full h-auto py-10 rounded-lg border-1px text-[20px] font-bold"
                  }
                >
                  Book Now
                </button>
              </div>

            </form>
          </div>
        </div>
        <div className="slidingservice">
          <div className="header-images">
            <div className="header-image">
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/business-inventory-items-shifting.webp"
                alt="BusinessMumbai"
                width={200}
                height={200}
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/household-items-packing-service.webp"
                alt="household items packing service in Mumbai"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/household-shifting.webp"
                alt="household items shifting in storage units"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/item-store-storage-facility.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/lobour-move-items.webp"
                alt="labour moving items door to storage units"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/Storage-space-packing-goods.webp"
                alt="Storage units Item stored image"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/storage-unit-moving-items.webp"
                alt="home to storage unit move items"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/storage-unit-storage-in-mumbai.webp"
                alt="door to storage units moving items"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/three-layer-packing-storage-items.webp"
                alt="three layer packing for safety"
              />
            </div>
            <div className="header-image">
              <img
                src="images/storage-space-stored-items/storage-unit-stored-items-in-thane.webp"
                alt="storage unit stored items in thane"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
