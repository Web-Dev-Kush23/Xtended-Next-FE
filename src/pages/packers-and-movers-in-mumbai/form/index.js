import { SaveMumbai } from "@/service/homePageService";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { submitForm } from "@/util/common";
import { useSearchParams } from "next/navigation";
import Hubspot from "@/pages/hubspot";
import Image from "next/image";
import { IoCall } from "react-icons/io5";
import { Spinner } from "react-bootstrap";
import { sendDataToAPI } from "@/service/leads";

const Form = () => {
  const [data, setData] = useState({
    Name: "",
    Mobile: "",
    Location: "",
    source: "Relocation_Mumbai",
    AddType: "RELOCATION",
  });
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [utm, setUtm] = useState({});

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {setErrors((prevErrors) => ({...prevErrors,checkError: "",}));}};
    
  const [errors, setErrors] = useState({
    nameError: "",
    mobileError: "",
    locationError: "",
  });
  // const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();
  const [displayText, setDisplayText] = useState("Perfect For your Household Needs");
  const [scrollY, setScrollY] = useState(false);
  const [isBtnEnable, setBtnEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
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
    const interval = setInterval(() => {
      setDisplayText((prevText) =>
        prevText === "Perfect For your Business Needs"
          ? " Perfect For your Household Needs"
          : "Perfect For your Business Needs"
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (data.Name && data.Mobile && data.Location) {
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMultipleError("");
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
    if (!isChecked) {setErrors((prevErrors) => ({...prevErrors, checkError: "Please agree to the terms and conditions before submitting.",})); return;}
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
        submitForm(formData);
        if (response.success) {
          await sendDataToAPI(data, utm); 
          setHubspotFormSubmit(true);
          document.getElementById("myform").reset();
          // router.push("/packers-and-movers-in-mumbai/thankyou");
        } else {
          if (
            response.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response.error.errors);
          }
          if (response?.error?.errors) {
            setGeneralError(response.error.errors);
          }
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
        // locationError: !data.Location ? 'Location is required.' : '',
        emailError: !validateEmail(data.Email)
          ? "Please enter a valid email address."
          : "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Hubspot
        portalId="45810273"
        formId="374ac63e-892f-4ea1-b043-33e14a6a880e"
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
        style={{
          backgroundImage:
           "url(https://xtendedspace.s3.ap-south-1.amazonaws.com/static/banners.jpg)"
        }}
      >
        <div className="header-content">
          <div className="header-title">
            <h1>PACKERS AND MOVERS</h1>
            <div id="textContainer">
            <span>{displayText}</span>
            </div>
          </div>
        </div>
        <div className="header-form">
          <div className="form-container">
            <form id="myform" onSubmit={handleSubmit}>
              <div className="form-top py-2">
                <h4>
                  Get a Free Quote!
                </h4>
           
              </div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                name="Name"
                required
                // onInput="validateInput()"
                onChange={onChange}
              />
              <br />
              {errors.nameError && (
                <div className="error mb-2">{errors.nameError}</div>
              )}

              {multipleError && multipleError.Name && (
                <p className="text-base text-red-500">
                  {multipleError.Name[0]}
                </p>
              )}

              <div className="error mb-2" id="nameError"></div>
              <input
                type="tel"
                id="mobile"
                placeholder="Mobile"
                name="Mobile"
                required
                maxLength={10} // Restricts input to 10 digits
                onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
                // onInput="validateMobile(this)"

                onChange={onChange}
              />
              <br />
              {errors.mobileError && (
                <div className="error mb-2  text-red-500">
                  {errors.mobileError}
                </div>
              )}

              {multipleError && multipleError.Mobile && (
                <p className="text-base text-red-500 ">
                  {multipleError.Mobile[0]}
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
                id="location"
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
                <p className="text-base text-red-500">
                  {multipleError.Location[0]}
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
                   ? `font-bold text-[20px] bg-green-600 w-full h-auto py-10 rounded-lg animation-btn text-white `
                    : "disable-btn text-white text-center w-full h-auto py-10 rounded-lg border-1px text-[20px] font-bold"
                }
              >
                  Book Now {isSubmitting && <Spinner animation="border" style={{ width: "25px", height: "25px", marginLeft: "6px" }} />}
              </button>
            </form>
          </div>
        </div>
        <div className="slidingservice">
          <div className="header-images">
            <div className="header-image">
              <img
                src="images\relocation-image\household-item-shifting.webp"
                alt="storage items doorstep pickup"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\packer-and-movers-household-shifting.webp"
                alt="packing and moving services"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\Packers-movers-three-layer-packing.webp"
                alt=" Packers movers three layer packing"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-doorstep-pickup.webp"
                alt="relocation item doorstep pickup.webp"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-moving.webp"
                alt="relocation-item-moving"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-packaging.webp"
                alt="relocation itemp ackaging"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-packed.webp"
                alt="relocation item packed"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-store-warehouse.webp"
                alt="relocation item store warehouse"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\Storage-space-packing-goods.webp"
                alt="Storage space packing goods"
              />
            </div>
            <div className="header-image">
              <img
                src="images\relocation-image\relocation-item-moving.webp"
                alt="relocation item moving"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
