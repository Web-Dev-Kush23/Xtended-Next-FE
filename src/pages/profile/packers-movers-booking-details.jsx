import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiFillInfoCircle } from "react-icons/ai";
import logistics from "../../../public/images/icon/logistics.png";
import balanceamout from "../../../public/images/icon/balanceamout.png";
import tokenmoney from "../../../public/images/icon/tokenmoney.png";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Box from "../../../public/images/icon/Box (1).svg";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { GoDownload } from "react-icons/go";
import Product from "../../../public/images/product/Floor-Plan.png";
import {
  getBookedPackersMoversDetailsByInfoId,
  getPaymentGateway,
} from "@/service/storageService";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Loader from "@/components/Loader";

const PackerMoverBookingDetails = () => {
  const searchParams = useSearchParams();
  const InfoId = searchParams.get("infoId");
  const [showRenewDiv, setShowRenewDiv] = useState(true);
  const [payBtn, setPaynowBtn] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // for token money details
  const [paymentGateway, setPaymentGateway] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      let args = `?InfoId=${InfoId}`;
      const response = await getBookedPackersMoversDetailsByInfoId(args);
      if (response?.success) {
        setData(response?.success?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    })();
  }, [InfoId]);

  // To handle payments for logistics and balance amount (Step 2 and 3)
  const handlePaymentCharge = async (id, type) => {
    let args = `?PaymentId=${id}&PaymentType=${type}`;
    const response = await getPaymentGateway(args, type);
    if (response?.success) {
      setPaymentGateway(response?.success);
      setPaynowBtn(true);
    }
  };

  return (
    <React.Fragment>
      <HeaderMenu />
      {/* parent container div */}
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-start">
          <li key="home" className="flex items-center justify-start">
            <Link href="/" legacyBehavior>
              <a className="">Home</a>
            </Link>
          </li>
          <Breadcrumb />
        </div>

        <div className="min-h-[126px] w-full flex lg:flex-row flex-col items-center justify-between lg:pl-6 my-4 border-b-[2px] pb-5">
          <div className="flex items-center lg:justify-between justify-center space-x-6">
            <div className="w-[120px] bg-gray-100 rounded-lg grid place-items-center">
              <Image
                height={120}
                width={140}
                objectFit="cover"
                src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/WhatsApp+Image+2024-12-12+at+14.54.05_dda3958f.jpg"
                alt="image"
                priority
              />
            </div>
            <div className="flex flex-col items-start justify-between space-y-1">
              <p className="text-[15px]">
                <b>#PM </b>- {data?.packersMovers?.packersAndMoversInfoId || ""}
              </p>
              <h2 className="text-[15px]">
                <b>Storage Requirement</b> -{" "}
                {data?.packersMovers?.storageRequirement || ""}
              </h2>
              <h2 className="text-[15px]">
                <b>Shift Type</b> - {data?.packersMovers?.storageType || ""}
              </h2>
              <h2 className="text-[15px]">
                <b>Pickup Date</b> - {data?.packersMovers?.pickupDate || ""}
              </h2>
              <Link
                href={data?.packersMovers?.quotation || ""}
                target="_blank"
                download
                className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
              >
                <GoDownload className="mr-1" size={15} /> Download Quotation{" "}
              </Link>
            </div>
          </div>

          <div className="max-w-[474px] flex items-start justify-between flex-col bg-gray-100 py-3 mt-5 md:m-0 px-3 rounded-lg">
            <h2 className="text-[14px] mb-3">
              <b>Pickup Address</b> -{" "}
              {data?.packersMovers?.pickupAddress?.address} , <b>Floor No.</b> -{" "}
              {data?.packersMovers?.pickupAddress?.floor} ,{" "}
              <b>Lift Availablility</b> -{" "}
              {data?.packersMovers?.pickupAddress?.isLiftAvailable}
            </h2>
            <h2 className="text-[14px] mb-3">
              <b>Delivery Address</b> -{" "}
              {data?.packersMovers?.deliveryAddress?.address} , <b>Floor No.</b>{" "}
              - {data?.packersMovers?.deliveryAddress?.floor} ,{" "}
              <b>Lift Availablility</b> -{" "}
              {data?.packersMovers?.deliveryAddress?.isLiftAvailable}
            </h2>
          </div>
        </div>

        {/* bookings container | apply  */}
        <div className="my-6">
          {/* Use .map function loop here for dynamic bookings */}
          <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all">
            {/* {!!data?.tokenMoney && data?.balanceAmount?.status == "Paid" && (  */}
            {/* {data?.tokenMoney?.status== 'Paid' && data.balanceAmount.status !== 'Paid' &&( */}
            {data?.tokenMoney && (
              <div
                className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center lg:flex-row flex-col justify-between mt-4 transition-all ${
                  !showRenewDiv && `hidden`
                }`}
              >
                <div className="flex items-center justify-between space-x-3">
                  <p className="flex items-center justify-center">
                    <Image
                      height={30}
                      width={30}
                      src={tokenmoney}
                      alt="icon"
                      className="mr-2"
                      priority
                    />{" "}
                    <b>Token Money</b>
                  </p>
                </div>
                {data?.tokenMoney?.status === "Paid" ? (
                  <div className="flex flex-col lg:items-end items-center justify-between">
                    <span className="text-[20px]">
                      <b>₹{data?.tokenMoney?.amount || ""}</b>
                    </span>
                    <p className="flex items-center justify-center">
                      {(data?.tokenMoney?.status === "To be paid within" && (
                        <AiFillInfoCircle
                          className="text-yellow-400 rotate-180"
                          size={20}
                        />
                      )) ||
                        (data?.tokenMoney?.status === "Paid" && (
                          <IoMdCheckmarkCircle
                            className="text-green-500"
                            size={20}
                          />
                        ))}
                      <span className="mx-2">
                        <b>{data?.tokenMoney?.status || ""}</b>
                      </span>{" "}
                      <span className="text-[14px]">
                        on {data?.tokenMoney?.paymentDate || ""}
                      </span>{" "}
                    </p>
                    <Link
                      href={data?.tokenMoney?.paymentReceipt || ""}
                      target="_blank"
                      download
                      className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                    >
                      <GoDownload className="mr-1" size={15} /> Download Receipt{" "}
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      handlePaymentCharge(data?.tokenMoney?.id, "TokenMoney")
                    }
                    className="text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2"
                  >
                    Pay Now ₹{data?.tokenMoney?.amount || ""}
                  </button>
                )}
              </div>
            )}

            {/* Balance Amount */}

           {data?.balanceAmount && (
          
          <div
              className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${
                !showRenewDiv && `hidden`
              }`}
            >
              <div className="flex flex-col lg:items-start justify-center gap-2">
                <p className="flex items-center justify-center">
                  <Image
                    height={30}
                    width={30}
                    src={balanceamout}
                    alt="icon"
                    className="mr-2"
                    priority
                  />{" "}
                  <b>Balance Amount</b>
                  {data?.balanceAmount?.status === "To be paid within" && (
                    <AiFillInfoCircle
                      className="ml-2 text-gray-300"
                      size={20}
                    />
                  )}
                </p>
                {data?.balanceAmount?.status === "To be paid within" && (
                  <span className="text-[12px] bg-blue-200 px-1 m-0">
                    NOTE : This payment covers the remaining Packers and Movers
                    amount.
                  </span>
                )}
              </div>
              <div className="flex flex-col lg:items-end items-center justify-between">
                {data?.balanceAmount?.status === "Paid" && (
                  <span className="text-[20px]">
                    <b>₹{data?.balanceAmount?.amount || ""}</b>
                  </span>
                )}
                {(data?.balanceAmount?.status === "To be paid within" ||
                  data?.balanceAmount?.status === "Payment Due on") && (
                  <button
                    onClick={() =>
                      handlePaymentCharge(
                        data?.balanceAmount?.id,
                        "BalanceAmount"
                      )
                    }
                    title={data?.balanceAmount?.paymentType}
                    className={`${
                      data?.balanceAmount?.status == "Paid" &&
                      `!cursor-not-allowed !bg-blue-300`
                    } text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2`}
                    disabled={
                      data?.balanceAmount?.status == "Paid" ? true : false
                    }
                  >
                    Pay Now ₹{data?.balanceAmount?.amount || ""}
                  </button>
                )}
                <p className="flex items-center justify-center">
                  {(data?.balanceAmount?.status === "To be paid within" && (
                    <AiFillInfoCircle
                      className="text-yellow-400 rotate-180"
                      size={20}
                    />
                  )) ||
                    (data?.balanceAmount?.status === "Payment Due on" && (
                      <AiFillInfoCircle className="text-red-500" size={20} />
                    )) ||
                    (data?.balanceAmount?.status === "Paid" && (
                      <IoMdCheckmarkCircle
                        className="text-green-500"
                        size={20}
                      />
                    ))}
                  <span className="mx-2">
                    <b>{data?.balanceAmount?.status || ""}</b>
                  </span>{" "}
                  <span className="text-[14px]">
                    on {data?.balanceAmount?.paymentDate || ""}
                  </span>
                </p>
                {!!data?.balanceAmount?.paymentReceipt && (
                  <Link
                    href={data?.balanceAmount?.paymentReceipt || ""}
                    target="_blank"
                    download
                    className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                  >
                    <GoDownload className="mr-1" size={15} /> Download Receipt
                  </Link>
                )}
              </div>
            </div>
            
            )}

          </div>
        </div>
      </div>
      {!!payBtn && (
        <PaymentGateway
          setPaynowBtn={setPaynowBtn}
          paymentGatewayData={paymentGateway}
        />
      )}
      <Footer />
      {loading && <Loader />}
    </React.Fragment>
  );
};
export default PackerMoverBookingDetails;
