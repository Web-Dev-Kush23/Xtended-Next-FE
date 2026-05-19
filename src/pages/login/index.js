import SimpleSlider from "@/sharedComponent/slider15";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { authUserOtpVerify, login } from "@/service/authService";
import { localStorageManager } from "@/util/common";
import Otpinput from "@/sharedComponent/otpVerify";
import { useRouter } from "next/router";
import OTPCounter from "@/sharedComponent/otpCounter";
import { useRef } from "react";
import GoogleLogin from "@/components/google";
import FacebookLogin from "@/components/facebook/facebook-login";
import { LuPartyPopper } from "react-icons/lu";
import { sendDataToAPI } from "@/service/leads";
export default function Login() {
  const [data, setData] = useState({ userType: "User", source: "login" });
  const [otpvalue, setOtpvalue] = useState();
  const [otpShow, setOtpShow] = useState(false);
  const [error, setError] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [multipleError, setMultipleError] = useState();

  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const apiCallInitiated = useRef(false);
  const [utm, setUtm] = useState({});
  const { phoneNumber: queryPhoneNumber } = router.query;

  const onChange = (e) => {
    setError();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };
  useEffect(() => {
    const utmRaw = sessionStorage.getItem("utm_data");
    if (utmRaw) {
      try {
        const parsedUtm = JSON.parse(utmRaw);
        setUtm(parsedUtm);
      } catch (error) {
     
      }
    }
  }, []);

  const isValidUtm = utm?.source !== null && utm?.source !== undefined && utm?.source !== "";
  
  useEffect(() => {
    const storedData = localStorageManager.getValue('landing_page_data');
    if (storedData && !apiCallInitiated.current) {
      const parsedData = JSON.parse(storedData);
      setData({ PhoneNumber: parsedData.Mobile, userType: "User" });
      const fetchData = async () => {
        setLoader(true);
        const formData = new FormData();
        formData.append("userType", "User");
        formData.append("PhoneNumber", parsedData.Mobile);

        const response = await login(formData);
        setLoader(false);
        if (response?.success) {
          setError("");
          setOtpShow(true);
          localStorageManager.setValue("landing_page_data", "");
        }
      };

      fetchData();
      apiCallInitiated.current = true;
    }
    else if (queryPhoneNumber) {
      setData({ PhoneNumber: queryPhoneNumber, userType: "User" });
      setOtpShow(true);
    }
  }, [queryPhoneNumber]);
  if (loader) {
    return <div></div>;
  }

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (!data?.PhoneNumber) {
      return
    }
    if (data.PhoneNumber?.length < 10 || data.PhoneNumber?.length > 10) {
      // setError({text:"Invalid mobile no"});
      return;
    }
    setLoader(true);
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);

    });
    const response = await login(formData);
    setLoader(false);
    if (utm && Object.keys(utm).length > 0) {
      formData.append("UTM_Source", utm.source || "");
      formData.append("UTM_Medium", utm.medium || "");
      formData.append("UTM_Campaign", utm.campaign || "");
      formData.append("UTM_Content", utm.content || "");
      formData.append("UTM_Term", utm.term || "");
    }
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      // console.log("error", response.error);

      // if(response.error.text === "Sorry, you have not registered yet!"){
      //   router.push("/signup");
      // }
      if (response?.error?.text === "Sorry, you have not registered yet!") {
        if(router?.query?.callback){
          const pathname = `/signup`
          router.push({
            pathname: pathname,
            query: { callback:router?.query?.callback,phone: phoneNumber },
          });
        }else{
          const pathname ="/signup"
          router.push({
            pathname: pathname,
            query: {callback:router?.query?.callback, phone: phoneNumber },
          });
        }
        
        

      } else if (response?.error?.title === "One or more validation errors occurred.") {
        setMultipleError(response.error?.errors);
      }
      else {
        setError(response.error);
      }
      setError(response.error);
    }
  };
  const orderedKeys = ['otp1', 'otp2', 'otp3', 'otp4'];
  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    let newOtpValue = "";
    if (!otpvalue) {
      setError({ text: "Please enter otp" });
      return;
    }
    orderedKeys.forEach((item) => {
      newOtpValue += otpvalue[item];
    });

    const getArgs = `?Number=${data.PhoneNumber}&Code=${newOtpValue}&usertype=User`;
    const res = await authUserOtpVerify(getArgs);

    if (res?.success) {
      localStorageManager.setValue(
        "userDetails",
        JSON.stringify(res.success.data)
      );
      
     
      if (isValidUtm) {
        await sendDataToAPI(data, utm);
      }
     
      setOtpShow(true);

      const { callback } = router.query;
      if (callback) router.push("/" + callback);
      else router.push("/");
    } else {
      setError(res.error);
    }

  };

 

  const resendOtp = async () => {
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);

    });
    const response = await login(formData);
    setOtpvalue();
    if (response.success) {
      setError("");
      setOtpShow(true);
    } else {
      setError(response.error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <SimpleSlider />
          </div>
          <div className="col-lg-6">
            <div>
              <section class="bg-gray-50 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <a href="/">
                    <img
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
                      alt=""
                      className="w-full md:w-[200px] h-auto flex justify-center item-center mb-5"
                    />
                  </a>
                  {otpShow ? (
                    <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                          Enter the OTP sent to your mobile
                        </h1>
                        <form
                          class="space-y-4 md:space-y-6"
                          onSubmit={handleSubmitOtp}
                        >
                          <Otpinput
                            phoneNo={data?.phoneNo}
                            setOtpvalue={setOtpvalue}
                            otpvalue={otpvalue}
                          />
                          <div>
                            <OTPCounter onClick={resendOtp} />
                          </div>
                          <button
                            type="submit"
                            class="w-full text-white  flex justify-center items-center font-semibold rounded-lg text-xl px-1 py-2.5 text-center bg-blue-700"
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
                    <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div>
                          <h1 class="text-2xl font-inter font-semibold text-24 leading-[29px] items-center tracking-tight text- [#1B1C57]md:text-2xl  text-center">
                            Welcome Back
                          </h1>
                          <p className="text-center font-inter font-normal text-sm leading-[24px] text-[#374151] ">
                            Please Login to continue
                          </p>
                        </div>
                        <form
                          class="space-y-4 md:space-y-6"
                          onSubmit={onsubmitHandler}
                        >
                          <label
                            htmlFor="phone"
                            class="block  text-sm font-inter font-medium leading-3  text-[#1B1C57]  mr-[65%]"
                          >
                            Phone Number
                          </label>
                          <div className="flex justify-center items-center gap-2">
                            <div>
                              <div className="flex sm:text-sm w-[55px] md:w-[60px] p-2.5 bg-white rounded-lg border border-gray-500 justify-center items-center  overflow-hidden">
                                {/* <div>
                                      <img
                                        src="/images/icon/india.jpg"
                                        alt="indiaicon1"
                                        className="w-6 h-6 md:w-auto md:h-auto max-w-full"
                                      />
                                    </div> */}
                                {/* <select className="outline-none bg-transparent">
                                      <option disabled selected hidden >+91</option>
                                    </select> */}
                                +91
                              </div>
                            </div>
                            <input
                              type="number"
                              name="PhoneNumber"
                              id="phone"
                              onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                              onChange={onChange}
                              class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Enter your phone no"
                              required=""
                              maxLength="10"
                            />
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              class="w-full  text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                              disabled={loader}
                            >
                              Send OTP
                            </button>
                          </div>
                          <div className="text-center">
                            <p
                              type="button"
                              class="w-full   font-medium rounded-lg text-sm px-5 py-2.5 text-center border flex justify-center m-auto"
                              disabled={loader}
                              async
                            >
                              <GoogleLogin />

                            </p>
                            <p
                              type="button"
                              class="w-full  mt-2  font-medium rounded-lg text-sm px-5 py-2.5 text-center border flex justify-center m-auto"
                              disabled={loader}
                              async
                            >
                              <FacebookLogin />
                            </p>

                          </div>
                          {error && (
                            <p className="text-base text-danger">
                              {error?.text}
                            </p>
                          )}
                          {multipleError && multipleError.PhoneNumber && (
                            <p className="text-sm text-red-500">
                              {multipleError?.PhoneNumber[0]}
                            </p>
                          )}
                          <p class=" flex items-center justify-center text-semibold font-inter text-base leading-[20px] text-gray-800  ">
                            Don’t have an account yet? &nbsp;
                            <Link
                              href="/signup"
                              class="font-medium text-primary-600 hover:no-underline focus:no-underline  focus:outline-none"
                            >
                              <span className="text-[#8DC63F] font-inter font-semibold text-16 leading-[19px]">
                                Register
                              </span>
                            </Link>
                          </p>
                        </form>
                      </div>
                    </div>
                  )}
                  {/* <div className="  text-center w-full md:w-[30vw] h-[20vh] md:h-[30vh] bg-white rounded-xl mt-12  shadow-xl border-red-100 ">
                    <div className=" flex flex-col justify-center items-center ">
                      <div className="flex justify-center items-center">
                        <p className=" spare flex justify-center items-center text-base font-semibold pt-5 text-[#1B1C57] ">
                          Have a spare place that you don’t use?
                        </p>
                      </div>
                     
                      <div className="flex justify-center items-center w-[50vw] md:w-[15vw] h-auto  mt-4  px-2 py-2 text-white rounded-md bg-[#8DC63F]">
                        Register as a broker
                      </div>
                    </div>
                  </div> */}
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
                        <a href="/privacy-policy" className="whitespace-nowrap text-[#374151] ">
                          Privacy Policy
                        </a>
                      </div> */}
                <div className="hidden md:flex justify-between text-md text-gray-700 mx-6">
                  <Link href="/">Home</Link>
                  <Link href="/faqs">FAQs</Link>
                  <Link href="terms-and-conditions">Terms and Conditions</Link>
                  <Link href="privacy-policy">Privacy and Policy</Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
