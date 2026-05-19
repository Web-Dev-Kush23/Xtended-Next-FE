import OTPCounter from '@/sharedComponent/otpCounter'
import Otpinput from '@/sharedComponent/otpVerify'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import GoogleLogin from '../google'
import FacebookLogin from '../facebook/facebook-login'
import { useRouter } from "next/router";
import { useRef } from "react";
import Link from 'next/link'
import { localStorageManager } from '@/util/common'
import { authUserOtpVerify, login } from '@/service/authService'
import { LuPartyPopper } from "react-icons/lu";
import { sendDataToAPI } from "@/service/leads";

const LoginModal = (props) => {
    const [data, setData] = useState({ userType: "User", source: "login" });
    const [otpvalue, setOtpvalue] = useState();
    const [otpShow, setOtpShow] = useState(false);
    const [error, setError] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [multipleError, setMultipleError] = useState();
  
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const apiCallInitiated = useRef(false);
  
    const { phoneNumber: queryPhoneNumber } = router.query;
    const [utm, setUtm] = useState({});
  
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
      console.log(utmRaw,"utm raw");
      if (utmRaw) {
        try {
          const parsedUtm = JSON.parse(utmRaw);
          setUtm(parsedUtm);
        } catch (error) {
          console.error("Failed to parse UTM data from sessionStorage:", error);
        }
      }
    }, []);
    
    useEffect(() => {
      const storedData = localStorageManager.getValue('landing_page_data');
      if (storedData && !apiCallInitiated.current) {
        const parsedData = JSON.parse(storedData);
        setData({ PhoneNumber: parsedData.Mobile, userType:"User" });
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
  
    const isValidUtm = utm?.source !== null && utm?.source !== undefined && utm?.source !== "";
  
    const onsubmitHandler = async (event) => {
      event.preventDefault();
  if(!data?.PhoneNumber){
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
          // router.push({
          //   pathname: "/signup",
          //   query: { phone: phoneNumber },
          // });
          props.onHide();
          props.setRegisterModal(true)
          
        }else if (response?.error?.title === "One or more validation errors occurred.") {
          setMultipleError(response.error?.errors);}
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
       
        setOtpShow(false);
        props.setLoginModal(false);

        // if (props?.navigateTo !== '/affordable-storage') {
        //   router.push(`/${props.navigateTo}`);
        // }
        if (props?.packersMovers) {
          props.packerMoverSave()
        }
        if(props.p2p){
          props.saveBooking()
        }
        if(props.easyStorage){
          props.saveStorage()
        }

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
    <div>
        <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='z-100'
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <section class=" ">
                <div class="flex flex-col items-center justify-center  ">
                 
                  {otpShow ? (
                    <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
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
                          {/* <button
                            type="submit"
                            class="w-full text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                          >
                            Verify
                          </button> */}
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
                    <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
                      <div class=" sm:p-8">
                        <div>
                          <h1 class="text-2xl font-inter font-semibold text-24 leading-[29px] items-center tracking-tight text- [#1B1C57]md:text-2xl  text-center">
                            Welcome !
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
                              class="w-full lg:w-[20vw] text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600"
                              disabled={loader}
                            >
                              Send OTP
                            </button>
                            </div>
                            <div className="text-center">
                            <p
                              type="button"
                              class="w-full lg:w-[20vw]  font-medium rounded-lg text-sm px-5 py-2.5 text-center border flex justify-center m-auto"
                              disabled={loader}
                              async
                            >
                              <GoogleLogin props={props} />
                             
                            </p>
                            <p
                              type="button"
                              class="w-full lg:w-[20vw] mt-2  font-medium rounded-lg text-sm px-5 py-2.5 text-center border flex justify-center m-auto"
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
                            <div
                              onClick={()=>{props.onHide();props.setRegisterModal(true)}}
                              class="font-medium text-primary-600 hover:no-underline focus:no-underline  focus:outline-none"
                            >
                              <span className="text-[#8DC63F] cursor-pointer font-inter font-semibold text-16 leading-[19px]">
                                Register
                              </span>
                            </div>
                          </p>
                        </form>
                      </div>
                    </div>
                  )}
                  
                </div>
               
              </section>
      </Modal.Body>
     
    </Modal>
    </div>
  )
}

export default LoginModal