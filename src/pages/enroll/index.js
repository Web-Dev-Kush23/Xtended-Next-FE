import React, { useState, useEffect } from "react";
import { offerLanding } from "@/service/storageService";
import Image from "next/image";

export default function EnrollForm() {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [data, setData] = useState({ PhoneNumber: "" });
  const [multipleError, setMultipleError] = useState({});

  const onChange = (e) => {
    setError("");
    const { name, value } = e.target;

    // Validate phone number to be digits only and max 10 characters
    if (name === "PhoneNumber" && !/^\d*$/.test(value)) return;

    setData({ ...data, [name]: value });

  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    if (data.PhoneNumber?.length !== 10) {
      setError("Invalid mobile number");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      const response = await offerLanding("?Stage=1", formData);
      if (response.success) {
        setError("");
        // Handle successful response
      } else {
        setError(response.error);
        console.error("API call error:", response.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Unexpected error:", err);
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
    <div className="flex justify-center  items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="enrollbanner">
        {/* {!showForm && (
          <button className='enrollbutton' onClick={handleButtonClick}>
            <span>BUTTON</span>
          </button>
        )}
        {showForm && ( */}
        <>
          {/* <h1 className='text-center pt-[100px] font-bold text-[70px]'>About Me</h1> */}
          <div className=" mt-[20px] md:mt-[50px] flex justify-center">
            <img
              className="w-[100px]"
              src="/images/icon/Xtended Space  header logo.jpg"
              alt=""
            />
          </div>

          <div className="enrollcontent max-w-[1340px] mx-auto py-[10px] md:py-[50px] md:grid grid-cols-2 ">
            <div className="col-sapn-1 sm-text-[10px]">
              <div className="ht1 hidden md:block">
                <h1 className="   font-bold text-[18px] md:text-[40px] md:py-4">
                  Never <br /> Run Out Of Space
                </h1>

                <h3 className="  font-bold text-[16px] md:text-[20px] md:mb-4">
                  Affordable and nearby storage for your home and business
                  essentials!
                </h3>
              </div>

              {/* <p>Hello! My name is Aditya Goel and I am currently pursuing my Bachlor's degree from Birla Institute of Technology, Mesra, Ranchi. I am a creative Web Developer and a determined Competitive Programmer who aims to keep pushing my limits to excel.</p> */}
              <div className="enrollform max-w-md  bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <h2 className="text-[16px] md:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2 text-center">
                  Access 24 Hour FREE Trial
                </h2>
                {/* <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center text-[14px] ">
              Get Video Lectures, QBank & Mock Tests for Free
            </p> */}
                {!formSubmitted ? (
                  <form onSubmit={onsubmitHandler}>
                    <label
                      className="block text-zinc-700 dark:text-zinc-300 mb-2"
                      htmlFor="phone-number"
                    >
                      Phone number
                    </label>
                    <div className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg overflow-hidden mb-4 transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-400">
                      <div className="flex items-center bg-zinc-100 dark:bg-zinc-700 px-3 py-2">
                        {/* <img src="https://placehold.co/20x20" alt="flag" className="mr-2" /> */}
                        <span className="text-zinc-700 dark:text-zinc-300">
                          +91
                        </span>
                        {/* <button type="button" className="ml-1 text-zinc-700 dark:text-zinc-300 focus:outline-none">
                      &#9660;
                    </button> */}
                      </div>
                      <input
                        type="text"
                        id="phone-number"
                        name="Phone"
                        value={data.Phone}
                        onChange={onChange}
                        className="flex-1 px-3 py-2 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="otp-whatsapp"
                        className="form-checkbox text-blue-600 dark:text-blue-400 h-5 w-5"
                      />
                      <label
                        htmlFor="otp-whatsapp"
                        className="ml-2 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                      >
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
                    <label
                      className="block text-zinc-700 dark:text-zinc-300 mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={onchange}
                      className="w-full px-3 py-2 mb-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="Enter Password"
                    />
                    <div className="text-center text-zinc-600 dark:text-zinc-400 mb-4">
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
              </div>
              <div className=" w-full justify-between py-10 items-center hidden md:flex">
                <button className="text-white bg-black p-2 rounded mt-[10px]">
                  <a href="" target="blank">
                    Download
                  </a>
                </button>
                <button className="text-white bg-black p-2 rounded mt-[10px]">
                  <a href="" target="blank">
                    Download
                  </a>
                </button>
                <button className="text-white bg-black p-2 rounded mt-[10px]">
                  <a href="" target="blank">
                    Download
                  </a>
                </button>
                <button className="text-white bg-black p-2 rounded mt-[10px]">
                  <a href="" target="blank">
                    Download
                  </a>
                </button>
              </div>
            </div>
            <div className="col-span-1 md:w-[80%]">
              <div className="md:hidden">
                <h1 className="text-center   font-bold text-[18px] md:text-[40px]">
                  Never <br /> Run Out Of Space
                </h1>

                <h3 className="text-center font-bold text-[16px] md:text-[20px]">
                  Affordable and nearby storage for your home and business
                  essentials!
                </h3>
                <div className="flex w-full justify-evenly items-center">
                  <button className="text-white bg-black p-2 rounded mt-[10px]">
                    <a href="" target="blank">
                      Download
                    </a>
                  </button>
                  <button className="text-white bg-black p-2 rounded mt-[10px]">
                    <a href="" target="blank">
                      Download
                    </a>
                  </button>
                  <button className="text-white bg-black p-2 rounded mt-[10px]">
                    <a href="" target="blank">
                      Download
                    </a>
                  </button>
                </div>
              </div>
              <Image
                className="rounded-2xl"
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/enrollbanner.webp"
                alt="enroll"
                width={800}
                height={800}
              />
            </div>
          </div>
        </>
        {/* <div className="w-[90%] max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2 text-center">
              Access 24 Hour FREE Trial
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-center">
              Get Video Lectures, QBank & Mock Tests for Free
            </p>
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="phone-number">
                  Phone number
                </label>
                <div className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg overflow-hidden mb-4 transition-colors focus-within:border-blue-500 dark:focus-within:border-blue-400">
                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-700 px-3 py-2">
                    <img src="https://placehold.co/20x20" alt="flag" className="mr-2" />
                    <span className="text-zinc-700 dark:text-zinc-300">+91</span>
                    <button type="button" className="ml-1 text-zinc-700 dark:text-zinc-300 focus:outline-none">
                      &#9660;
                    </button>
                  </div>
                  <input
                    type="text"
                    id="phone-number"
                    className="flex-1 px-3 py-2 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="otp-whatsapp"
                    className="form-checkbox text-blue-600 dark:text-blue-400 h-5 w-5"
                  />
                  <label htmlFor="otp-whatsapp" className="ml-2 text-zinc-700 dark:text-zinc-300 cursor-pointer">
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
                <label className="block text-zinc-700 dark:text-zinc-300 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 mb-4 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="Enter Password"
                />
                <div className="text-center text-zinc-600 dark:text-zinc-400 mb-4">
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
    </div>
  );
}

