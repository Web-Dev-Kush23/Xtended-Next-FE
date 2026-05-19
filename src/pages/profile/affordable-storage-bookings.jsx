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
import { getBookedPropetyBookingDetailsByRequestId, postStartP2PRemaningBookingCheckOut } from "@/service/storageService";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import { getUserId } from "@/util/common";
import Loader from "@/components/Loader";


const AffordableStorageBookings = () => {

    const searchParams = useSearchParams();
    const requestID = searchParams.get("requestID");
    const [showRenewDiv, setShowRenewDiv] = useState(true);
    const [payBtn, setPaynowBtn] = useState(false);
    const [data, setData] = useState([]);
    const [loader , setLoader] = useState(false)
    // for token money details
    const [paymentGateway, setPaymentGateway] = useState([]);
    const isLogisticsCharge = Boolean(data?.logisticsCharge);

    useEffect(() => {
        (async () => {
            setLoader(true)
            let args = `?ApplicationUserId=${getUserId()}&PropertyBookingRequestId=${requestID}`;
            const response = await getBookedPropetyBookingDetailsByRequestId(args);
            if (response?.success) {
                setData(response?.success);
                setLoader(false)
            }else{
                setLoader(false)
            }
        })();
    }, [searchParams]);

    const handlePaymentCharge = async (id, type) => {
        // console.log("data", data);
        let args = `?ApplicationUserId=${getUserId()}&PaymentId=${id}&PaymentType=${type}`;
        const response = await postStartP2PRemaningBookingCheckOut(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const showGrandTotal = (!!data?.grandTotal?.paymentType && !data?.tokenMoney)


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
                    <div className="flex items-center lg:justify-between justify-center lg:space-x-6 space-x-3">
                        <div className="w-[140px] h-[140px] bg-gray-100 rounded-lg grid place-items-center">
                            <Image height={130} width={130} objectFit="cover" src={data?.propertyDetail?.propertyImage?.imageStoragePath || Product} alt="image" priority />
                        </div>
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <p className="text-[14px] text-gray-700"><b>Booking ID:-</b> {requestID || ""}</p>
                            <p className="text-[14px] text-gray-700"><b>Total Rental Days:-</b> {data?.renterDetails?.totalRentalDays || ""}</p>
                            <p className="text-[14px] text-gray-700"><b>Property Type:-</b> {data?.propertyDetail?.propertyType || ""}</p>
                            <p className="text-[14px] text-gray-700"><b>Property Area:-</b> {data?.propertyDetail?.lengthInFeet || ""} X {data?.propertyDetail?.widthInFeet || ""} - {data?.propertyDetail?.squareFeet || ""} Sqft</p>
                            <p className="text-[14px] text-gray-700"><b>Selected Sq Ft Area:-</b> {data?.renterDetails?.selectedSquareFeet || ""} Sqft</p>
                            <p className="text-[14px] text-gray-700"><b>Total Booking Duration:-</b> {data?.totalBookingDuration?.startDate} - {data?.totalBookingDuration?.endDate}</p>
                        </div>
                    </div>
                    <div className="max-w-[474px] flex items-start justify-between flex-col bg-gray-100 py-3 px-3 rounded-lg lg:mt-0 mt-3">
                        <p className="text-[14px] text-gray-700 font-bold">Host Details:- </p>
                        <p className="text-[14px] text-gray-700">Name:- {data?.propertyDetail?.hostName || ""}</p>
                        <p className="text-[14px] text-gray-700">Email:- {data?.propertyDetail?.hostEmail || ""}</p>
                        <p className="text-[14px] text-gray-700">Phone No:- {data?.propertyDetail?.hostPhoneNumber || ""}</p>
                        <p className="text-[14px] text-gray-700 mt-2 font-bold">Storage Pickup Address :- </p>
                        <p className="text-[16px]">{`${data?.propertyDetail?.address},` || ""} {data?.propertyDetail?.address2} {data?.propertyDetail?.city}</p>
                        {/* {(!!(data?.balanceAmount?.status === "Paid") && Number(data?.propertyDetail?.duration) > 1) && <Link href={{ pathname: "/profile/warehouse-storage-booking-history", query: { easyStorageId } }} className="text-[15px] border-[1px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-6 mt-3">View Bookings History</Link>} */}
                        {!!data?.bookingHistory && <div className="my-2"><Link href={{pathname: "/profile/affordable-storage-history", query: {requestID}}} className={`hover:bg-blue-500 hover:text-white text-blue-500 text-sm border-blue-500 border-[1px] rounded px-10 py-[10px]`}>View Booking History</Link></div> }
                    </div>
                </div>

                {/* bookings container | apply  */}
                <div className="my-6">
                    {/* Use .map function loop here for dynamic bookings */}
                    <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all">
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center justify-center">
                                <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"> <span className="flex items-center justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />Booking Duration {showGrandTotal?"":"for first"} month </span> <span className="font-[500] lg:ml-2">{data?.bookingDuration?.startDate} - {data?.bookingDuration?.endDate}</span></p>
                            </div>
                            <button className="outline-none border-none flex items-center justify-center" onClick={() => setShowRenewDiv(!showRenewDiv)}>{showRenewDiv ? <IoIosArrowUp size={25} /> : <><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> <span className="mr-2">Booked</span><IoIosArrowDown size={25} /></>} </button>
                        </div>
                        {/* Token Money */}
                       {!showGrandTotal && <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center lg:flex-row flex-col justify-between mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                            <div className="flex items-center justify-between space-x-3">
                                <p className="flex items-center justify-center text-gray-700"><Image height={30} width={30} src={tokenmoney} alt="icon" className="mr-2" priority /> <b>Token Money</b></p>
                            </div>
                            {
                                data?.tokenMoney?.status === "Paid" ?
                                    <div className="flex flex-col lg:items-end items-center justify-between">
                                        <span className="text-[20px]"><b>₹{data?.tokenMoney?.amount || ""}</b></span>
                                        <p className="flex items-center justify-center text-gray-700">{data?.tokenMoney?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.tokenMoney?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.tokenMoney?.status || ""}</b></span> <span className="text-[14px]">on {data?.tokenMoney?.paymentDate || ""}</span> </p>
                                        <Link href={data?.tokenMoney?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt </Link>
                                    </div>
                                    :
                                    <button onClick={() => handlePaymentCharge(data?.tokenMoney?.id, 'TokenMoney')} className="text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2">Pay Now ₹{data?.tokenMoney?.amount || ""}</button>
                            }

                        </div>}
                        {/* 50% Logistics */}
                        {
                            isLogisticsCharge && <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                                <div className="flex flex-col lg:items-start justify-center gap-2">
                                    <p className="flex items-center justify-center text-gray-700"><Image height={30} width={30} src={logistics} alt="icon" className="mr-2" priority /> <b>50% Logistics and Insurance</b>{data?.logisticsCharge?.status === "To be paid within" && <AiFillInfoCircle className="ml-2 text-gray-300" size={20} />}</p>
                                    {data?.logisticsCharge?.status === "To be paid within" && <span className="text-[12px] bg-blue-200 px-1 m-0">NOTE : This payment must be made at least 48 hours prior to your storage date</span>}
                                </div>
                                <div className="flex flex-col lg:items-end items-center justify-between">
                                    {data?.logisticsCharge?.status === "Paid" && <span className="text-[20px]"><b>₹{data?.logisticsCharge?.amount || ""}</b></span>}
                                    {((data?.logisticsCharge?.status === "To be paid within") || (data?.logisticsCharge?.status === "Payment Due on")) && <button onClick={() => handlePaymentCharge(data?.logisticsCharge?.id, 'LogisticsCharge')} className="text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2">Pay Now ₹{data?.logisticsCharge?.amount || ""}</button>}
                                    <p className="flex items-center justify-center text-gray-700">{data?.logisticsCharge?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.logisticsCharge?.status === "Payment Due on" && <AiFillInfoCircle className="text-red-500" size={20} /> || data?.logisticsCharge?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.logisticsCharge?.status || ""}</b></span> <span className="text-[14px]">on {data?.logisticsCharge?.paymentDate || ""}</span></p>
                                    {!!data?.logisticsCharge?.paymentReceipt && <Link href={data?.logisticsCharge?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                                </div>
                            </div>
                        }

                        {/* Balance Amount */}
                        {!showGrandTotal && <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                            <div className="flex flex-col lg:items-start justify-center gap-2">
                                <p className="flex items-center justify-center text-gray-700"><Image height={30} width={30} src={balanceamout} alt="icon" className="mr-2" priority /> <b>Balance Amount</b>{data?.balanceAmount?.status === "To be paid within"}
                                <div className="relative easy-tooltip group ml-5 d-inline-flex">
                                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z" fill="#C1C1C1"/>
                                  </svg>
                                  <div className="text-tooltip absolute mt-0 z-1  mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                                    this payment covers insurance amount (₹{data?.balanceAmount?.insuranceAmount}) also.
                                  </div>
                                </div>
                                </p>
                                {data?.balanceAmount?.status === "To be paid within" && (<>{isLogisticsCharge && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining logistics and storage amount.</span>)}
                                {!isLogisticsCharge && data?.balanceAmount?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining insurance and storage amount.</span>)}
                                {!isLogisticsCharge && !data?.balanceAmount?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining storage amount.</span>)}</>)}
                            </div>
                            <div className="flex flex-col lg:items-end items-center justify-between">
                                {data?.balanceAmount?.status === "Paid" && <span className="text-[20px]"><b>₹{data?.balanceAmount?.amount || ""}</b></span>}
                                {((data?.balanceAmount?.status === "To be paid within") || (data?.balanceAmount?.status === "Payment Due on")) && <button onClick={() => handlePaymentCharge(data?.balanceAmount?.id, 'BalanceAmount')} title={`${!!data.logisticsCharge && data?.logisticsCharge?.status !== "Paid" ? `Pay the logistics amount first.` : `Balance Amount`}`} className={`${isLogisticsCharge && data?.logisticsCharge?.status !== "Paid" && `!cursor-not-allowed !bg-blue-300`} text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2`} disabled={isLogisticsCharge && data?.logisticsCharge?.status !== "Paid" ? true : false}>Pay Now ₹{data?.balanceAmount?.amount || ""}</button>}
                                <p className="flex items-center justify-center text-gray-700">{data?.balanceAmount?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.balanceAmount?.status === "Payment Due on" && <AiFillInfoCircle className="text-red-500" size={20} /> || data?.balanceAmount?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.balanceAmount?.status || ""}</b></span> <span className="text-[14px]">on {data?.balanceAmount?.paymentDate || ""}</span></p>
                                {!!data?.balanceAmount?.paymentReceipt && <Link href={data?.balanceAmount?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                            </div>
                        </div>}

                        {/* grand total Amount */}

                        {showGrandTotal && <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                            <div className="flex flex-col lg:items-start justify-center gap-2">
                                <p className="flex items-center justify-center text-gray-700"><Image height={30} width={30} src={balanceamout} alt="icon" className="mr-2" priority /> <b>Total Amount</b>{data?.balanceAmount?.status === "To be paid within"}
                                <div className="relative easy-tooltip group ml-5 d-inline-flex">
                                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.20829 6.37533H7.79163V4.95866H9.20829M9.20829 12.042H7.79163V7.79199H9.20829M8.49996 1.41699C7.56976 1.41699 6.64867 1.60021 5.78928 1.95618C4.9299 2.31215 4.14903 2.8339 3.49129 3.49165C2.1629 4.82004 1.41663 6.62171 1.41663 8.50033C1.41663 10.3789 2.1629 12.1806 3.49129 13.509C4.14903 14.1667 4.9299 14.6885 5.78928 15.0445C6.64867 15.4004 7.56976 15.5837 8.49996 15.5837C10.3786 15.5837 12.1802 14.8374 13.5086 13.509C14.837 12.1806 15.5833 10.3789 15.5833 8.50033C15.5833 7.57013 15.4001 6.64904 15.0441 5.78965C14.6881 4.93026 14.1664 4.1494 13.5086 3.49165C12.8509 2.8339 12.07 2.31215 11.2106 1.95618C10.3512 1.60021 9.43016 1.41699 8.49996 1.41699Z" fill="#C1C1C1"/>
                                  </svg>
                                  <div className="text-tooltip absolute mt-0 z-1  mb-2 w-64 p-2 bg-lime-500 text-center text-white text-xs rounded-md shadow-lg">
                                    this payment covers insurance amount (₹{data?.grandTotal?.insuranceAmount}) also.
                                  </div>
                                </div>
                                </p>
                                {data?.grandTotal?.status === "To be paid within" && (<>{isLogisticsCharge && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining logistics and storage amount.</span>)}
                                {!isLogisticsCharge && data?.grandTotal?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining insurance and storage amount.</span>)}
                                {!isLogisticsCharge && !data?.grandTotal?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining storage amount.</span>)}</>)}
                            </div>
                            <div className="flex flex-col lg:items-end items-center justify-between">
                                {data?.grandTotal?.status === "Paid" && <span className="text-[20px]"><b>₹{data?.grandTotal?.amount || ""}</b></span>}
                                {((data?.grandTotal?.status === "To be paid within") || (data?.grandTotal?.status === "Payment Due on")) && <button onClick={() => handlePaymentCharge(data?.grandTotal?.id, 'grandTotal')} title={`${!!data.logisticsCharge && data?.logisticsCharge?.status !== "Paid" ? `Pay the logistics amount first.` : `Balance Amount`}`} className={`${isLogisticsCharge && data?.logisticsCharge?.status !== "Paid" && `!cursor-not-allowed !bg-blue-300`} text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2`} disabled={isLogisticsCharge && data?.logisticsCharge?.status !== "Paid" ? true : false}>Pay Now ₹{data?.grandTotal?.amount || ""}</button>}
                                <p className="flex items-center justify-center text-gray-700">{data?.grandTotal?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.grandTotal?.status === "Payment Due on" && <AiFillInfoCircle className="text-red-500" size={20} /> || data?.grandTotal?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.grandTotal?.status || ""}</b></span> <span className="text-[14px]">on {data?.grandTotal?.paymentDate || ""}</span></p>
                                {!!data?.grandTotal?.paymentReceipt && <Link href={data?.grandTotal?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                            </div>
                        </div>}

                    </div>
                </div>
            </div>
            {!!payBtn && <PaymentGateway setPaynowBtn={setPaynowBtn} paymentGatewayData={paymentGateway} />}
            <Footer />
            {loader && <Loader/>}
        </React.Fragment>
    )
}
export default AffordableStorageBookings;