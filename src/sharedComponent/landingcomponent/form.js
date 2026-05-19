import React, { useEffect, useState } from 'react';
import { SaveCityWiseLandingDetails } from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { submitForm } from "@/util/common";
import Hubspot from "@/pages/hubspot";
import { useRouter } from "next/router";
import FormModal from "@/sharedComponent/modal/formModal";
import { SiNike } from "react-icons/si";
import { sendDataToAPI } from "@/service/leads";

const ModalBody = ({ setModalShow }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[110px] h-[110px] border-8 rounded-full border-lime-500 text-[100px] text-lime-500 " style={{ border: '5px solid #84cc16' }}>
          <SiNike />

        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-center mb-6">
          We will connect with you soon.
        </p>
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
const Form = ({ AddType, Location }) => {
  // State to manage form input values
  const [data, setData] = useState({
    Name: '',
    Mobile: '',
    Email: '',
    AddType: AddType === "packers-and-movers"
    ? "RELOCATION"
    : AddType === "storage-space"
    ? "STORAGE"
    : AddType,
    source: `${AddType || ''} - ${Location || ''}`,
    Location: Location,
  });

  const [utm, setUtm] = useState({});
  // State to manage form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false)
  const [generalError, setGeneralError] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "", })); }
  };

  // State to manage errors
  const [errors, setErrors] = useState({
    nameError: '',
    mobileError: '',
    emailError: '',

  });

  // Handle input changes
  const validateMobile = (mobile) => /^0?[0-9]{10}$/.test(mobile);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation regex
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Reset errors on input change
    setErrors(prevErrors => ({ ...prevErrors, [`${name.toLowerCase()}Error`]: '' }));

    if (name === 'Mobile' && !validateMobile(value)) {
      setErrors(prevErrors => ({ ...prevErrors, mobileError: 'Please enter a valid mobile number.' }));
    }
    if (name === 'Email' && !validateEmail(value)) {
      setErrors(prevErrors => ({ ...prevErrors, emailError: 'Please enter a valid email address.' }));
    }
    setGeneralError({});

    setErrors("")
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
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "Please agree to the terms and conditions before submitting.", })); return; }

    if (isSubmitting) return;
    setIsSubmitting(true);


    if (data.Name && validateMobile(data.Mobile)) {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

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
        const response = await SaveCityWiseLandingDetails(formData);
        submitForm(formData);
        if (response.success) {

          await sendDataToAPI(data, utm);
          setHubspotFormSubmit(true);
          setTimeout(() => {
            setModalShow(true);
          }, 250);
          setTimeout(() => {
            setModalShow(false);
            if(AddType=="packers-and-movers"){
              router.push("/services/packers-and-movers")
            }else if(AddType=="storage-space"){
              router.push("/store-at-a-warehouse")
            }
          }, 3000);
          document.getElementById("myform").reset();

          // setGeneralError(response.error.errors);
        } else {

          setGeneralError(response.error.errors);
        }
      } catch (error) {
        console.error("Error!", error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
    else {
      setErrors({
        nameError: !data.Name ? 'Name is required.' : '',
        mobileError: !validateMobile(data.Mobile) ? 'Please enter a valid mobile number.' : '',
        emailError: !validateEmail(data.Email) ? 'Please enter a valid email address.' : '',
      });
      setIsSubmitting(false);
    }

  };

  return (
    <>
      <Hubspot portalId="45810273" formId="1bd2ed24-e84f-47b0-bf7c-f22352a2cfe5" hubspotFormSubmit={hubspotFormSubmit} data={data} utm={utm} />
      <form id='myform' onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl lg:rounded-3xl shadow flex flex-col items-center justify-around p-[20px] lg:p-[40px] gap-3">
          <h2 className="font-bold text-[26px] md:text-[32px] text-[#1B1C57]">
            Get Your Free Quote
          </h2>
          <div className="flex flex-col items-start justify-center w-full">
            <p className="text-[#1B1C57] font-bold text-[14px]">Name</p>
            <input
              type="text"
              onChange={handleChange}
              className="w-full outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
              placeholder="Enter Name"
              name="Name"
              value={data?.Name}
            // required
            />
            {generalError?.Name && (
              <p className="text-sm text-red-500">{generalError?.Name}</p>
            )}
            {errors.nameError && <p className="text-red-500 text-[13px] ">{errors.nameError}</p>}
          </div>
          <div className="flex flex-col items-start justify-center w-full">
            <p className="text-[#1B1C57] font-bold text-[14px]">Phone Number</p>
            <input
              type="number"
              onChange={handleChange}
              name="Mobile"
              value={data?.Mobile}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}

              className="w-full outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
              placeholder="Mobile Number"
            // required
            />
            {errors.mobileError && <p className="text-red-500 text-[13px]">{errors.mobileError}</p>} {/* Error message for Mobile */}
            {generalError?.Mobile && (
              <p className="text-sm text-red-500">{generalError?.Mobile}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center w-full">
            <p className="text-[#1B1C57] font-bold text-[14px]">Email</p>
            <input
              type="text"
              name="Email"
              value={data?.Email}
              onChange={handleChange}
              className="w-full outline-none border-[1px] rounded lg:rounded-3xl text-[14px] pl-3 h-[40px]"
              placeholder="Enter Email"
            // required
            />
            {errors.emailError && <p className="text-red-500 text-[13px]">{errors.emailError}</p>} {/* Error message for Email */}
            {generalError?.Email && (
              <p className="text-sm text-red-500">{generalError?.Email}</p>
            )}
          </div>
          <div className="form-checkbox py-2 w-full">
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
            disabled={isSubmitting}
            className="bg-blue-500 text-white w-full py-2 rounded lg:rounded-3xl"
          >
            Submit
          </button>
        </div>
      </form>
      <FormModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"mm"}
        title=""
      />
    </>
  );
};

export default Form;
