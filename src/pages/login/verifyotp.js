import React from "react";
import SimpleSlider, { Responsive } from "@/sharedComponent/slider15";

export default function verifyotp() {
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
              <div className="col-md-5">
                <div className="flex justify-center items-center">
                  <section class="bg-gray-50 dark:bg-gray-900">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <img
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
                    alt=""
                    className="w-full md:w-[200px] h-auto flex justify-center item-center mb-4 mt-2"
                  />
                      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                     
                        <div class="p-6 space-y-4  md:space-y-6 sm:p-8">
                          <h1 class="text-2xl font-semibold leading-tight tracking-tight text-[#1B1C57] md:text-2xl dark:text-white text-center">
                            Verify Your phone No.
                          </h1>
                          <div className="flex flex-row text-center justify-center items-center">
                            <div>
                              <div className="text-center  text-[#374151] text-base">
                                We have sent 4 digit code on
                              </div>
                              <div className="flex text-center justify-center text-[#374151]">
                                7021860761
                                <div className="">
                                  <img
                                    src="/images/icon/penicon.svg"
                                    alt="penicon"
                                    className="pencil ml-2 w-4"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <form class="space-y-4 md:space-y-6" action="#">
                            <div className="text-center">
                              <div className="otpContainer inline-flex gap-8">
                                <input
                                  name="otp1"
                                  type="text"
                                  autoComplete="off"
                                  className="w-[50px] h-[52px] bg-white rounded-lg border border-black-300 flex justify-center items-center border-solid border-opacity-20 outline-none shadow-none text-base font-normal text-black text-center"
                                  tabIndex="1"
                                  maxLength="1"
                                  placeholder="0"
                                />
                                <input
                                  name="otp2"
                                  type="text"
                                  autoComplete="off"
                                  className="w-[50px] h-[52px] bg-white rounded-lg border border-black-300 flex justify-center items-center border-solid border-opacity-20 outline-none shadow-none text-base font-normal text-black text-center"
                                  tabIndex="2"
                                  maxLength="1"
                                  placeholder="0"
                                />
                                <input
                                  name="otp3"
                                  type="text"
                                  autoComplete="off"
                                  className="w-[50px] h-[52px] bg-white rounded-lg border border-black-300 flex justify-center items-center border-solid border-opacity-20 outline-none shadow-none text-base font-normal text-black text-center"
                                  tabIndex="3"
                                  maxLength="1"
                                  placeholder="0"
                                />
                                <input
                                  name="otp4"
                                  type="text"
                                  autoComplete="off"
                                  className="w-[50px] h-[52px] bg-white rounded-lg border border-black-300 flex justify-center items-center border-solid border-opacity-20 outline-none shadow-none text-base font-normal text-black text-center"
                                  tabIndex="4"
                                  maxLength="1"
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div class="flex items-center justify-between">
                              {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                            </div>
                            <div className="flex justify-center">
                              <button
                                type="submit"
                                class="flex justify-center items-center text-center w-full md:w-[20rem] text-white  font-medium rounded-lg text-md px-3 py-2.5  bg-blue-600 mt-6 md:mt-0"
                              >
                                Verify
                              </button>
                            </div>
                            <p class=" flex items-center justify-center text-sm font-light text-gray-800 dark:text-gray-400 ">
                              Didn't Recived yet?
                              <a
                                href="#"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                <span className="text-[#8BC43E] font-semibold ml-2">
                                  30 sec
                                </span>
                              </a>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div className="flex whitespace-nowrap md:flex-wrap justify-start text-center items-start font-normal text-xs md:text-base gap-[10px] md:gap-[10px] mt-[10vh] md:mt-[10vh]">
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
                      </div>
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
