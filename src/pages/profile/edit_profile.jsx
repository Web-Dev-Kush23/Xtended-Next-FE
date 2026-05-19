import {
  postUpdateProfileDetails,
  postSendOtpForChangeNumber,
  postVerifyOtpForChangeNumber,
  postSendOtpForChangeEmail,
  postVerifyOtpForChangeEmail,
} from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useState, useEffect } from "react";
import OTPCounter from "@/sharedComponent/otpCounter";
import { RxCross2 } from "react-icons/rx";

export default function Index({ data = {}, setData }) {
  const [profileSuccessMSG, setProfileSuccessMSG] = useState(false);
  const [showMobileOTPBox, setShowMobileOTPBox] = useState(false);
  const [showEmailOTPBox, setShowEmailOTPBox] = useState(false);
  const [mobileOTP, setMobileOTP] = useState(null);
  const [emailOTP, setEmailOTP] = useState(null);
  const [mobileOtpVerifyResp, setMobileOtpVerifyResp] = useState("");
  const [emailOtpVerifyResp, setEmailOtpVerifyResp] = useState("");


  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  function handleSubmitPersonal(e) {
    e.preventDefault();

    let errPTag = document.getElementById("firstLastNameValidation");

    if (errPTag.textContent && errPTag.textContent.length > 0 || errPTag !== null || errPTag !== "") {
      setTimeout(() => {
        errPTag.textContent = "";
      }, 5000);
    }

    if (
      !data?.firstName ||
      data?.firstName === null ||
      data?.firstName.trim() === ""
    ) {
      errPTag.textContent = "Please enter first name!";
      return;
    } else {
      errPTag.textContent = "";
    }

    if (
      !data?.lastName ||
      data?.lastName === null ||
      data?.lastName.trim() === ""
    ) {
      errPTag.textContent = "Please enter last name!";
      return;
    } else {
      errPTag.textContent = "";
    }

    if (/[^a-zA-Z]/.test(data?.firstName)) {
      errPTag.textContent = "First name can only contain letters.";
      return;
    } else {
      errPTag.textContent = "";
    }

    if (/[^a-zA-Z]/.test(data?.lastName)) {
      let errPTag = document.getElementById("firstLastNameValidation");
      errPTag.textContent = "Last name can only contain letters.";
      return;
    } else {
      errPTag.textContent = "";
    }

    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.map((item) => {
      formData.append(item, data[item]);
    });

    (async () => {
      let args = `?ApplicationUserId=${getUserId()}`;
      // USE ID 756 FOR TESTING PURPOSE
      // let args = "?ApplicationUserId=756";

      const response = await postUpdateProfileDetails(formData, args);
      if (response?.success) {

        setProfileSuccessMSG(true);
        setTimeout(() => {
          setProfileSuccessMSG(false);
        }, 5000);
      }

    })();
  }

  function handlePhoneUpdate(e) {
    e.preventDefault();
    const allKeys = Object.keys(data);
    e.preventDefault();
    const formData = new FormData();
    allKeys.map((item) => {
      if (item === "phoneNumber") {
        formData.append(item, data[item]);
      }
    });

    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&phoneNumber=${data.phoneNumber}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&phoneNumber=${data?.phoneNumber}`;
      const response = await postSendOtpForChangeNumber(formData, args);
      if (response?.success) {
        if (response?.success?.text === "OTP send to your mobile number") {
          setMobileOtpVerifyResp("");
          setShowMobileOTPBox(true);
        }
      }
      let p = document.getElementById("phonePTAG");
      if (response?.error) {
        if (response?.error?.text) {
          p.textContent = response?.error?.text || "";
          setTimeout(() => {
            p.textContent = "";
          }, 5000);
        } else {
          p.textContent = "";
        }
      }
    })();
  }

  function verifyMobileOtpOnChange(e) {
    const { value } = e.target;
    setMobileOTP(value);
  }

  function verifyEmailOtpOnChange(e) {
    const { value } = e.target;
    setEmailOTP(value);
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    if (!mobileOTP || mobileOTP === "" || mobileOTP === null) {
      setMobileOtpVerifyResp("Please enter OTP!");
      return;
    }
    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&phoneNumber=${data.phoneNumber}&code=${mobileOTP}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&phoneNumber=${data?.phoneNumber}&code=${mobileOTP}`;
      const response = await postVerifyOtpForChangeNumber(args);
      if (response?.success) {
        if (response?.success?.title === "Success") {
          setMobileOtpVerifyResp(response?.success?.text);
          setTimeout(() => {
            setShowMobileOTPBox(false);
            setMobileOtpVerifyResp("");
            setMobileOTP("");
          }, 2000);
        }
      }

      if(response?.error) {
        setMobileOtpVerifyResp(response?.error?.text);
      }
    })();
  }

  function handleVerifyOtpEmail(e) {
    e.preventDefault();
    if (!emailOTP || emailOTP === "" || emailOTP === null) {
      setEmailOtpVerifyResp("Please enter OTP!");
      return;
    }
    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&email=${data.email}&code=${emailOTP}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&email=${data?.email}&code=${emailOTP}`;
      const response = await postVerifyOtpForChangeEmail(args);
      if (response?.success) {
        if (response?.success?.text === "OTP verified successfully") {
          setEmailOtpVerifyResp(response?.success?.text);
          setTimeout(() => {
            setShowEmailOTPBox(false);
            setEmailOtpVerifyResp("");
            setEmailOTP("");
          }, 2000);
        }
      }

      if(response?.error) {
        setEmailOtpVerifyResp(response?.error?.text);
      }
    })();
  }

  function handleEmailUpdate(e) {
    e.preventDefault();
    const allKeys = Object.keys(data);
    e.preventDefault();
    const formData = new FormData();
    allKeys.map((item) => {
      if (item === "email") {
        formData.append(item, data[item]);
      }
    });

    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&email=${data.email}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&email=${data?.email}`;
      const response = await postSendOtpForChangeEmail(formData, args);
      if (response?.success) {
        if (response?.success?.text) {
          // console.log("email success text resp ==== ", response?.success?.text)
          setShowEmailOTPBox(true);
        }
      }

      let p = document.getElementById("phonePTAG");
      if (response?.error) {
        if (response?.error?.text) {
          p.textContent = response?.error?.text || "";
          setTimeout(() => {
            p.textContent = "";
          }, 5000);
          return;
        } else {
          p.textContent = "";
        }
      }

    })();
  }

  function handleOTPResend() {
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.map((item) => {
      if (item === "phoneNumber") {
        formData.append(item, data[item]);
      }
    });
    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&phoneNumber=${data.phoneNumber}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&phoneNumber=${data?.phoneNumber}`;
      const response = await postSendOtpForChangeNumber(formData, args);
      if (response?.success) {
        setMobileOtpVerifyResp("OTP Sent!");
      }
    })();
  }

  function handleOTPResendEmail() {
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.map((item) => {
      if (item === "email") {
        formData.append(item, data[item]);
      }
    });
    (async () => {
      // USE ID 756 FOR TESTING PURPOSE
      // let args = `?ApplicationUserId=756&phoneNumber=${data.phoneNumber}`;
      const userId = getUserId();
      let args = `?ApplicationUserId=${userId}&email=${data?.email}`;
      const response = await postSendOtpForChangeEmail(formData, args);
      if (response?.success) {
        setEmailOtpVerifyResp("OTP Sent!");
      }
    })();
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between px-8 lg:px-16 mb-3">
          <div>
            <h1 className="text-slate-500 font-bold text-xl">Edit Profile</h1>
          </div>
          <div>
            {/* <p className="text-slate-500 text-sm">
              Last updated {`${data["lastUpdate"] && data["lastUpdate"]}`}
            </p> */}
          </div>
        </div>

        <form className="flex items-center flex-wrap py-3 w-full bg-slate-100 mt-8">
          <p className="text-blue-500 ml-16 text-[13px]">Personal</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-2 w-full px-16 mt-3">
            <div className="flex flex-col w-full mt-2">
              <p className="text-[13px] mb-1">First Name</p>
              <input
                type="text"
                name="firstName"
                value={data?.["firstName"]}
                className="w-full h-[40px] outline-none rounded-lg pl-4"
                placeholder="First Name"
                onChange={onChange}
                minLength={2}
                maxLength={20}
                required
              />
            </div>
            <div className="flex flex-col w-full mt-2">
              <p className="text-[13px] mb-1">Last Name</p>
              <input
                type="text"
                name="lastName"
                value={data?.["lastName"]}
                onChange={onChange}
                className="w-full h-[40px] outline-none rounded-lg pl-4"
                placeholder="Last Name"
                minLength={2}
                maxLength={20}
                required
              />
            </div>
            {profileSuccessMSG && (
              <p className={`mt-4 text-green-600`}>
                Profile updated successfully!
              </p>
            )}
            <p id="firstLastNameValidation" className={`mt-4 text-red-600`}></p>
          </div>
          <div className="w-full grid lg:place-items-start place-items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white text-center mt-4 lg:ml-16 px-10 py-2 rounded-lg"
              onClick={handleSubmitPersonal}
            >
              Update Details
            </button>
          </div>
        </form>
        <div className="flex items-center flex-wrap py-3 w-full bg-slate-100 mt-8">
          <p className="text-blue-500 ml-16 text-[13px]">Contact</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-2 w-full px-16 mt-3">
            <form className="flex flex-col w-full mt-2">
              <p className="text-[13px] mb-1">Phone Number</p>
              <div className="flex items-center justify-center">
                {/* <select
                  name=""
                  id=""
                  className="h-[40px] outline-none rounded-lg pl-1 pr-1 mr-2"
                >
                  <option value="+91" selected>
                    +91
                  </option>
                </select> */}
                <input
                  type="text"
                  name="phoneNumber"
                  value={data?.["phoneNumber"]}
                  onChange={onChange}
                  className="w-full h-[40px] outline-none rounded-lg pl-4"
                  placeholder="Phone Number"
                  minLength={10}
                  maxLength={10}
                  required
                />
              </div>
              <div className="grid lg:place-items-start place-items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-center mt-4 px-10 py-2 rounded-lg"
                  onClick={handlePhoneUpdate}
                >
                  Update Phone
                </button>
              </div>
            </form>
            <form className="flex flex-col w-full mt-2">
              <p className="text-[13px] mb-1">Email ID</p>
              <input
                type="email"
                name="email"
                value={data?.["email"]}
                onChange={onChange}
                className="w-full h-[40px] outline-none rounded-lg pl-4"
                placeholder="Email ID"
                minLength={6}
                maxLength={65}
                required
              />
              <div className="grid lg:place-items-start place-items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white text-center mt-4 px-10 py-2 rounded-lg"
                  onClick={handleEmailUpdate}
                >
                  Update Email
                </button>
              </div>
            </form>
          </div>
          {/* To display error message. */}
          <p className="text-red-500 pl-16 mt-2" id="phonePTAG"></p>
        </div>
      </div>
      {showMobileOTPBox && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "100%",
            zIndex: 111,
            display: "grid",
            placeItems: "center"
          }}
        >
          <form
            className="relative min-h-[300px] min-w-[250px] bg-white rounded-lg shadow py-4 px-4 flex flex-col items-start gap-y-4"
            style={{
              zIndex: 999,
            }}
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl font-bold">Enter OTP</p>

              <button
                title="Close"
                onClick={() => {
                  setShowMobileOTPBox(false);
                }}
                className="py-1 px-1"
              >
                <RxCross2 size={25} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={verifyMobileOtpOnChange}
              className="h-[40px] w-full pl-4 outline-none border-[2px] rounded"
              minLength={4}
              maxLength={4}
              required
            />
            {!!mobileOtpVerifyResp && (
              <p
                className={`${mobileOtpVerifyResp === "Please enter OTP!" && `text-red-500`
                  || mobileOtpVerifyResp === `Invalid OTP, please try again` && `text-red-500`
                  } text-green-500`}
              >
                {!!mobileOtpVerifyResp && mobileOtpVerifyResp}
              </p>
            )}
            <OTPCounter onClick={handleOTPResend} />
            <button
              onClick={handleVerifyOtp}
              className="absolute bottom-0 py-2 px-4 bg-blue-500 text-white rounded mb-6"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}

      {showEmailOTPBox && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "100%",
            zIndex: 111,
            display: "grid",
            placeItems: "center"
          }}
        >
          <form
            className="relative min-h-[300px] min-w-[250px] bg-white rounded-lg shadow py-4 px-4 flex flex-col items-start gap-y-4"
            style={{
              zIndex: 999,
            }}
          >
            <div className="flex items-center justify-between w-full">
              <p className="text-xl font-bold">Enter OTP</p>

              <button
                title="Close"
                onClick={() => {
                  setShowEmailOTPBox(false);
                }}
                className="py-1 px-1"
              >
                <RxCross2 size={25} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={verifyEmailOtpOnChange}
              className="h-[40px] w-full pl-4 outline-none border-[2px] rounded"
              minLength={4}
              maxLength={4}
              required
            />
            {emailOtpVerifyResp && (
              <p
                className={`${emailOtpVerifyResp === "Please enter OTP!" && `text-red-500`
                || emailOtpVerifyResp === `Invalid verification code, please try again!` && `text-red-500`  
                } text-green-500`}
              >
                {!!emailOtpVerifyResp && emailOtpVerifyResp}
              </p>
            )}
            {<OTPCounter onClick={handleOTPResendEmail} />}
            <button
              onClick={handleVerifyOtpEmail}
              className="absolute bottom-0 py-2 px-4 bg-blue-500 text-white rounded mb-6"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}
    </>
  );
}
