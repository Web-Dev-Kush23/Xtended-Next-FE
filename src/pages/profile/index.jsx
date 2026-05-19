import dynamic from "next/dynamic";
const HeaderMenu = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("@/components/footer"));
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";
import { FaLeaf, FaRegBuilding } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RiFileListLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
const EditProfile = dynamic(() => import("./edit_profile"));
const Billing_details = dynamic(() => import("./billing_details"));
const Bookings = dynamic(() => import("./bookings"));
const Listings = dynamic(() => import("./listings"));
const BillingDetails = dynamic(() => import("./billing_details"));
const SavedComponent = dynamic(() => import("./saved_cmp"));
import { IoIosCamera } from "react-icons/io";
import {
  getProfileBank,
  postUploadProfilePicture,
  getProfilePicture
} from "@/service/storageService";
import { getUserId, localStorageManager,DisplayName } from "@/util/common";
import { useRouter } from "next/router";
import LogoutModal from "@/sharedComponent/modal/LogoutModal";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Loader from "@/components/Loader";



export default function Index() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const query = { ...router.query };

  let args = "";
  // USE ID 756 FOR TESTING.
  // args = `?ApplicationUserId=756`;

  useEffect(() => {
    const user = localStorageManager.getValue("userDetails") || "";
    const jwt = localStorageManager.getValue("jwt") || "";

    if (!user || user === "" || user === null || user === undefined) {
      window.location.href = "/";
    }
    if (!jwt || jwt === "" || jwt === null || jwt === undefined) {
      window.location.href = "/";
    }

  }, []);

  const [userdata, setUserData] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({});
  const [profilePicture, setProfilePicture] = useState();
  const [loader , setLoader] = useState(false);

  useEffect(() => {
    const userData = localStorageManager.getValue("userDetails") || "";
    userData && setUserData(JSON.parse(userData));
  }, []);

  // For logout
  const logout = () => {
    setShowPopup(true);
    // localStorageManager.setValue("userDetails", "");
  };

  function handleProfilePhotoChange(e) {
    e.preventDefault();
    let photoInput = document.getElementById("ImageFiles");
    photoInput.click();
  }

  function photoOnChange(e) {
    const formData = new FormData();
    const { name, files } = e.target;
    if (files) {
      formData.append(name, files[0]);
    }

    (async () => {
      args = `?ApplicationUserId=${getUserId()}`
      const uploadProfilePicResp = await postUploadProfilePicture(formData, args);

      if (uploadProfilePicResp?.success) {
        if (uploadProfilePicResp?.success?.message === "Image uploaded successfully") {
          // alert("Profile updated successfully!");
          setProfilePicture(uploadProfilePicResp?.success?.profileImage);
        }
      }
      if (uploadProfilePicResp?.error) {
        alert("An error occured!");
      }
    })();
  }

  useEffect(() => {
    args = `?ApplicationUserId=${getUserId()}`;
    // args = `?ApplicationUserId=756`;
    setLoader(true);
    (async () => {
      const profile_Details_Response = await getProfileBank(args);
      if (profile_Details_Response?.success) {
        setData(profile_Details_Response?.success?.data);

       
      }
      
    })();

    (async () => {
      const getProfilePictureResp = await getProfilePicture(args);
      if (getProfilePictureResp?.success) {
        setProfilePicture(getProfilePictureResp?.success?.data?.profilePictureStoragePath);
        setLoader(false)
      }
    })();

  }, []);

  const options = {
    edit_profile: false,
    bookings: false,
    listings: false,
    billing_details: false,
    logout: false,
    saved: false
  };

  const [tab, setTab] = useState({
    edit_profile: true,
    bookings: false,
    listings: false,
    billing_details: false,
    logout: false,
    saved: false
  });

  const newTab = searchParams.get("tab");
  useEffect(() => {
    const Tab = localStorageManager.getValue("oldtab");
    if (!Tab || Tab === "" || Tab === null || Tab === undefined) {
      setTab({ ...options, edit_profile: true });
    }
    if (newTab === "booking") {
      setTab({ ...options, bookings: true });
      const timer = setTimeout(() => {
        delete query.tab;
        router.push({
          pathname: router.pathname,
          query: query,
        });
      }, 500);
      return () => clearTimeout(timer);
    }

    if (newTab === "bookingpackermover") {
      setTab({ ...options, bookings: true });
      localStorageManager.setValue("subTab", "packermover");
      const timer = setTimeout(() => {
        delete query.tab;
        router.push({
          pathname: router.pathname,
          query: query,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchParams])

  useEffect(() => {
    let oldTab = localStorageManager.getValue("oldtab") || "";
    if (oldTab !== "" || oldTab !== null) {
      setTab({ ...options, [oldTab]: true });
    }
  }, []);




console.log("Profiledatatatta",data)
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="ImageFiles"
        onChange={(e) => {
          photoOnChange(e);
        }}
        id="ImageFiles"
        className="hidden"
      />
      <HeaderMenu />
      <div className="flex items-center justify-start ml-14">
        <li key="home" className="flex items-center justify-start">
          <Link href="/" legacyBehavior>
            <a className="">Home</a>
          </Link>
        </li>
        <Breadcrumb />
      </div>

      <main className="min-h-[100vh]">
        <div className="lg:flex items-start justify-center">
          {/* Drawer left */}
          <div className="min-h-[auto] lg:min-h-[500px] flex flex-col-reverse lg:flex-col w-full lg:w-[300px] lg:sticky top-28">
            <center>
              {/* Profile */}
              <div className="flex items-center justify-center bg-blue-400 h-[140px] w-[140px] rounded-full -z-10 mt-6">
                <div className="relative flex items-center justify-center h-[130px] w-[130px] bg-white rounded-full z-10">
                  <img
                    className="rounded-full h-full w-full object-cover"
                    src={!!profilePicture ? profilePicture : "https://xtendedspace.s3.ap-south-1.amazonaws.com/static/contactlogo.jpg"}
                    alt=""
                  />
                  <Link
                    href="javascript:void(0)"
                    onClick={(e) => {
                      handleProfilePhotoChange(e);
                    }}
                  >
                    <IoIosCamera
                      size={30}
                      className="absolute bottom-[10px] right-[-4px] text-white bg-blue-500 rounded-full p-1"
                    />
                  </Link>
                </div>
              </div>
            </center>

            <div className="flex flex-col items-center">
              <div className="w-[100vw] lg:w-full flex lg:flex-col text-start mt-12 gap-y-2 overflow-x-auto whitespace-nowrap lg:whitespace-normal hide-scrollbar ">
                <div
                  onClick={() => {
                    setTab({ ...options, edit_profile: true });
                    localStorageManager.setValue("oldtab", "edit_profile");
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.edit_profile && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <MdPersonOutline /> <p>Edit Profile</p>
                </div>
                <div
                  onClick={() => {
                    setTab({ ...options, saved: true });
                    localStorageManager.setValue("oldtab", "saved");
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.saved && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <IoHeartOutline /> <p>Saved</p>
                </div>
                <div
                  onClick={() => {
                    setTab({ ...options, bookings: true });
                    localStorageManager.setValue("oldtab", "bookings");
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.bookings && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <TbCalendarStats /> <p>Bookings</p>
                </div>
                <div
                  onClick={() => {
                    setTab({ ...options, listings: true });
                    localStorageManager.setValue("oldtab", "listings");
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.listings && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <FaRegBuilding /> <p>Listings</p>
                </div>
                <div
                  onClick={() => {
                    setTab({ ...options, billing_details: true });
                    localStorageManager.setValue("oldtab", "billing_details");
                  }}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.billing_details && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <RiFileListLine /> <p>Billing Details</p>
                </div>
                <LogoutModal showPopup={showPopup} setShowPopup={setShowPopup} setUserData={setUserData} />
                <div
                  onClick={() => { setTab({ ...options, logout: true }); logout(); }}
                  // onClick={() => {handleLogout()}}
                  className={`flex items-center w-full py-2 px-12 rounded-lg gap-x-2 text-slate-400 ${tab.logout && `bg-blue-100 text-black`} cursor-pointer`}
                >
                  <FiLogOut />
                  <p>Logout</p>
                </div>
              </div>
            </div>
          </div>
          {/* Display */}
          <div className="min-h-[500px] w-full border-l-2 border-slate-100">
            {/* user details container */}
            <div className="w-full h-36 flex items-center justify-center text-start lg:justify-between">
              <div className="font-bold text-2xl ml-8">
                {/* <h1>{`${data?.firstName || "--"} ${data?.lastName || "--"}`}</h1> */}
 {/* <h1>{DisplayName(data?.firstName, data?.lastName)}</h1> */}
                <h1>{DisplayName(data?.firstName,)}</h1>
                <p className="text-slate-500 text-[13px]">
                  Joined {data?.joiningDate}
                </p>
              </div>
              <div>
                {/* <div className="flex flex-col items-center justify-center bg-slate-100 rounded-lg px-4 py-2 mr-8">
                  <h1 className="text-2xl font-bold">600</h1>
                  <p className="text-slate-500 text-sm">Total Earnings</p>
                </div> */}
              </div>
            </div>
            {tab.edit_profile && <EditProfile data={data} setData={setData} />}
            {tab.saved && <SavedComponent />}
            {tab.billing_details && <Billing_details data={data} setData={setData} />}
            {tab.bookings && <Bookings />}
            {tab.listings && <Listings />}
            {false && <BillingDetails />}
          </div>
        </div>
      </main>
      <Footer />
    {loader &&  <Loader/>}
    </div>
  );
}
