import { authResendOtp } from "@/service/authService";
import { offerLanding, ResendLoginOtp } from "@/service/storageService";
import FormModal from "@/sharedComponent/modal/formModal";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const ModalBody = ({ setModalShow }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <img
          src="/images/offerlanding/tickmark.png"
          alt="Tick Mark"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-lg text-center mb-6">
          We will connect with you soon.
        </p>
        <div
          onClick={() => setModalShow(false)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Back
        </div>
      </div>
    </>
  );
};

export default function EnrollForm() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [timer, setTimer] = useState(30);
  const [data, setData] = useState();
  const [preData, setPreData] = useState();
  const [error, setError] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [txt, setTxt] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const onchange = (e) => {
    setError("");
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name === "Phone") {
      setPhoneNumber(value);
    }
    // if (name === 'Phone') {
    //   if (/^\d*$/.test(value) && value.length <= 10) {
    //     setPhoneNumber(value);
    //     setData({ ...data, [name]: value });
    //   }
    // }
    if (name === "Name") {
      const re = /^([^0-9]*)$/;
      if (value === "" || re.test(value)) {
        setTxt(value);
      }
    }
  };
  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data?.Name) {
      setError("Please enter name");
      return;
    }
    if (!data?.Phone) {
      setError("Please enter phone no");
      return;
    }

    if (data?.Phone?.length !== 10 || data?.Phone[0] === "0") {
      setError("Invalid phone number");
      return;
    }

    setFormSubmitted(true);
    startTimer();
    let args = `?Stage=1`;

    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    if (utm_source) {
      formData.append("UTM_Source", utm_source);
      formData.append("UTM_Medium", utm_medium);
      formData.append("UTM_Campaign", utm_campaign);
      formData.append("UTM_Content", utm_content);
    }
    const response = await offerLanding(args, formData);
    if (response.success) {
      setPreData(response.success);
    }
  };
  const letsGo = async (e) => {
    e.preventDefault();

    let args = `?Stage=2`;

    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append("Id", preData.userId);
    const response = await offerLanding(args, formData);
    if (response.success) {
      setFormSubmitted(false);
      setModalShow(true);
    } else {
      setError(response?.error?.error);
    }
  };
  const resendOTP = async () => {
    setError("");
    const args = `?LandingUserId=${preData.userId}`;
    try {
      const response = await authResendOtp(args);
      if (response.success) {
        // Handle success
        alert("OTP has been resent successfully!");
        setTimer(30);
        startTimer();
      } else {
        // Handle error
        setError(response?.error?.error || "Failed to resend OTP");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const startTimer = () => {
    let time = 30;
    const countdown = setInterval(() => {
      time -= 1;
      setTimer(time);
      if (time <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
  };

  const handleLetsGoClick = () => {
    setShowForm(false);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Affordable Storage Solutions in Delhi NCR!</title>
        <meta
          name="keywords"
          content="storage space,storage services,storage solutions"
        />
        <meta
          name="description"
          content="Discover easy and budget-friendly storage solutions at Xtended Space. Affordable warehouse storage space in Delhi NCR. Your ideal storage partner for a clutter-free life!"
        />
      </Head>
      <div className="flex justify-center  items-center min-h-screen bg-gray-100 ">
        <div className="enrollbanner">
          {/* {!showForm && (
          <button className='enrollbutton' onClick={handleButtonClick}>
            <span>BUTTON</span>
          </button>
        )}
        {showForm && ( */}
          <>
            {/* <h1 className='text-center pt-[100px] font-bold text-[70px]'>About Me</h1> */}
            <div className=" mt-[10px] mb-2 md:mt-[50px] flex justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <img
                className="enrolllogo w-[120px] md:w-[160px] "
                src="/images/logo/xtended-space-logo 1.png"
                alt=""
              />
            </div>

            <div className="enrollcontent max-w-[1300px] mx-auto  md:grid grid-cols-2  ">
              <div className="col-sapn-1 sm-text-[10px]  md:pl-4 ">
                <div className=" hidden md:block">
                  <h1 className=" leading-[55px]   font-bold text-[18px] md:text-[60px] md:pt-[50px] text-[#20207c] font-[poppins] ">
                    <span className="never text-[100px] font-semibold text-black">
                      Never
                    </span>{" "}
                    <br /> Run Out Of Space
                  </h1>

                  <h3 className="  font-bold text-[14px] md:text-[20px] mb-2 capitalize py-1 ">
                    Affordable and nearby storage for your home and business
                    essentials!
                  </h3>
                </div>

                {/* <p>Hello! My name is Aditya Goel and I am currently pursuing my Bachlor's degree from Birla Institute of Technology, Mesra, Ranchi. I am a creative Web Developer and a determined Competitive Programmer who aims to keep pushing my limits to excel.</p> */}
                <div className="enrollform max-w-md  bg-zinc-100 p-4 rounded-lg shadow-md">
                  <h2 className="text-[16px] md:text-2xl font-semibold text-zinc-800  mb-2 text-center">
                    Get Your Free Quotes!
                  </h2>
                  {/* <p className="text-zinc-600  mb-6 text-center text-[14px] ">
              Get Video Lectures, QBank & Mock Tests for Free
            </p> */}
                  {!formSubmitted ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="Name"
                        value={txt}
                        onChange={onchange}
                        className="w-full px-3 py-2 mb-2 md:mb-4 border border-zinc-300  rounded-lg text-zinc-700  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        placeholder="Enter Name"
                      />
                      <div className="flex items-center border  bg-white  rounded-lg overflow-hidden mb-2 md:mb-4 transition-colors focus-within:border-blue-500 ">
                        <div className="flex items-center bg-white  px-3 py-2">
                          {/* <img src="https://placehold.co/20x20" alt="flag" className="mr-2" /> */}
                          <span className="text-zinc-700  ">+91</span>
                          {/* <button type="button" className="ml-1 text-zinc-700  focus:outline-none">
                      &#9660;
                    </button> */}
                        </div>
                        <input
                          type="tel"
                          name="Phone"
                          onChange={onchange}
                          className="flex-1 px-3 py-2 text-zinc-700  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
                          placeholder="Enter Phone Number"
                          maxLength="10"
                        />
                      </div>
                      <div className="flex items-center mb-1 md:mb-2">
                        <label
                          htmlFor="otp-whatsapp"
                          className="ml-2   cursor-pointer text-green-600"
                        >
                          Coupon Applied Sucessfully "Sixer"
                        </label>
                      </div>
                      {error && (
                        <div className="flex items-center mb-1 md:mb-4">
                          <label
                            htmlFor="otp-whatsapp"
                            className="ml-2   cursor-pointer text-red-600"
                          >
                            {error}
                          </label>
                        </div>
                      )}
                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-white text-bold"
                      >
                        Get 6 Days Free Storage
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={letsGo}>
                      <div className=" text-zinc-600  mb-1 md:mb-4">
                        <span className="inline-block w-full px-3 py-2 border border-zinc-300  rounded-lg bg-white">
                          +91 | {phoneNumber}
                        </span>
                      </div>
                      <label
                        className="block text-zinc-700  mb-2 "
                        htmlFor="password"
                      >
                        OTP
                      </label>
                      {/* <input type="text" id="otp" name="otp" placeholder="Enter your OTP" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/> */}
                      <input
                        type="otp"
                        onChange={onchange}
                        name="OTP"
                        className="w-full px-3 py-2 mb-2 md:mb-4 border border-zinc-300  rounded-lg text-zinc-700  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        placeholder="Enter your OTP"
                      />
                      {timer === 0 ? (
                        <div className="text-center text-zinc-600  mb-1 md:mb-4">
                          <button
                            type="button"
                            className="text-blue-500 hover:text-blue-600"
                            onClick={resendOTP}
                          >
                            Resend OTP
                          </button>
                        </div>
                      ) : (
                        <div className="text-center text-zinc-600  mb-1 md:mb-4">
                          Time remaining: {timer}s
                        </div>
                      )}

                      {error && (
                        <div className="text-left text-red-500 mb-1 md:mb-4">
                          {error}
                        </div>
                      )}
                      <button
                        type="submit"
                        className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                        onClick={handleLetsGoClick}
                      >
                        Let's Go
                      </button>
                    </form>
                  )}
                </div>
                <div className="enrollservices w-full p-2 justify-between mt-3 items-center hidden md:flex ">
                  <div className=" w-full justify-start items-center gap-4 px-2  ">
                    <button className="text-[12px] md:text-[18px]  text-white font-semibold rounded   flex items-center gap-2 ">
                      <img
                        className=" w-[40px] rounded-full  border-[2px] p-1 "
                        src="/images/offerlanding/thumbnail (1).png"
                        alt=""
                      />{" "}
                      Nearby Storage
                    </button>
                    <button className="text-[12px] md:text-[18px]  text-white font-semibold rounded   flex items-center gap-2 pt-2">
                      <img
                        className=" w-[40px] rounded-full  border-[2px] p-1 "
                        src="/images/offerlanding/thumbnail (3).png"
                        alt=""
                      />{" "}
                      Logistic Services
                    </button>
                  </div>
                  <div className=" w-full justify-start items-center gap-4 px-2 ">
                    <button className="text-[12px] md:text-[18px]  text-white font-semibold rounded   flex items-center gap-2 ">
                      <img
                        className=" w-[40px] rounded-full  border-[2px] p-1 "
                        src="/images/offerlanding/thumbnail.png"
                        alt=""
                      />{" "}
                      Safety & Security
                    </button>
                    <button className="text-[12px] md:text-[18px]  text-white font-semibold rounded   flex items-center gap-2 pt-2">
                      <img
                        className=" w-[40px] rounded-full  border-[2px] p-1 "
                        src="/images/offerlanding/thumbnail (2).png"
                        alt=""
                      />{" "}
                      Insurance Coverage
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:w-[100%] ">
                <div className="md:hidden">
                  <h1 className="text-center leading-[35px]  font-bold text-[35px] md:text-[40px] py-2 text-[#20207c]">
                    <span className="never text-[50px] font-extrabold text-black">
                      Never
                    </span>{" "}
                    <br /> Run Out Of Space
                  </h1>

                  {/* <h3 className='text-center font-bold text-[14px] '>Affordable and nearby storage for your home and business essentials!</h3> */}
                  <div className="enrollservices w-[100%] mx-[auto] p-2 justify-between  items-center flex">
                    <div className=" w-full justify-center items-center gap-2 px-2 ">
                      <button className="text-[14px] md:text-[18px]   font-semibold rounded   flex items-center gap-2 ">
                        <img
                          className=" w-[30px] rounded-full  border-[2px] p-1 "
                          src="/images/offerlanding/thumbnail (1).png"
                          alt=""
                        />{" "}
                        Nearby Storage
                      </button>
                      <button className="text-[14px] md:text-[18px]   font-semibold rounded   flex items-center gap-2 pt-2">
                        <img
                          className=" w-[30px] rounded-full  border-[2px] p-1 "
                          src="/images/offerlanding/thumbnail (3).png"
                          alt=""
                        />{" "}
                        Logistic Services
                      </button>
                    </div>
                    <div className=" w-full justify-center items-center gap-2 pt-2 px-2 ">
                      <button className="text-[14px] md:text-[18px]   font-semibold rounded   flex items-center gap-2 ">
                        <img
                          className=" w-[30px] rounded-full  border-[2px] p-1 "
                          src="/images/offerlanding/thumbnail.png"
                          alt=""
                        />{" "}
                        Safety & Security
                      </button>
                      <button className="text-[14px] md:text-[18px]   font-semibold rounded   flex items-center gap-2 pt-2">
                        <img
                          className=" w-[30px] rounded-full  border-[2px] p-1 "
                          src="/images/offerlanding/thumbnail (2).png"
                          alt=""
                        />{" "}
                        Insurance Coverage
                      </button>
                    </div>
                  </div>
                </div>
                <Image
                  className="rounded-2xl mt-[-20px]"
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/enrollbanner.webp"
                  alt="enroll"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </>
          {/* <div className="w-[90%] max-w-md mx-auto bg-white p-6 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-2xl font-semibold text-zinc-800  mb-2 text-center">
              Access 24 Hour FREE Trial
            </h2>
            <p className="text-zinc-600  mb-6 text-center">
              Get Video Lectures, QBank & Mock Tests for Free
            </p>
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <label className="block text-zinc-700  mb-2" htmlFor="phone-number">
                  Phone number
                </label>
                <div className="flex items-center border border-zinc-300  rounded-lg overflow-hidden mb-4 transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-400">
                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-700 px-3 py-2">
                    <img src="https://placehold.co/20x20" alt="flag" className="mr-2" />
                    <span className="text-zinc-700 ">+91</span>
                    <button type="button" className="ml-1 text-zinc-700  focus:outline-none">
                      &#9660;
                    </button>
                  </div>
                  <input
                    type="text"
                    id="phone-number"
                    className="flex-1 px-3 py-2 text-zinc-700  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="otp-whatsapp"
                    className="form-checkbox text-blue-600 dark:text-blue-400 h-5 w-5"
                  />
                  <label htmlFor="otp-whatsapp" className="ml-2 text-zinc-700  cursor-pointer">
                    Get OTP via Whatsapp
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form>
                <label className="block text-zinc-700  mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 mb-4 border border-zinc-300  rounded-lg text-zinc-700  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter Password"
                />
                <div className="text-center text-zinc-600  mb-4">
                  Time remaining: {timer}s
                </div>
                <button
                  type="button"
                  className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                  onClick={handleLetsGoClick}
                >
                  Let's Go
                </button>
              </form>
            )}
          </div> */}
          {/* )} */}
        </div>
        <FormModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          ModalBody={ModalBody}
          className="addressAdd"
          size={"mm"}
          title=""
        />
      </div>
    </>
  );
}
