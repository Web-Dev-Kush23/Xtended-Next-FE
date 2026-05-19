import FormModal from "@/sharedComponent/modal/formModal";
import React, { useState, useEffect } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import dayjs from 'dayjs';
import {
  easyStorageModalAddress,
  getEasyStorageDate,
  easyStorage,
  getUserAddress,
  easyStoragestage1,
  getCityNearby,
  easyStoragestage1Res, GetEasyStoragePincode,
} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import PayNowButton from "./PayNowButton";
import {
  getFormateddate,
  getFormateddateForEndDate,
  getFormateddateForStage2,
  localStorageManager,
} from "@/util/common";
import { getUserId } from "@/util/common";

import Easystorageaddress from "@/sharedComponent/storagecommoncompo/easystorageaddress";
import Easystoragenewaddress from "@/sharedComponent/storagecommoncompo/easystoragenewaddress";
// import { servivePinCode } from "@/util/constant";
import { DatePicker } from "antd";
import moment from "moment";
import Image from "next/image";
import Floor_Plan from "../../../../public/images/product/Floor-Plan.png";
// /images/product/Floor-Plan.png
import { IoIosInformationCircleOutline } from "react-icons/io";
import Loader from "@/components/Loader";
import { getPropertySizeImage } from "@/util/constant";

const ModalBody = ({ setModalShow, fetchUserAddress }) => {
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState();
  const [nearbyCities, setNearbyCities] = useState();
  const [addressNearby, setAddressNearby] = useState();

  // const servivePinCode = ["110001","110002","110003","110005","110006","110007","110008","110009","110010","110011","110012","110013","110014","110015","110016","110017","110018","110019","110020","110021","110022","110023","110024","110025","110026","110027","110028","110029","110030","110031","110032","110033","110034","110035","110036","110037","110038","110039","110040","110041","110042","110043","110044","110045","110046","110047","110048","110049","110051","110052","110053","110054","110055","110056","110057","110058","110059","110060","110061","110062","110063","110064","110065","110066","110067","110068","110069","110070","110071","110072","110073","110074","110075","110076","110077","110078","110081","110082","110083","110084","110085","110086","110087","110088","110089","110091","110092","110093","110094","110095","110096","121001","121002","121003","121004","121005","121006","121007","121008","121009"];
  const [data, setData] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    Pincode: "",
    IsDefault: "",
    IsLiftAvailable: "",
    Floor: "",
  });

  // if (response.success) {
  //   setAddressNearby(response.success)
  //   addressNearby[0].District
  //   addressNearby[0].City

  // }

  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data.Pincode}`;
      const response = await GetEasyStoragePincode(args);

      if (response.success) {
        setAddressNearby(response.success);
        setError();
        setData((prevData) => ({
          ...prevData,
          City: response?.success?.city,
          State: response?.success?.state,
        }));
      } else {
        console.error("Failed to fetch nearby cities", response.error);
        setError(response.error?.error);
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };
  useEffect(() => {
    if (data.Pincode.length === 6) {
      if (data.Pincode) {
        fetchNearbyCities();
      } else {
        setError("Sorry, Service not available");
      }
    }
  }, [data.Pincode]);

  const onChange = (e) => {
    // setError();
    // const { name, value } = e.target;
    const { name, value, checked } = e.target;

    // If the checkbox is checked, set IsDefault to true, otherwise false
    const isDefault = name === "IsDefault" ? checked : data.IsDefault;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
      IsDefault: isDefault,
    }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (error || !addressNearby) {
      return;
    }
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append("UserId", getUserId());
    const response = await easyStorageModalAddress(formData);
    if (response.success) {
      // alert("address updated successfully!");
      fetchUserAddress();

      setModalShow(false);
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        setMultipleError(response?.error?.errors);
      }
      setError(response.error.errors.text || "An Error occured");
    }
  };
  const handleLiftAvailability = (availability) => {
    setData((prevData) => ({
      ...prevData,
      IsLiftAvailable: availability,
    }));
  };
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <form class="mt-4" onSubmit={onsubmitHandler}>
        <div class="mb-4">
          <label class="block text-md  font-semibold text-gray-800">
            Enter your Address*
          </label>
          <input
            type="text"
            name="AddressLine1"
            placeholder="Address Line 1"
            required=""
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {multipleError?.AddressLine1 && (
            <p className="text-base text-red-500">
              {multipleError?.AddressLine1}
            </p>
          )}
          <input
            type="text"
            name="AddressLine2"
            placeholder="Address Line 2"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {multipleError?.AddressLine2 && (
            <p className="text-base text-red-500">
              {multipleError?.AddressLine2}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-md  font-semibold text-gray-800">
            Pincode*
          </label>
          <input
            type="text"
            name="Pincode"
            placeholder="Enter Pincode"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
         
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="block text-md  font-semibold text-gray-800">
              City*
            </label>
            <input
              type="text"
              name="City"
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City"
              value={addressNearby?.city}
              onChange={onChange}
              required
            />

          </div>

          <div className="mb-4">
            <label className="block text-md  font-semibold text-gray-800">
              State*
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
              name="State"
              onChange={onChange}
              value={addressNearby && addressNearby?.state}
            />

          </div>
        </div>

        <div class="flex-1 ">
              <label class="block  text-black mb-1 ">
                Lift Available
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <div class="flex ">
                <button
                  type="button"
                  className={`w-[290px] mr-1 px-4 py-2 rounded ${
                    data.IsLiftAvailable === true
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`w-[290px] ml-6 px-4 py-2 rounded ${
                    data.IsLiftAvailable === false
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(false)}
                >
                  No
                </button>
                
              </div>
            </div>

              <div class="flex-1 pb-4">
              <label class="block   text-black mb-1">
                Floors
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <input
                type="tel"
                name="Floor"
                value={data.Floor || ""}
                onChange={onChange}
                placeholder="Enter Floors"
                class="form-input w-full  px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                min="1"
                max="20"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}


        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              name="IsDefault"
              onChange={onChange}
            />
            <span className="ml-2 text-sm text-zinc-700">
              Set this address as default
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

const EasyStorageStage2 = () => {
  const router = useRouter();
  const [addressChangeModel, setAddressChangeModel] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [easyStorageDate, setEasyStorageDate] = useState();
  const [addressId, setAddressid] = useState();
  const [isPaymentEnable, setIsPaymentEnable] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [acknowledege, setAcknowledge] = useState(true)
  const [loader, setLoader] = useState(false)


  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  function handleClickOutside(event) {
    if (!event.target.closest('.dropbtn')) {
      setDropdownOpen(false);
    }
  }



  // Add click listener for outside clicks
  if (typeof window !== 'undefined') {
    window.onclick = handleClickOutside;
  }

  const [data, setData] = useState({});
  const [easyStorageData, seteasyStorageDate] = useState();
  const searchParams = useSearchParams();
  const [EasyStorageId, setEasyStorageId] = useState();

  // const startDate = `${startDate}`
  const onChange = (e) => {
    const { name, value } = e.target;

    // Check if the input field is for "Floors"
    if (name === "Floors") {
      // Apply the value condition only for "Floors"
      let processedValue = value.replace(/\D/g, ""); // Remove non-numeric characters

      // Ensure the value is not empty and convert it to an integer
      if (processedValue.startsWith("-")) {
        if (processedValue.length > 3) {
          processedValue = processedValue.slice(0, 3);
        }
      } else if (processedValue.length > 2) {
        processedValue = processedValue.slice(0, 2);
      }
      // Update the state with the processed value for "Floors"
      setData((prevData) => ({
        ...prevData,
        [name]: processedValue,
      }));
    } else {
      // For other input fields, directly update the state with the value
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // If the input field is for "startDate", perform additional actions
    if (name === "startDate") {
      getDate(value);
    }
  };

  const getDate = async (startDate) => {
    const args = `?EasyStorageId=${EasyStorageId}&StartDate=${startDate}`;
    const response = await getEasyStorageDate(args);
    if (response.success) {
      // setEasyStorageDate(response.success);
      setEasyStorageDate(response.success);
    }
  };

  const onChangeFloorLift = async (value) => {
    if (!getUserId()) {
      // return alert("please login!");
    }
    // const IsLiftAvailable = data.IsLiftAvailable;
    // const Floors = data.Floors;

    const formData = new FormData();
    formData.append("ApplicationUserId", getUserId());
    // formData.append("IsLiftAvailable", IsLiftAvailable);
    // formData.append("Floors", Floors);
    formData.append("EasyStorageId", EasyStorageId);
    formData.append("UserAddressId", addressId);
    formData.append("StartDate", data.startDate);
    const response = await easyStoragestage1("?Stage=2", formData);

    // if (response.success) {
    //   router.push(`/easy-storage/bookspace?EasyStorageId=${response.success?.EasyStorageId.Id}&paymentId=${response.success?.payment.Id}`);
    // }
    if (response.success) {
    }
  };

  const handleLiftAvailability = (availability) => {
    setData((prevData) => ({
      ...prevData,
      IsLiftAvailable: availability,
    }));
  };

  const fetchUserAddress = async () => {
    try {
      const userId = getUserId();
      const response = await getUserAddress(`?UserId=${userId}`);
      if (response.success) {
        setAddresses(response.success?.data);
      } else {
        console.error("Error fetching addresses:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // const [data, setData] = useState(null);
  const [preData, setPreData] = useState({
    propertySize: "1 BHK",
    largeItem: 2,
    mediumItem: 4,
    smallItem: 8,
    box: 10,
    minimumSquareFeet: 501,
    maximumSquareFeet: 700,
  });

  useEffect(() => {
    const easyStorageIdArr = router?.query?.easyStorageStage2?.split("-")?.pop();
    // console.log(easyStorageIdArr,"easyStorageIdArr")
    // const easyStorageId = easyStorageIdArr[easyStorageIdArr?.length - 1];
    setEasyStorageId(easyStorageIdArr);
  }, [router?.query?.easyStorageStage2]);


  useEffect(() => {
    if (EasyStorageId) {
      (async () => {
        const response = await easyStoragestage1Res(EasyStorageId);

        if (response.success) {

          // is use login

          const userId = await getUserId();
          // console.log("userId", userId)
          if (!userId) {
            localStorageManager.setValue(
              "userDetails",
              JSON.stringify(response.success.userDetail
              )
            );
            window.location.reload();
          } else {
            setPreData(response.success);
            setData({ ...data, IsLiftAvailable: response.success.pickupDetails.isLiftAvailable, Floors: response.success.pickupDetails.floors, startDate: response.success.pickupDetails.startDate })
            fetchUserAddress();
          }

        }
      })();
    }
  }, [EasyStorageId]);

  const fetchData = async (easyStorageId) => {
    const response = await easyStoragestage1Res(easyStorageId);
    if (response.success) {
      const hasReloaded = localStorageManager.getValue("hasReloaded");
      localStorageManager.setValue(
        "userDetails",
        JSON.stringify(response.success.userDetail)
      );
      if (!hasReloaded) {
        localStorageManager.setValue("hasReloaded", true);
        window.location.reload();
      }
    }
    else{
      
    }
  

      setPreData(response.success);
      setData({
        ...data,
        IsLiftAvailable: response.success?.pickupDetails?.isLiftAvailable,
        Floors: response.success?.pickupDetails?.floors,
        startDate: response.success?.pickupDetails?.startDate,
      });
    
      fetchUserAddress();
    
  }

  useEffect(() => {
    if (!!data.startDate && !!addressId) {
      setIsPaymentEnable(true);
      onChangeFloorLift();
    } else {
      setIsPaymentEnable(false);
    }
  }, [data, addressId]);

  useEffect(() => {
    const dtToday = new Date();
    dtToday.setDate(dtToday.getDate() + 1);
    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    const year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    const maxDate = `${year}-${month}-${day}`;
    document.getElementById("date").min = maxDate;
    const localData = localStorageManager.getValue("easyStorageData");
    const easyStorageData = localData ? JSON.parse(localData):"";
    seteasyStorageDate(easyStorageData);
  }, []);
  const imageUrl = getPropertySizeImage(preData);

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />
      {/* <div>
          <h2>PreData:</h2>
          <pre>{JSON.stringify(preData, null, 2)}</pre>
        </div> */}
      <section className="Bookyourspace flex-col md:flex-row flex ml-3 mr-3  ">
        <div className="bookyourspace_left  w-full md:w-[794px] h-auto  bg-[#FFFFFF] pl-0 md:pl-[80px]">
          <div className="bookyourspace_link  w-full  h-[32px] p-0 md:p-4 mb-3 ">
            <div className="flex">
              <a
                href="/"
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Home
              </a>
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Double%20Alt%20Arrow%20Right.svg"
                alt="doublearrowicon1"
                className="w-5"
                width={5}
                height={5}
              />
              <a
                href="/store-at-a-warehouse"
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Store at a warehouse
              </a>
              <Image
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Double%20Alt%20Arrow%20Right.svg"
                alt="doublearrowicon1"
                className="w-5"
                width={5}
                height={5}
              />
              <a
                href=""
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Booking
              </a>
            </div>
          </div>
          <div className="bookyourspace_wraper w-[auto] h-[auto] ">
            <div className="bookyourspace_heading w-[311px] h-[30px]  font-semibold text-[25px] text-[#1B1C57] whitespace-nowrap pb-10">
              Book Your Space
            </div>
            <div className="bookyourspace_date flex w-full md:w-[590px] h-[81px] mt-2 gap-2">
              <div className="w-1/2 h-[81px]">
                <div>
                  Start Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex">
                  <DatePicker
                    className="w-full border border-solid border-[#D1D5DB] h-[44px] rounded-lg"
                    onChange={(date, dateString) => {
                      getDate(dateString);
                      setData({ ...data, startDate: dateString });
                    }}
                    format="DD/MM/YYYY"
                    value={data.startDate ? dayjs(data.startDate, 'DD/MM/YYYY') : null}
                    // defaultValue={preData?.pickupDetails?.startDate}

                    // defaultValue={dayjs(preData?.pickupDetails?.startDate, 'DD/MM/YYYY')}
                    disabledDate={(current) => {
                      let customDate = moment().format("YYYY-MM-DD");
                      return current && current < moment().endOf("day");
                      // return current && current < moment(customDate, "YYYY-MM-DD");
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2 h-[81px]">
                <div className="">
                  End Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex w-full  h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="localdate"
                    id="date"
                    name="endDate"
                    className="w-full outline-none text-[16px]"
                    value={easyStorageDate || preData?.pickupDetails?.endDate || "dd-mm-yyyy"}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            {/* <div class="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"> */}

            {/* <div class="flex-1 ">
              <label class="block  text-black mb-1 ">
                Lift Available
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <div class="flex space-x-2 ">
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${
                    data.IsLiftAvailable === true
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${
                    data.IsLiftAvailable === false
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(false)}
                >
                  No
                </button>
                
              </div>
            </div>

              <div class="flex-1 ">
              <label class="block   text-black mb-1">
                Floors
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <input
                type="tel"
                name="Floors"
                value={data.Floors === 0 ? "0" : data.Floors}
                onChange={onChange}
                placeholder="Enter Floors"
                class="form-input w-full md:w-[586px] px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                min="1"
                max="20"
              />
            </div> */}

            <div className="bookyourspace_address flex justify-between items-center w-full md:w-[609px] h-[auto] md:h-[auto] mt-8 mb-3  ">
              <div className="w-[auto] h-[25px] font-medium text-[22px] leading-7  ">
                Pickup Address
              </div>
              <a
                href="javascript:void(0)"
                className="font-inter font-medium text-lg leading-5 text-[#338CFF]"
                onClick={() => setAddressChangeModel(true)}
              >
                Add New
              </a>
            </div>
            {!addresses.length && (
              <Easystorageaddress fetchUserAddress={fetchUserAddress} />
            )}
            <Easystoragenewaddress
              addresses={addresses}
              setAddressid={setAddressid}
            />

            <div className=" p-2 summarysec w-full md:w-[609px] h-[auto]  rounded-[20px] bg-[#F7F9FC] py-4 ">
              <h2 className="w-[110px]  font-inter font-medium text-[20px] text-[#1B1C57] my-2 mx-2  ">
                Summary
              </h2>
              <div className="leading-6">
                <div className="summary-detail justify-evenly w-full md:w-[550px] h-[auto] px-2">
                  <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[20px] font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-4 text-[#1B1C57]">
                     Total Rental Charges For 1 Month
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      {/* ₹2359 */}₹{preData && preData?.payment?.monthlyCharge}
                    </div>
                  </div>
                  {preData &&
                    preData?.payment?.discountAmountAfterCouponApplied > 0 && (
                      <>
                        <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                          <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                            Coupon Discount
                          </div>
                          <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                            - ₹
                            {preData?.payment?.discountAmountAfterCouponApplied}
                          </div>
                        </div>
                      </>
                    )}

                  <div class="relative inline-block  mb-2">
                    {/* <span className="flex dropbtn items-center gap-2 font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-6 text-[#1B1C57]" onClick={toggleDropdown}> {easyStorageData?.IsLogisticsCharge && easyStorageData?.IsLogisticsCharge && (" Insurance & Logistics") }<span className="text-[20px]"><IoIosInformationCircleOutline /></span></span> */}


                    {/* <span
                      className="flex dropbtn items-center gap-2 font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-6 text-[#1B1C57]"
                      onClick={toggleDropdown}
                    >
                      {preData?.payment?.insuranceAmount > 0 && easyStorageData?.IsLogisticsCharge ? (
                        "Insurance & Logistics"
                      ) : preData?.payment?.insuranceAmount > 0 ? (
                        "Insurance"
                      ) : easyStorageData?.IsLogisticsCharge ? (
                        "Logistics"
                      ) : (
                        ""
                      )}
                      {(preData?.payment?.insuranceAmount > 0 || easyStorageData?.IsLogisticsCharge) && (
                        <span className="text-[20px]">
                          <IoIosInformationCircleOutline />
                        </span>
                      )}
                    </span> */}
                    {true && (
                      <div id="myDropdown" class="dropdown-content   min-w-[160px] py-2 z-10 ">
                        {/* {preData.payment?.logisticCharge && (
                          <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                            <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                              Logistics & Tax
                            </div>
                            <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                              ₹
                              {preData && preData.payment?.logisticCharge}
                            </div>
                          </div>
                        )} */}

                        {preData && preData?.payment?.insuranceAmount > 0 && (
                          <>
                            <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                              <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                                Insurance
                              </div>
                              <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                                ₹{preData && preData?.payment?.insuranceAmount}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>



                </div>
                <div className="summary_total flex justify-center items-center w-full md:w-[583px] h-[59px] rounded-xl bg-[#8DC63F] px-2 mt-2">
                  <div className="summary_total_inner flex justify-between w-[547px] h-[29px]">
                    <div className="w-[59px] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-[#1B1C57] px-2">
                      Total
                    </div>
                    <div className="w-[auto] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-[#1B1C57]">
                      ₹
                      {preData && preData?.payment?.totalAmountWithCoupon}
                    </div>
                  </div>
                </div>
                {!acknowledege && <p className="text-red-700 mt-2">Please accept acknowledgement !</p>}
                <div className=" mt-4 ">
                  <span className="mr-2"><input type="checkbox" checked={acknowledege} onChange={() => setAcknowledge(!acknowledege)} /></span>
                  I acknowledge all the details I provided are accurate to the best of my knowledge & will be shared with the host . And I also accept the
                  <span className="cursor-pointer text-blue-800 mx-2 font-semibold"><a href="/terms-and-conditions">Terms and Conditions</a></span>and
                  <span className="cursor-pointer text-blue-800 mx-2 font-semibold"><a href="/privacy-policy">Privacy and Policies.</a></span>
                </div>
              </div>



              <div className="mobile_buttonopen mt-[60px] md:hidden">
                <PayNowButton
                  paymentId={preData?.payment?.id}
                  InfoId={EasyStorageId}
                  onChangeFloorLift={onChangeFloorLift}
                  isPaymentEnable={isPaymentEnable}
                  tokenMoney={preData?.payTokenMoney}
                  setLoader={setLoader}

                // getDate={startDate}
                />
              </div>
            </div>
            {preData?.coupon?.couponCode &&
              <> <h2 className="text-lg font-bold mt-4">Applied Coupon</h2>
                <div
                  className="flex justify-between md:w-[609px] my-4 bg-gray-100 p-2 rounded  items-center"
                >
                  <div class="w-[190px]  mr-4">
                    <div class=" flex items-center  gap-2">
                      <Image
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/coupon1.svg"
                        alt="coupon"
                        width={30}
                        height={30}
                      />

                      <p class="text-lg font-semibold text-gray-800">
                        <span class="c-name text-yellow-300">
                          {preData?.coupon?.couponCode}
                        </span>
                      </p>
                      {/* <p class="text-[8px] md:text-[10px] text-gray-600 w-[150px]">
                                Use Coupon code
                              </p> */}
                    </div>
                    <div class="mt-2">
                      <p class=" text-[8px] md:text-[12px] text-gray-700 lg:text-[16px]">
                        Get cashback upto{" "}
                        {preData?.coupon?.amountType === "Percent"
                          ? `${preData?.coupon?.amount}%`
                          : `₹${preData?.coupon?.amount}`}
                      </p>
                    </div>
                  </div>
                  <div class="">
                    <button
                      class="text-sm font-semibold text-green-600"

                    >
                      Applied
                    </button>

                  </div>
                </div></>}
          </div>
        </div>
        <div className="bookyourspace_right  w-full md:w-[694px] my-10 h-[auto] bg-[#F7F9FC]">
          {/* <Household /> */}

          <div className="  w-full md:w-[450px] mx-[auto] flex-col flex items-center  bg-white p-[20px]  justify-between">
            <h3 className="font-bold block md:hidden">Booking For</h3>
            <Image
              className="w-[300px] h-[300px]"
              src={imageUrl}
              width={300}
              height={300} 
              alt=""
              priority
            />
            <div className=" md:px-6">
              <h3 className=" text-[16px] md:text-[24px] text-center   font-semibold text-[#1B1C57]">
                {/* 1 BHK  */}
                {/* {preData?.propertySize}  */}
                {/* {preData?.easyStorageType?.propertySize}  */}
                {preData?.easyStorageType && preData?.easyStorageType?.typeName
                  ? preData?.easyStorageType?.typeName
                  : "Unknown Size"}
                <span className=" text-[12px] md:text-[18px] font-light">
                  {/* (500-700 Sq Ft.) */}
                  {/* ({preData?.easyStorageType?.minimumSquareFeet}-{preData?.easyStorageType?.maximumSquareFeet} Sq Ft.) */}
                  (
                  {preData?.easyStorageType &&
                    preData?.easyStorageType?.minSqrFeet}
                  -
                  {preData?.easyStorageType &&
                    preData?.easyStorageType?.maxSqrFeet}
                  Sq Ft.)
                </span>
              </h3>
              <p className="text-center text-[14px] md:text-[16px] text-[#232323c9] py-2">
                Type of items that can be stored here
              </p>

              <div class="flex flex-wrap gap-[10px] md:gap-[15px] justify-evenly mt-2  max-w-[100vw]  rounded-3xl mx-auto">
                <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
                  {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[70px]" height="0.7em" width="0.7em" xmlns="http://www.w3.org/2000/svg">
   <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z">
   </path>
   </svg> */}
                  <Image
                    className="w-[25px] h-[25px]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                    alt="box"
                    width={80}
                    height={80}
                  />

                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData?.easyStorageType &&
                        preData?.easyStorageType?.smallItem}{" "}
                      Small
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex shadow-2xl border  rounded-2xl bg-white">
                  <Image
                    className="w-[30px] h-[30px]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                    alt="box"
                    width={100}
                    height={100}
                  />
                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData?.easyStorageType &&
                        preData?.easyStorageType?.mediumItem}{" "}
                      Medium
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
                  <Image
                    className="w-[35px] h-[35px]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                    alt="box"
                    width={140}
                    height={140}
                  />

                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData?.easyStorageType &&
                        preData?.easyStorageType?.largeItem}{" "}
                      Large
                    </h2>
                  </div>
                </div>
                <div className="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex  shadow-2xl border  rounded-2xl bg-white">
                  <Image
                    className="w-[20px] h-[20px]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Box%20(1).svg"
                    alt="box"
                    width={140}
                    height={140}
                  />
                  <div className="w-[auto]">
                    <h2 className="text-[14px] md:text-[18px] ">
                      {preData?.easyStorageType && preData?.easyStorageType?.Box}{" "}
                      {/* {preData?.easyStorageType?.box} */}
                      Boxes(approx)
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between  m-4 mb-0 px-2 w-full">
              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                {/* {preData?.propertyBookingData && preData?.propertyBookingData.appliedCoupons && preData?.propertyBookingData.appliedCoupons.amount !== 0 && ( */}
                <div className="flex justify-evenly items-center">
                  {preData &&
                    preData?.payment?.discountAmountAfterCouponApplied > 0 && (
                      <del className="text-red-500 font-extralight">
                        ₹{preData?.payment?.totalAmountWithoutCoupon}
                      </del>
                    )}
                </div>
                {/* )} */}
                <div className="text-lg font-medium ">
                  {/* &#8377; 325 <span>/Day</span> */}₹
                  {preData && preData?.payment?.totalAmountWithCoupon}
                </div>
              </div>

              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                {/* <button className="text-white font-semibold bg-blue-600 leading-7 p-2 px-3 py-2 mr-5">Book Now</button> */}
                <div className="flex justify-evenly items-center">
                  {/* Sq.Ft: {preData?.easyStorageType?.minimumSquareFeet}-{preData?.easyStorageType?.maximumSquareFeet} ft ({preData?.easyStorageType?.propertySize}  ) */}
                  Sq.Ft:
                  {preData?.easyStorageType &&
                    preData?.easyStorageType?.minSqrFeet}
                  -
                  {preData?.easyStorageType &&
                    preData?.easyStorageType?.maxSqrFeet}
                  ft (
                  {preData?.easyStorageType && preData?.easyStorageType?.typeName})
                </div>
              </div>
            </div>
          </div>
          <div className="mobile_buttonopen mt-2  hidden md:block">
            <PayNowButton
              paymentId={preData?.payment?.id}
              InfoId={EasyStorageId}
              onChangeFloorLift={onChangeFloorLift}
              isPaymentEnable={isPaymentEnable}
              tokenMoney={preData?.payTokenMoney}
              setLoader={setLoader}

            />
          </div>
        </div>
      </section>

      <FormModal
        modalShow={addressChangeModel}
        setModalShow={setAddressChangeModel}
        ModalBody={ModalBody}
        className="addressAdd mt-8"
        size={"md"}
        title="New Address"
        fetchUserAddress={fetchUserAddress}
      />
      <Footer />
      {loader ? <Loader /> : ""}
    </div>
  );
};

export default EasyStorageStage2;
