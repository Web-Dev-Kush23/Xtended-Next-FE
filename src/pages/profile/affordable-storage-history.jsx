import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { AiFillInfoCircle } from "react-icons/ai";
import RenewIcon from "../../../public/images/icon/renew-icon.png";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Box from "../../../public/images/icon/Box (1).svg";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import Product from "../../../public/images/product/Floor-Plan.png";
import { getMonthlyBookingDataByRequestId, postStartP2PRemaningBookingCheckOut, postStartMonthlyBookingCheckOut } from "@/service/storageService";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { useSearchParams } from "next/navigation";
import { GoDownload } from "react-icons/go";
import Breadcrumb from "./Breadcrumb";
import { getUserId } from "@/util/common";

const BookingHistory = () => {

    const searchParams = useSearchParams();
    const requestID = searchParams.get("requestID");
    const [data, setData] = useState([]);
    const [showRenewDiv, setShowRenewDiv] = useState(true);
    const [paymentGateway, setPaymentGateway] = useState([]);
    const [payBtn, setPaynowBtn] = useState(false);

    useEffect(() => {
        (async () => {
            // let args = `?ApplicationUserId=${756}&PropertyBookingRequestId=${requestID}`;
            let args = `?ApplicationUserId=${getUserId()}&PropertyBookingRequestId=${requestID}`;
            const response = await getMonthlyBookingDataByRequestId(args);
            if (response?.success) {
                setData(response?.success);
            }
        })();
    }, [searchParams]);

    const handlePaymentCharge = async (id, type) => {
        let args = `?ApplicationUserId=${getUserId()}&PaymentId=${id}&PaymentType=${type}`;
        const response = await postStartP2PRemaningBookingCheckOut(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const handleMonthlyPaymentCharge = async (id, type) => {
        let args = `?ApplicationUserId=${getUserId()}&PaymentId=${id}`;
        const response = await postStartMonthlyBookingCheckOut(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const isRenewButtonDisabled = data?.monthlyDurationAmount?.status === "Upcoming payment" ? true : false;
    return (
        <React.Fragment>
            <HeaderMenu />
            <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-start ml-4">
                <li key="home" className="flex items-center justify-start">
                    <Link href="/" legacyBehavior>
                        <a className="">Home</a>
                    </Link>
                </li>
                <Breadcrumb />
            </div>
            {!!payBtn && <PaymentGateway setPaynowBtn={setPaynowBtn} paymentGatewayData={paymentGateway} />}
            {/* parent container div */}
            <div className="lg:px-8 px-3">
                <div className="min-h-[126px] w-full flex lg:flex-row flex-col items-center justify-between lg:pl-6 my-4 border-b-[2px] pb-5">
                    <div className="flex items-center lg:justify-between justify-center space-x-6">
                        <div className="w-[120px] bg-gray-100 rounded-lg grid place-items-center">
                            <Image height={95} width={95} objectFit="cover" src={data?.propertyDetail?.propertyImage?.imageStoragePath || ""} alt="image" priority />
                        </div>
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <p className="text-[14px]"><b>Booking ID:- {requestID || ""}</b></p>
                            <p className="text-[14px] font-bold">Total Rental Days:- {data?.renterDetails?.totalRentalDays || ""}</p>
                            <p className="text-[14px] font-bold">Property Type:- {data?.propertyDetail?.propertyType || ""}</p>
                            <p className="text-[14px] font-bold">Property Area:- {data?.propertyDetail?.lengthInFeet || ""} X {data?.propertyDetail?.widthInFeet || ""} - {data?.propertyDetail?.squareFeet || ""}Sqft</p>
                            <p className="text-[14px] font-bold">Selected Sq Ft Area:- {data?.renterDetails?.selectedSquareFeet || ""}Sqft</p>

                        </div>
                    </div>

                    <div className="lg:w-[350px] w-full flex items-start justify-between flex-col bg-gray-100 py-3 px-3 rounded-lg lg:mt-0 mt-3">
                        <p className="text-[14px] font-bold">Storage Pickup Address :- </p>
                        <p className="text-[16px]">{data?.propertyDetail?.address || ""}, {data?.propertyDetail?.address2}, {data?.propertyDetail?.city}</p>
                        <p className="text-[14px] font-bold">Host Details:- </p>
                        <p className="text-[14px]">Name:- {data?.propertyDetail?.hostName || ""}</p>
                        <p className="text-[14px]">Email:- {data?.propertyDetail?.hostEmail || ""}</p>
                        <p className="text-[14px]">Phone No:- {data?.propertyDetail?.hostPhoneNumber || ""}</p>
                        {/* {(!!(data?.balanceAmount?.status === "Paid") && Number(data?.propertyDetail?.duration) > 1) && <Link href={{ pathname: "/profile/warehouse-storage-booking-history", query: { easyStorageId } }} className="text-[15px] border-[1px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-6 mt-3">View Bookings History</Link>} */}
                        {/* {!!data?.bookingHistory && <div><Link href={{ pathname: "/profile/affordable-storage-history", query: { requestID } }} className={`text-blue-500 text-sm border-blue-500 border-[1px] rounded-lg px-10 py-[10px]`}>View Booking History</Link></div>} */}
                    </div>
                </div>

                {/* Special offer div */}
                {!!data?.grandTotalAmount && data?.grandTotalAmount?.totalMonth >= 2 &&
                    <div className="min-h-[93px] w-full rounded-lg flex lg:flex-row flex-col items-center justify-between lg:px-4 px-8 py-4" style={{ background: "linear-gradient(90deg, #FFBFB7, #EDE3AA, #FEDF8B)" }}>
                        <div className="flex flex-col lg:items-start items-center justify-center">
                            <div className="flex items-center justify-center">
                                <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />{data?.grandTotalAmount?.status !== "Paid" ? `Book For` : `Booking Duration`}<span className="font-[500] ml-2">{data?.grandTotalAmount?.startDuration || ""} - {data?.grandTotalAmount?.endDuration || ""}</span></p>
                            </div>
                            <span className="text-[18px] lg:text-start text-center"><b>{data?.grandTotalAmount?.offerMessage || ""}</b></span>
                        </div>

                        <div className="flex flex-col lg:items-end items-center justify-center">
                            <div className="flex flex-col items-center justify-center lg:flex-row space-x-5">
                                <p className="text-[25px] space-x-2 lg:m-0 my-2"><span className="text-red-500 text-[22px]"><strike>₹{data?.grandTotalAmount?.totalAmountWithoutDiscount || "---"}</strike></span><b>₹{data?.grandTotalAmount?.totalAmountWithDiscount || "---"}</b></p>
                                <button className={`text-white bg-blue-500 rounded-lg py-2 px-14 text-[15px] ${data?.grandTotalAmount?.status === "Paid" && `bg-blue-500 cursor-not-allowed`}`} onClick={() => { data?.grandTotalAmount?.status !== `Paid` && handlePaymentCharge(data?.grandTotalAmount?.paymentId, 'GrandTotal') }} disabled={data?.grandTotalAmount?.status === `Paid` ? true : false}>{data?.grandTotalAmount?.status === "Paid" ? <span className="flex items-center justify-center"><IoMdCheckmarkCircle className="text-white mr-1" size={20} /> Paid</span> : "Pay Now"}</button>
                            </div>
                            {!!data?.grandTotalAmount?.paymentReceipt && <Link href={data?.grandTotalAmount?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                        </div>
                    </div>
                }

                {/* bookings container | apply  */}
                <div className="my-6">
                    {
                        (Boolean(!!data?.monthlyDurationAmount)) && <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all">
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center justify-center">
                                    <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />Booking Duration <span className="font-[500] ml-2">{data?.monthlyDurationAmount?.startDate || ""} - {data?.monthlyDurationAmount?.endDate || ""}</span></p>
                                </div>
                                <button className="outline-none border-none flex items-center justify-center" onClick={() => setShowRenewDiv(!showRenewDiv)}>{showRenewDiv ? <IoIosArrowUp size={25} /> : <><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> <span className="mr-2">Booked</span><IoIosArrowDown size={25} /></>} </button>
                            </div>

                            <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex lg:flex-row flex-col lg:items-center justify-between mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                                <div className="flex items-center justify-between space-x-3">
                                    <Image src={RenewIcon} alt="icon" height={43} width={43} priority />
                                    <div className="flex flex-col items-start justify-between">
                                        <h2 className="text-[18px]"><b>{data?.monthlyDurationAmount?.status || ""}</b></h2>
                                        {data?.monthlyDurationAmount?.status !== "Upcoming payment" || data?.monthlyDurationAmount?.status === "Active" && <p className="text-[14px] text-red-500 flex items-center -justify-center"><AiFillInfoCircle className="mr-1" size={14} />Your storage duration has been over.</p>}
                                    </div>
                                </div>
                                <div className="lg:m-0 mt-3">
                                    <button className={`text-[15px] bg-blue-500 text-white rounded-lg py-2 px-12 ${isRenewButtonDisabled && `cursor-not-allowed !bg-blue-300`}`} title={isRenewButtonDisabled && `Upcoming payment`} onClick={() => handleMonthlyPaymentCharge(data?.monthlyDurationAmount?.paymentId, '')} disabled={isRenewButtonDisabled} >Pay Now ₹{data?.monthlyDurationAmount?.totalAmount || "---"}</button>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        !!data?.bookingHistory?.monthlyPayment && data?.bookingHistory?.monthlyPayment?.map((item, index) => {
                            return (
                                <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all my-3" key={index}>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center justify-center">
                                            <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />Booking Duration <span className="font-[500] ml-2">{item?.startDuration || ""} - {item?.endDuration || ""}</span></p>
                                        </div>
                                        <button className="outline-none border-none flex items-center justify-center" onClick={() => setShowRenewDiv(!showRenewDiv)}>{showRenewDiv ? <IoIosArrowUp size={25} /> : <><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> <span className="mr-2">{item?.status || ""}</span><IoIosArrowDown size={25} /></>} </button>
                                    </div>

                                    <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex lg:flex-row flex-col lg:items-center justify-between mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                                        <div className="flex items-center justify-between space-x-3">

                                            <div className="flex flex-col items-start justify-between">
                                                <h2 className="text-[18px]"><b>{item?.status || ""}</b></h2>
                                            </div>
                                        </div>
                                        <div className="lg:m-0 mt-3 flex items-start justify-center flex-col">
                                            <p className="text-[20px] flex items-center justify-center font-[500]"><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> Paid ₹{item?.amountPaid || "---"}</p>
                                            {!!item?.paymentReceipt && <Link href={item?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                                            {/* <button className="text-[15px] bg-blue-500 text-white rounded-lg py-2 px-12" disabled>Amount Paid ₹{item?.amountPaid || "---"}</button> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default BookingHistory;