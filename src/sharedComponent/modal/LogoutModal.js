import { localStorageManager } from "@/util/common";
import React, { useState } from "react";

const LogoutModal = ({ showPopup, setShowPopup, setUserData }) => {
  const handleLogout = () => {
   
    localStorageManager.setValue("userDetails", "");
    localStorageManager.setValue("easyStorageData", "");
    localStorageManager.setValue("jwt", "");
    localStorageManager.setValue("token", "");
    setUserData("");
    setShowPopup(false);
    window.location.href = "/";
  };

  return (
    <>
      {showPopup && (
         <div className="w-[100vw] h-[100vh] bg-[#000000c0]  top-[0] left-[0] fixed z-[999999999]">
        <div className=" logoutmodal fixed left-1/2 top-1/2 py-4 transform -translate-x-1/2 -translate-y-1/2  w-[90%] md:w-[40%] mx-[auto] md:mx-4 bg-white z-10 shadow-md flex flex-col justify-center items-center rounded-md">
          <h1 className="text-center text-xl md:text-2xl mt-2 mb-2 ">
            Thanks for using our services.
          </h1>
          <p className=" text-sm md:text-sm text-wrap flex justify-center items-center text-center">
            We look forward to assisting you with future bookings!
          </p>
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2 mt-4 w-32 md:w-44"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mb-2 mt-4 w-32 md:w-44"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;
