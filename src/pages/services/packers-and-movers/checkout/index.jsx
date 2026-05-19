"use client";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import { MdOutlineSecurity } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { PiCertificateLight } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import { localStorageManager } from "@/util/common";
import { fetchCheckoutDetails, getPaymentData } from "@/service/packermover";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import { Checkbox, Select } from "antd";
import Button from "react-bootstrap/Button";
import { useDebounce } from "@/util/useHooks";
import { Form } from "react-bootstrap";
const index = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const pmId = searchParams.get('pmId')
const { Option } = Select;


  const [pmId, setPmId] = useState(null);
  const [userDetails, setUserDetails] = useState();
  const [checkoutData, setCheckoutData] = useState();
  const [loader, setLoader] = useState(false);
  // const [paymentId, setPaymentId] = useState();
  const [paymentGatewayData, setPaymentGateData] = useState();
  const [summaryData, setSummaryData] = useState({
    totalItems: 54,
    packagingPrice: 599,
    insuranceAmount: 355,
    couponDiscount: 300,
    total: 6890,
  });
  const [showSummary, setShowSummary] = useState(false);
  const [selectedPackaging, setSelectedPackaging] = useState("Affordable");
  const [selectedInsurance, setSelectedInsurance] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isInsuranceAmount, setisInsuranceAmount] = useState(false);
  const [couponCodeId, setCouponCodeId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState(null);
  const [confirmedInsuranceAmount, setConfirmedInsuranceAmount] =
    useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [insuranceError, setInsuranceError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCheckout = async () => {
    setLoader(true);
    let args = {
      pmId: +pmId,
      userId: userDetails?.userId,
      packagingType: selectedPackaging,
      otherServices: selectedServices,
      insuranceAmount: confirmedInsuranceAmount,
      couponCodeId: couponCodeId,
      couponCode: couponCode,
      isInsuranceAmount: isInsuranceAmount,
    };

    let res = await fetchCheckoutDetails(args);
    if (res?.success) {
      setCheckoutData(res?.success?.data);
      setLoader(false);
    }
  };

  const fetchPaymentData = async (paymentId, paymentType) => {
    try {
      if (!paymentId) {
        return;
      }
      let data = {
        paymentId: String(paymentId),
        paymentType: paymentType,
      };
      const res = await getPaymentData(data);
      if (res?.success) {
        setPaymentGateData(res?.success);
      } else {
        // console.error("Failed to fetch payment data", res);
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
        // router.push(`/services/packers-and-movers/thank-you`);
        router.push(`/profile?tab=bookingpackermover`);
      },
      prefill: {
        name: paymentGatewayData.customerName,
        email: paymentGatewayData.customerEmail,
        contact: paymentGatewayData.phoneNumber,
      },
      modal: {
        ondismiss: function () {
          setPaymentGateData();
          // setPaymentId();
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    if (paymentGatewayData) {
      openRazorpay();
    }
  }, [paymentGatewayData]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const param = query.get("pmId");
    if (param) {
      setPmId(param);
    }
    if (typeof window !== "undefined") {
      const userData =
        localStorageManager.getValue("userDetails") &&
        JSON.parse(localStorageManager.getValue("userDetails"));
      setUserDetails(userData);
    }
  }, []);

  useEffect(() => {
    if (pmId && userDetails) {
      fetchCheckout();
    }
  }, [
    userDetails,
    pmId,
    selectedPackaging,
    selectedServices,
    isInsuranceAmount,
    confirmedInsuranceAmount,
    couponCodeId,
    // couponCode,
  ]);

  const onChange = (e) => {
    setisInsuranceAmount(e.target.checked);
    if (!e.target.checked) {
      setInsuranceAmount(null);
      setConfirmedInsuranceAmount(null);
    }
    // console.log(`Insurance enabled: ${e.target.checked}`);
  };

  const options = [
    { value: "Dismantling", label: "Dismantling & Reassembly" },
    { value: "ACInstallation", label: "Floor Handling (No Lift)" },
    { value: "GeyserInstallation", label: "AC/Geyser Uninstall/Reinstall" },
  ];

  const handleChange = (value) => {
    setSelectedServices(value);
    console.log(`selected ${value}`);
  };
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      // console.error("Date formatting error:", error);
      return "";
    }
  };

  const handleInsuranceAmountChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setInsuranceAmount("");
      setConfirmedInsuranceAmount(null);
      return;
    }

    let amount = parseInt(value, 10);
    if (!isNaN(amount)) {
      setInsuranceAmount(amount);
    } else {
      setInsuranceAmount("");
      setConfirmedInsuranceAmount(null);
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
    setCouponError("");
    // setCouponSuccess("");
  };
  const handleApplyCoupon = (coupon) => {
    const validCoupon = checkoutData?.allCoupons?.find(
      (item) =>
        item.couponCode.toLowerCase() === coupon.couponCode.toLowerCase()
    );

    if (!validCoupon) {
      setCouponError("Invalid Coupon Code!");
      setAppliedCoupon(null);
      setCouponCodeId(null);
      return;
    }

    setCouponError(""); // error clear
    setAppliedCoupon(validCoupon.couponCode);
    setCouponCode(validCoupon.couponCode);
    setCouponCodeId(validCoupon.id);
    setIsModalOpen(false);


    // console.log(`Coupon applied: ${validCoupon.couponCode}`);
  };

  const handleRemoveCoupon = (couponCode) => {
    if (appliedCoupon === couponCode) {
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponCodeId(null);
      setCouponError("");
      // console.log(`Removed coupon: ${couponCode}`);
    }
  };

  const handleAddClick = (option) => {
    console.log("User selected:", option);

    if (option.name.includes("Premium Packaging")) {
      setSelectedPackaging("Premium");
    } else if (option.name.includes("Affordable Packing")) {
      setSelectedPackaging("Affordable");
    } else {
      setSelectedPackaging("Dismantling");
    }
  };

  const servicePriceOptions = checkoutData?.otherServicesPrices
    ? Object.entries(checkoutData.otherServicesPrices).map(([key, price]) => ({
        value: key,
        label: (
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>{key}</span>
            <span style={{ color: "#888" }}>₹{price}</span>
          </span>
        ),
      }))
    : [];

  const handleCheckPremium = () => {
    if (
      insuranceAmount &&
      insuranceAmount >= 100000 &&
      insuranceAmount <= 2000000
    ) {
      setConfirmedInsuranceAmount(insuranceAmount);
      setInsuranceError("");
    } else {
      setInsuranceError(
        "Please enter insurance amount between 1 Lac to 20 Lac"
      );
    }
  };

  useEffect(() => {
  function handleClickOutside(e) {
    // agar modal open hai aur click coupon-section ke bahar hua
    if (isModalOpen && !e.target.closest(".coupon-section")) {
      setIsModalOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isModalOpen]);

  
  return (
    <div>
      <HeaderMenu />
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location & Items */}
        <div className="lg:col-span-2 space-y-6 p-4">
          {/* Location Details */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-4">Shifting Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Enter pickup address"
                className="border rounded-md p-2 w-full"
                value={checkoutData?.cityFrom || ""}
              />
              <input
                type="text"
                placeholder="Enter drop address"
                className="border rounded-md p-2 w-full"
                value={checkoutData?.cityTo || ""}
              />
              <input
                type="date"
                className="border rounded-md p-2 w-full"
                value={
                  checkoutData?.startDate
                    ? formatDateForInput(checkoutData.startDate)
                    : ""
                }
                readOnly
              />
            </div>
          </div>

          {/* Selected Items */}
          <div className="bg-white p-6 rounded-xl shadow border h-[750px] overflow-y-scroll">
            <h2 className="text-lg font-semibold mb-4">Selected Items</h2>
            <table className="w-full text-left border-t border-gray-200">
              <thead>
                <tr className="text-gray-800">
                  <th className="py-2 px-2">Item</th>
                  <th>Quantity</th>
                  <th>CFT</th>
                  <th>Total CFT</th>
                </tr>
              </thead>
              <tbody>
                {checkoutData?.selectedItems?.map((elem, item) => {
                  return (
                    <tr className="border-t py-2">
                      <td className="py-3 text-[16px] text-gray-700 flex items-center font-semibold ">
                        <span className="px-2">
                          <img
                            src={elem?.itemsIconPath}
                            alt={elem?.itemName}
                            className="w-6 h-6"
                          />
                        </span>{" "}
                        {elem?.itemName}
                      </td>
                      <td className="py-3 text-[16px] text-gray-700 font-medium">
                        {elem?.selectedQuantity}
                      </td>
                      <td className="py-3 text-[16px] text-gray-700 font-medium">
                        {elem?.netCFT}
                      </td>
                      <td className="py-3 text-[16px] text-gray-700 font-medium">
                        {elem?.totalCFT}
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t">
                  <td className="py-2 font-bold">Total</td>
                  <td className="py-2 font-bold">
                    {checkoutData?.selectedItems
                      ?.map((elem) => elem?.selectedQuantity)
                      ?.reduce((acc, coll) => acc + coll, 0)}
                  </td>
                  <td></td>
                  <td className="py-2 font-bold">{checkoutData?.totalCFT}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Summary */}
        {/* <div className="bg-white p-6 rounded-xl shadow border h-max">
                    <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>Base Charge</span>
                            <span>₹{checkoutData?.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Packing Charges</span>
                            <span>₹2,500</span>
                        </div> 
                         <div className="flex justify-between">
                            <span>Token Money</span>
                            <span>₹{checkoutData?.tokenMoney}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>GST (18%)</span>
                            <span> + ₹{Math.floor((checkoutData?.totalAmount*18)/100)}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-black">
                            <span>Total Amount</span>
                            <span>₹{Math.floor(checkoutData?.totalAmount+((checkoutData?.totalAmount*18)/100))}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
                        Pay Securely with Razorpay
                    </button>
                     <button onClick={()=>fetchPaymentData(checkoutData?.tokenId)} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
                        Book With Token Money ₹{checkoutData?.tokenMoney}
                    </button>

                    <div className="space-y-2 my-4 text-sm text-gray-700">
                    <div className="flex justify-between font-semibold text-black">
                            <span>Total Amount</span>
                            <span>₹{Math.floor(checkoutData?.totalAmount+((checkoutData?.totalAmount*18)/100))}</span>
                        </div>
                        
                       <div className="flex justify-between">
                            <span>Token Money</span>
                            <span> - ₹{checkoutData?.tokenMoney}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-semibold text-black">
                            <span>Balance Amount</span>
                            <span>₹{Math.floor(checkoutData?.totalAmount - checkoutData?.tokenMoney)}</span>
                        </div>
                    </div>

                    <div className="mt-6 text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                            <span><MdOutlineSecurity className="text-2xl text-blue-500"/></span> 256-bit SSL Secured Payment
                        </div>
                        <div className="flex items-center gap-2">
                            <span><FaTruckFast className="text-2xl text-blue-500"/></span> 2,000+ Successful Moves
                        </div>
                        <div className="flex items-center gap-2">
                            <span><PiCertificateLight className="text-2xl text-blue-500"/></span> ISO 9001:2015 Certified
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <img src="/razorpay-logo.png" alt="Razorpay" className="h-4" />
                            <img src="/ssl-secure.png" alt="SSL" className="h-4" />
                        </div>
                    </div>
                </div> */}

        <div className="white-box relative">
          <h2 className="font-semibold text-[18px] text-[#000000] p-1">
            Select Packing Type
            <span className="font-medium text-sm leading-8 text-[#C60909] ml-1">
              *
            </span>
          </h2>

          <div className="relative inline-block group bg-gray-100 w-full  my-2 rounded-lg p-4">
            {/* <Card className="mb-2 rounded-lg shadow-sm">
              <Card.Body className="w-full h-auto text-[#B85828] p-3">
                <div className="flex flex-col">
                  <div className="font-semibold text-base">
                    Premium Packaging
                    {selectedPackaging === "Premium" && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2  rounded">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="text-[#828282] text-sm">
                    (Pack items in bubble wrap + Foam serts)
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-black font-medium">
                      ₹{checkoutData?.rateSlab?.premiumPackingCost ?? 0}
                    </span>
                    <Button
                      variant="light text-[#156AC0] px-4"
                      onClick={() =>
                        handleAddClick({
                          name: "Premium Packaging",
                          price:
                            checkoutData?.rateSlab?.premiumPackingCost ?? 0,
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-2 rounded-lg shadow-sm">
              <Card.Body className="w-full h-auto text-[#B85828] p-3">
                <div className="flex flex-col">
                  <div className="font-semibold text-base">
                    Affordable Packing
                  </div>
                  <p className="text-[#828282] text-sm">
                    (Pack items in bubble wrap + Foam serts)
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-black font-medium">
                      ₹{checkoutData?.rateSlab?.basicPackingCost ?? 0}
                    </span>
                    <Button
                      variant="light px-4 text-[#156AC0]"
                      onClick={() =>
                        handleAddClick({
                          name: "Affordable Packing",
                          price: checkoutData?.rateSlab?.basicPackingCost ?? 0,
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card> */}

            <Card className="mb-2 rounded-lg shadow-sm">
              <Card.Body className="w-full h-auto text-[#B85828] p-3">
                <div className="flex flex-col">
                  <div className="font-semibold text-base">
                    Premium Packaging
                    {/* Highlighted change: if the selected packaging is "Premium", the button will have a green background */}
                    {selectedPackaging === "Premium" && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 rounded">
                        Selected
                      </span>
                    )}
                  </div>

                  <p className="text-[#828282] text-sm">
                    All new material+ 3 Layers & Carogate Sheet+ bubble &
                    Shrink wrap
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-black font-medium">
                      ₹{checkoutData?.rateSlab?.premiumPackingCost ?? 0}
                    </span>
                    {/* Highlighted change: Conditional styling for background color */}
                    <Button
                      variant="light"
                      className={`px-4 ${
                        selectedPackaging === "Premium"
                          ? "bg-[#8DC63F] text-white"
                          : "text-[#156AC0]"
                      }`}
                      onClick={() =>
                        handleAddClick({
                          name: "Premium Packaging",
                          price:
                            checkoutData?.rateSlab?.premiumPackingCost ?? 0,
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-2 rounded-lg shadow-sm">
              <Card.Body className="w-full h-auto text-[#156AC0] p-3">
                <div className="flex flex-col">
                  <div className="font-semibold text-base">
                    Affordable Packing
                    {/* Highlighted change: if the selected packaging is "Affordable", the button will have a green background */}
                    {selectedPackaging === "Affordable" && (
                      <span className="ml-2 text-xs bg-blue-500 text-white px-2 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-[#828282] text-sm">
                    (Pack items in bubble wrap + Foam serts)
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-black font-medium">
                      ₹{checkoutData?.rateSlab?.basicPackingCost ?? 0}
                    </span>
                    {/* Highlighted change: Conditional styling for background color */}
                    <Button
                      variant="light"
                      className={`px-4 ${
                        selectedPackaging === "Affordable"
                          ? "bg-[#8DC63F] text-white"
                          : "text-[#156AC0]"
                      }`}
                      onClick={() =>
                        handleAddClick({
                          name: "Affordable Packing",
                          price: checkoutData?.rateSlab?.basicPackingCost ?? 0,
                        })
                      }
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <h2 className="font-semibold text-[18px] text-[#000000] p-1">
              Other Services
            </h2>
            {/* <Select
              mode="multiple"
              style={{ width: "100%", padding: "8px" }}
              placeholder="Select Extra Services"
              onChange={handleChange}
              options={servicePriceOptions}
              value={selectedServices}
              className="mb-2  flex justify-end w-full p-1"
            /> */}

    <Select
  mode="multiple"
  allowClear
  placeholder="Select services"
  value={selectedServices}
  onChange={setSelectedServices}
  className="w-full"
  tagRender={(props) => {
    const { label, closable, onClose } = props;
    return (
      <div
        className="flex items-center bg-green-100 border border-green-400 text-green-700 rounded-md px-2 py-0.5 mr-1 mb-1 text-sm"
        style={{ display: "inline-flex" }}
      >
        <span>{label}</span>
        {closable && (
          <span
            onClick={onClose}
            className="ml-1 cursor-pointer text-gray-500 hover:text-red-500"
          >
            ✕
          </span>
        )}
      </div>
    );
  }}
>
  {servicePriceOptions.map((item) => (
<Option key={item.value} value={item.value}>
  <div className="flex justify-between items-center w-full">
    <Checkbox
      checked={selectedServices.includes(item.value)}
      onChange={() => handleChange(
        selectedServices.includes(item.value)
          ? selectedServices.filter((s) => s !== item.value)
          : [...selectedServices, item.value]
      )}
    >
      {item.value}
    </Checkbox>

    <span className="text-gray-500">
      ₹{checkoutData?.otherServicesPrices[item.value]}
    </span>
  </div>
</Option>



  ))}
</Select>



            <Checkbox onChange={onChange} checked={isInsuranceAmount}>
              Add Insurance
            </Checkbox>
            {isInsuranceAmount && (<>
            <span className="flex items-center gap-2 px-3  font-semibold text-gray-700 text-[16px]">
              <span className="text-[20px]"></span> Add your Insurance{" "}
              <span className="font-medium text-sm leading-8 text-[#C60909]">
                *
              </span>
            </span>
            <div className="z-10 group-hover:block w-full p- mt-0.5">
              <div className=" flex justify-between items-center mr-2 md:mr-0 w-full md:w-[100%] h-[50px] bg-white  rounded-xl ">
                <div className="mx-2 ">
                  <input
                    className="w-full bg-white border rounded-md p-2"
                    type="number"
                    name="PerLakh"
                    id="PerLakh"
                    value={insuranceAmount || ""}
                    onChange={handleInsuranceAmountChange}
                    min={100000}
                    max={2000000}
                  />
                </div>
                <div>
                  <button
                    className="bg-[#8DC63F] text-white text-[12px] mx-2 px-2 py-1 rounded-md"
                    onClick={handleCheckPremium}
                    disabled={!isInsuranceAmount}
                  >
                    Check Premium
                  </button>
                </div>
              </div>
              {/* Error message for missing checkbox if amount is filled */}
              {insuranceAmount && !isInsuranceAmount && (
                <p className="text-red-500 text-xs py-1 px-2 bg-gray-50 rounded">
                  Please check the "Add Insurance" checkbox to proceed with the
                  insurance amount.
                </p>
              )}

              {/* Error message for invalid amount */}
              {isInsuranceAmount && !insuranceError && !insuranceAmount && (
                <p className="text-red-500 text-xs py-1 px-2 bg-gray-50 rounded">
                  Please enter a valid insurance amount between ₹1 Lakh and ₹20
                  Lakh.
                </p>
              )}
              {(insuranceError &&
              <p
                className={`${
                  insuranceError ? "text-red-500" : "text-gray-800"
                } text-xs py-1 px-2 bg-gray-50 rounded`}
              >
                {insuranceError ||
                  "Enter Insurance Amount Range Between 1 Lac to 20 Lac"}
              </p>
)}
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
                        <span className="font-semibold ml-2">
                          ₹{checkoutData?.insuranceAmountOnPremium || 0}
                        </span>
                        <span className="money_amount mr-3 font-medium ml-3 text-base leading-7 text-[#374151]"></span>
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
              {/* </div> */}
            </div>
            </>
            )}
            <div className="w-full flex items-center justify-center">
              <p className="text-[10px] md:text-[13px] text-[#D97721] mb-0">
             
              </p>
            </div>

            {/* <div className=" overflow-hidden">

              <div className="coupon flex items-center justify-between bg-white rounded-lg px-3 w-full overflow-x-auto overflow-y-hidden">
                <div className="flex justify-between w-[400px] h-[70px] bg-gray-100 p-3 mx-2 gap-2 rounded items-center">
                  <div className="w-[250px]">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={handleCouponCodeChange}
                      placeholder="Discount Coupon Code"
                      className="p-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="text-sm font-semibold text-green-600"
                      onClick={() =>
                        handleApplyCoupon({ couponCode: couponCode, id: null })
                      }
                      disabled={!couponCode || appliedCoupon === couponCode}
                    >
                      {appliedCoupon === couponCode ? "Applied" : "Apply"}
                    </button>
                    <button
                      className="text-sm font-semibold text-gray-600"
                      onClick={() => handleRemoveCoupon(couponCode)}
                      disabled={appliedCoupon !== couponCode}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {checkoutData?.allCoupons?.map((item) => (
                  <div
                    className=" flex justify-between w-auto mx-2 bg-gray-100 p-2 rounded items-center"
                    key={item.couponCode}
                  >
                    <div className="flex items-center w-[170px] gap-2">
                      <Image
                        src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/coupon1.svg"
                        alt="coupon"
                        width={30}
                        height={30}
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          <span className="c-name text-yellow-300">
                            {item.couponCode}
                          </span>
                        </p>
                        <p className="text-[10px] text-gray-600">
                          {item.amountType === "Percent"
                            ? `Get cashback upto ${item.amount}%`
                            : `Get cashback upto ₹${item.amount}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <button
                        className="text-sm font-semibold text-green-600"
                        onClick={() => handleApplyCoupon(item)}
                        disabled={appliedCoupon === item.couponCode}
                      >
                        {appliedCoupon === item.couponCode
                          ? "Applied"
                          : "Apply"}
                      </button>
                      <button
                        className="text-sm font-semibold text-gray-600"
                        onClick={() => handleRemoveCoupon(item.couponCode)}
                        disabled={appliedCoupon !== item.couponCode}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
</div> */}

{/* Available Coupons Display */}
{checkoutData?.allCoupons && checkoutData.allCoupons.length > 0 && (
  <div className="space-y-3 mb-4">
    <h4 className="font-medium text-gray-700">Available Coupons:</h4>
    {checkoutData.allCoupons.map((coupon) => (
      <div
        key={coupon.couponCode}
        className={`relative border border-gray-100 rounded-lg p-4 flex justify-between items-start bg-white shadow-sm
          before:content-[''] before:absolute before:top-1/2 before:-left-4 before:-translate-y-1/2 before:w-7 before:h-7 before:bg-gray-100   before:rounded-full
          after:content-[''] after:absolute after:top-1/2 after:-right-4 after:-translate-y-1/2 after:w-7 after:h-7 after:bg-gray-100  after:rounded-full
          ${appliedCoupon === coupon.couponCode ? "border-green-500 bg-green-50" : "hover:border-gray-400"}`}
      >
        {/* Left Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-800">
              {coupon.brandName || "Coupon"}
            </p>
            <span className="text-xs border rounded px-2 py-0.5 bg-gray-100 text-gray-600">
              {coupon.couponCode}
            </span>
          </div>
          <p className="text-xs text-gray-500">Use this coupon code</p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            {coupon.amountType === "Percent"
              ? `Get ${coupon.amount}% discount`
              : `Get ₹${coupon.amount} discount`}
          </p>
          {coupon.description && (
            <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-1">
          <button
            className={`px-3 py-1 rounded text-xs font-medium ${
              appliedCoupon === coupon.couponCode
                ? "bg-green-500 text-white cursor-default"
                : "text-blue-600 font-semibold text-sm hover:underline"
            }`}
            onClick={() => handleApplyCoupon(coupon)}
            disabled={appliedCoupon === coupon.couponCode}
          >
            {appliedCoupon === coupon.couponCode ? "Applied" : "APPLY"}
          </button>

          {appliedCoupon === coupon.couponCode && (
            <button
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs font-medium"
              onClick={() => handleRemoveCoupon(coupon.couponCode)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
)}


{/* <div className="coupon-section relative">

  <div className="mb-4">
    <button
      onClick={() => setIsModalOpen(!isModalOpen)}
      className="flex items-center gap-2 w-full p-3 border-2 border-dashed border-green-400 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
    >
      <span className="text-lg">🎫</span>
      <span className="font-medium">Apply Coupon</span>
      <span className={`ml-auto text-xl transition-transform ${isModalOpen ? 'rotate-90' : ''}`}>→</span>
    </button>
  </div>

  {appliedCoupon && (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg">✅</span>
          <div>
            <p className="font-semibold text-green-700">{appliedCoupon}</p>
            <p className="text-sm text-green-600">
              Coupon Applied Successfully
            </p>
          </div>
        </div>
        <button
          onClick={() => handleRemoveCoupon(appliedCoupon)}
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  )}

  
  {couponError && (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 text-sm font-medium">{couponError}</p>
    </div>
  )}


  {isModalOpen && (
    <>

      <div 
        className="fixed inset-0 bg-transparent z-40 lg:hidden" 
        onClick={() => setIsModalOpen(false)}
      />
      
      
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[60vh] overflow-y-auto">
        <div className="p-2">
          <div className="flex justify-between items-center mb-4">
             <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button> 
          </div>

        
           <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={handleCouponCodeChange}
                placeholder="Enter coupon code"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  handleApplyCoupon({ couponCode: couponCode, id: null });
                }}
                disabled={!couponCode || appliedCoupon === couponCode}
              >
                {appliedCoupon === couponCode ? "Applied" : "Apply"}
              </button>
            </div>
            {couponError && (
              <p className="text-red-500 text-sm mt-2">{couponError}</p>
            )}
          </div>

        
          <div className="space-y-1">
            <h4 className="font-medium text-gray-700 mb-1">Available Coupons:</h4>
            
            {checkoutData?.allCoupons && checkoutData.allCoupons.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {checkoutData.allCoupons.map((item) => (
                  <div
                    key={item.couponCode}
                    className={`p-1 border rounded-lg transition-colors ${
                      appliedCoupon === item.couponCode 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="text-xl">🎫</div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 text-sm">
                            {item.couponCode}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.amountType === "Percent"
                              ? `Get ${item.amount}% discount`
                              : `Get ₹${item.amount} discount`}
                          </p>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <button
                          className={`px-3 py-1 rounded text-xs font-medium ${
                            appliedCoupon === item.couponCode
                              ? 'bg-green-500 text-white cursor-default'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                          onClick={() => handleApplyCoupon(item)}
                          disabled={appliedCoupon === item.couponCode}
                        >
                          {appliedCoupon === item.couponCode ? "Applied" : "Apply"}
                        </button>
                        
                        {appliedCoupon === item.couponCode && (
                          <button
                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs font-medium"
                            onClick={() => handleRemoveCoupon(item.couponCode)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <div className="text-3xl mb-2">🎫</div>
                <p className="text-sm">No coupons available at the moment</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )}
</div> */}
             

              {/* </div> */}



              <div className="tprice flex justify-between items-center">
                <div className="w-full flex justify-between items-center">
                  <h2 className="font-bold">
                    Total
                    {"" && (
                      <span className="text-[12px] font-normal">
                        {" "}
                        (logistic charges is not included)
                      </span>
                    )}{" "}
                  </h2>
                  <div className="flex flex-col items-end">
                    <p>₹ {checkoutData?.totalAmount || 0}</p>
                    {/* <div
                      className="text-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
                      onMouseEnter={() => setShowSummary(true)}
                      onMouseLeave={() => setShowSummary(false)}
                      onClick={() => setShowSummary(!showSummary)}
                    >
                      <span className="text-blue-600 font-medium text-xs underline">
                        Summary
                      </span>
                    </div> */}
                    <div
                      className="text-center cursor-pointer hover:bg-gray-50 p-1 rounded-md transition-colors"
                      onClick={() => setShowSummary((prev) => !prev)}
                    >
                      <span className="text-blue-600 font-medium text-xs underline">
                        Summary
                      </span>
                    </div>
                  </div>
                
                </div>
              </div>
               {couponError && (
                <p className="success-message text-sm text-red-500 font-semibold py-2 px-2 flex">
                  {couponError}
                </p>
              )}
   <div className="w-full flex items-center justify-center">
              <p className="text-[10px] md:text-[18px] text-[#008000] mb-0  py-2 ">
                   Avail Exclusive offer on full payment
              </p>
            </div>
              <div className="">
                {/* Summary Modal/Tooltip */}
                {showSummary && (
                  <div className="absolute top-[84%] left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg  w-full mb-4 p-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-semibold text-gray-800">
                        Order Summary
                      </h3>
                      <button
                        onClick={() => setShowSummary(false)}
                        className=" hover:text-gray-700 mb-2 text-red-800 font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total items</span>
                        <span className="font-medium">
                          {checkoutData?.totalQuantity}
                        </span>
                      </div>

                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Packaging Price</span>
                        <span className="font-medium">
                          ₹ {checkoutData?.packagingFee || 0}
                        </span>
                      </div> */}

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Insurance Amount</span>
                        <span className="font-medium">
                          ₹{checkoutData?.insuranceAmountOnPremium || 0}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Coupon Discount</span>
                        <span className="font-medium text-green-600">
                          ₹{checkoutData?.appliedCoupon?.amount || 0}
                        </span>
                      </div>

                      <hr className="my-2" />

                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹ {checkoutData?.totalAmount || 0}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  className=" mb-3 w-full text-[12px] md:text-[16px] bg-[#156AC0] text-white py-2 px-5 border rounded-md"
                  onClick={() =>
                    fetchPaymentData(checkoutData?.balanceId, "BalanceAmount")
                  }
                >
                  Pay Full Amount
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  className=" mb-3 w-full text-[12px] md:text-[16px] bg-[#156AC0] text-white py-2 px-5 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() =>
                    fetchPaymentData(checkoutData?.tokenId, "TokenMoney")
                  }
                  disabled={!!appliedCoupon}
                >
                  Book With ₹ {checkoutData?.tokenMoney || ""} Token Money
                </button>
              </div>
            {/* </div> */}
            
          </div>
        </div>
      </div>
      <Footer />
      {loader && <Loader />}
    </div>
  );
};

export default index;
