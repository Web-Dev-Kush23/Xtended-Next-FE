import React, { useState, useEffect } from "react";
import {
  FaFireExtinguisher,
  FaSmokingBan,
  FaVideo,
  FaLock,
  FaShieldAlt,
  FaBug,
  FaKey,
  FaClock,
  FaBroom 
} from "react-icons/fa";
import dayjs from 'dayjs';
import dynamic from "next/dynamic";
import { MdOutlineSafetyCheck, MdLabel } from "react-icons/md";
const Map = dynamic(() => import("@/components/map"));

import { FaDropletSlash } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import MultipleItems from "@/sharedComponent/slider11";
import { getUserId, isMobile } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "../../../components/footer";
import { useParams, useSearchParams } from "next/navigation";
import moment from "moment";
import { IoLocationSharp } from "react-icons/io5";
import { DatePicker } from "antd";
import { GiSmokingVolcano, GiWeightScale } from "react-icons/gi";
import {
  getAllStorageById,
  CalculationBookingAmount,
  SaveBookingDetails,
  GetPropertyReviewData,
} from "@/service/storageService";
import SimilarProperties from '@/components/SimilarProperty';
import { GetPropertyWishlist, AddPropertyToWishlist, RemoveWishlist, GetUserWishlistData } from "@/service/storageService";

import CustomPaging from "@/sharedComponent/slider14";
import Link from "next/link";
import Coupon from "@/components/Coupon";
import { useRouter } from "next/router";
import { MdOutlineShare } from "react-icons/md";
import { FaWhatsapp, FaFacebook, FaSms } from "react-icons/fa";
import { IoMdMailUnread } from "react-icons/io";
import Loader from '@/components/Loader';
import { faqData } from "@/data/faqs";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
import { getPropertySizeImage } from "@/util/constant";
import P2pratingSlider from "@/sharedComponent/P2pratingSlider";
import { FaTableCellsRowLock } from "react-icons/fa6";
const PropertDetails = ({ data, similarProperties }) => {
  const propertyId = data?.propertyId;
  const originalAmount = data?.originalAmount;
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState();
  const [loader, setLoader] = useState(false)
  const [insPrice, setInsPrice] = useState(100000);
  const [insErr, setInsErr] = useState();
  // const [data, setData] = useState({});
  const [payload, setPayload] = useState({
    Day: 0,
    IsLogistics: false,
    Isinsuranceamount: true,
    PerLakh: 100000,
    CouponId: "",
    SelectedSquareFeet: data?.remainingSqFt > 0 ? data?.remainingSqFt : data?.sqrFeet || ''
  });
  const isInsInvalid = insPrice < 100000 || insPrice > 2000000;
  const [calculatedAmount, setCalculatedAmount] = useState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preData, setPreData] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [wishinglist, setWishinglist] = useState({})
  const [userId, setUserId] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [reviewData , setReviewData] = useState()

  const displayPropertyType = data?.propertyType?.replace("Car Storage", "Vehicle Storage");
  const imageUrl = getPropertySizeImage(data, preData);
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const id = getUserId();
    if (id) setUserId(id);
  }, []);

  useEffect(() => {
    // Retrieve data from local storage when the component mounts
    const storedData = localStorage.getItem("propertyDetails");
    const storedPropertyId = localStorage.getItem("propertyId");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentPropertyData = parsedData[data?.propertyId]; // Fetch data for the current propertyId
      if (currentPropertyData) {
        setPayload(currentPropertyData); // Set the payload with saved data
      }
    }
  }, [data?.propertyId]);
  const handleHeartClick = (e) => {
    e.preventDefault();
    if (!userId) {

      router.push(`/login?callback=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (wishinglist[data?.propertyId]) {
      handleRemoveFromWishlist(wishinglist[data?.propertyId]);
    } else {
      handleAddToWishlist(data?.propertyId);
    }
  };

  // useEffect(() => { getWishListData(); }, []);
  const handleAddToWishlist = async (propertyId) => {
    const args = `UserId=${getUserId()}&PropertyId=${propertyId}`;
    const response = await AddPropertyToWishlist(args);
    if (response.success) { getWishListData(); }
  };

  const handleRemoveFromWishlist = async (wishListId) => {
    const args = `?WishListId=${wishListId}`;
    const response = await RemoveWishlist(args);
    if (response.success) { getWishListData(); }
  };

  const getWishListData = async () => {
    const args = `?ApplicationUserId=${getUserId()}`;
    const wishResult = await GetUserWishlistData(args)
    if (wishResult.success) { const mappedData = wishResult.success.reduce((acc, data) => { acc[data?.propertyId] = data?.wishListId; return acc; }, {}); setWishinglist(mappedData) }
  }
  const getReviewData = async () => {
    const resp = await GetPropertyReviewData(propertyId)
    if (resp.success){
      setReviewData(resp?.success?.data)
    }
  }
  
  useEffect(() => {
    getWishListData();
    getReviewData();
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const [startDate, setStartDate] = useState("");
  const [response, setResponse] = useState({});
  const handleStartDateChange = (date, dateString) => {
    setStartDate(dateString);
    onChangeHandler({
      target: { type: "date", name: "StartDate", value: dateString },
    });
  };

  const handleEndDateChange = (date, dateString) => {
    onChangeHandler({
      target: { type: "date", name: "EndDate", value: dateString },
    });
  };

  let diffInDays = 0;

  const saveBooking = async () => {
    setLoader(true)
    const allKeys = Object.keys(payload);
    const formData = new FormData();
    allKeys.forEach((item) => {
      if (item !== "CouponId")
        formData.append(item, payload[item]);
    });
    if (preData?.appliedCoupons) {
      formData.append("CouponId", preData?.appliedCoupons.id);
    }
    formData.append("CurrentUserId", getUserId());
    formData.append("IsAffordableLogistics", payload?.IsLogistics);
    formData.append("propertyId", propertyId);
    formData.append("originalAmount", originalAmount);
    const response = await SaveBookingDetails("?Stage=1", formData);


    if (response.success) {
      const storedData = localStorage.getItem("propertyDetails");
      const updatedData = storedData ? JSON.parse(storedData) : {};
      updatedData[propertyId] = payload; // Save data keyed by propertyId
      localStorage.setItem("propertyDetails", JSON.stringify(updatedData));

      const urlArr = response.success.url.split("/");
      router.push(`/store-with-a-host/booking-space/${urlArr[urlArr.length - 1]}`);
      setLoader(false)
    } else {
      setShowErrorMessage(response.error);
      // setIsSubmitting(false);
      setLoader(false)

    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    // setIsSubmitting(true);
    if (!payload.StartDate || !payload.EndDate) {
      setShowErrorMessage({ message: "Start and End date is mandatory" });
      // setIsSubmitting(false);

      return;
    }
    if (!getUserId()) {
      localStorage.setItem("pendingBooking", JSON.stringify(payload));
      setLoginModal(true);
      // setIsSubmitting(false);
      return;

    } else {
      saveBooking()
    }
  };


  const onChangeHandler = async (e) => {
    const { name, value, type, checked } = e.target;
    setShowErrorMessage();
    let newFilter = {
      ...payload,
      [name]: type === "checkbox" ? checked : value,
    };
    if (name === "Isinsuranceamount") {
      if (checked) {
        newFilter = { ...newFilter, PerLakh: 100000 };
      } else {
        newFilter = { ...newFilter, PerLakh: 0 };
      }
    }
    if (type === "checkbox") {
      setPayload({ ...newFilter, [name]: checked });
    } else {
      setPayload({ ...newFilter, [name]: value });
    }
    setPayload(newFilter);
    setInsPrice(newFilter?.PerLakh);
  };
 

  const getcalculatedData = async (args) => {
    const response = await CalculationBookingAmount(args);
    if (response.success) {
      setCalculatedAmount(response.success);
      setResponse(response);
      setInsErr();

      // if (response.success) {
      setPreData(response.success);

    } else {
      setShowErrorMessage(response.error);
      setInsErr(response?.error?.text);

      console.error("Error calculating amount:", response.error);
    }
  };

  useEffect(() => {
    const { StartDate, EndDate, Isinsuranceamount, PerLakh, SelectedSquareFeet } = payload || {};
    let args = `?PropertyId=${propertyId}`;
    if (StartDate && EndDate) {
      const StartDateMoment = moment(StartDate, "DD/MM/YYYY"); // Specify format if necessary
      const EndDateMoment = moment(EndDate, "DD/MM/YYYY"); // Specify format if necessary

      // Calculate the difference in days
      diffInDays = (EndDateMoment.diff(StartDateMoment, "days") + 1);
      if (diffInDays < 0) {
        // Ensure that the difference is not negative
        setShowErrorMessage({
          message: "End date cannot be before start date",
        });
        return;
      }

      args += `&Day=${diffInDays}`;
    }
    // if (payload.IsLogistics) {
      args += `&IsLogistics=${payload?.IsLogistics}`;
    // }
    
    args += `&Isinsuranceamount=${payload?.Isinsuranceamount}`;
    if (payload?.PerLakh) {
      args += `&PerLakh=${payload?.PerLakh}`;
    }
    if (SelectedSquareFeet) {
      args += `&SelectedSquareFeet=${SelectedSquareFeet}`;
    }
    args += `&CouponId=${payload.CouponId ? payload.CouponId : ""}`;

    if (diffInDays > data?.minimumBookingDays - 1) {
      getcalculatedData(args);
    }
  }, [payload, data]);

  const amenities = {
    isFireExtinguisher: {
      title: "Fire Extinguishers",
      desc: "Emergency ready fire extinguishers.",
      icon: <FaFireExtinguisher />,
    },
    isLockedArea: {
      title: "Lock-Enabled",
      desc: "Damage-proof lock access.",
      icon: <FaLock />,
    },
    isPestControl: {
      title: "Pest-Control",
      desc: "Pest-guarded zone.",
      icon: <FaBug />,
    },
    hasSmokeDetector: {
      title: "Smoke Detectors",
      desc: "Installation of smoke sensors.",
      icon: <GiSmokingVolcano />,
    },
    hasGuardedSociety: {
      title: "Guarded Society",
      desc: "Guarded society, safe belongings.",
      icon: <FaShieldAlt />,
    },
    hasSeparateAccess: {
      title: "Separate Access",
      desc: "Convenience of private entry .",
      icon: <FaKey />,
    },
    hasSecurityCamera: {
      title: "Camera Surveillance",
      desc: "24/7 CCTV monitoring.",
      icon: <FaVideo />,
    },
    isMoistureFree: {
      title: "Moisture Free",
      desc: "Leakage-protected property.",
      icon: <FaDropletSlash />,
    },
    isFlexibleTimings: {
      title: "Flexible Timings",
      desc: "Smooth visits, anytime.",
      icon: <FaClock />,
    },
    houseKeeping: {
      title: "House Keeping",
      desc: "Routine cleanups, lasting care.",
      icon: <FaBroom  />,
    },
    isLockAndKey: {
      title: "Lock & Key",
      desc: "Personal lock & key for secure storage.",
      icon: <FaTableCellsRowLock />,
      },
  };
  const filterTrueAmenities = (data) => {
    const filteredAmenities = {};
    Object.keys(amenities).forEach((key) => {
      if (data[key]) {
        filteredAmenities[key] = amenities[key];
      }
    });
    return filteredAmenities;
  };
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleShare = (platform) => {
    let shareLink = "";
    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${shareUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case "email":
        shareLink = `mailto:?subject=Check this out!&body=${shareUrl}`;
        break;
      case "message":
        shareLink = `sms:?body=${shareUrl}`;
        break;
      default:
        return;
    }
    window.open(shareLink, "_blank");
    setShowDropdown(false);
  };

  const trueAmenities = filterTrueAmenities(data);

  // if (!data || Object.keys(data).length === 0) {
  //   return <div>Loading...</div>;
  // }
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />

      <div className="section w-full h-auto  md:bg-white">
        <div class=" w-full mx-auto md:px-4 px-3 ">

           <div className="hidden md:flex items-center justify-around mt-2">
            <div className="inline-flex justify-center items-center md:justify-start gap-1 bg-[#FEF2DB] px-4 py-2 rounded-full ">
                  <img
                    src="/images/calculator/ph_house-fill.svg"
                    alt="household1"
                    className=" md:w-[20px]"
                  />
                  <div className="text-lg whitespace-nowrap text-blue-600  w-auto"> For {" "}
                    {displayPropertyType}
                  </div>
                </div>
                <div className="text-[#000000] font-medium text-lg text-wrap md:text-xl py-2">
                  Storage space in {data?.city}, {data?.state}
                </div>
                <div className="text-lg whitespace-nowrap w-auto font-semibold">Dimensions  - '{data?.lengthInFeet} X {data?.widthInFeet}'
                </div>
           </div>

          <div class="flex flex-col lg:flex-row gap-4 md:px-[50px] h-auto md:h-[2400px] ">
            
            <div class="  lg:w-3/5">
              <div class="flex items-center gap-2 md:px-4">
                <div className="middle_seccalculatorstorage flex justify-between   w-full py-3 ">
                  {/* <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-2 py-2 rounded-full">
                <img
                  src="/images/calculator/ph_house-fill.svg"
                  alt="household1"
                  className="w-full md:w-15"
                />
                <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                  {displayPropertyType}
                </div>
              </div> */}

                </div>

              </div>

              <div className="w-full h-[auto] py-2 md:p-4 mx-auto md:px-[50px] ">
                {data?.propertyImages && <CustomPaging data={data} />}
              </div>
              {/* {data?.description && data?.description.split(' ').length >= 3 ? ( */}
              <div className=" w-full flex items-center my-4">
                <div className="w-[80%]">
                  <p className="text-zinc-600   text-[16px]">
                    {/* {truncateDescription(data?.description, 15)} */}

                    {`Affordable ${displayPropertyType} Space Near ${data?.address2} in ${data?.city}.`}
                  </p>
                </div>
                <div className="w-[20%]">
                  <div className="flex gap-2 md:gap-4">      <span
                    className="p-[10px] bg-[#0000002a] rounded-full cursor-pointer relative"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <MdOutlineShare />


                    {showDropdown && (
                      <div className="absolute top-[40px] left-0  rounded-md w-10 z-10 bg-white shadow">
                        <div
                          className=" items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer  "
                          onClick={() => handleShare("whatsapp")}
                        >
                          <FaWhatsapp className="text-green-500 text-[20px]" />

                        </div>
                        <div
                          className=" items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer "
                          onClick={() => handleShare("facebook")}
                        >
                          <FaFacebook className="text-blue-500 text-[20px]" />

                        </div>
                        <div
                          className="items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleShare("email")}
                        >
                          <IoMdMailUnread className="text-red-600 text-[20px]" />
                        </div>


                        <div
                          className="items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer md:hidden"
                          onClick={() => handleShare("message")}
                        >
                          <FaSms className="text-blue-600 text-[20px]" />
                        </div>
                      </div>

                    )}
                  </span>

                    <div
                      className={`p-[10px] bg-[#0000002a] rounded-full`}
                      onClick={handleHeartClick}
                    >
                      <FaHeart className={wishinglist[data?.propertyId] ? 'text-red-600' : 'text-gray-400'} />
                    </div></div>
                </div>
              </div>

              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-zinc-600 text-center bg-white py-4 rounded">
                <div className="border-r px-2 ">
                  <span class=" text-zinc-800 py-2 leading-loose ">
                    Property Size
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px] ">
                    {/* 1BHK (300-400 sq ft) */}
                    {/* {data?.propertyStorageType?.propertySize} ( 
                    {data?.propertyStorageType?.minimumSquareFeet} - 
                    {data?.propertyStorageType?.maximumSquareFeet} sq.ft.) */}
                    {data?.sqrFeet} sq.ft.
                  </p>
                </div>

                {data?.entranceWidthInFeet > 0 && data?.entranceHeightInFeet > 0 && (
                  <div className="border-r px-2">
                    <span className="text-zinc-800 py-2 leading-loose">
                      Entrance
                    </span>
                    <p className="text-blue-400 font-semibold text-[17px]">
                      {data?.entranceWidthInFeet}X{data?.entranceHeightInFeet} ft
                    </p>
                  </div>
                )}

                <div className="border-r px-2">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Storage Type
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {displayPropertyType}
                  </p>
                </div>
                <div className="px-2 xl:px-4">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Access Flexibility
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data?.tenantVisitFrequency}
                  </p>
                </div>
              </div>
              <div class=" col-span-2 flex flex-col md:flex-row items-center bg-[#F7F9FC] rounded  bg-gray-10 p-[20px]  justify-between">
                <img
                  className="md:w-[250px] w-[300px] h-[250px]"
                  src={imageUrl}
                  alt=""
                />

                <div className="ht1 md:px-2">
                  <div className=" ht1 items-center md:max-w-[100%]">
                    <h1 className="text-[#1B1C57] font-semibold mt-2 text-2xl leading-7 ">
                      {data?.propertyStorageType?.propertySize}

                      <span className="text-[#1B1C57] leading-5 text-xl font-normal ">
                        ( {data?.propertyStorageType?.minimumSquareFeet}-
                        {data?.propertyStorageType?.maximumSquareFeet} sq ft.)
                        {/* (500-700 sq ft.) */}
                      </span>
                    </h1>
                  </div>
                  <div className="md:max-w-[100%] ht1  ">
                    <h3 className="text-[#626687] font-normal leading-6 text-xs">
                      Type of items that can be stored here
                    </h3>
                  </div>

                  <div class="flex flex-wrap gap-[10px] lg:gap-[15px] justify-evenly md:justify-start mt-4   max-w-[100%]   rounded-3xl mx-auto">
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex    rounded-2xl bg-white">
                      <img
                        className="w-[35px] h-[35px]"
                        src="/images/icon/Box (1).svg"
                        alt=""
                      />

                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {/* {preData?.easyStorageType.largeItem}  Large */}
                          {data?.propertyStorageType?.smallItem} Small
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex   rounded-2xl bg-white">
                      <img
                        className="w-[30px] h-[30px]"
                        src="/images/icon/Box (1).svg"
                        alt=""
                      />
                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">

                          {data?.propertyStorageType?.mediumItem} Medium
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                      <img
                        className="w-[25px] h-[25px]"
                        src="/images/icon/Box (1).svg"
                        alt=""
                      />

                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">
                          {data?.propertyStorageType?.largeItem} Large
                        </h2>
                      </div>
                    </div>
                    <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                      <img
                        className="w-[20px] h-[20px]"
                        src="/images/icon/Box (1).svg"
                        alt=""
                      />
                      <div className="w-[auto]">
                        <h2 class="text-[14px] md:text-[18px] ">

                          {data?.propertyStorageType?.box} Boxes(approx)
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/* <div class="flex items-center justify-center  mt-30">
                    <a
                      class="link font-bold text-center text-blue-600 text-[16px] md:text-[18px] mt-[20px]"
                      href="/images/home/xtended price list.pdf"
                      target="blank"
                    >
                      See Pricing List
                    </a>


                  </div> */}
                </div>
              </div>
              <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-4 p-4">
            <img
              src={data?.pictureStoragePath?data?.pictureStoragePath:`/images/icon/Avatar Base.svg`}
              alt="User Avatar"
              className="rounded-full w-12 h-12"
            />
            <div>
              <h2 className="text-xl font-semibold">{data?.hostFullName}</h2>
              <p className="text-gray-600">Joined {data?.customerCreatedDate} <span className="ml-2">{data?.totalCustomerSpace} Spaces</span></p>
            </div>
          </div>

          <div className="block md:hidden items-center justify-around mt-2">
            <div className="inline-flex justify-center items-center md:justify-start gap-1 bg-[#FEF2DB] px-4 py-2 rounded-full ">
                  <img
                    src="/images/calculator/ph_house-fill.svg"
                    alt="household1"
                    className=" md:w-[20px]"
                  />
                  <div className="text-lg whitespace-nowrap text-blue-600  w-auto"> For {" "}
                    {displayPropertyType}
                  </div>
                </div>
                <div className="text-[#000000] font-medium text-lg text-wrap md:text-xl py-2">
                  Storage space in {data?.city}, {data?.state}
                </div>
                <div className="text-lg whitespace-nowrap w-auto font-semibold">Dimensions  - {data?.lengthInFeet}' X {data?.widthInFeet}'
                </div>
           </div>

<div className="w-full lg:w-2/5  md:right-0 md:hidden block md:sticky h-auto md:h-fit md:top-[10%]">
              <div className="storagespace-right-heading ">
                

                <form onSubmit={handleSubmit}>
                  <div className="storage_space_form  flex justify-center items-center   flex-col px-4  mt-4 w-full md:w-[100%] h-auto md:h-[90vh] bg-white rounded-2xl shadow-sm border border-gray-500">
                    <div className="w-full md:w-[100%] h-[auto] text-start py-2 md:py-5 ">
                      <div className="flex justify-between items-center">
                        <div class="topmostform flex flex-row md:flex-row gap-2 items-center text-center text-lg md:text-xl p-2">
                          {/* <div class="text-[#E29A9A] font-medium leading-7 md:mb-0">
                          <del>&#8377;{originalAmount}</del>
                        </div> */}
                          {originalAmount > data?.perDayRentalAmount && (
                            <div className="text-[#E29A9A] font-medium leading-7 md:mb-0">
                              <del>&#8377;{originalAmount * 30}</del>
                            </div>
                          )}
                          <div class="text-[#374151] font-semibold leading-7 flex items-center">
                            <span>&#8377;{data?.perDayRentalAmount * 30}</span>
                            <span>/Month</span>
                          </div>
                        </div>
                        {data?.isFirstMonthDiscount && (
                          <div class="h-fit w-[fit-content] !rounded-md bg-blue-50 text-green-800 px-[10px] py-[5px]"><p class="flex items-center !font-semibold text-matthew-shade flex-col"><span class="whitespace-nowrap leading-[10px] text-[15px]">50% off</span><span class="whitespace-nowrap leading-[14px] text-[12px]">1st month</span></p></div>
                        )}
                      </div>
                      {data?.isFirstMonthDiscount && (
                        <p className="text-lime-600 text-sm py-2">Book for at least 90 days and get 50% off your first month’s rent!</p>
                      )}
                      <div className="datefrom_to flex w-full gap-2">
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            From
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleStartDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment().endOf("day")
                            }
                            value={payload.StartDate ? dayjs(payload.StartDate, "DD/MM/YYYY") : null}
                          />
                        </div>
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            To
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleEndDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment(payload.StartDate, "DD/MM/YYYY").add(data?.minimumBookingDays - 1, "days")
                            }
                            value={payload.EndDate ? dayjs(payload.EndDate, "DD/MM/YYYY") : null}
                          />

                        </div>
                      </div>
                      <div className="  flex  justify-center items-center font-normal  text-[#6B7280] mt-2">
                        <div className="text-sm  ">
                          Minimum {data?.minimumBookingDays} Days Booking
                          Required
                        </div>
                      </div>
                      <div class="flex flex-row md:flex-row  gap-1 mx-[auto] justify-between md:w-[100%]">
                        <div class="flex items-center">
                          <span class="text-[#000000] font-normal text-sm md:text-base">
                            &#8377;{response?.success?.perDayAmount ?? data?.perDayRentalAmount}
                          </span>
                          <span>&#215;</span>
                          <span class="text-[#000000] font-normal text-sm md:text-base md:mr-3 whitespace-nowrap">
                            {response?.success?.totalDay} Days
                          </span>
                        </div>
                        <div class="flex items-center gap-2 ">
                          <p class="text-[#6B7280] text-sm font-normal leading-5 mr-3 md:mr-0 m-0">
                            {/* Inclusive of GST 18% */}
                          </p>

                          <div class="text-[#000000] font-normal text-sm md:text-base leading-7">
                            &#8377;
                            {response?.success?.totalRentalAmount }
                            {/* &#8377;{(data?.perDayRentalAmount * response?.success?.totalDay)} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="block text-gray-700 text-[16px] font-semibold mt-2 text-start w-full">
                      Required Area for Storage (in Sq.ft.) <span className="text-danger">*</span>
                    </label>

                    <div className="select_form flex  justify-between items-center w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl mr-2 md:mr-0">
                      <input
                        type="number"
                        id=""
                        name="SelectedSquareFeet"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                        onChange={onChangeHandler}
                        value={payload.SelectedSquareFeet}
                        className="ml-3 outline-none w-full"
                        disabled={data.storageType === "Independent"}
                      />
                    </div>
    
                    {/* <div className="w-full">
                    <div className="w-full text-[14px] m-1 ">
                      Would you like to take logistic service also.
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </div>
                    <div className="flex space-x-2 mx-1">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${payload?.IsLogistics
                          ? "bg-[#8DC63F] text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                          onClick={()=>setPayload({ ...payload, IsLogistics: true })}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={()=>setPayload({ ...payload, IsLogistics: false })}
                        className={`w-full px-4 py-2 rounded ${payload?.IsLogistics
                          ? "bg-zinc-200 text-zinc-800"
                          : "bg-[#8DC63F] text-white"
                          }`}
                      >
                        No
                      </button>
                    </div>
                  </div> */}
                  <div className="relative inline-block group bg-gray-100 w-full  my-2 rounded-lg">
                    <span className="flex items-center gap-2 px-3 pt-2 font-semibold text-gray-700 text-[16px]"><span className="text-[20px]">
                      {/* <IoIosInformationCircleOutline /> */}
                      </span> Add your Insurance  <span className="font-medium text-sm leading-8 text-[#C60909]">*</span></span>
                    <div className="z-10 group-hover:block w-full p-2 mt-0.5">
                    <div className=" flex justify-between items-center mr-2 md:mr-0 w-full md:w-[100%] h-[50px] bg-white  rounded-xl ">
                        <div className="mx-2 ">
                          <input
                            className="w-full bg-slate-100 border rounded-md p-2"
                            type="number"
                            name="PerLakh"
                            id="PerLakh"
                            placeholder="Sum Insured Value"
                            value={payload?.Isinsuranceamount ? insPrice : ""}
                            onChange={(e) => setInsPrice(e.target.value)}
                         />
                        </div>
                        <div>
                          <button type="button"
                            onClick={(e) => {
                              if (insPrice < 100000 || insPrice > 2000000) {
                                setInsErr(
                                  "Enter insurance amount range between 1 Lac to 20 Lac"
                                );
                              } else {
                                setInsErr();
                                setPayload({ ...payload, PerLakh: insPrice });
                              }
                            }}
                            className="bg-[#8DC63F] text-white text-[12px] mx-2 px-2 py-1 rounded-md"
                          >
                            Check Premium
                          </button>
                        </div>
                      </div>
                      <p className={`${insErr ? "text-red-500" : "text-gray-800"} text-sm p-0 my-1`}>{insErr ? insErr : "Enter Insurance Amount Range Between 1 Lac to 20 Lac "}</p>
                      <div className="select_form flex  justify-between items-center w-full md:w-full h-[50px] border border-gray-300 bg-white rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                        <div className="flex justify-between w-full  items-center">
                          <div className="flex justify-center w-full items-center">
                         
                            <div className="flex w-full items-center justify-between font-semibold leading-5 text-[16px] text-gray-700 ">
                              <div className="flex ml-3">
                                <p className="text-[12px]">Insurance amount</p>

                                <div className="relative easy-tooltip group ml-5 d-inline-flex">
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z"
                                      fill="#C1C1C1"
                                    />
                                  </svg>
                                  <div className="text-tooltip absolute mt-0 z-1  mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                                    Protect stored items against fire, theft and
                                    burglary (Insurance)
                                  </div>
                                </div>
                              </div>
                              <div className="premium_at text-[#6B7280] flex items-center font-normal text-xs">
                                Premium amount{" "}
                                <span className="money_amount mr-3 font-medium ml-3 text-base leading-7 text-[#374151]">
                                {calculatedAmount?.insuranceAmount &&
                                  `₹${calculatedAmount.insuranceAmount}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
               
                      </div>

                
                    </div>
                  </div>
                    <Coupon
                      couponData={calculatedAmount?.allCoupons}
                      setPayload={setPayload}
                      payload={payload}
                      showErrorMessage={showErrorMessage}
                      setShowErrorMessage={setShowErrorMessage}
                    />
                    <p className="text-blue-500 text-sm">{calculatedAmount?.note}</p>

                    <div className="gst_sec flex justify-between items-center w-full md:w-[100%] h-auto  text-center m-1">
                      <div className="left_total text-[#000000] font-medium leading-7 text-2xl">
                        Total
                      </div>

                      <div className="inclusive_right flex justify-between items-center">
                        <div className="gst_right text-[#6B7280] font-normal text-sm mr-2 ">
                          {/* Inclusive of GST 18% */}
                        </div>
                        <div className="gst_money text-[#374151] font-medium text-base leading-7 ">
                          ₹ {calculatedAmount?.totalAmount}
                        </div>
                      </div>
                    </div>
                    <div className="book_button flex justify-between items-center mt-2 mb-4 w-full gap-2 ">
                      <Link href="/affordable-storage" className="py-2 shadow-md w-1/2 rounded-lg text-center border text-blue-500">Previous</Link>
                      <button
                        type="submit"
                        disabled={isInsInvalid}
                        className={`bg-[#338CFF] text-white shadow-md w-1/2 py-2 rounded-lg ${
                          isInsInvalid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Book
                      </button>
                    </div>
                    {/* {showErrorMessage.show && (
                  <div className="text-red-500 text-sm">{showErrorMessage.message}</div>
                )} */}
                    {showErrorMessage && (
                      <p className="text-red-500 text-center">
                        {showErrorMessage.text || showErrorMessage.message || showErrorMessage.error}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>

          <hr/>
          <div className=" mt-4 bg-white p-4 rounded-lg ">
            <h3 className="font-semibold mb-4 text-[20px] md:text-[26px]">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(trueAmenities).map((key) => (
                <div key={key} className="flex items-start space-x-2">
                  <div className="w-10 h-10 text-xl">
                    {trueAmenities[key].icon}
                  </div>
                  <div>
                    <h4 className="capitalize text-[16px] md:text-[18px] font-semibold text-gray-600">
                      {trueAmenities[key].title}
                    </h4>
                    <p className="text-[16px] text-gray-500">{trueAmenities[key].desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="mt-4 text-blue-500">Show more &gt;</button> */}
          </div>
          <hr/>

          <div className="virtualclass mt-6 p-6 rounded-lg  md:flex items-center">
            <img
              src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Easy-Storage.webp"
              alt="VR Image"
              className="mr-4"
            />
            <div className="flex flex-col gap-2">
              <h3 className=" text-lg md:text-xl font-semibold">
                Store at a Warehouse Services at Xtended Space.
              </h3>
              <p className="text-zinc-500 md:text-md text-sm text-justify">
                Xtended Space simplifies your warehousing challenges with
                convenient storage solutions for household and business needs.
              </p>
              <div className="">
                <Link
                  href="/store-at-a-warehouse"
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Store at a Warehouse
                </Link>
              </div>
            </div>
          </div>
          {/* <div className=" my-4 shadow border">
            <Map lat={data?.latitude} lng={data?.longitude} type="P2P" />
          </div> */}
        </div>

<hr/>


  <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg  max-w-[1240px] mx-auto my-6">
  <h2 className="text-xl font-semibold mb-4 dark:text-white">Things to Know</h2>
  <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
    
    {/* Section: Security & Safety */}
    <div>
      <h3 className="font-semibold mb-2 dark:text-zinc-300">Security & Safety</h3>
      <ul className="space-y-2 text-zinc-700 dark:text-zinc-400">
        <li className="text-[14px] flex items-center gap-2">
          <FaVideo className="text-[#1B1C57] text-[30px] mt-[2px]" />
          <span>Most spaces have CCTV surveillance.</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <FaFireExtinguisher className="text-[#1B1C57] text-[35px] mt-[2px]" />
          <span>Basic fire safety norms are followed.</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <FaShieldAlt className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>Amenities and security features vary by property and are listed by the host on the listing page.</span>
        </li>
      </ul>
    </div>

    {/* Section: Storage Guidelines */}
    <div>
      <h3 className="font-semibold mb-2 dark:text-zinc-300">Storage Guidelines</h3>
      <ul className="space-y-2 text-zinc-700 dark:text-zinc-400">
        <li className="text-[14px] flex items-center gap-2">
          <GiSmokingVolcano className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>Prohibited: Flammable, illegal, perishable, or hazardous items.</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <MdLabel className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>All goods must be packed, labeled, and suitable for stacking.</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <GiWeightScale className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>Capacity limits (by weight & volume) may apply – check the listing.</span>
        </li>
      </ul>
    </div>

    {/* Section: Insurance */}
    <div>
      <h3 className="font-semibold mb-2 dark:text-zinc-300">Insurance (Mandatory)</h3>
      <ul className="space-y-2 text-zinc-700 dark:text-zinc-400">
        <li className="text-[14px] flex items-center gap-2">
          {/* <MdOutlineSafetyCheck className="text-[#1B1C57] text-[40px] mt-[2px]" /> */}
          <span className="text-gray-700">Insurance is mandatory and included in all bookings.</span>
        </li>
        <li className="text-sm font-semibold mt-2">Coverage includes:</li>
        <li className="text-[14px] flex items-center gap-2">
          <FaFireExtinguisher className="text-[#1B1C57] text-[35px] mt-[2px]" />
          <span>Fire</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <FaLock className="text-[#1B1C57] text-[30px] mt-[2px]" />
          <span>Theft</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <FaShieldAlt className="text-[#1B1C57] text-[30px] mt-[2px]" />
          <span>Act of God (e.g., floods, earthquakes)</span>
        </li>
      </ul>
    </div>

    {/* Section: Access & Timings */}
    <div>
      <h3 className="font-semibold mb-2 dark:text-zinc-300">Access & Timings</h3>
      <ul className="space-y-2 text-zinc-700 dark:text-zinc-400">
        <li className="text-[14px] flex items-center gap-2">
          <FaClock className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>Standard Access Hours: 9:00AM - 7:00PM, Monday to Saturday</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <MdOutlineSafetyCheck className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>Advance notice required for visit or retrieval.</span>
        </li>
        <li className="text-[14px] flex items-center gap-2">
          <FaClock className="text-[#1B1C57] text-[40px] mt-[2px]" />
          <span>24/7 access available at select properties (check the listing).</span>
        </li>
      </ul>
    </div>

  </div>
</div>
            </div>
            <div className="w-full lg:w-2/5  right-0 relative md:block hidden  md:sticky h-fit top-[10%]">
              <div className="storagespace-right-heading ">
                

                <form onSubmit={handleSubmit}>
                  <div className="storage_space_form  flex justify-center items-center   flex-col px-4  mt-4 w-full md:w-[100%] h-auto md:h-[90vh] bg-white rounded-2xl shadow-sm border border-gray-500">
                    <div className="w-full md:w-[100%] h-[auto] text-start py-2 md:py-5 ">
                      <div className="flex justify-between items-center">
                        <div class="topmostform flex flex-row md:flex-row gap-2 items-center text-center text-lg md:text-xl p-2">
                          {/* <div class="text-[#E29A9A] font-medium leading-7 md:mb-0">
                          <del>&#8377;{originalAmount}</del>
                        </div> */}
                          {originalAmount > data?.perDayRentalAmount && (
                            <div className="text-[#E29A9A] font-medium leading-7 md:mb-0">
                              <del>&#8377;{originalAmount * 30}</del>
                            </div>
                          )}
                          <div class="text-[#374151] font-semibold leading-7 flex items-center">
                            <span>&#8377;{data?.perDayRentalAmount * 30}</span>
                            <span>/Month</span>
                          </div>
                        </div>
                        {data?.isFirstMonthDiscount && (
                          <div class="h-fit w-[fit-content] !rounded-md bg-blue-50 text-green-800 px-[10px] py-[5px]"><p class="flex items-center !font-semibold text-matthew-shade flex-col"><span class="whitespace-nowrap leading-[10px] text-[15px]">50% off</span><span class="whitespace-nowrap leading-[14px] text-[12px]">1st month</span></p></div>
                        )}
                      </div>
                      {data?.isFirstMonthDiscount && (
                        <p className="text-lime-600 text-sm py-2">Book for at least 90 days and get 50% off your first month’s rent!</p>
                      )}
                      <div className="datefrom_to flex w-full gap-2">
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            From
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleStartDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment().endOf("day")
                            }
                            value={payload.StartDate ? dayjs(payload.StartDate, "DD/MM/YYYY") : null}
                          />
                        </div>
                        <div className="border rounded-md px-2 w-1/2">
                          <label
                            for="start"
                            className="text-xs font-semibold text-[#000000]"
                          >
                            To
                          </label>

                          <DatePicker
                            className="w-full border-none rounded-lg py-1"
                            onChange={handleEndDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={(current) =>
                              current && current < moment(payload.StartDate, "DD/MM/YYYY").add(data?.minimumBookingDays - 1, "days")
                            }
                            value={payload.EndDate ? dayjs(payload.EndDate, "DD/MM/YYYY") : null}
                          />

                        </div>
                      </div>
                      <div className="  flex  justify-center items-center font-normal  text-[#6B7280] mt-2">
                        <div className="text-sm  ">
                          Minimum {data?.minimumBookingDays} Days Booking
                          Required
                        </div>
                      </div>
                      <div class="flex flex-row md:flex-row  gap-1 mx-[auto] justify-between md:w-[100%]">
                        <div class="flex items-center">
                          <span class="text-[#000000] font-normal text-sm md:text-base">
                            &#8377;{response?.success?.perDayAmount ?? data?.perDayRentalAmount}
                          </span>
                          <span>&#215;</span>
                          <span class="text-[#000000] font-normal text-sm md:text-base md:mr-3 whitespace-nowrap">
                            {response?.success?.totalDay} Days
                          </span>
                        </div>
                        <div class="flex items-center gap-2 ">
                          <p class="text-[#6B7280] text-sm font-normal leading-5 mr-3 md:mr-0 m-0">
                            {/* Inclusive of GST 18% */}
                          </p>

                          <div class="text-[#000000] font-normal text-sm md:text-base leading-7">
                            &#8377;
                            {response?.success?.totalRentalAmount }
                            {/* &#8377;{(data?.perDayRentalAmount * response?.success?.totalDay)} */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="block text-gray-700 text-[16px] font-semibold mt-2 text-start w-full">
                      Required Area for Storage (in Sq.ft.) <span className="text-danger">*</span>
                    </label>

                    <div className="select_form flex  justify-between items-center w-full md:w-[100%] h-[50px] border border-gray-300 rounded-xl mr-2 md:mr-0">
                      <input
                        type="number"
                        id=""
                        name="SelectedSquareFeet"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        }}
                        onChange={onChangeHandler}
                        value={payload.SelectedSquareFeet}
                        className="ml-3 outline-none w-full"
                        disabled={data.storageType === "Independent"}
                      />
                    </div>
    
                    {/* <div className="w-full">
                    <div className="w-full text-[14px] m-1 ">
                      Would you like to take logistic service also.
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </div>
                    <div className="flex space-x-2 mx-1">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${payload?.IsLogistics
                          ? "bg-[#8DC63F] text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                          onClick={()=>setPayload({ ...payload, IsLogistics: true })}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={()=>setPayload({ ...payload, IsLogistics: false })}
                        className={`w-full px-4 py-2 rounded ${payload?.IsLogistics
                          ? "bg-zinc-200 text-zinc-800"
                          : "bg-[#8DC63F] text-white"
                          }`}
                      >
                        No
                      </button>
                    </div>
                  </div> */}
                  <div className="relative inline-block group bg-gray-100 w-full  my-2 rounded-lg">
                    <span className="flex items-center gap-2 px-3 pt-2 font-semibold text-gray-700 text-[16px]"><span className="text-[20px]">
                      {/* <IoIosInformationCircleOutline /> */}
                      </span> Add your Insurance  <span className="font-medium text-sm leading-8 text-[#C60909]">*</span></span>
                    <div className="z-10 group-hover:block w-full p-2 mt-0.5">
                    <div className=" flex justify-between items-center mr-2 md:mr-0 w-full md:w-[100%] h-[50px] bg-white  rounded-xl ">
                        <div className="mx-2 ">
                          <input
                            className="w-full bg-slate-100 border rounded-md p-2"
                            type="number"
                            name="PerLakh"
                            id="PerLakh"
                            placeholder="Sum Insured Value"
                            value={payload?.Isinsuranceamount ? insPrice : ""}
                            onChange={(e) => setInsPrice(e.target.value)}
                         />
                        </div>
                        <div>
                          <button type="button"
                            onClick={(e) => {
                              if (insPrice < 100000 || insPrice > 2000000) {
                                setInsErr(
                                  "Enter insurance amount range between 1 Lac to 20 Lac"
                                );
                              } else {
                                setInsErr();
                                setPayload({ ...payload, PerLakh: insPrice });
                              }
                            }}
                            className="bg-[#8DC63F] text-white text-[12px] mx-2 px-2 py-1 rounded-md"
                          >
                            Check Premium
                          </button>
                        </div>
                      </div>
                      <p className={`${insErr ? "text-red-500" : "text-gray-800"} text-sm p-0 my-1`}>{insErr ? insErr : "Enter Insurance Amount Range Between 1 Lac to 20 Lac "}</p>
                      <div className="select_form flex  justify-between items-center w-full md:w-full h-[50px] border border-gray-300 bg-white rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                        <div className="flex justify-between w-full  items-center">
                          <div className="flex justify-center w-full items-center">
                         
                            <div className="flex w-full items-center justify-between font-semibold leading-5 text-[16px] text-gray-700 ">
                              <div className="flex ml-3">
                                <p className="text-[12px]">Insurance amount</p>

                                <div className="relative easy-tooltip group ml-5 d-inline-flex">
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 17 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z"
                                      fill="#C1C1C1"
                                    />
                                  </svg>
                                  <div className="text-tooltip absolute mt-0 z-1  mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                                    Protect stored items against fire, theft and
                                    burglary (Insurance)
                                  </div>
                                </div>
                              </div>
                              <div className="premium_at text-[#6B7280] flex items-center font-normal text-xs">
                                Premium amount{" "}
                                <span className="money_amount mr-3 font-medium ml-3 text-base leading-7 text-[#374151]">
                                {calculatedAmount?.insuranceAmount &&
                                  `₹${calculatedAmount.insuranceAmount}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
               
                      </div>

                
                    </div>
                  </div>
                    <Coupon
                      couponData={calculatedAmount?.allCoupons}
                      setPayload={setPayload}
                      payload={payload}
                      showErrorMessage={showErrorMessage}
                      setShowErrorMessage={setShowErrorMessage}
                    />
                    <p className="text-blue-500 text-sm">{calculatedAmount?.note}</p>

                    <div className="gst_sec flex justify-between items-center w-full md:w-[100%] h-auto  text-center m-1">
                      <div className="left_total text-[#000000] font-medium leading-7 text-2xl">
                        Total
                      </div>

                      <div className="inclusive_right flex justify-between items-center">
                        <div className="gst_right text-[#6B7280] font-normal text-sm mr-2 ">
                          {/* Inclusive of GST 18% */}
                        </div>
                        <div className="gst_money text-[#374151] font-medium text-base leading-7 ">
                          ₹ {calculatedAmount?.totalAmount}
                        </div>
                      </div>
                    </div>
                    <div className="book_button flex justify-between items-center mt-2 mb-4 w-full gap-2 ">
                      <Link href="/affordable-storage" className="py-2 shadow-md w-1/2 rounded-lg text-center border text-blue-500">Previous</Link>
                      <button
                        type="submit"
                        disabled={isInsInvalid}
                        className={`bg-[#338CFF] text-white shadow-md w-1/2 py-2 rounded-lg ${
                          isInsInvalid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Book
                      </button>
                    </div>
                    {/* {showErrorMessage.show && (
                  <div className="text-red-500 text-sm">{showErrorMessage.message}</div>
                )} */}
                    {showErrorMessage && (
                      <p className="text-red-500 text-center">
                        {showErrorMessage.text || showErrorMessage.message || showErrorMessage.error}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        

{/* {reviewData?.length>0 && <div className="max-w-screen-xl mx-auto p-4">
<h5 className="text-start my-4 text-[18px] md:text-[28px] font-semibold text-[#1B1C57] p-[2px]">Client Testimonials</h5>
  <P2pratingSlider data={reviewData}/>

</div>} */}

<div className="max-w-[1240px] mx-auto w-full py-[50px] text-[18px] md:text-[32px] font-semibold text-[#1B1C57]">
  <h2 className="my-4 text-[18px] md:text-[28px] font-semibold text-[#1B1C57] p-[2px] ">Similar Properties</h2>
<SimilarProperties properties={similarProperties} />
</div>
        
        <div class="simplyfy_storage flex flex-col md:flex-row items-center justify-between p-8 ">
          <div class="md:w-1/2 pl-2">
            <h1 class="text-[22px] md:text-[48px]   font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Simplify Your Storage Experience with Store at a Warehouse
            </h1>
            <p class="text-zinc-700 text-[17px] md:text-[18px]  mb-6">
              Everything you need about finding the best, safe and affordable
              storage space near you.
            </p>
            <Link
              href="/store-at-a-warehouse"
              class="flex justify-center items-center  w-[18rem] h-[3rem] px-3 py-4 bg-[#FFFFFF] shadow-custom rounded-lg"
            >
              Explore Store at a Warehouse
            </Link>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img
              src="/images/list-storage/storage-solutionimg.png"
              alt="Storage Boxes"
              class="max-w-full h-auto"
            />
          </div>
        </div>
        <Faqs FAQData={faqData?.StoreWithAHost} />
      </div>
      {loginModal && <LoginModal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        setLoginModal={setLoginModal}
        setRegisterModal={setRegisterModal}
        callback={"store-with-a-host"}
        p2p={true}
        saveBooking={saveBooking}
      />}


      <RegisterModal
        show={registerModal}
        onHide={() => setRegisterModal(false)}
        setRegisterModal={setRegisterModal}
        callback={"store-with-a-host"}
        p2p={true}
        saveBooking={saveBooking}
      />
      <Footer />
      {loader && <Loader />}
    </div>
  );
}


export default PropertDetails;


export async function getServerSideProps(context) {
  const { property_details } = context.query;
  const originalAmount = 123
  const property_detailsArr = property_details.split("-");
  const propertyId = property_detailsArr[property_detailsArr.length - 1];

  const args = `?propertyId=${propertyId}&originalAmount=${originalAmount}`;
  const { req } = context;
  const host = req.headers["host"];

  const isProduction = host && (host.includes("stage.xtendedspace.com") || host.includes("localhost") || host.includes("main.d2kyc") || host.includes("devlopment.d3fsm"));
  let url = `${"https://xtendedspace-web-api.azurewebsites.net"}`;

  if (isProduction) {
    url = `${"https://xtendedspace-apinew.azurewebsites.net"}`;

  }
  const res = await fetch(`${url}/BookingList/GetListingDataById${args}
    `);
  const data = await res.json();
  console.log("Data fetched for property details:", data);
  return {
    props: {
      data: data?.data,
      similarProperties: data?.similarProperties,
    },
  };
}