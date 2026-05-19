import React, { useState, useEffect , useRef } from "react";
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
import { getPaymentGateway,SendEmailForMonthlyInvoice,SendEmailForInvoice, getMonthlyEasyStorageDetailsByEasyStorageId, postEasyStorageStartMonthlyPaymentCheckout } from "@/service/storageService";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { useSearchParams } from "next/navigation";
import { GoDownload } from "react-icons/go";
import Breadcrumb from "./Breadcrumb";
import SubscriptionPayment from "@/components/payment/SubscriptionPayment";
import Loader from "@/components/Loader";

const BookingHistory = () => {

    const searchParams = useSearchParams();
    const easyStorageId = searchParams.get("easyStorageId");
    const [data, setData] = useState([]);
    const [showRenewDiv, setShowRenewDiv] = useState(true);
    const [paymentGateway, setPaymentGateway] = useState([]);
    const [payBtn, setPaynowBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(false);
    const [displayTime, setDisplayTime] = useState(60);
const [forceUpdate, setForceUpdate] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            let args = `?EasyStorageId=${easyStorageId}`;
            const response = await getMonthlyEasyStorageDetailsByEasyStorageId(args);
            if (response?.success) {
                setData(response?.success);
                setLoading(false)
            } else {
                setLoading(false)
            }
        })();
    }, [easyStorageId]);

    const handlePaymentCharge = async (id, type) => {
        let args = `?PaymentId=${id}&AddType=${type}`;
        const response = await getPaymentGateway(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const handleMonthlyPaymentCharge = async (id) => {
        let args = `?PaymentId=${id}`;
        const response = await postEasyStorageStartMonthlyPaymentCheckout(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const isRenewButtonDisabled = data?.monthlyDurationAmount?.status === "Upcoming payment" ? true : false;


    useEffect(()=>{
        let startTimer;
        if(timer){

           startTimer = setInterval(()=>{
           setDisplayTime((prev)=>prev-1)
          },1000)  

          setTimeout(()=>{
            clearInterval(startTimer)
            window.location.reload()
          },60000)

        }
        return () => clearInterval(startTimer);
    },[timer])
   
    const handleSendEmailForGrandTotalInvoice = async (id) => {
        setLoading(true); 
        try {
            const args = `?EasyStorageId=${id}`;
            const response = await SendEmailForInvoice(args);
            if (response?.success) {
                setData((prev) => ({
                    ...prev,
                    grandTotalAmount: {
                        ...prev.grandTotalAmount,
                        paymentInvoicePdfPath: response?.success?.data, // Use the URL directly from response
                    },
                }));
                
                setForceUpdate((prev) => !prev);
            }
        } catch (error) {
            console.error("Error sending email for grandTotalAmount invoice:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSendEmailForMonthlyInvoice = async (id, index) => {
        setLoading(true); 
        try {
            const args = `?easyStorageMonthlyId=${id}`;
            const response = await SendEmailForMonthlyInvoice(args); // Call the API
    
            if (response?.success) {
                setData((prev) => {
                    const updatedPayments = [...prev.bookingHistory.easyStorageMonthlyPayment];
                    updatedPayments[index].paymentInvoicePdfPath = response.success.data; // Update specific item
                    return {
                        ...prev,
                        bookingHistory: {
                            ...prev.bookingHistory,
                            easyStorageMonthlyPayment: updatedPayments,
                        },
                    };
                });
            }
        } catch (error) {
            console.error("Error sending email for monthly invoice:", error);
        } finally {
            setLoading(false); 
        }
    };
    
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
                            <Image height={95} width={95} objectFit="cover" src={Product} alt="image" priority />
                        </div>
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <p className="text-[14px]"><b>#ES-{data?.easyStorage?.easyStorageId || ""}</b></p>
                            <h2 className="text-[18px]"><b>{data?.easyStorage?.storageType || ""} ({data?.easyStorage?.minSqrFeet || ""} - {data?.easyStorage?.maxSqrFeet || ""} Sq Ft.)</b></h2>

                            <p className="text-[12px] text-zinc-500">Type of items that can be stored here</p>
                            <div className="lg:flex hidden items-center justify-between space-x-2">
                                {!!data?.easyStorage?.large && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={18} width={18} alt="icon" className="mr-1" priority /> <b> {data?.easyStorage?.large || ""} Large</b></span>}
                                {!!data?.easyStorage?.medium && <span className="w-[100px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={16} width={16} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.medium || ""} Medium</b></span>}
                                {!!data?.easyStorage?.small && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={14} width={14} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.small || ""} Small</b></span>}
                                {!!data?.easyStorage?.boxes && <span className="w-[164px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={12} width={12} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.boxes || ""} Boxes (Approx.)</b></span>}
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden flex items-center justify-between flex-wrap space-x-2 space-y-2 my-3">
                        {!!data?.easyStorage?.large && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={18} width={18} alt="icon" className="mr-1" priority /> <b> {data?.easyStorage?.large || ""} Large</b></span>}
                        {!!data?.easyStorage?.medium && <span className="w-[100px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={16} width={16} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.medium || ""} Medium</b></span>}
                        {!!data?.easyStorage?.small && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={14} width={14} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.small || ""} Small</b></span>}
                        {!!data?.easyStorage?.boxes && <span className="w-[164px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={12} width={12} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.boxes || ""} Boxes (Approx.)</b></span>}
                    </div>
                    <div className="max-w-[474px] flex items-start justify-between flex-col bg-gray-100 py-3 px-3 rounded-lg">
                        <h2 className="text-[14px] mb-3">Storage Pickup Address</h2>
                        <p className="text-[16px]"><b>{data?.easyStorage?.address || ""}</b></p>
                    </div>
                </div>


                {/* Special offer div */}
                {!!data?.grandTotalAmount  &&
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
                                <button className={`text-white bg-blue-500 rounded-lg py-2 px-14 text-[15px] ${data?.grandTotalAmount?.status === "Paid" && `bg-blue-500 cursor-not-allowed`}`} onClick={() => { data?.grandTotalAmount?.status !== `Paid` && handlePaymentCharge(data?.grandTotalAmount?.id, 'GrandTotal') }} disabled={data?.grandTotalAmount?.status === `Paid` ? true : false}>{data?.grandTotalAmount?.status === "Paid" ? <span className="flex items-center justify-center"><IoMdCheckmarkCircle className="text-white mr-1" size={20} /> Paid</span> : "Pay Now"}</button>
                            </div>
                            {!!data?.grandTotalAmount?.paymentReceipt && <Link href={data?.grandTotalAmount?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                            {/* {!!data?.grandTotalAmount?.paymentInvoicePdfPath && <Link href={data?.grandTotalAmount?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"><GoDownload className="mr-1" size={15} /> Download Invoice</Link>} */}
{/* Grand Total Amount Invoice */}
{data?.grandTotalAmount?.status === "Paid" && (
            <div>
                {!!data?.grandTotalAmount?.paymentInvoicePdfPath ? (
                    <Link
                        href={data?.grandTotalAmount?.paymentInvoicePdfPath || ""}
                        target="_blank"
                        download
                        className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"
                    >
                        <GoDownload className="mr-1" size={15} /> Download Invoice
                    </Link>
                ) : (
                    <button
                        onClick={() => handleSendEmailForGrandTotalInvoice(data?.grandTotalAmount?.id)}
                        className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"
                        disabled={loading}
                    >
                        {loading ? "Sending Invoice..." : "Request Invoice"}
                    </button>
                )}
            </div>
        )}
                        </div>
                    </div>
                }

                {(data?.subscription?.status == "Pending" || data?.subscription?.status == "Cancelled") && <div className="flex justify-center items-center font-bold text-2xl my-2">Or</div>}

                {data?.subscription && <div className="min-h-[93px] w-full rounded-lg flex lg:flex-row flex-col items-center justify-between lg:px-4 px-8 py-4" style={{ background: "linear-gradient(90deg, #FFBFB7, #EDE3AA, #FEDF8B)" }}>
                    <div className="flex flex-col lg:items-start items-center justify-center">
                        <span className="text-[18px] lg:text-start text-center"><b>Rent monthly with ease.</b></span>
                        {/* <span className="text-[18px] lg:text-start text-center">Set up auto payment and we’ll charge you on time every month. It’s simple and hassle-free..</span> */}
                        <div className="flex items-center justify-center">
                            <p className="text-[16px] flex lg:flex-row flex-col lg:items-center items-start justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />{data?.subscription?.status !== "Pending" ? `Book For` : `Booking Duration`}<span className="font-[500] ml-2">{data?.subscription?.startDate || ""} - {data?.subscription?.endDate || ""}</span></p>
                        </div>
                        <span className={`text-[16px] lg:text-start text-center ${data?.subscription?.status == "Active" ? "text-green-600" : data?.subscription?.status == "Pending" ? "text-blue-600" : "text-red-600"}`}><b>{data?.subscription?.message}</b></span>
                    </div>

                    <div className="flex flex-col lg:items-end items-center justify-center">
                        <div className="flex flex-col items-center justify-center lg:flex-row space-x-5">
                            <p className="text-[25px] space-x-2 lg:m-0 my-2"><span className="text-red-500 text-[22px]"></span><b>₹{data?.subscription?.totalAmount || "---"}/Month</b></p>
                            <SubscriptionPayment easyStorageId={easyStorageId} status={data?.subscription?.status} setTimer={setTimer} timer={timer}  />
                        </div>
                        {timer && <p className="text-sm">Your request will be updated within : {displayTime}</p>}
                        {!!data?.grandTotalAmount?.paymentReceipt && <Link href={data?.grandTotalAmount?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                        {/* {!!data?.grandTotalAmount?.paymentInvoicePdfPath && <Link href={data?.grandTotalAmount?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline mt-3"><GoDownload className="mr-1" size={15} /> Download Invoice</Link>} */}
 
                    </div>
                </div>}

                {/* bookings container | apply  */}
                <div className="my-6">
                    {
                        (data?.monthlyDurationAmount !== null) && <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all">
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center justify-center">
                                    <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />Booking Duration <span className="font-[500] ml-2">{data?.monthlyDurationAmount?.startDate || ""} - {data?.monthlyDurationAmount?.endDate || ""}</span></p>
                                </div>
                                <button className="outline-none border-none flex items-center justify-center" onClick={() => setShowRenewDiv(!showRenewDiv)}>{showRenewDiv ? <IoIosArrowUp size={25} /> : <><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> <span className="mr-2">{data?.monthlyDurationAmount?.status}</span><IoIosArrowDown size={25} /></>} </button>
                            </div>

                            <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex lg:flex-row flex-col lg:items-center justify-between mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                                <div className="flex items-center justify-between space-x-3">
                                    <Image src={RenewIcon} alt="icon" height={43} width={43} priority />
                                    <div className="flex flex-col items-start justify-between">
                                        <h2 className="text-[18px]"><b>{data?.monthlyDurationAmount?.status || ""}</b></h2>
                                        {data?.monthlyDurationAmount?.status !== "Upcoming payment" && <p className="text-[14px] text-red-500 flex items-center -justify-center"><AiFillInfoCircle className="mr-1" size={14} />Your storage duration has been over.</p>}
                                    </div>
                                </div>
                                <div className="lg:m-0 mt-3">
                                    <button className={`text-[15px] bg-blue-500 text-white rounded-lg py-2 px-12 ${isRenewButtonDisabled && `cursor-not-allowed !bg-blue-300`}`} title={isRenewButtonDisabled && `Upcoming payment`} onClick={() => handleMonthlyPaymentCharge(data?.monthlyDurationAmount?.id, '')} disabled={isRenewButtonDisabled} >Pay Now ₹{data?.monthlyDurationAmount?.totalAmount || "---"}</button>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        !!data?.bookingHistory?.easyStorageMonthlyPayment && data?.bookingHistory?.easyStorageMonthlyPayment?.map((item, index) => {
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
                                            {/* {!!item?.paymentInvoicePdfPath && <Link href={item?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Invoice</Link>} */}
                                            {!!item?.paymentInvoicePdfPath ? (
                                <Link
                                    href={item?.paymentInvoicePdfPath || ""}
                                    target="_blank"
                                    download
                                    className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                >
                                    <GoDownload className="mr-1" size={15} /> Download Invoice
                                </Link>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleSendEmailForMonthlyInvoice(item?.id, index)
                                    }
                                    className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                    disabled={loading}
                                >
                                    {loading ? "Sending Invoice..." : "Request Invoice"}
                                </button>
                            )}
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
            {loading && <Loader />}
        </React.Fragment>
    )
}

export default BookingHistory;