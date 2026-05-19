import React from "react";
import SimpleSlider, { Responsive } from "@/sharedComponent/slider15";
import Link from "next/link";

export default function Otp() {
  return (
    <>
      <div className="section w-full h-auto">
        <div className="left_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 ">
                {/* <Responsive /> */}
                <SimpleSlider />
              </div>
              <div className="col-md-5 flex justify-center items-center">
                <div>
                  <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex justify-center items-center">
                      <div className="header_logo w-[36%] h-[33%] top-[41%] left-[51%] gap-0 ">
                  <a href="/">    <img
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
                        alt=""
                        class="w-[40%] md:w-[200px] h-auto mb-2 mt-8 mx-auto md:ml-0"
                      /></a>
                    </div>
                    </div>
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                          <div>
                          <h1 class="text-xl font-inter font-semibold text-24 leading-[29px] items-center tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Welcome Back
                          </h1>
                          <p className="text-center font-inter font-normal text-20 leading-[24px] ">
                            Please Login to continue
                          </p>
                          </div>
                          <form class="space-y-4 md:space-y-6" action="#">
                            <div className="flex flex-col justify-center items-center">
                              <label
                                htmlFor="phone"
                                class="block mb-2 text-sm font-inter font-semibold text-24 leading-[32px] text-gray-900 dark:text-white mr-[65%]"
                              >
                                Phone Number
                              </label>
                              <div className="flex gap-3">
                                <div>
                                  <div className="flex w-[55px] md:w-[60px] h-11 bg-white rounded-lg border border-gray-500 justify-center items-center  overflow-hidden">
                                    <div>
                                      <img
                                        src="/images/icon/india.jpg"
                                        alt="indiaicon1"
                                        className="w-6 h-6 md:w-auto md:h-auto max-w-full"
                                      />
                                    </div>

                                    <select className="outline-none">
                                      <option disabled selected hidden></option>
                                    </select>
                                  </div>
                                </div>
                                <input
                                  type="tel"
                                  name="phone"
                                  id="phone"
                                  className="custom_input h-11 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  w-[200px] md:w-[250px] ml-0 md:ml-auto mr-0 md:mr-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Enter your Phone Number"
                                  required=""
                                />
                              </div>
                            </div>

                            <div class="flex items-center justify-between">
                              <div class="flex items-start">
                                <div class="flex items-center h-5"></div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              class="flex justify-center items-center w-[70%] md:w-[15rem] text-white ml-[25%] font-inter font-semibold text-18 leading[20px] rounded-lg text-sm px-3 py-2.5 text-center bg-blue-600 mt-6 md:mt-0"
                            >
                              Send OTP
                            </button>
                            <p class=" flex items-center justify-center text-semibold font-inter text-16 leading-[20px] text-gray-800 dark:text-gray-400 ">
                              Don’t have an account yet?  &nbsp;
                              <Link
                                href="/signup"
                                class="font-medium text-primary-600 hover:no-underline focus:no-underline dark:text-primary-500 focus:outline-none"
                              >
                                <span className="text-[#8DC63F] font-inter font-semibold text-16 leading-[19px]">Register</span>

                              </Link>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div className="w-[400px] h-[150px] bg-white rounded-lg mt-12  shadow-2xl border-red-100 ">
                        <p className=" spare flex justify-center items-center text-sm font-bold mt-4">
                           
                          Have a spare place that you don’t use?
                        </p>
                        <h3
                          className="flex justify-center item-center mt-4 ml-[75px] w-[200px] p-2 border rounded-xl items-center"
                        
                        >
                          Register as a broker
                        </h3>
                      </div>

                      {/* <div className="flex flex-wrap justify-start items-start  gap-[10px] md:gap-[10px] mt-[10vh] md:mt-[10vh]">
                        <a href="/" className="whitespace-nowrap">
                          Home
                        </a>
                        <a href="/faq" className="whitespace-nowrap">
                          FAQ
                        </a>
                        <a
                          href="/cancellation-policy"
                          className="whitespace-nowrap"
                        >
                          Cancellation Policy
                        </a>
                        <a
                          href="/terms-and-conditions"
                          className="whitespace-nowrap"
                        >
                          Terms & Conditions
                        </a>
                        <a href="/privacy-policy" className="whitespace-nowrap">
                          Privacy Policy
                        </a>
                      </div> */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
