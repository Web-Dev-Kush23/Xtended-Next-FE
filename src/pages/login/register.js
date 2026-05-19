import {
  authUserOtpVerify,
  emailPhoneOtpVerify,
  newUserRegister,
  registerAuthUserOtpVerify,
  registerResendOtp,
  resendEmailOtp,
} from "@/service/authService";
import { SaveUserPhoneNumber } from "@/service/storageService";
import Otpinput from "@/sharedComponent/otpVerify";
import SimpleSlider from "@/sharedComponent/slider15";
import { localStorageManager } from "@/util/common";
import { INDIA_STATE } from "@/util/constant";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { LuPartyPopper } from "react-icons/lu";
import { sendDataToAPI } from "@/service/leads";

// import { servivePinCode } from "@/util/constant";
import { getCityNearby } from "@/service/storageService";
import OTPCounter from "@/sharedComponent/otpCounter";
import EmailOtpinput from "@/sharedComponent/EmailOtpVerify";
import HubspotRegister from "@/pages/hubspot";
export default function register({
  phoneNumber,
  firstName,
  lastName,
  email,
  userId,
  regModal,
  setRegisterModal,
  callback,
  props,
}) {
  // const [firstName, setFirstName] = useState("")

  const [error, setError] = useState();
  const [errors, setErrors] = useState({});
  const [otpShow, setOtpShow] = useState(false);
  const [otpvalue, setOtpvalue] = useState();
  const [emailotpvalue, setemailOtpvalue] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [multipleError, setMultipleError] = useState();
  const [imageFiles, setimageFiles] = useState();
  const [addressNearby, setAddressNearby] = useState();
  const [showOrgReg, setShowOrgReg] = useState("individual");
  const apiCallInitiated = useRef(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [utm, setUtm] = useState({});
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);
  const [data, setData] = useState({
    country: "india",
    Pincode: "",
    phoneNumber: phoneNumber || "",
    firstname: firstName || "",
    lastName: lastName || "",
    email: email || "",
    companyName: "",
    source: "signup",
    // SignupType : showOrgReg === "individual" ? "Individual" : "Organization"
  });

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) {
      setErrors((prevErrors) => ({ ...prevErrors, checkError: "" }));
    }
  };

  function capitalizeFirstChar(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data.Pincode}`;
      const response = await getCityNearby(args);

      if (response.success) {
        setAddressNearby(response.success);
        setData((prevData) => ({
          ...prevData,
          District: response.success[0].district,
          City: response.success[0].city,
          State: response.success[0].state,
        }));
      } else {
        console.error("Failed to fetch nearby cities", response.error);
        setError(response.error?.error);
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };
  useEffect(() => {
    if (data.Pincode?.length === 6) {
      if (data.Pincode) {
        fetchNearbyCities();
      } else {
        setError("Sorry, Service not available");
      }
    }
  }, [data.Pincode]);
  useEffect(() => {
    const storedData = localStorageManager.getValue("landing_page_data");

    if (storedData && !apiCallInitiated.current) {
      const parsedData = JSON.parse(storedData);

      if (!userId) {
        return;
      }

      if (parsedData) {
        const registerUser = async () => {
          setLoader(true);
          setData((prevData) => ({
            ...prevData,
            phoneNumber: parsedData.Mobile,
          }));
          const formData = new FormData();
          formData.append("userType", "User");
          formData.append("PhoneNumber", parsedData.Mobile);
          formData.append("email", parsedData.Email);
          formData.append("firstname", parsedData.Name);
          formData.append("lastName", parsedData.Name);

          const response = await newUserRegister(formData);
          setLoader(false);

          if (response.success) {
            setError("");
            setOtpShow(true);
            localStorageManager.setValue("landing_page_data", "");
          } else {
            setError(response.error?.text || "Failed to register new user");
          }
        };

        apiCallInitiated.current = true;
        registerUser();
      }
    }
  }, [userId]);

  if (loader) {
    return <div></div>;
  }
  const handleFileChange = (e) => {
    // Handle file selection here
    const file = e.target.files[0];
    setimageFiles(file);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
// if(name === "companyName"){
// setData({ 
//         ...data, 
//         companyName: value,
//         firstname: value,        // ✅ Backend ke liye firstname field
//         lastName: "Organization" // ✅ Backend ke liye lastName field
// });
// }else{
 setData({ ...data, [name]: value });
// }
   

    setError(undefined);
    setMultipleError({ ...multipleError, [capitalizeFirstChar(name)]: "" });

    if (name === "firstname") {
      setMultipleError({ ...multipleError, ["FirstName"]: "" });
    }
  };
  useEffect(() => {
    const utmRaw = sessionStorage.getItem("utm_data");
    console.log(utmRaw, "utm raw");
    if (utmRaw) {
      try {
        const parsedUtm = JSON.parse(utmRaw);
        setUtm(parsedUtm);
      } catch (error) {
        console.error("Failed to parse UTM data from sessionStorage:", error);
      }
    }
  }, []);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        checkError:
          "Please agree to the terms and conditions before submitting.",
      }));
      return;
    }
    // if (showOrgReg === "organization" && !data.companyName.trim()) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     companyName: "Please enter company name",
    //   }));
    //   return;
    // }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const allKeys = Object.keys(data);
    const formData = new FormData();
    formData.append(
      "SignupType",
      showOrgReg === "individual" ? "Individual" : "Organization"
    );
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    if (imageFiles) {
      formData.append("imageFiles", imageFiles);
    }

    if (utm && Object.keys(utm).length > 0) {
      formData.append("UTM_Source", utm.source || "");
      formData.append("UTM_Medium", utm.medium || "");
      formData.append("UTM_Campaign", utm.campaign || "");
      formData.append("UTM_Content", utm.content || "");
      formData.append("UTM_Term", utm.term || "");
    }
    let response;
    await sendDataToAPI(data, utm);
    setHubspotFormSubmit(true);

    if (userId) {
      const args = `?ApplicationUserId=${userId}&phoneNumber=${data.phoneNumber}`;
      response = await SaveUserPhoneNumber(args);
    } else {
      response = await newUserRegister(formData);
    }

    if (response.success) {
      setOtpShow(true);
    } else {
      if (
        response?.error?.title === "Registration Failed" &&
        response?.error?.text === "User is already registered"
      ) {
        setError("User is already registered");
      } else if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response.error?.errors);
      } else {
        setError(response.error?.text || "An Error occurred");
      }
      setIsSubmitting(false);
    }
  };

  const orderedKeys = ["otp1", "otp2", "otp3", "otp4"];
  const handleSubmitOtp = async (e) => {
    e.preventDefault();

    if (!otpvalue) {
      setError({ text: "Please enter otp" });
      return;
    }
    let newOtpValue = "";
    orderedKeys.forEach((item) => {
      newOtpValue += otpvalue[item];
    });

    const getArgs = `?Number=${data.phoneNumber}&Code=${newOtpValue}`;

    const formData = new FormData();
    // formData.append("Email", data.email);
    formData.append("Phone", data.phoneNumber);
    // formData.append("EmailOtp", newemailOtpValue);
    formData.append("MobileOtp", newOtpValue);
    formData.append("UserType", "User");

    const res = await registerAuthUserOtpVerify(getArgs);
    setOtpvalue();
    setemailOtpvalue(); //

    if (res.success) {
      localStorageManager.setValue(
        "userDetails",
        JSON.stringify(res.success.data)
      );

      // await sendDataToAPI(data, utm);
      //     setHubspotFormSubmit(true);
      setOtpShow(true);
      const { callback } = router.query;
      if (regModal) {
        setRegisterModal(false);
        // if (props?.navigateTo !== '/affordable-storage') {
        //   router.push(`/${props.navigateTo}`);
        // }
        if (props?.packersMovers) {
          props.packerMoverSave();
        }
        if (props.p2p) {
          props.saveBooking();
        }
        if (props.easyStorage) {
          props.saveStorage();
        }
      } else {
        if (callback) router.push("/" + callback);
        else router.push("/");
      }

      // setOtpShow(true)
    } else {
      setError(res.error);
    }
  };

  const resendOtp = async () => {
    const args = `?mobileNumber=${data.phoneNumber}&userType=User`;

    const response = await registerResendOtp(args);
    setOtpvalue();
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      setError(response.error);
    }
  };

  const resendEmailOtpHandler = async () => {
    const args = `?Email=${data.email}&userType=User`;

    const response = await resendEmailOtp(args);
    setOtpvalue();
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      setError(response.error);
    }
  };
  // console.log("🔥 UTM received by HubspotRegister:", utm);
  return (
    <>
      <HubspotRegister
        portalId="45810273"
        formId="4636b03e-fde0-49a2-9192-849036c12c05"
        hubspotFormSubmit={hubspotFormSubmit}
        data={data}
      />

      <div className="">
        <div className="row">
          <div className="col-md-6">
            <SimpleSlider />
          </div>

          <div className="col-md-6">
            <div>
              <section class="bg-gray-50">
                <div className="flex justify-center items-center pt-4">
                  <a href="/">
                    <img
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
                      alt=""
                      className="w-[200px] h-auto"
                    />
                  </a>
                </div>

                <div class="flex flex-col items-center justify-center px-0 py-8 mx-auto  lg:py-0">
                  <div class="w-full mb-4 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                    <div class="px-6 space-y-4 md:space-y-4 sm:p-8">
                      <h1 class="text-2xl  text-[#1B1C57] font-semibold leading-tight tracking-tight  md:text-2xl  flex justify-center items-center">
                        Let's Get Started!
                      </h1>
                      <div className="flex justify-between items-center">
                        <p className="flex items-center font-semibold text-[14px] text-gray-700">
                          <input
                            type="radio"
                            checked={showOrgReg == "individual"}
                            onChange={() => setShowOrgReg("individual")}
                            className="mr-2 text-blue-500"
                          />
                          Sign in as individual
                        </p>
                        {/* <p className=" font-semibold text-[14px] text-gray-700">
                          <input
                            type="radio"
                            checked={showOrgReg == "organization"}
                            onChange={() => setShowOrgReg("organization")}
                            className="mr-2 text-blue-500"
                          />
                          Sign in as organization
                        </p> */}
                      </div>
                      {otpShow ? (
                        <div class="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                          <div class="p-3 space-y-4 md:space-y-6 ">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl ">
                              Enter the OTP sent to your mobile
                            </h1>
                            <form
                              class="space-y-4 md:space-y-6"
                              onSubmit={handleSubmitOtp}
                            >
                              {/* <p className="mt-0">Mobile OTP</p> */}
                              <Otpinput
                                setOtpvalue={setOtpvalue}
                                otpvalue={otpvalue}
                              />
                              <div>
                                <OTPCounter onClick={resendOtp} />
                              </div>

                              <button
                                type="submit"
                                class="w-full text-white flex justify-center items-center  font-semibold rounded-lg text-lg px-0 py-2.5 text-center bg-blue-700"
                              >
                                Verify OTP
                              </button>
                              {error && (
                                <p className="text-base text-danger">
                                  {error?.text}
                                </p>
                              )}
                            </form>
                          </div>
                        </div>
                      ) : (
                        <>
                          <form
                            id="myform"
                            class="space-y-4 md:space-y-6"
                            onSubmit={onsubmitHandler}
                          >
                            {showOrgReg == "individual" ? (
                              <div className="flex gap-4  ">
                                <div className="labelFirstname w-1/2">
                                  <label
                                    htmlFor="firstname"
                                    class="block mb-2 text-sm font-medium text-[#1B1C57] "
                                  >
                                    First Name
                                    <span className="text-[#C60909]">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    defaultValue={firstName}
                                    placeholder="First Name"
                                    required=""
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                  />
                                  {multipleError && multipleError.FirstName && (
                                    <p className="text-sm text-red-500">
                                      {multipleError.FirstName[0]}
                                    </p>
                                  )}
                                </div>
                                <div className="labelLastname w-1/2">
                                  <label
                                    htmlFor="lastname"
                                    class="block mb-2 text-sm font-medium text-[#1B1C57] "
                                  >
                                    Last Name
                                    <span className="text-[#C60909]">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    id="lastname"
                                    defaultValue={lastName}
                                    className="bg-gray-50 border border-gary-300 text-gary-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                    placeholder="Last Name"
                                    required=""
                                    onChange={onChange}
                                  />
                                  {multipleError && multipleError.LastName && (
                                    <p className="text-sm text-red-500">
                                      {multipleError.LastName[0]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <label
                                  htmlFor="companyName"
                                  className="block mb-2 text-sm font-medium text-[#1B1C57]"
                                >
                                  Company Name{" "}
                                  <span className="text-[#C60909]">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="companyName"
                                  id="companyName"
                                  placeholder="Your Company Name"
                                  value={data.companyName}
                                  onChange={(e) => {
                                    onChange(e);
                                    if (e.target.value.trim() !== "") {
                                      setErrors((prev) => ({
                                        ...prev,
                                        companyName: "",
                                      }));
                                    }
                                  }}
                                  // required
                                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                                />
                                {/* {multipleError?.CompanyName && (
                                  <p className="text-sm text-red-500">{multipleError.CompanyName[0]}</p>
                                )} */}
                                {errors.companyName && (
                                  <p className="text-sm text-red-500">
                                    {errors.companyName}
                                  </p>
                                )}
                              </div>
                            )}

                            <div>
                              <label
                                htmlFor="phone"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                Phone Number
                                <span className="text-[#C60909]">*</span>
                              </label>

                              <input
                                type="number"
                                name="phoneNumber"
                                id="phone"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                placeholder="Enter your Phone Number"
                                required=""
                                onInput={(e) =>
                                  (e.target.value = e.target.value.slice(0, 10))
                                }
                                value={data.phoneNumber}
                                onChange={onChange}
                              />
                              {multipleError && multipleError.PhoneNumber && (
                                <p className="text-sm text-red-500">
                                  {multipleError?.PhoneNumber[0]}
                                </p>
                              )}
                            </div>

                            <div className="RegiEmailId">
                              <label
                                for="emailid"
                                class="block mb-2 text-sm font-medium text-[#1B1C57] "
                              >
                                Email Id
                                <span className="text-[#C60909]">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   "
                                placeholder="Enter Your Email"
                                required=""
                                defaultValue={email}
                                onChange={onChange}
                              />
                              {multipleError && multipleError.Email && (
                                <p className="text-base text-red-500">
                                  {multipleError.Email[0]}
                                </p>
                              )}
                            </div>

                            {multipleError && multipleError.ConfirmPassword && (
                              <p className="text-xs text-red-500 ">
                                {multipleError.ConfirmPassword[0]}
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
                                    <a
                                      href="/terms-and-conditions"
                                      target="_blank"
                                    >
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
                              disabled={isSubmitting}
                              class="w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                            >
                              Register
                            </button>
                            {error && (
                              <p className="text-base text-danger">
                                {/* {error?.text} */}
                                {error}
                              </p>
                            )}
                            <p className="text-base text-danger">
                              {data?.text}
                            </p>
                            <div className="text-center">
                              <p class="text-sm font-[16px]  text-[#1B1C57] ">
                                Already have an account ?
                                <Link
                                  href="login"
                                  className="text-[#8DC63F] ml-1 font-semibold"
                                >
                                  Login
                                </Link>
                              </p>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                  {/* <div className="flex whitespace-nowrap md:flex-wrap justify-start text-center items-start font-normal text-xs md:text-base gap-[10px] md:gap-[10px] mt-[10vh] md:mt-[10vh]">
                    <a href="/" className="whitespace-nowrap text-[#374151]">
                      Home
                    </a>
                    <a href="/faq" className="whitespace-nowrap text-[#374151]">
                      FAQ
                    </a>
                    <a
                      href="/cancellation-policy"
                      className="whitespace-nowrap text-[#374151]"
                    >
                      Cancellation Policy
                    </a>
                    <a
                      href="/terms-and-conditions"
                      className="whitespace-nowrap text-[#374151]"
                    >
                      Terms & Conditions
                    </a>
                    <a
                      href="/privacy-policy"
                      className="whitespace-nowrap text-[#374151] "
                    >
                      Privacy Policy
                    </a>
                  </div> */}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
