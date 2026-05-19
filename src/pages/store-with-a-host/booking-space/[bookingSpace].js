import FormModal from "@/sharedComponent/modal/formModal";
import React, { useState, useEffect } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import { MdFlipToFront, MdFlipToBack, MdCheckCircle } from "react-icons/md";
import {
  easyStorageModalAddress,
  getUserAddress,
  getCityNameByPincode,
  SaveBookingDetails,
  easyStoragestage1Res,
  p2pStorageStage1,
} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { IoLocationSharp } from "react-icons/io5";

import PayNowButton from "../../store-at-a-warehouse/bookspace/PayNowButton";

import { getUserId } from "@/util/common";

import Easystorageaddress from "@/sharedComponent/storagecommoncompo/p2paddress";
import Easystoragenewaddress from "@/sharedComponent/storagecommoncompo/easystoragenewaddress";
// import { servivePinCode } from "@/util/constant";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import Loader from "@/components/Loader";
import { BsUpload } from "react-icons/bs";

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
      const response = await getCityNameByPincode(args);

      if (response.success) {
        setError();
        setAddressNearby(response.success);
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
      // setError(response.error.errors.text || "An Error occured");
    }
  };

  const handleLiftAvailability = (availability) => {
    setData((prevData) => ({
      ...prevData,
      IsLiftAvailable: availability,
    }));
  };

  return (
    <>
      <form class="mt-4" onSubmit={onsubmitHandler}>
        <div class="mb-4">
          <label class="block text-sm font-medium text-zinc-700">
            Enter your Address*
          </label>
          <div className="">
            <input
              type="text"
              name="AddressLine1"
              placeholder="Address Line 1"
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {multipleError?.AddressLine1 && (
              <p className="text-base text-red-500">
                {multipleError?.AddressLine1}
              </p>
            )}
          </div>
          <div className="">
            <input
              type="text"
              name="AddressLine2"
              placeholder="Address Line 2"
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {multipleError?.AddressLine2 && (
              <p className="text-base text-red-500">
                {multipleError?.AddressLine2}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700">
            Pincode*
          </label>
          <input
            type="text"
            name="Pincode"
            placeholder="Enter Pincode"
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              City*
            </label>
            <input
              type="text"
              name="City"
              className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="City"
              value={addressNearby?.city}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700">
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
    </>
  );
};

const EasyBookspace = () => {
  const [addressChangeModel, setAddressChangeModel] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressid] = useState();
  const [isPaymentEnable, setIsPaymentEnable] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({});
  const [easyStorageData, seteasyStorageDate] = useState();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    front: null,
    back: null,
  });

  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  function handleClickOutside(event) {
    if (!event.target.closest(".dropbtn")) {
      setDropdownOpen(false);
    }
  }
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${day}/${month}/${year}`;
  };

  const handleFrontImageChange = (e) => {
    // onChange(e);
    // if (e.target.files.length > 0) {
    //   setFrontImageUploaded(true);
    // }
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        front: previewUrl,
      }));
      setPreData({ ...preData, frontImage: file });
      setFrontImageUploaded(true);
    }
  };

  const handleBackImageChange = (e) => {
    // onChange(e);
    // if (e.target.files.length > 0) {
    //   setBackImageUploaded(true);
    // }
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews((prev) => ({
        ...prev,
        back: previewUrl,
      }));
      setPreData({ ...preData, backImage: file });
      setBackImageUploaded(true);
    }
  };

  // const startDate = `${startDate}`
  const onChange = (e) => {
    // debugger
   
    const { name, value, type, files } = e.target;

    if (type === "file" && files?.length > 0) {
      if (name === "UploadBookingImage") {
        const updatedValue = [...currentImages, ...Array.from(files)];
        setCurrentImages(updatedValue);
      }
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const removeImage = (index) => {
    const updatedValue = currentImages.filter((_, i) => i !== index);
    setCurrentImages(updatedValue);
  };

  const fetchUserAddress = async () => {
    try {
      const userId = getUserId();
      const response = await getUserAddress(`?UserId=${userId}`);
      if (response.success) {
        setAddresses(response.success?.data);
        const defaultAddress = response.success?.data.find((obj)=>obj.isDefault);
        setAddressid(defaultAddress?.id)
      } else {
        console.error("Error fetching addresses:", response?.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const [showErrorMessage, setShowErrorMessage] = useState();

  const router = useRouter();
  const [preData, setPreData] = useState({
    logisticsAmount: "",
    insuranceAmount: "",
    totalAmountWithCoupon: 0,
    totalAmountWithoutCoupon: "",
    grandTotal: "",
    customerAdhaarNumber: "",
    frontImage: "",
    backImage: "",
    payTokenMoney: "",
    propertyType: "",
  });
  const displayPropertyType = preData?.propertyDetail?.propertyType?.replace("Car Storage", "Vehicle Storage");

  useEffect(() => {
    fetchUserAddress();

    if (router.query.preData) {
      setPreData(JSON.parse(router.query.preData));
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
   
    
    const allKeys = Object.keys(data);
    const formData = new FormData();

    allKeys.forEach((item) => {
      if (item !== "UploadBookingImage") {
        formData.append(item, data[item]);
      }
    });

    currentImages.forEach((image, index) => {
      formData.append(`UploadBookingImage`, image);
    });

    formData.append("CurrentUserId", getUserId());
    formData.append("UserAddressId", addressId);
    formData.append("BookingId", preData?.propertyBookingData.id);
    formData.append("PropertyId", preData?.propertyBookingData.propertyId);
    formData.append("StartDate", preData?.propertyBookingData.startDate);
    formData.append("EndDate", preData?.propertyBookingData.endDate);
    // formData.append("AdhaarNumber", preData?.customerAdhaarNumber);

    if (preData?.frontImage) {
      formData.append("AdhaarFrontImage", preData.frontImage);
    }
    // else if (frontImageUploaded) {
    //   // If new front image is uploaded, add it
    //   formData.append("AdhaarFrontImage", frontImageUploaded);
    // }

    if (preData?.backImage) {
      formData.append("AdhaarBackImage", preData.backImage);
    }
    // else if (backImageUploaded) {
    //   // If new back image is uploaded, add it
    //   formData.append("AdhaarBackImage", backImageUploaded);
    // }

    try {
      const response = await SaveBookingDetails("?Stage=2", formData);
      if (response?.success) {
        setIsPaymentEnable(true);
        setShowErrorMessage(null);
        // Navigate to payment page or handle success scenario
      } else {
        setShowErrorMessage(response?.error);
        // Handle error scenario
        // console.error("Error saving booking details:", response.error);
      }
    } catch (error) {
      console.error("Error saving booking details:", error);
    }
  };
 

  useEffect(() => {
    // debugger
  
    
    const {
      Floor,
      IsLiftAvailable,
      AdhaarNumber,
      AdhaarFrontImage,
      AdhaarBackImage,
    } = data;
   
    if (addressId && currentImages.length > 0) {
      
      handleSubmit();
    } else {
      setIsPaymentEnable(false);
    }
  }, [data, currentImages,addressId]);

  console.log(preData?.grandTotal , "preddsdsfddds")

  useEffect(() => {
    const bookingIdArr = window.location.href.split("-");
    const bookingId = bookingIdArr[bookingIdArr.length - 1];

    (async () => {
      const response = await p2pStorageStage1(bookingId);
     
      if (response.success) {
        setPreData(response.success);
        setImagePreviews((prev) => ({
          ...prev,
          front: response?.success?.frontImage,
        }));
        setImagePreviews((prev) => ({
          ...prev,
          back: response?.success?.backImage,
        }));
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreviews.front) {
        URL.revokeObjectURL(imagePreviews.front);
      }
      if (imagePreviews.back) {
        URL.revokeObjectURL(imagePreviews.back);
      }
    };
  }, [imagePreviews.front, imagePreviews.back]);
  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%] ">
      <HeaderMenu />
      {/* <div>
        <h2>PreData:</h2>
        <pre>{JSON.stringify(preData, null, 2)}</pre>
        {
          preData.grandTotal
        }
      </div> */}
      <section className="Bookyourspace flex-col md:flex-row flex ml-3 mr-3  ">
        <div className="bookyourspace_left  w-full md:w-[794px] h-auto  bg-[#FFFFFF] pl-0 md:pl-[80px]">
          <div className="bookyourspace_link  w-full md:w-[131px] h-[32px] p-0 md:p-4 mb-3 ">
            <div className="flex">
              <a
                href="/"
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Home
              </a>
              <img
                src="/images/icon/Double Alt Arrow Right.svg"
                alt="doublearrowicon1"
                className="w-5"
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
            <div className="bookyourspace_heading w-[311px] h-[42px] font-semibold text-[38px] text-[#1B1C57] whitespace-nowrap pb-10">
              Book Your Space
            </div>
            <div className="bookyourspace_date flex w-full md:w-[621px] h-[81px] mt-5">
              <div className="w-[298px] h-[81px]">
                <div>
                  Start Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className=" flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="text"
                    name="startDate"
                    className="w-full md:w-[250px] outline-none"
                    value={
                      preData.propertyBookingData?.startDate
                        ? formatDate(preData.propertyBookingData.startDate)
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="w-[298px] h-[81px]">
                <div className="">
                  End Date
                  <span className="font-medium text-sm leading-8 text-[#C60909]">
                    *
                  </span>
                </div>
                <div className="flex w-full md:w-[290px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="text"
                    id="date"
                    name="endDate"
                    className="w-full md:w-[250px] outline-none text-[16px]"
                    value={
                      preData.propertyBookingData?.endDate
                        ? formatDate(preData.propertyBookingData.endDate)
                        : ""
                    }
                    disabled
                  ></input>
                </div>
              </div>
            </div>
            {/* <div class="flex items-center space-x-4 p-4 bg-white shadow rounded-lg"> */}

            {/* <div class="flex-1 ">
              <label class="block  font-normal text-black mb-1 mt-2 ">
                Lift Available
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <div class="flex space-x-2 ">
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${data?.IsLiftAvailable === true
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-200 text-zinc-800"
                    }`}
                  onClick={() => { setData({ ...data, ["IsLiftAvailable"]: true }) }}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`w-[290px] px-4 py-2 rounded ${data?.IsLiftAvailable === false
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-200 text-zinc-800"
                    }`}
                  onClick={() => { setData({ ...data, ["IsLiftAvailable"]: false }) }}
                >
                  No
                </button>

              </div>
            </div>


            <div class="flex-1 ">
              <label class="block  font-normal text-black mb-1 mt-2">
                Floor
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <input
                type="tel"
                name="Floor"
                value={data.Floor}
                onChange={(e) => {
                  if (e.target.value.length <= 2) {
                    onChange(e);
                  }
                }}
                placeholder="Enter Floor"
                class="form-input w-full md:w-[586px] px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                min="-9"
                max="99"
              />
            </div> */}

            {/* {!(preData?.frontImage && preData?.backImage && preData?.customerAdhaarNumber) && (
              <div className="flex-1">
                <label htmlFor="AdharRegistration" className="block mb-1 mt-2 text-sm font-normal text-black dark:text-white">
                  Aadhaar No <span className="text-[#C60909]">*</span>
                </label>
                <div className="flex items-center border rounded-md pr-2 w-full md:w-[586px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    name="AdhaarNumber"
                    defaultValue={preData?.customerAdhaarNumber || ""}
                    id="aadhaar"
                    className="bg-white outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Aadhaar No"
                    onChange={(e) => {
                      if (e.target.value.length <= 12) {
                        onChange(e);
                      }
                    }}

                  />
                  <label className="ml-2 cursor-pointer relative">
                    {preData?.frontImage || frontImageUploaded ? (
                      <MdCheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <MdFlipToFront className="w-6 h-6" />
                    )}

                    <input
                      type="file"
                      id="adhaarFrontImage"
                      name="AdhaarFrontImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      className="opacity-0 absolute inset-0 cursor-pointer z-20"
                      onChange={handleFrontImageChange}
                    />
                  </label>


                  <label className="ml-2 cursor-pointer relative">
                    {preData?.backImage || backImageUploaded ? (
                      <MdCheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <MdFlipToBack className="w-6 h-6" />
                    )}

                    <input
                      type="file"
                      id="adhaarBackImage"
                      name="AdhaarBackImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp,image"

                      className="opacity-0 inset-0 cursor-pointer z-20 hidden"
                      onChange={handleBackImageChange}
                    />
                  </label>
                </div>
                {!(preData?.frontImage && preData?.backImage) && (
                  <p className="text-sm text-gray-600 mt-2">(Upload the Aadhaar Images)</p>)}
              </div>
            )}

<div className="flex-1">
                <label htmlFor="AdharRegistration" className="block mb-1 mt-2 text-sm font-normal text-black dark:text-white">
                  Aadhaar Image <span className="text-[#C60909]">*</span>
                </label>
                <div className="flex items-center border rounded-md pr-2 w-full md:w-[586px]">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    name="AdhaarNumber"
                    defaultValue={preData?.customerAdhaarNumber || ""}
                    id="aadhaar"
                    className="bg-white outline-none border-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Your Aadhaar No"
                    onChange={(e) => {
                      if (e.target.value.length <= 12) {
                        onChange(e);
                      }
                    }}

                  />
                  <label className="ml-2 cursor-pointer relative">
                    {preData?.frontImage || frontImageUploaded ? (
                      <MdCheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <MdFlipToFront className="w-6 h-6" />
                    )}

                    <input
                      type="file"
                      id="adhaarFrontImage"
                      name="AdhaarFrontImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      className="opacity-0 absolute inset-0 cursor-pointer z-20"
                      onChange={handleFrontImageChange}
                    />
                  </label>


                  <label className="ml-2 cursor-pointer relative">
                    {preData?.backImage || backImageUploaded ? (
                      <MdCheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <MdFlipToBack className="w-6 h-6" />
                    )}

                    <input
                      type="file"
                      id="adhaarBackImage"
                      name="AdhaarBackImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp,image"

                      className="opacity-0 inset-0 cursor-pointer z-20 hidden"
                      onChange={handleBackImageChange}
                    />
                  </label>
                </div>
                {!(preData?.frontImage && preData?.backImage) && (
                  <p className="text-sm text-gray-600 mt-2">(Upload the Aadhaar Images)</p>)}
              </div> */}

            {/* {!(
              preData?.frontImage &&
              preData?.backImage &&
              preData?.customerAdhaarNumber
            ) && ( */}
            <div className="flex-1">
              {/* Aadhaar Number Input */}
              <label
                htmlFor="AdharRegistration"
                className="block mb-1 mt-2 text-sm font-normal text-black dark:text-white"
              >
                Aadhaar No <span className="text-[#C60909]">*</span>
              </label>

              <input
                type="text"
                name="AdhaarNumber"
                defaultValue={preData?.customerAdhaarNumber || ""}
                id="aadhaar"
                maxLength={12}
                className="bg-white border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Your Aadhaar No"
                onChange={(e) => {
                  if (e.target.value.length <= 12) {
                    onChange(e);
                  }
                }}
              />

              {/* Aadhaar Image Upload Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Aadhaar Front Image */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                    Aadhaar Front Image{" "}
                    <span className="text-[#C60909]">*</span>
                  </label>
                  <div className="border rounded-md flex items-center justify-center p-2 relative">
                    <label className="cursor-pointer relative w-full h-full flex justify-center items-center">
                      {imagePreviews.front ? (
                        <MdCheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <BsUpload className="w-6 h-6 text-gray-600" />
                      )}

                      <input
                        type="file"
                        id="adhaarFrontImage"
                        name="AdhaarFrontImage"
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                        className="opacity-0 absolute inset-0 cursor-pointer z-20"
                        onChange={handleFrontImageChange}
                      />
                    </label>
                  </div>
                  {imagePreviews.front && (
                    <div className="mt-2">
                      <img
                        src={imagePreviews.front}
                        alt="Front Aadhaar Preview"
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreviews((prev) => ({
                            ...prev,
                            front: null,
                          }));
                          setFrontImageUploaded(false);
                          document.getElementById("adhaarFrontImage").value =
                            "";
                        }}
                        className="mt-1 text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                {/* Aadhaar Back Image */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                    Aadhaar Back Image <span className="text-[#C60909]">*</span>
                  </label>
                  <div className="border rounded-md flex items-center justify-center p-2 relative">
                    <label className="cursor-pointer relative w-full h-full flex justify-center items-center">
                      {imagePreviews.back ? (
                        <MdCheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <BsUpload className="w-6 h-6 text-gray-600" />
                      )}

                      <input
                        type="file"
                        id="adhaarBackImage"
                        name="AdhaarBackImage"
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                        className="opacity-0 absolute inset-0 cursor-pointer z-20"
                        onChange={handleBackImageChange}
                      />
                    </label>
                  </div>

                  {imagePreviews.back && (
                    <div className="mt-2">
                      <img
                        src={imagePreviews.back}
                        alt="Back Aadhaar Preview"
                        className="w-full h-32 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreviews((prev) => ({ ...prev, back: null }));
                          setBackImageUploaded(false);
                          document.getElementById("adhaarBackImage").value = "";
                        }}
                        className="mt-1 text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Hint Below */}
              {!(preData?.frontImage && preData?.backImage) && (
                <p className="text-sm text-gray-600 mt-2">
                  (Upload the Aadhaar Images)
                </p>
              )}
            </div>

            {/* )} */}

            <div className="flex-1">
              <label
                htmlFor="AdharRegistration"
                className="block mb-1 mt-2 text-sm font-normal text-black dark:text-white"
              >
                Upload Item Images <span className="text-[#C60909]">*</span>
              </label>
              <div className="flex justify-center items-center text-center w-full md:w-[586px] h-auto gap-6 py-4">
                <div className="upload-section w-full md:w-[586px]  border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer ">
                  <div className="file-upload-container relative">
                    <label
                      for="multiplefileupload"
                      className="upload-button  text-blue-500  rounded cursor-pointer inline-block"
                    >
                      <img
                        className="m-auto font-medium leading-5 text-xs"
                        src="/images/icon/Upload Image Icon.svg"
                        alt=""
                      />
                      Upload Images <br />
                      <span className="text-gray-600 text-sm">
                        (For the host to verify)
                      </span>
                  
                    </label>
                    <input
                      id="multiplefileupload"
                      name="UploadBookingImage"
                      type="file"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      multiple
                      className="opacity-0 absolute inset-0 cursor-pointer"
                      onChange={onChange}
                    />
                    <span className="file-size-limit text-gray-500 text-sm block ">
                      Max size: 500KB (max 5 Images)
                    </span>
                    <span className="text-gray-600 text-sm mb-3">
                      Please share high-quality photos of your space.
                      </span>
                  </div>
                </div>
              </div>
              <div className="flex">

                {currentImages &&
                  currentImages.map((item, index) => {
                    return (
                      <div key={index} className="relative mt-1 ml-1">
                        <img
                          src={URL?.createObjectURL(item)}
                          className="preview-image w-[100px] h-[50px]"
                        />
                        <p
                          className=" absolute inset-0 cursor-pointer text-right mr-1"
                          onClick={() => removeImage(index)}
                        >
                          <RxCrossCircled className="text-red-600 float-right text-[25px]" />
                        </p>
                      </div>
                    );
                  })}
                     
              </div>
            </div>

            {true && (
              <p className="text-red-500 text-center">
                {showErrorMessage?.message?.BookingImageLength ||
                  showErrorMessage?.message?.BookingImage ||
                  showErrorMessage?.text ||
                  showErrorMessage?.message?.UserAdhaar ||
                  showErrorMessage?.message?.UserAdhaarImages ||
                  showErrorMessage}
              </p>
            )}
            <div className="bookyourspace_address flex justify-between items-center w-full md:w-[609px] h-[auto] md:h-[auto] mt-8 mb-3  ">
              <div className="w-[auto] h-[29px] font-medium text-[24px] leading-7  ">
                Your Address
              </div>
              <a
                href="javascript:void(0)"
                className="font-inter font-medium text-lg leading-5 text-[#338CFF]"
                onClick={() => setAddressChangeModel(true)}
              >
                Add New
              </a>
            </div>
            {!addresses?.length && (
              <Easystorageaddress fetchUserAddress={fetchUserAddress} />
            )}
            <Easystoragenewaddress
              addresses={addresses}
              setAddressid={setAddressid}
            />

            <div className="summarysec w-full md:w-[609px] h-[auto]  rounded-[20px] bg-[#F7F9FC] py-4 ">
              <h2 className="w-[110px]  font-inter font-medium text-2xl text-[#1B1C57] mt-2 mb-2  ">
                Summary
              </h2>
              <div className="leading-6">
                <div className="summary-detail justify-evenly w-full md:w-[550px] h-[auto] px-2">
                  <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                    <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal whitespace-nowrap text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      ({preData && preData?.propertyBookingData?.rentalDays}{" "}
                      Day) Total rental charges
                    </div>
                    <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                      {/* ₹2359 */}₹{preData && preData.totalRentalCharge}
                    </div>
                  </div>
                  {preData && preData.couponDiscount > 0 && (
                    <>
                      <div className=" flex justify-between w-full md:w-[552px] h-[24px]">
                        <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                          Coupon Discount
                        </div>
                        <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                          ₹{preData.couponDiscount}
                        </div>
                      </div>
                    </>
                  )}
                  {/* <div class="relative inline-block  mb-2">
                  {true && (
                      <div id="myDropdown" class="dropdown-content   w-full py-2 z-10 "> */}
                       

                        {preData && preData?.propertyBookingData?.insuranceAmount > 0 && (
                          <>
                            <div className=" flex justify-between w-full md:w-[552px] h-[24px] mb-2">
                              <div className="summarydetail_left w-[292px] h-[24px] font-inter font-normal text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                                Insurance
                              </div>
                              <div className="w-[auto] h-[24px] font-inter font-medium text-[12px] md:text-[20px] leading-6 text-[#1B1C57]">
                                ₹{preData && preData?.propertyBookingData?.insuranceAmount}
                              </div>
                            </div>
                          </>
                        )}
                      {/* </div>
                    )}
                    </div> */}
                </div>
                <div className="summary_total flex justify-center items-center w-full md:w-[583px] h-[59px] rounded-xl bg-[#8DC63F] px-2 mt-2">
                  <div className="summary_total_inner flex justify-between w-[547px] h-[29px]">
                    <div className="w-[59px] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-white px-2">
                      Total
                    </div>
                    <div className="w-[auto] h-[29px] font-inter font-[700px] text-[14px] md:text-[24px] leading-7 text-white">
                      {/* ₹3059 */}₹{preData && preData.totalAmountWithCoupon}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobile_buttonopen mt-[60px] md:hidden">
                <PayNowButton
                  paymentId={preData?.propertyBookingData?.id}
                  InfoId={preData?.propertyBookingData?.id}
                  isPaymentEnable={isPaymentEnable}
                  page="booking"
                  propertyId={preData?.propertyBookingData?.propertyId}
                  tokenMoney={preData?.payTokenMoney}
                  grandTotal = {preData?.grandTotal}
                  propertyUrl={preData?.propertyUrl}
                  setLoader={setLoader}
                  offerMessage={preData?.offerMessage}
                  totalAmountWithCoupon={preData?.totalAmountWithCoupon}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bookyourspace_right  w-full md:w-[694px] my-10 h-[auto] bg-[#F7F9FC]">
          {/* <Household /> */}

          <div className="  w-full md:w-[450px] mx-[auto] flex-col flex items-center  bg-white justify-between md:px-4">
            <h3 className="font-bold block md:hidden p-[20px]">Booking For</h3>

            {/* {preData.propertyBookingData && preData.propertyBookingData.propertyImages ? ( */}
            <img
              className="w-[auto] h-[300px] rounded"
              src={preData?.propertyDetail?.propertyImages}
              alt="Property"
            />
            {/* ) : (
              <p>Loading property image...</p>
            )} */}

            {/* {preData.propertyDetail.propertyImages}   */}

            <div className=" ">
              <div className="bg-[#FEF2DB] flex items-center gap-2 p-2.5 my-2 rounded-full w-[250px]">
                <img src="/images/icon/ph_house-fill.svg" alt="" />
                <h3 className="text-[15px] font-bold text-[#1B1C57] m-0">
                  {displayPropertyType}
                </h3>{" "}
              </div>
              <h3 className=" text-[16px] md:text-[24px] text-left    font-semibold text-[#1B1C57]">
                Storage space in {preData?.propertyDetail?.city}

                 {/* {preData?.propertyDetail?.address}, */}
              </h3>
              <h2 className="text-[14px] md:text-[20px]  flex items-center py-2 gap-2   font-semibold text-[#1B1C57]">
                <IoLocationSharp className="text-lime-500" />{" "}
                {preData?.propertyDetail?.state}
              </h2>
              <p className="text-left text-[14px] md:text-[16px] text-[#232323c9] py-2">
                {`Affordable ${displayPropertyType} Space Near ${preData?.propertyDetail?.address2} in ${preData?.propertyDetail?.city}.`}
              </p>
            </div>
            <div className="flex justify-between  m-4 mb-0 px-2 w-full">
              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                <div className="flex justify-evenly items-center">
                  {preData && preData.couponDiscount > 0 && (
                    <del className="text-red-500 font-extralight">
                      ₹{preData.totalAmountWithoutCoupon}
                    </del>
                  )}
                </div>
                {/* )} */}
                <div className="text-lg font-medium ">
                  {/* &#8377; 325 <span>/Day</span> */}₹
                  {preData && preData.totalAmountWithCoupon}
                </div>
              </div>
              <div className="flex  items-center gap-1 mt-3 mb-2 ">
                <div className="flex justify-evenly items-center">
                  Sq.Ft : 
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType
                      .minimumSquareFeet}
                  -
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType
                      .maximumSquareFeet}
                  ft (
                  {preData.propertyDetail &&
                    preData.propertyDetail.propertyStorageType.propertySize}
                  )
                </div>
              </div>
            </div>
          </div>
          <div className="mobile_buttonopen  hidden md:block">
            <PayNowButton
              paymentId={preData?.propertyBookingData?.id}
              InfoId={preData?.propertyBookingData?.id}
              isPaymentEnable={isPaymentEnable}
              page="booking"
              propertyId={preData?.propertyBookingData?.propertyId}
              tokenMoney={preData?.payTokenMoney}
              grandTotal = {preData?.grandTotal}
              propertyUrl={preData?.propertyUrl}
              offerMessage={preData?.offerMessage}
              totalAmountWithCoupon={preData?.totalAmountWithCoupon}


              

              setLoader={setLoader}
            />
          </div>
        </div>
      </section>

      <FormModal
        modalShow={addressChangeModel}
        setModalShow={setAddressChangeModel}
        ModalBody={ModalBody}
        className="addressAdd"
        size={"md"}
        title="New Address"
        fetchUserAddress={fetchUserAddress}
      />
      <Footer />
      {loader ? <Loader /> : ""}
    </div>
  );
};

export default EasyBookspace;
