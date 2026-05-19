import React, { useState, useEffect } from "react";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import { DatePicker } from "antd";
import moment from "moment";
import { localStorageManager } from "@/util/common";
import { Button, Spinner } from "react-bootstrap";
import { getAllUserAddress, getPaymentData, hitPinCodeApi, saveAddress, saveDropAddress, savepackerMoverData, savePickupAddress, sendPackerMoverData } from "@/service/packermover";
import { useRouter } from "next/router";
import Breadcrumbs from "@/pages/profile/Breadcrumb";
import { TiDelete } from "react-icons/ti";
import SimpleSlider from "@/sharedComponent/slider16";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Index = () => {
  const searchParams = useSearchParams()
  const router = useRouter();
  const packerMoverId = searchParams.get("pmId");
  const previous = searchParams.get("previous");
  const [imageFile, setImageFile] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  const [imgError, setImgError] = useState("");
  
  const [userDetails, setUserDetails] = useState()
  const [savedAddress, setSavedAddress] = useState([])
  const [moveDate, setMoveDate] = useState('')
  const [configuration, setConfiguration] = useState("")
  const [fromLocId, setFromLocId] = useState(null)
  const [toLocId, setToLocId] = useState(null);
  const [paymentId, setPaymentId] = useState();
  const [paymentGatewayData, setPaymentGateData] = useState();
  const [error, setError] = useState(false)
  const [errorMsg, setErrMsg] = useState()
  const [vidError, setVidError] = useState(null)
  const [loader, setLoader] = useState(false)
  const [addLoader, setAddLoader] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoFile, setVideoFile] = useState(false)
  const [relocationType, setRelocationType] = useState()
  const [fromLocation, setFromLocation] = useState({
    faddress1: "",
    faddress2: "",
    fstate: "",
    fcity: "",
    fpinCode: "",
    flift: false,
    ffloors: ""
  });
  const [formErrors, setFormErrors] = useState({
    faddress1: "",
    faddress2: "",
    fstate: "",
    fcity: "",
    fpinCode: "",
    ffloors: ""
  });
  const [toLocation, setToLocation] = useState({
    taddress1: "",
    taddress2: "",
    tstate: "",
    tcity: "",
    tpinCode: "",
    tlift: false,
    tfloors: ""
  });

  const [toError, setToError] = useState({
    taddress1: "",
    taddress2: "",
    tstate: "",
    tcity: "",
    tpinCode: "",
    tfloors: ""
  })

  useEffect(() => {
    const userData =
      localStorageManager.getValue("userDetails") &&
      JSON.parse(localStorageManager.getValue("userDetails"));
    setUserDetails(userData)

    const moveDetails = localStorageManager.getValue("xsMoverDetails") &&
      JSON.parse(localStorageManager.getValue("xsMoverDetails"));
    setFromLocation((prev) => ({
      ...prev,
      fcity: moveDetails?.pickupAddress?.city,
      faddress1: moveDetails?.pickupAddress?.address1,
      faddress2: moveDetails?.pickupAddress?.address2,
      fstate: moveDetails?.pickupAddress?.state,
      fpinCode: moveDetails?.pickupAddress?.pincode
    }))
    setToLocation((prev) => ({
      ...prev,
      tcity: moveDetails?.deliveryAddress?.city,
      taddress1: moveDetails?.deliveryAddress?.address1,
      taddress2: moveDetails?.deliveryAddress?.address2,
      tstate: moveDetails?.deliveryAddress?.state,
      tpinCode: moveDetails?.deliveryAddress?.pincode
    }))
    setFromLocId(moveDetails?.pickupAddress?.id)
    setToLocId(moveDetails?.deliveryAddress?.id)
    setConfiguration(moveDetails?.storageRequirement)
    setRelocationType(moveDetails?.StorageType)
    const parsedDate = dayjs(moveDetails?.moveDate, "DD/MM/YYYY");
    setMoveDate(parsedDate);

  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFromLocation({
      ...fromLocation,
      [name]: value,
    });

    setToLocation({
      ...toLocation,
      [name]: value,
    });

    setToError({
      ...toError,
      [name]: "",
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });

    if ((name === "fpinCode" || name === "tpinCode") && value.length === 6) {
      sendPinCode(value, name);
    }

    if (files && files[0]) {
      const file = files[0];
  
      // Check if it's a video
      if (file.type.startsWith("video/")) {
        if (file.size > 25 * 1024 * 1024) {
          setVidError("File is too large. Max size is 25MB!");
        } else {
          setVidError("");
          setVideoFile(file);
          setVideoSrc(URL.createObjectURL(file));
        }
      }
  
      // Check if it's an image
      if (files && name === "dropzone-image") {
        const selectedFiles = Array.from(files);
      console.log("selectedFiles", selectedFiles)
        if (imageFile.length + selectedFiles.length > 4) {
          setImgError("You can upload a maximum of 4 images.");
          return;
        }
      
        const newImages = [];
        const newSrcs = [];
      
        for (let file of selectedFiles) {
          if (file.type.startsWith("image/")) {
            if (file.size > 5 * 1024 * 1024) {
              setImgError("Image too large. Max size is 5MB!");
              continue;
            }
      
            // newImages.push(file);
            newSrcs.push(URL.createObjectURL(file));
          } else {
            setImgError("Only image files are allowed!");
            continue;
          }
        }
      
        setImgError("");
        setImageFile(selectedFiles);
        setImageSrc((prev) => [...prev, ...newSrcs]);
      }
      
      // Invalid file type
      else {
        setVidError("Only video or image files are allowed!");
        setVideoFile(null);
        setVideoSrc(null);
        setImageFile(null);
        setImageSrc(null);
      }
    }
  };

  console.log(imageFile, "imageFile");

  const sendPinCode = async (pCode, type) => {
    try {
      const res = await hitPinCodeApi(pCode);
      if (type == "fpinCode" && res.success) {
        setFromLocation((prev) => ({ ...prev, fstate: res?.success?.state }))
        setFromLocation((prev) => ({ ...prev, fcity: res?.success?.city }))
      } else {
        setToLocation((prev) => ({ ...prev, tstate: res?.success?.state }))
        setToLocation((prev) => ({ ...prev, tcity: res?.success?.city }))
      }
    } catch (error) {
      console.error("Error fetching addresses", error);
    }
  }
  // const sendFirstStageData = async () => {
  //   let formData = new FormData();
  //   if(packerMoverId){
  //     formData.append('PackersAndMoversId', packerMoverId);
  //   }else{
  //     formData.append('PackersAndMoversId', "");
  //   }
  //   formData.append('ApplicationUserId', userDetails?.userId);
  //   formData.append('StorageRequirement', configuration);
  //   formData.append('StorageType', relocationType);
  //   formData.append('CityFrom', fromLocation?.fcity);
  //   formData.append('CityTo', toLocation?.tcity);
  //   let res = await sendPackerMoverData(formData, "?stage=1")
  //   if (res.success) {
  //     setpmId(res?.success?.data?.value?.packersAndMovers?.id)
  //   }
  // }



  const getAllAddress = async () => {
    if (userDetails?.userId) {
      try {
        const res = await getAllUserAddress(userDetails.userId);
        setSavedAddress(res?.success?.data)
      } catch (error) {
        console.error("Error fetching addresses", error);
      }
    }
  };

  const handlePickupAddress = async () => {
    let errors = {};
    let isValid = true;

    if (!fromLocation.faddress1) {
      errors.faddress1 = "Address is required.";
      isValid = false;
    }
    if (!fromLocation.faddress2) {
      errors.faddress2 = "Landmark is required.";
      isValid = false;
    }
    if (!fromLocation.fstate) {
      errors.fstate = "State is required.";
      isValid = false;
    }
    if (!fromLocation.fcity) {
      errors.fcity = "City is required.";
      isValid = false;
    }
    if (!fromLocation.fpinCode) {
      errors.fpinCode = "Pin Code is required.";
      isValid = false;
    } else if (fromLocation.fpinCode.length !== 6) {
      errors.fpinCode = "Pin Code must be 6 digits.";
      isValid = false;
    }
    if (!fromLocation.ffloors) {
      errors.ffloors = "Floor number is required.";
      isValid = false;
    }

    setFormErrors(errors);
    if (!isValid) {
      return;
    }

    setAddLoader(true);
    let formData = new FormData();
    formData.append("ApplicationUserId", userDetails?.userId);
    formData.append("AddressLine1", fromLocation?.faddress1);
    formData.append("AddressLine2", fromLocation?.faddress2);
    formData.append("City", fromLocation.fcity);
    formData.append("State", fromLocation.fstate);
    formData.append("Pincode", fromLocation.fpinCode);
    formData.append("Floor", fromLocation.ffloors);
    formData.append("IsLiftAvailable", fromLocation.flift ? true : false);
    formData.append("AddressType", "Pickup");

    let res = await saveAddress(formData);
    if (res.success) {
      getAllAddress();
      setFromLocation((prev) => ({
        ...prev,
        faddress1: "",
        faddress2: "",
        fstate: "",
        fcity: "",
        fpinCode: "",
        flift: false,
        ffloors: ""
      }));
      // setShowPickupAddress(false);

      setAddLoader(false);
    } else {
      setAddLoader(false);
    }
  };

  const handleDropAddress = async () => {
    const errors = {};

    if (!toLocation.taddress1) errors.taddress1 = "Address is required";
    if (!toLocation.taddress2) errors.taddress2 = "Landmark is required";
    if (!toLocation.tstate) errors.tstate = "State is required";
    if (!toLocation.tcity) errors.tcity = "City is required";
    if (!toLocation.tpinCode) errors.tpinCode = "Pin Code is required";
    if (!toLocation.tfloors) errors.tfloors = "Floors are required";

    setToError(errors);

    if (Object.keys(errors).length > 0) return;

    setAddLoader(true);

    let formData = new FormData();
    formData.append('ApplicationUserId', userDetails?.userId);
    formData.append('AddressLine1', toLocation?.taddress1);
    formData.append('AddressLine2', toLocation.taddress2);
    formData.append('City', toLocation.tcity);
    formData.append('State', toLocation.tstate);
    formData.append('Pincode', toLocation.tpinCode);
    formData.append('Floor', toLocation.tfloors);
    formData.append('IsLiftAvailable', toLocation.tlift ? true : false);
    formData.append('AddressType', "Delivery");

    let res = await saveAddress(formData);
    if (res.success) {
      getAllAddress();
      // setShowwDropAddress(false);
      // setToLocation({})
      setToLocation((prev) => ({
        ...prev,
        taddress1: "",
        taddress2: "",
        tstate: "",
        tcity: "",
        tpinCode: "",
        tlift: false,
        tfloors: ""
      }));
      setAddLoader(false);
    }
  };
  // const handlePayment = async () => {
  //   setLoader(true)
  //   if (moveDate == "" || fromLocId == "" || toLocId == "") {
  //     setError(true)
  //     setLoader(false)
  //   } else {
  //     try {
  //       let formData = new FormData();
  //       formData.append('PackersAndMoversId', pmId);
  //       formData.append('ApplicationUserId', userDetails?.userId);
  //       formData.append('StorageRequirement', configuration);
  //       formData.append('StartDate',  dayjs(moveDate).format("DD/MM/YYYY"));
  //       formData.append('PickupAddressId', fromLocId);
  //       formData.append('DeliveryAddressId', toLocId);
  //       formData.append('uploadVideo', videoFile);

  //       const res = await savepackerMoverData(formData, "?stage=2");
  //       if (res?.success) {
  //         setLoader(false);
  //         router.push(`/services/packers-and-movers/thank-you`);
  //       }
  //       // if (res?.success && res?.success?.data?.value?.paymentRecord?.paymentId) {
  //       //   const paymentId = res.success.data.value.paymentRecord.paymentId;
  //       //   setPaymentId(paymentId);
  //       //   setLoader(false)
  //       // } else {
  //       //   console.error("Failed to retrieve payment ID", res);
  //       //   setLoader(false)
  //       // }

  //     }
  //     catch (error) {
  //       // console.error("Error during payment handling:", error);
  //       setLoader(false)
  //     }
  //     finally {
  //       setLoader(false);
  //     }
  //   }
  // };

  const fetchPaymentData = async (paymentId) => {
    try {
      if (!paymentId) {
        return;
      }
      const res = await getPaymentData(paymentId);
      if (res?.success) {
        setPaymentGateData(res?.success)
      } else {
        console.error("Failed to fetch payment data", res);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const openRazorpay = async () => {
    const res = await initializeRazorpay();

    var options = {
      key: paymentGatewayData.key, // Enter the Key ID generated from the Dashboard
      name: "Xtended space",
      currency: paymentGatewayData.currency,
      amount: paymentGatewayData.amount,
      order_id: paymentGatewayData.order_id,
      description: "Thankyou for choosing us!",
      image: "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
      handler: async function (response) {
        // router.push("/thankyou")
        window.location.href = `/profile?tab=bookingpackermover`;
      },
      prefill: {
        name: paymentGatewayData.customerName,
        email: paymentGatewayData.customerEmail,
        contact: paymentGatewayData.phoneNumber,
      },
      modal: {
        ondismiss: function () {
          setPaymentGateData()
          setPaymentId()
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    if (paymentId) {
      fetchPaymentData(paymentId);
    }
  }, [paymentId]);

  useEffect(() => {
    if (userDetails?.userId) {
      // sendFirstStageData();
      getAllAddress();
    }
  }, [userDetails]);

  useEffect(() => {
    if (paymentGatewayData) {
      openRazorpay();
    }
  }, [paymentGatewayData]);

  // useEffect(() => {
  //   const deliveryAddresses = savedAddress?.filter((elem) => elem.addressType === "Delivery");
  //   const pickUpAddresses = savedAddress?.filter((elem) => elem.addressType === "Pickup");
  //   if ((deliveryAddresses?.length > 0 && pickUpAddresses?.length > 0) && previous!="true") {
  //     setToLocId(deliveryAddresses[0].id);
  //     setFromLocId(pickUpAddresses[0].id)
  //   }
  // }, [savedAddress])

  const handleContinue = async () => {
    setLoader(true)
    if (!moveDate || !fromLocId || !toLocId) {
      setError(true);
      setLoader(false);
      setErrMsg()
    } else {
      try {
        let formData = new FormData();
        formData.append('PackersAndMoversId', packerMoverId);
        formData.append('ApplicationUserId', userDetails?.userId);
        formData.append('StorageRequirement', configuration);
        formData.append('StartDate', dayjs(moveDate, "DD/MM/YYYY").format("DD/MM/YYYY"));
        formData.append('PickupAddressId', fromLocId);
        formData.append('DeliveryAddressId', toLocId);
        formData.append('uploadVideo', videoFile);
        imageFile.forEach((file) => {
          formData.append('UploadedImages', file); // Use [] to denote an array on backend
        });
        // formData.append('UploadedImages', imageFile);

        const res = await savepackerMoverData(formData, "?stage=2");

        if (res?.success && res?.success?.data?.value?.paymentRecord?.paymentId) {
          router.push(`/services/packers-and-movers/move-details/${packerMoverId}`)
          setLoader(false)
          setErrMsg()
        } else {
          console.error("Failed to retrieve payment ID", res);
          setErrMsg(res?.error?.error)
          setLoader(false)
        }
      } catch (error) {
        console.error("Error during payment handling:", error);
        setLoader(false)
      }
    }
  }

  const handleAddress = (type, id) => {
    if (type === "toLocId") {
      setToLocId((prev) => (prev === id ? null : id));
    } else {
      setFromLocId((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />
      <div className="max-w-screen-xl md:mx-[auto] mx-[12px] ">
        <div className="flex items-center">
          <a
            href="/"
            className="font-medium leading-8 text-[#1B1C57] text-sm"
          >
            Home
          </a>

          <span className="mx-1"><MdKeyboardDoubleArrowRight size={20} /></span>
          <a
            href="/services/packers-and-movers"
            className="font-medium leading-8 text-[#1B1C57] text-sm"
          >
            Packers & Movers
          </a>
          <span className="mx-1"><MdKeyboardDoubleArrowRight size={20} /></span>
          <a
            href="/services/packers-and-movers/move-details"
            className="font-medium leading-8 text-[#3b82f6] text-sm"
          >
            Move Details
          </a>
        </div>
      </div>
      <section className=" max-w-screen-xl flex  justify-between md:mx-[auto] mx-[12px]">
        {/* <div className="w-2/5 md:flex  hidden snap-x snap-mandatory">
          <SimpleSlider />
        </div> */}


        <div className="md:w-full w-full mx-2 md:mx-5 ">
          <h3 className="text-3xl text-gray-700 text-center font-semibold my-3">
            Additional Details
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
              <div className="w-full">
                Choose Your Movement Date
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </div>
              <DatePicker
                className="w-full border border-solid border-[#D1D5DB] h-[44px] rounded-lg"
                onChange={(date, dateString) => {
                  // getDate(dateString);
                  setMoveDate(dateString);
                }}
                placeholder="Choose your moving date"
                format="DD/MM/YYYY"
                value={moveDate && dayjs(moveDate, "DD/MM/YYYY").isValid() ? dayjs(moveDate, "DD/MM/YYYY") : null}
                disabledDate={(current) => {
                  let customDate = moment().format("DD/MM/YYYY");
                  return current && current < moment().endOf("day");
                }}
              />
            </div>


          </div>
          <div className="flex flex-col md:flex-row mt-4 justify-between gap-12">
            <div className="shadow-md border-gray-300 border rounded-lg p-6">
              <div className="flex justify-between mt-2 mb-4">
                <h3 className="md:text-xl text-lg md:font-bold text-gray-700  font-semibold">Pickup Location</h3>
                {/* {savedAddress?.length >= 0 && <Button className="primary md:my-1 my-0 text-[12px] md:text-[16px]" variant="outline-primary" onClick={() => setShowPickupAddress(!showPickupaddress)}>{!showPickupaddress ? "Add" : "Saved"} Address</Button>
            } */}
              </div>

              {/* {showPickupaddress ? */}
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">


                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Address Line 1
                      <span className="font-medium text-sm ml-2 leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="text"
                      name="faddress1"
                      value={fromLocation.faddress1}
                      onChange={handleChange}
                      placeholder="Enter Address Line 1"
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {formErrors.faddress1 && (
                      <p className="text-red-500 text-sm">{formErrors.faddress1}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Address Line 2
                      <span className="font-medium ml-2 text-sm leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="text"
                      name="faddress2"
                      value={fromLocation.faddress2}
                      onChange={handleChange}
                      placeholder="Enter Address Line 2"
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {formErrors.faddress2 && (
                      <p className="text-red-500 text-sm">{formErrors.faddress2}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-3">
                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Pincode
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="number"
                      name="fpinCode"
                      value={fromLocation.fpinCode}
                      onChange={handleChange}
                      onInput={(e) => {
                        if (e.target.value.length > 6) {
                          e.target.value = e.target.value.slice(0, 6);
                        }
                      }}
                      placeholder="Enter Pincode"
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      min="0"
                      max="999999"
                    />
                    {formErrors.fpinCode && (
                      <p className="text-red-500 text-sm">{formErrors.fpinCode}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      City
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="text"
                      name="fcity"
                      value={fromLocation.fcity}
                      // onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {formErrors.fcity && (
                      <p className="text-red-500 text-sm">{formErrors.fcity}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      State
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="text"
                      name="fstate"
                      value={fromLocation.fstate}
                      onChange={handleChange}
                      placeholder="Enter State"
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    {formErrors.fstate && (
                      <p className="text-red-500 text-sm">{formErrors.fstate}</p>
                    )}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="w-full arrow-number">
                    <p className="block text-black mb-1">
                      Enter your Floor No.
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </p>
                    <input
                      type="number"
                      name="ffloors"
                      value={fromLocation.ffloors}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange(e);
                        if (Number(value) === 0) {
                          setFromLocation((prev) => ({ ...prev, flift: false }));
                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.length > 2) {
                          e.target.value = e.target.value.slice(0, 2);
                        }
                      }}
                      placeholder="Enter Floor No."
                      style={{
                        MozAppearance: "textfield",
                        WebkitAppearance: "auto",
                      }}
                      className="w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />

                    {formErrors.ffloors && (
                      <p className="text-red-500 text-sm">{formErrors.ffloors}</p>
                    )}
                  </div>
                  <div>
                    <div className="w-full mb-1">
                      Service Lift Available
                      <span className="font-medium text-sm leading-8 text-[#C60909]">*</span>
                    </div>
                    <div className="flex space-x-2 ">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${fromLocation.flift === true
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                        onClick={() => setFromLocation((prev) => ({ ...prev, flift: true }))}
                        disabled={fromLocation.ffloors == 0}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${fromLocation.flift === false
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                        onClick={() => setFromLocation((prev) => ({ ...prev, flift: false }))}
                      >
                        No
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden flex mt-2 items-end">
                    <Button onClick={handlePickupAddress} variant="outline-primary" className="primary">
                      Save Address {addLoader && fromLocation.faddress1 && <Spinner animation="border" style={{ width: "25px", height: "25px", marginLeft: "6px" }} />}
                    </Button>
                  </div>
                </div>


                <div className="md:flex hidden my-4 justify-start">
                  <Button onClick={handlePickupAddress} variant="outline-primary" className="primary">
                    Save Address {addLoader && fromLocation.faddress1 && <Spinner animation="border" style={{ width: "25px", height: "25px", marginLeft: "6px" }} />}
                  </Button>
                </div>
              </>
              {/* : */}
              <div>
                {savedAddress.length > 0 && <p className="md:text-lg text-lg md:font-bold text-gray-700  font-normal">Choose from your previous pickup address</p>}
                {savedAddress?.filter((elem) => elem.addressType === "Pickup")?.slice(0, 5)?.map((elem, id) => {
                  return (
                    <div className="mt-2 md:mt-0">
                      <div key={id} className="flex ">
                        <input type="radio" className="p-2 text-lg mr-3"
                          value={elem.id}
                          checked={fromLocId === elem.id}
                          onClick={() => handleAddress("fromLocId", elem.id)}
                        />
                        <p className="md:text-[16px] text-sm font-medium">
                          {elem?.address1}, {elem?.address2}, {elem?.pincode}, {elem?.city}, {elem?.state}
                        </p>
                      </div>
                      <div className=" flex">
                        <p className="ml-6 md:text-[16px] text-sm text-blue-600 font-semibold">Lift Available : <span className="font-medium text-gray-600">{elem?.isLiftAvailable ? "Yes" : "No"}</span></p>
                        <p className="ml-6 md:text-[16px] text-sm text-blue-600 font-semibold">Floors : <span className="font-medium text-gray-600">{elem?.floor}</span></p>
                      </div>
                    </div>
                  );
                })}

              </div>
              {/* } */}
            </div>
            <div className="shadow-md border-gray-300 border rounded-lg p-6">
              <div className="flex  justify-between mt-2 mb-4">
                <h3 className="md:text-xl text-lg md:font-bold font-semibold text-gray-700">Drop Location</h3>
                {/* {savedAddress?.length >= 0 && <Button className="primary my-0 text-[12px] md:text-[16px] md:my-1" variant="outline-primary" size="md" onClick={() => setShowwDropAddress(!showDroppaddress)}>{!showDroppaddress ? "Add" : "Saved"} Address</Button>} */}
              </div>
              {/* {
            showDroppaddress ? */}
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">




                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Address Line 1
                      <span className="font-medium ml-2 text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="text"
                      name="taddress1"
                      value={toLocation.taddress1}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter Address Line 1"
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.taddress1 ? "border-red-500" : ""
                        }`}
                    />
                    {toError.taddress1 && (
                      <p className="text-red-500 text-xs">{toError.taddress1}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Address Line 2
                      <span className="font-medium ml-2 text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="text"
                      name="taddress2"
                      value={toLocation.taddress2}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter Address Line 2"
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.taddress2 ? "border-red-500" : ""
                        }`}
                    />
                    {toError.taddress2 && (
                      <p className="text-red-500 text-xs">{toError.taddress2}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-3">
                  <div className="w-full">
                    <p className="block text-black mb-1">
                      Pincode
                      <span className="font-medium text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="number"
                      name="tpinCode"
                      value={toLocation.tpinCode}
                      onChange={(e) => handleChange(e)}
                      onInput={(e) => {
                        if (e.target.value.length > 6) {
                          e.target.value = e.target.value.slice(0, 6);
                        }
                      }}
                      placeholder="Enter Pincode"
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.tpinCode ? "border-red-500" : ""
                        }`}
                    />
                    {toError.tpinCode && (
                      <p className="text-red-500 text-xs">{toError.tpinCode}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      City
                      <span className="font-medium text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="text"
                      name="tcity"
                      value={toLocation.tcity}
                      // onChange={(e) => handleChange(e)}
                      placeholder="Enter City"
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.tcity ? "border-red-500" : ""
                        }`}
                    />
                    {toError.tcity && (
                      <p className="text-red-500 text-xs">{toError.tcity}</p>
                    )}
                  </div>

                  <div className="w-full">
                    <p className="block text-black mb-1">
                      State
                      <span className="font-medium text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="text"
                      name="tstate"
                      value={toLocation.tstate}
                      onChange={(e) => handleChange(e)}
                      placeholder="Enter State"
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.tstate ? "border-red-500" : ""
                        }`}
                    />
                    {toError.tstate && (
                      <p className="text-red-500 text-xs">{toError.tstate}</p>
                    )}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="w-full arrow-number">
                    <p className="block text-black mb-1">
                      Enter Your Floor No.
                      <span className="font-medium text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </p>
                    <input
                      type="number"
                      name="tfloors"
                      value={toLocation.tfloors}
                      // onChange={(e) => handleChange(e)}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleChange(e);
                        if (Number(value) === 0) {
                          setToLocation((prev) => ({ ...prev, tlift: false }));
                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.length > 2) {
                          e.target.value = e.target.value.slice(0, 2);
                        }
                      }}
                      placeholder="Enter Floor No."
                      className={`w-full form-input px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${toError.tfloors ? "border-red-500" : ""
                        }`}
                    />
                    {toError.tfloors && (
                      <p className="text-red-500 text-xs">{toError.tfloors}</p>
                    )}
                  </div>
                  <div>
                    <div className="w-full mb-1">
                      Service Lift Available
                      <span className="font-medium text-sm leading-8 text-[#C60909]">
                        *
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${toLocation.tlift === true
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                        onClick={() =>
                          setToLocation((prev) => ({ ...prev, tlift: true }))
                        }
                        disabled={toLocation.tfloors == 0}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded ${toLocation.tlift === false
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-200 text-zinc-800"
                          }`}
                        onClick={() =>
                          setToLocation((prev) => ({ ...prev, tlift: false }))
                        }
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end md:hidden mt-2">
                    <Button onClick={() => handleDropAddress()} className="primary" size="md" variant="outline-primary">
                      Save Address
                      {addLoader && toLocation.taddress1 && (
                        <Spinner
                          animation="border"
                          style={{ width: "25px", height: "25px", marginLeft: "6px" }}
                        />
                      )}
                    </Button>
                  </div>

                </div>

                <div className="justify-start my-4 md:flex hidden">
                  <Button onClick={() => handleDropAddress()} className="primary" size="md" variant="outline-primary">
                    Save Address
                    {addLoader && toLocation.taddress1 && (
                      <Spinner
                        animation="border"
                        style={{ width: "25px", height: "25px", marginLeft: "6px" }}
                      />
                    )}
                  </Button>
                </div>
              </>
              {/* : */}
              <div>
                {savedAddress.length > 0 && <p className="md:text-lg text-lg md:font-bold text-gray-700  font-normal">Choose from your previous drop address</p>}
                {savedAddress?.filter((elem) => elem.addressType === "Delivery")?.slice(0, 5)?.map((elem, id) => {
                  return (
                    <div className="mt-2 md:mt-0">
                      <div key={id} className="flex ">
                        <input type="radio" className="p-2 text-lg mr-3"
                          value={elem.id}
                          checked={toLocId === elem.id}
                          onClick={() => handleAddress("toLocId", elem.id)}
                        />
                        <p className="md:text-[16px] text-sm font-medium">
                          {elem?.address1}, {elem?.address2}, {elem?.pincode}, {elem?.city}, {elem?.state}
                        </p>
                      </div>
                      <div className="flex ">
                        <p className="ml-6 md:text-[16px] text-sm text-blue-600 font-semibold">Lift Available : <span className="font-medium text-gray-600">{elem?.isLiftAvailable ? "Yes" : "No"}</span></p>
                        <p className="ml-6 md:text-[16px] text-sm text-blue-600 font-semibold">Floors : <span className="font-medium text-gray-600">{elem?.floor}</span></p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* } */}
            </div>
          </div>
          {/* <p className="block text-black mt-3">
            Do your own survey
          </p>
          <div className="flex items-center justify-center w-full my-2">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-3 pb-3">
                <svg className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload video</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Please upload a quick and concise video, ideally 2–3 minutes in length (Max. 25 mb file limit)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleChange(e)} />
            </label>
          </div>
          {vidError && <p className="text-red-500 text-lg">{vidError}</p>}
          {videoSrc && (
            <div className="mt-4 w-1/2 rounded-md relative">
              <video width="300" controls className="rounded-md">
                <source src={videoSrc} type='video/mp4' />
              </video>
              <TiDelete className="absolute top-0 right-6 text-3xl cursor-pointer font-bold text-white" onClick={() => { setVideoSrc(null); setVideoFile(null) }} />
            </div>
          )} */}


{/* <div className="w-full flex flex-col items-center justify-center py-6">
  <h2 className="text-lg sm:text-xl font-semibold text-black text-center mb-4">
    Let <span className="text-[#0B5FFF]">AI</span> help you to generate quick item's list
  </h2>

  <label
    htmlFor="dropzone-image"
    className="w-[90%] max-w-3xl h-60 sm:h-64 storage-btn border-2 border-dashed border-blue rounded-3xl cursor-pointer flex flex-col items-center justify-center shadow-md transition hover:shadow-lg"
  >   <Image
  src="/images/robot.png"
  alt="AI Bot"
  width={50}
  height={50}
  className="mb-2 robot"
/>
    <p className="text-md font-medium text-black">Upload File From <span className="text-sky-400 underline">Browse</span></p>
    <p className="text-sm text-white opacity-70 mt-1">Please upload a reference image Max size (2MB)</p>

    <input id="dropzone-image" type="file" multiple accept="image/png,image/jpg,image/jpeg,image/webp"  name="dropzone-image" className="hidden" onChange={handleChange} />
  </label>
  {imgError && <p className="text-red-500 text-lg">{imgError}</p>}

{imageSrc.length > 0 && (
  <div className="mt-4 flex gap-4 flex-wrap">
    {imageSrc.map((src, index) => (
      <div key={index} className="relative w-32 h-32">
        <img src={src} alt={`preview-${index}`} className="rounded-md w-full h-full object-cover" />
        <TiDelete
          className="absolute -top-2 -right-2 text-xl text-white bg-red-500 rounded-full cursor-pointer"
          onClick={() => {
            const updatedSrcs = [...imageSrc];
            const updatedFiles = [...imageFile];
            updatedSrcs.splice(index, 1);
            updatedFiles.splice(index, 1);
            setImageSrc(updatedSrcs);
            setImageFile(updatedFiles);
          }}
        />
      </div>
    ))}
  </div>
)}
</div>  */}




          <div className="flex justify-between my-4">
            {/* payment button */}
            {/* <Button onClick={() => handlePayment()} className="text-white py-2 px-6 text-lg font-semibold border border-green-600 bg-green-600">Book With Token Money ₹1000 {loader && (
              <Spinner
                animation="border"
                style={{ width: "25px", height: "25px", marginLeft: "6px" }}
              />
            )}</Button> */}

            <Button onClick={() => handleContinue()}
              className="text-white py-2 px-6 text-lg font-semibold border rounded border-[#8DC63F] bg-[#8DC63F]">
              Continue
              {loader && (
                <Spinner
                  animation="border"
                  style={{ width: "25px", height: "25px", marginLeft: "6px" }}
                />)}
            </Button>

            <p className="text-md text-red-500">
              {error && (
                (moveDate === "" || moveDate == null)
                  ? "Moving date is required!"
                  : (fromLocId === "" || fromLocId == null || fromLocId == undefined)
                    ? "Pickup location is required!"
                    : (toLocId === "" || toLocId == null || toLocId == undefined)
                      ? "Drop location is required!"
                      : ""
              )}
            </p>
            {errorMsg && <p className="text-md text-red-500">
              {errorMsg}
            </p>}
          </div>

        </div>
      </section>
      <div className="w-full md:flex   snap-x snap-mandatory">
        <SimpleSlider />
      </div>


      <Footer />
    </div>
  );
};

export default Index;
