"use client";
import Image from "next/image";
import { useCallback, useEffect, useState, Suspense, lazy } from "react";
import { easyStorage, easyStoragestage1 } from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "../../components/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import Myform from "../../util/contactform";
import Head from "next/head";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import Loader from "@/components/Loader";
import ItemCalculator from "./ItemCalculator";
import Testimonial from "@/sharedComponent/Testimonial";
import { HandleLocalStorage } from "@/components/HandleLocalStorage";
import dynamic from "next/dynamic";
import { AMENTICS } from "@/util/constant";
import { faqData } from "@/data/faqs";
import Faqs from "@/sharedComponent/landingcomponent/faqs";
const HeroImage = dynamic(() => import("./HeroSection"));

export default function Home() {
  const searchParams = useSearchParams();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [customCoupon, setCustomCoupon] = useState("");
  const [items, setItems] = useState([]);
  const [preData, setPreData] = useState();
  const [insPrice, setInsPrice] = useState(100000);
  const [insErr, setInsErr] = useState();
  const [couponId, setCouponId] = useState("0");

  const [size, setSize] = useState(0);
  const [totalArea, setTotalArea] = useState();
  const [showSelected, setShowSelected] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  const router = useRouter();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [selectedItemShow, setSelectedItemShow] = useState(null);
  const [EasyStorageId, setEasyStorageId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectBtn, setSelectBtn] = useState("Few");
  const [firstRender, setFirstRender] = useState(true);
  // const EasyStorageId = searchParams.get("easyStorageId");
  // const selectedItemShow = searchParams.get("selectedItem");

  const getCalculation = useCallback(
    async (isCoupon) => {
      if (!data) return;
      let args = `?StorageType=${data?.StorageType}&DurationInMonth=${
        data?.DurationInMonth
      }
    &IsLogisticsCharge=${data?.IsLogisticsCharge}
    &StorageRequirement=${data?.StorageRequirement}
    &IsUserSelectedItems=${selectedItemShow ? true : !!selectedItemShow}`;
      args += `&IsInsuranceAmount=${!!data?.IsInsuranceAmount}`;

      if (data.PerLakh) {
        args += `&PerLakh=${data.PerLakh}`;
      }
      if (isCoupon !== "" && isCoupon != undefined) {
        args += `&CouponId=${isCoupon}`;
        setCouponId(isCoupon);
      }
      if (selectedItemShow && firstRender) {
        args += `&SquareFeet=${data?.SquareFeet}`;
        setFirstRender(false);
      }
      if (Math.round(totalArea)) {
        args += `&SquareFeet=${Math.round(totalArea)}`;
      }
      if (EasyStorageId) {
        args += `&EasyStorageId=${EasyStorageId}`;
      }

      setLoader(true);

      try {
        const response = await easyStorage(args);
        if (response?.success) {
          setPreData(response.success);
          setInsErr();
          setShowErrorMessage(false);
          setShowBtn(false);
        } else if (response?.error) {
          if (response?.error?.text == "Invalid coupon code") {
            setShowErrorMessage(true);
            setCustomCoupon("");
            couponId("0");
          } else {
            setInsErr(response?.error?.text);
          }
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoader(false);
      }
    },
    [data, totalArea, customCoupon, couponId, selectedItemShow, EasyStorageId]
  );

  const isValidSizeForArea = (areaLabel, totalArea) => {
    if (!selectedItemShow) {
      return true;
    } else {
      const maxSqFt = preData?.easyStorage?.maximumSquareFeet || 50;

      const sizeLimits = {
        Few: maxSqFt,
        "1 RK": maxSqFt || 100,
        "1 BHK": maxSqFt || 151,
        "2 BHK": maxSqFt || 450,
        "3 BHK": maxSqFt || 580,
        "4 BHK": maxSqFt || 1200,
      };

      return totalArea <= sizeLimits[areaLabel];
    }
  };

  function handleButtonClick(buttonId) {
    setSelectBtn(buttonId);
    if (buttonId === "More Than 4 BHK") {
      window.open(
        "https://web.xtendedspace.com/storage-services-delhi-ncr",
        "_blank"
      );

      const updatedData = {
        ...data,
        StorageType: "1 BHK",
        IsUserSelectedItems: !!selectedItemShow,
      };

      setData(updatedData);
      localStorageManager.setValue(
        "easyStorageData",
        JSON.stringify(updatedData)
      );
    } else if (isValidSizeForArea(buttonId, totalArea)) {
      const updateSqFt = () => {
        switch (buttonId) {
          case "Few":
            return 27;
          case "1 RK":
            return 81;
          case "1 BHK":
            return 132;
          case "2 BHK":
            return 416;
          case "3 BHK":
            return 528;
          case "4 BHK":
            return 864;
          default:
            return 132;
        }
      };
      const updatedData = {
        ...data,
        StorageType: buttonId,
        StorageRequirement: buttonId,
        IsUserSelectedItems: !!selectedItemShow,
      };
      setTotalArea(updateSqFt());

      setData(updatedData);
      localStorageManager.setValue(
        "easyStorageData",
        JSON.stringify(updatedData)
      );
    }
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilter = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
    };
    if (name === "IsInsuranceAmount") {
      if (checked) {
        newFilter = { ...newFilter, PerLakh: 100000 };
      } else {
        newFilter = { ...newFilter, PerLakh: 0 };
      }
    }
    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else {
      setData({ ...data, [name]: value });
    }
    setData(newFilter);
    setInsPrice(newFilter?.PerLakh);
  };
  const saveStorage = async () => {
    setLoader(true);
    if (isSubmitting) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("StorageType", data.StorageType);
    formData.append("DurationInMonth", data.DurationInMonth);
    formData.append("IsLogisticsCharge", data.IsLogisticsCharge);
    formData.append("PerLakh", data.PerLakh);
    formData.append("IsInsuranceAmount", data.IsInsuranceAmount);
    formData.append("City", data.City);
    formData.append("Floor", data.Floor);
    formData.append("StorageRequirement", data.StorageRequirement);
    formData.append("SquareFeet", Math.round(totalArea));

    formData.append("ApplicationUserId", getUserId());

    if (data.CouponId) {
      formData.append("CouponId", data.CouponId);
    }

    if (preData.appliedCoupons) {
      formData.append("CouponId", preData.appliedCoupons.id);
    }
    formData.append("StorageRequirement", data?.StorageType);
    if (EasyStorageId) {
      formData.append("EasyStorageId", EasyStorageId);
    }
    let item = items?.map((elem) => ({
      itemId: elem?.itemId,
      quantity: elem?.quantity,
    }));
    if (item) {
      item.forEach((elem, id) => {
        formData.append(`ItemList[${id}].ItemId`, elem?.itemId);
        formData.append(`ItemList[${id}].Quantity`, elem?.quantity);
      });
    }

    const response = await easyStoragestage1("?Stage=1", formData);
    if (response.success) {
      const urlArr = response.success.url.split("/");
      router.push(
        `/store-at-a-warehouse/bookspace/${urlArr[urlArr.length - 1]}`
      );
      setLoader(false);
    } else {
      setIsSubmitting(false);
      setLoader(false);
    }
  };

  const onSubmit = async (e) => {
    if (!getUserId()) {
      localStorage.setItem("easyStorageData", JSON.stringify(data));
      setLoginModal(true);
      return;
    } else {
      saveStorage();
    }
  };
  useEffect(() => {
    try {
      const localData = localStorageManager.getValue("easyStorageData");
      const easyStorageData = localData ? JSON.parse(localData) : null;
      if (!easyStorageData || typeof easyStorageData !== 'object') {
        setData({
          StorageType: "1 BHK",
          DurationInMonth: "1",
          IsLogisticsCharge: false,
          PerLakh: 100000,
          IsInsuranceAmount: true,
          City: "Noida",
          Floor: "",
          StorageRequirement: "1 BHK",
        });
      } else {
        setData(easyStorageData);
        setInsPrice(easyStorageData?.PerLakh);
      }
  
    } catch (error) {
      console.error("Error parsing local storage data:", error);
      // fallback default data in case of error
      setData({
        StorageType: "1 BHK",
        DurationInMonth: "1",
        IsLogisticsCharge: false,
        PerLakh: 100000,
        IsInsuranceAmount: true,
        City: "Noida",
        Floor: "",
        StorageRequirement: "1 BHK",
      });
    }
  }, []);
  

  useEffect(() => {
    if (data) {
      localStorageManager.setValue("easyStorageData", JSON.stringify(data));
      getCalculation();
    }
  }, [data, selectedItemShow, EasyStorageId]);

  const removeCoupon = () => {
    setCouponId("0");
    setCustomCoupon("");
    getCalculation("");
  };

  useEffect(() => {
    if (preData?.relocationCategories) {
      if (typeof window !== "undefined") {
        const areaCal = !!selectedItemShow
          ? JSON.parse(localStorageManager.getValue("areaCalculator"))
          : [];
        const selectedItem = areaCal?.map((elem) => {
          return { ...elem?.item, quantity: elem.count, tag: "cart" };
        });
        if (showSelected) {
          setItems([
            ...selectedItem,
            ...(preData?.relocationSelectedItems || []),
          ]);
        } else {
          setItems((prev) => [...prev]);
        }
      }
    }
  }, [preData]);

  useEffect(() => {
    if (!data) return;
    const getSizeLabel = (area) => {
      if (area < 28) return "Few";
      if (area <= 81) return "1 RK";
      if (area <= 132) return "1 BHK";
      if (area <= 416) return "2 BHK";
      if (area <= 528) return "3 BHK";
      return "4 BHK";
    };

    const latestSize = getSizeLabel(totalArea);
    if (size !== latestSize) {
      setSelectBtn(latestSize);
    }
  }, [totalArea]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const param = query.get("selectedItem");
    const easyIdParam = query.get("easyStorageId");
     if (param) {
      setSelectedItemShow(param);
    } else if (easyIdParam) {
      setEasyStorageId(easyIdParam);
    }
  }, []);

 

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://xtendedspace.s3.ap-south-1.amazonaws.com/home/Xtended+Space+(1)+1.png"
          type="image/x-icon"
        />
 <link rel="alternate" href="https://www.xtendedspace.com/store-at-a-warehouse" hreflang="en-in" />
        
        <title>Store at a Warehouse - Secure & Spacious Storage</title>
        <meta
          name="description"
          content="Need extra space? Store your items safely at our secure warehouses with Xtended Space. Ideal for personal or business storage—flexible & affordable plans."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="warehouse storage services, warehouse for storage, storage places for rent, warehouse for storage, warehouse space to rent near me, storage places for rent, household storage services, storage for household items, storage warehouse rental, storage warehouse for rent, small warehouse space for rent"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/store-at-a-warehouse"
        />
        <meta
          property="og:title"
          content="Secure Warehouse Storage & Rental Services"
        />
        <meta
          property="og:description"
          content="Xtended Space offers secure warehouse storage units for rent, providing safe storage for household and business items in Delhi NCR."
        />
        <meta
          property="og:image"
          content="/images/easy-storage-space-services.webp"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Small Warehouse Space for Rent"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/easy-storage"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reliable Storage Warehouse Rentals"
        />
        <meta
          name="twitter:description"
          content="Rent reliable storage warehouse space for household and business needs with Xtended Space, offering flexible and secure solutions."
        />
        <meta
          name="twitter:image"
          content="/images/easy-storage-space-services.webp"
        />
        <meta
          name="twitter:image:alt"
          content="Affordable Household Storage Solutions"
        />
      </Head>

      <div className="max-w-[1550px] mx-[auto] w-[100%]">
        <HeaderMenu />

        <HeroImage />

        <section className="w-[auto] h-[auto]">
          <div className="max-w-[1240px] h-[auto] bg-white  mt-8 mx-auto  gap-6 md:grid grid-cols-10">
            <div className="col-span-4  h-[auto] relative p-1 md:p-0">
              <div className="card price-sec  p-3 md:right-[5px]   z-10 md:bottom-[-60px] storage-price top-0 shadow border-2 md:border-none">
                <div className="row ">
                  <div className="ht1 col-md-12">
                    <h2 className="text-[18px] md:text-[20px] text-[#1B1C57] font-semibold">
                      Select Storage Space
                    </h2>
                    <p className="text-[12px] md:text-[16px] text-gray-600">
                      Please select your Storage Requirements
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-[5px] justify-evenly mt-2   max-w-[90vw]">
                  <div className="h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-2xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <button
                        id="button-1"
                      //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                       disabled={showBtn || !firstRender || !!selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("Few")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "Few" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>Few Items</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <button
                        id="button-2"
                      //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                       disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("1 RK")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "1 RK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>1RK</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <button
                        id="button-3"
                         disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("1 BHK")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "1 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>1BHK</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1`}
                  >
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}`}>
                      <button
                        id="button-4"
                      //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                       disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("2 BHK")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "2 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>2BHK</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <button
                        id="button-5"
                      //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                       disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("3 BHK")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "3 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>3BHK</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[55px] overflow-hidden w-[100px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <button
                        id="button-6"
                      //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                       disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}
                        onClick={() => handleButtonClick("4 BHK")}
                        className={`h-[55px] w-[100px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                          (selectBtn ?? data?.StorageType) === "4 BHK" &&
                          "bg-blue-400 !text-white"
                        }`}
                      >
                        <span>4BHK</span>
                      </button>
                    </div>
                  </div>
                  <div className="h-[50px] overflow-hidden w-[200px] items-center justify-center  flex  shadow-xl border  rounded-xl my-1 ">
                    <div className={`text-sm ${showBtn || !firstRender || selectedItemShow || EasyStorageId ? "text-gray-500 bg-slate-300 cursor-none" :"text-gray-700 bg-white cursor-pointer"}   `}>
                      <a href="/services/business-storage" target="">
                        <button
                          id="button-7"
                        //  disabled={(showBtn ? true : !!selectedItemShow)  && (!firstRender)}
                         disabled={showBtn || !firstRender || selectedItemShow || EasyStorageId}// 
                          // onClick={() => handleButtonClick("1 BHK")}
                          className={`h-[50px] w-[200px] rounded-xl text-[12px] md:text-[16px] font-[500] text[#1B1C57]  ${
                            (selectBtn ?? data?.StorageType) ===
                              "More Than 4 BHK" && "bg-blue-400 !text-white"
                          }`}
                        >
                          <span>More Than 4BHK</span>
                          {/* </Link> */}
                        </button>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="my-6 md:hidden col-span-6 flex flex-col md:flex-row bg-gray-10  justify-between">
                  <ItemCalculator
                    items={items}
                    setItems={setItems}
                    preData={preData}
                    totalArea={totalArea}
                    setTotalArea={setTotalArea}
                    setShowSelected={setShowSelected}
                    mobile={true}
                    getCalculation={getCalculation}
                    showBtn={showBtn}
                    setShowBtn={setShowBtn}
                    setFirstRender={setFirstRender}
                    removeCoupon={removeCoupon}
                  />
                </div>

                <div className="my-2 flex bg-white border border-gray-300 rounded shadow">
                  <span className=" inset-y-0 left-0 flex items-center px-2 w-[30px]">
                    <FaRegClock />
                  </span>
                  <select
                    className="block  w-full bg-white hover:border-gray-500 py-3 pr-8 leading-tight focus:outline-none rounded focus:border-blue-500 focus:ring"
                    name="DurationInMonth"
                    onChange={onChange}
                    value={data?.DurationInMonth}
                  >
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                    <option value="6">6 Months</option>
                    <option value="7">7 Months</option>
                    <option value="8">8 Months</option>
                    <option value="9">9 Months</option>
                    <option value="10">10 Months</option>
                    <option value="11">11 Months</option>
                  </select>
                </div>
                <div className="white-box">
                  <p className="text[10px] md:text-[13px] text-center text-color-8 center text-sm text-gray-700 mt-2">
                    Minimum 1 Month booking Required
                  </p>

                  <div className="flex items-center justify-between m-2 mt-30">
                    <div className="col-md-5">
                      <p className="text-[14px] md:text-[18px]  text-black font-semibold">
                        ₹{preData?.monthlyDurationCharge} x 1 Month
                      </p>
                    </div>
                    <div className="col-md-7">
                      <p className="text-end fs-16 text-black fw-6 d-flex justify-content-end">
                        <span className="text-[10px] md:text-[13px] text-color-7 fw-4 pr-5  text-gray-700"></span>
                        {/* ₹6,176 */}₹{preData?.monthlyDurationCharge}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="w-full text-[14px] m-1 ">
                      Would you like to take logistic service also.
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </div>
                    <div className="flex space-x-2 mx-1">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${data?.IsLogisticsCharge
                          ? "bg-[#8DC63F] text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                          onClick={()=>setData({ ...data, IsLogisticsCharge: true })}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={()=>setData({ ...data, IsLogisticsCharge: false })}
                        className={`w-full px-4 py-2 rounded ${data?.IsLogisticsCharge
                          ? "bg-zinc-200 text-zinc-800"
                          : "bg-[#8DC63F] text-white"
                          }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
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
                            //  value={data?.IsInsuranceAmount ? data?.PerLakh : insPrice}
                            value={data?.IsInsuranceAmount ? insPrice : ""}
                            //  disabled={!data?.IsInsuranceAmount}
                            onChange={(e) => setInsPrice(e.target.value)}
                            //  onChange={(e)=>setData({ ...data, "PerLakh": e.target.value })}
                          />
                        </div>
                        <div>
                          <button
                            onClick={(e) => {
                              if (insPrice < 100000 || insPrice > 2000000) {
                                setInsErr(
                                  "Enter insurance amount range between 1 Lac to 20 Lac"
                                );
                              } else {
                                setInsErr();
                                setData({ ...data, PerLakh: insPrice });
                              }
                            }}
                            // onClick={(e) => setData({ ...data, "PerLakh": insPrice })}
                            className="bg-[#8DC63F] text-white text-[12px] mx-2 px-2 py-1 rounded-md"
                          >
                            Check Premium
                          </button>
                        </div>
                      </div>
                      <p className={`${(insErr || insPrice < 100000 || insPrice > 2000000 )? "text-red-500" : "text-gray-800"} text-sm p-0 my-1`}>Enter Insurance Amount Range Between 1 Lac to 20 Lac </p>
                      <div className="select_form flex  justify-between items-center w-full md:w-full h-[50px] border border-gray-300 bg-white rounded-xl mt-3 mb-3 mr-2 md:mr-0">
                        <div className="flex justify-between w-full  items-center">
                          <div className="flex justify-center w-full items-center">
                            {/* <input
                              type="checkbox"
                              id=""
                              name="IsInsuranceAmount"
                              value="IsInsuranceAmount"
                              checked={data?.IsInsuranceAmount}
                              onChange={onChange}
                              className="w-4 text-center ml-3"
                            /> */}
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
                                  {preData?.insuranceAmount &&
                                    `₹${preData.insuranceAmount}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="logistic_money  ">
              <div className="mr-3 text-[#374151] font-medium leading-7 text-base">
                {!!calculatedAmount?.logisticsCharge && `₹${calculatedAmount?.logisticsCharge}`}
              </div>
            </div> */}
                      </div>

                    
{/* 
                      <div className="logistic tf-amenities flex justify-between  items-center p-2 my-[20px] bg-white  w-full md:w-full h-[50px] border border-gray-300 rounded-xl">
                        <div className="flex items-center justify-between">
                          <span className="check-box">
                            <label className="flex justify-center w-[auto] items-center">
                              <input
                                className="w-5"
                                type="checkbox"
                                name="IsLogisticsCharge"
                                onChange={onChange}
                                checked={data?.IsLogisticsCharge}
                              />
                              <span className="btn-checkbox "></span>
                              <span className="font-semibold text-gray-700 text-[16px] ml-3">
                                Opt for Logistics
                              </span>

                              <div className="relative group ml-5 d-inline-flex">
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
                                <div className="tooltip absolute mt-0   mb-2 w-64 p-2 bg-lime-500 text-white text-xs rounded-md shadow-lg">
                                  You can choose your own logistics
                                </div>
                              </div>
                            </label>
                          </span>
                        </div>
                        <div className="price-logistic">
                          <p className="text-end fs-16 text-black fw-6">
                            ₹{preData?.logisticsCharge}
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div className=" max-w-[440px] overflow-hidden">
                    <div className="coupon flex items-center justify-between bg-white rounded-lg px-3  w-full overflow-x-auto overflow-y-hidden">
                      <div className="flex justify-between w-[400px] h-[70px] bg-gray-100 p-2 mx-2  gap-2 rounded  items-center ">
                        <div className="w-[250px]">
                          <input
                            type="text"
                            onChange={(e) => setCustomCoupon(e.target.value)}
                            value={customCoupon}
                            placeholder="Discount Coupon Code"
                            className="p-1"
                          />
                        </div>
                        <div className="w-16">
                          <button
                            className="text-sm font-semibold text-green-600"
                            disabled={customCoupon == ""}
                            // onClick={()=>setCouponId(customCoupon)}
                            onClick={() => getCalculation(customCoupon)}
                          >
                            {
                              // data?.CouponId === customCoupon
                              couponId === customCoupon ? "Applied" : "Apply"
                            }
                            {/* {preData?.allCoupons.some(coupon => coupon.id === data.CouponId && coupon.couponCode === customCoupon) ? "Applied" : "Apply"} */}
                          </button>
                          <button
                            className="text-sm font-semibold text-gray-600"
                            onClick={() => {
                              removeCoupon();
                              // setData({ ...data, CouponId: 0 });
                              setCouponId("0");
                              setCustomCoupon("");
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {preData?.allCoupons?.map((item) => (
                        <div
                          className="flex justify-between w-auto  mx-2 bg-gray-100 p-2 rounded  items-center"
                          key={item.couponCode}
                        >
                          <div className="w-full md:w-full mr-4">
                            <div className=" flex items-center  gap-2">
                              <Image
                                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/coupon1.svg"
                                alt="coupon"
                                width={30}
                                height={30}
                              />

                              <p className="text-lg font-semibold text-gray-800">
                                <span className="c-name text-yellow-300">
                                  {item.couponCode}
                                </span>
                              </p>
                              <p className="text-[8px] md:text-[10px] text-gray-600 w-[150px]">
                                Use Coupon code
                              </p>
                            </div>
                            <div className="mt-2">
                              <p className=" text-[8px] md:text-[12px] text-gray-700 lg:text-[16px]">
                               {"Flat "} 
                                {item.amountType === "Percent"
                                  ? `${item.amount}%`
                                  : `₹${item.amount}`}  {"OFF"}
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <button
                              className="text-sm font-semibold text-green-600"
                              onClick={() => {
                                setCustomCoupon("");
                                getCalculation(item?.id);
                                setCouponId(item?.id);
                                setShowErrorMessage(false);
                              }}
                            >
                              {/* {item.id === data?.CouponId ? "Applied" : "Apply"} */}
                              {item.id === couponId ? "Applied" : "Apply"}
                            </button>
                            <button
                              className="text-sm font-semibold text-gray-600"
                              onClick={removeCoupon}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {showErrorMessage && (
                      <p className="success-message text-red-500 font-semibold py-2 px-2">
                        Invalid Coupon Code!
                      </p>
                    )}
                    <p
                      className={`${
                        insErr ? "text-red-500" : "text-gray-800"
                      } text-sm p-0 my-1`}
                    >
                      {insErr}
                    </p>

                    {/* </div> */}
                    {/* <input type="text" className="w-[150px] text-[10px] px-2" placeholder="Enter coupon code" /> */}

                    <div className="tprice flex justify-between items-center  m-2 p-2 ">
                      <div>
                        <h2 className="font-bold">Total {data?.IsLogisticsCharge && <span className="text-[12px] font-normal"> (logistic charges is not included)</span>} </h2>
                      </div>
                      <div className="d-flex">
                        <p className="mr-15 text-[10px] md:text-[13px] pr-5 text-gray-700"></p>
                        <h3 className="text-[20px] md:text-[16px] font-bold">
                          {/* ₹9,135 */}₹{preData?.totalAmount}
                        </h3>
                      </div>
                    </div>
                      <p className="text[10px] md:text-[13px] text-center text-color-8 center text-sm text-gray-700 mt-2">
                    *This price is only eligible for Delhi NCR region only.
                  </p>

                    {!showBtn && (
                      <div className="flex justify-center">
                        <button
                          onClick={onSubmit}
                          disabled={isSubmitting || items.length <= 0 || insErr =="Enter insurance amount range between 1 Lac to 20 Lac" || (insPrice < 100000 || insPrice > 2000000)}
                          className=" mb-3 w-full text-[12px] md:text-[20px] bg-[#8DC63F] text-white py-2 px-5 border rounded-md"
                        >
                          Book With ₹{preData?.payTokenMoney} Token Money
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden col-span-6 md:flex flex-col md:flex-row bg-gray-10  justify-between">
              <ItemCalculator
                items={items}
                setItems={setItems}
                preData={preData}
                StorageType={data?.StorageType}
                totalArea={totalArea}
                setTotalArea={setTotalArea}
                setShowSelected={setShowSelected}
                mobile={false}
                getCalculation={getCalculation}
                showBtn={showBtn}
                setShowBtn={setShowBtn}
                setFirstRender={setFirstRender}
                removeCoupon={removeCoupon}
              />
            </div>
          </div>
        </section>

        <>
          <section className="w-[auto] h-[auto] mt-[20px]  md:mt-0   md:p-[100px] pb-0 ">
            <div className=" ">
              <div className="ht1">
                <h2 className="text-[20px] md:text-[32px] text-left text-[#1B1C57] capitalize  font-[600] pl-[20px] md:pl-0 py-4">
                  Advantages for you
                </h2>
              </div>
              <div className="flex flex-wrap gap-[10px] justify-between h-[auto] m-[auto]   max-w-[90vw]   md:border-black rounded-3xl">
                <div className="max-h-[250px] w-[90vw] md:w-[35vw] p-3  ">
                  <div className=" flex items-center">
                    <img
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="/images/icon/Sofa2.svg"
                      alt=""
                    />
                    <h2 className="text-[16px] md:text-[24px] font-semibold text-[#1B1C57]">
                      Large Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px] ">
                    Such as Double Mattress Bed, Seater Sofa, Dining Table,
                    Dressing Table, washing Machine, Double Door Fridge, etc.
                  </p>
                </div>
                <div className="max-h-[250px] w-[90vw] md:w-[35vw] p-3 ">
                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Condicioner2.svg"
                      alt="conditioner"
                      width={96}
                      height={96}
                    />
                    <h2 className="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] ">
                      Medium Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Dining Chairs, Side Table, Centre Table, Office Chair, Small
                    Cupboard, Foldable Mattress, Split AC.
                  </p>
                </div>
                <div className="max-h-[250px] w-[90vw] md:w-[35vw] p-3 ">
                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Chair.svg"
                      alt="chair"
                      width={96}
                      height={96}
                    />
                    <h2 className="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                      Small Items
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Clothes Bags, Buckets, Plastic Chair, Stands, Small Shoe
                    Rack, Air Purifier.
                  </p>
                </div>
                <div className="max-h-[250px] w-[90vw] md:w-[35vw] p-3  ">
                  <div className=" flex items-center">
                    <Image
                      className="w-[24px] md:w-[40px] h-[24px] md:h-[40px]"
                      src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box.svg"
                      alt="box"
                      width={96}
                      height={96}
                    />
                    <h2 className="text-[16px] md:text-[24px] font-semibold text-[#1B1C57] color-blu">
                      Boxes
                    </h2>
                  </div>
                  <p className="text-[#73788C] capitalize text-[12px] md:text-[18px]">
                    Standard size (1.5ft x 1.75ft x 2ft).
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="easystorage" className="easystorage bg-[#F7F9FC]">
            <div className="easystorage-text">
              <h2>Secure and Smart Space Storage with Xtended Space </h2>
              <p>
                Give your belongings a secure and safe space at affordable
                prices. Make your storage process smooth and hassle-free with
                Xtended Space. Experience now!{" "}
              </p>
            </div>
            <div className="easystorage-img">
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Secure+and+Smart+Space+Storage+with+Xtended+Space.webp"
                alt="image"
                width={500}
                className="!w-[100%]"
                height={500}
              />
            </div>
          </section>
          <section id="easystorage2" className="easystorage ">
            <div className="easystorage-img">
              {/* <!-- <div className="colordiv"></div> --> */}
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Warehouse+Service+Reach+Across+Delhi+NCR.webp"
                alt="delhincr"
                width={500}
                className="!w-[100%]"
                height={500}
              />
            </div>

            <div className="easystorage-text">
              <h2>Warehouse Service Reach Across Delhi NCR </h2>
              <p>
                Revolutionise your storage experience with the convenient
                warehousing service. We provide a combo of warehouse and
                transportation services across Delhi NCR at a click.{" "}
              </p>
            </div>
          </section>

          <section id="easystorage" className="easystorage bg-[#F7F9FC]">
            <div className="easystorage-text">
              <h2>Door to Door Logistics Services </h2>
              <p>
                Enjoy Door-to-Door Logistics Services at Xtended Space, the
                ultimate P2P AI tech Storage Platform in Delhi NCR. Also,
                experience seamless storage solutions by storing your household
                items.
              </p>
            </div>
            <div className="easystorage-img">
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Door+to+Door+Logistics+Services.webp"
                alt="image"
                width={500}
                className="!w-[100%]"
                height={500}
              />
            </div>
          </section>
          <section className="w-[auto]  md:p-[100px] mt-2 ">
            <div className="bg-[#F7F9FC]">
              <div className="ht1">
                {" "}
                <h2 className="text-[20px] md:text-[32px] md:text-left font-semibold text-[#1B1C57] p-[20px] md:p-[40px]">
                  Amenities
                </h2>
              </div>
              <div className="flex flex-wrap md:gap-[5px] justify-evenly max-w-[90vw] md:border-black rounded-3xl mx-auto">
      {Object.values(AMENTICS).map((amenity, index) => (
        <div
          key={index}
          className="h-[100px] w-[350px] items-center justify-between flex"
        >
          <div className="text-[20px] md:text-[34px]  flex items-center justify-center text-[#1B1C57]">
            {amenity.icon} 
          </div>
          <div className="w-[300px] pl-[20px]">
            <h2 className="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              {amenity.title}
            </h2>
            <p className="text-gray-700 text-[16px]">{amenity.desc}</p>
          </div>
        </div>
      ))}
    </div>
            
            </div>
          </section>
          <div className="Blogs">
            <div className="self-center my-[50px] text-[18px] md:text-[34px] font-semibold text-[#1B1C57] text-center capitalize  max:max-w-full">
              What Our User Say About Us
            </div>
            {/* <SimpleSlider4 /> */}
            <Testimonial name={"easy-storage"} />
          </div>


 <Faqs FAQData={faqData?.StoreAtaWareHouse} />

          {/* <div className="max-w-[1240px] bg-white mx-auto p-2 my-5 md:grid grid-cols-2"><div className="col-span-1 md:w-[80%]"><img src="/static/media/laptop.45ddf500e572fb2f1d35.jpg" alt=""/></div><div className=" col-span-1 flex  justify-center"><h1 className="text-[#00df9a] font-bold my-2">LEARN FROM EXPERTS</h1><p className="my-2 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima porro, possimus cum eligendi, doloremque aliquid numquam vitae error asperiores cupiditate, voluptas optio quaerat quo fugiat et suscipit dicta modi iusto sed facilis officia pariatur magni? Cumque ipsum voluptatum cum,</p><button className="w-[30%] bg-black text-white p-3 rounded">Get started</button></div></div> */}

          <Myform />
          {loginModal && (
            <LoginModal
              show={loginModal}
              onHide={() => setLoginModal(false)}
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
              callback={"store-at-a-warehouse"}
              easyStorage={true}
              saveStorage={saveStorage}
            />
          )}
          <RegisterModal
            show={registerModal}
            onHide={() => setRegisterModal(false)}
            setRegisterModal={setRegisterModal}
            callback={"store-at-a-warehouse"}
            easyStorage={true}
            saveStorage={saveStorage}
          />
          <HandleLocalStorage />
          <Footer />
        </>
      </div>
      {loader && <Loader />}
    </>
  );
}
