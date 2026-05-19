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
import { getBookedEasyStorageDetailsByEasyStorageId, SendEmailForInvoice, getPaymentGateway } from "@/service/storageService";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Loader from "@/components/Loader";
import { Modal } from "react-bootstrap";
import { getPropertySizeImage } from "@/util/constant";

const EasyStorageBookings = () => {

    const searchParams = useSearchParams();
    const easyStorageId = searchParams.get("easyStorageId");
    const [showRenewDiv, setShowRenewDiv] = useState(true);
    const [payBtn, setPaynowBtn] = useState(false);
    const [data, setData] = useState([]);
    const [itemModal, setItemModal] = useState(false)
    const [loading, setLoading] = useState(false)
    // for token money details
    const [paymentGateway, setPaymentGateway] = useState([]);

    const isLogisticsCharge = Boolean(data?.logisticsCharge);
    const imageUrl = getPropertySizeImage(data);

    useEffect(() => {
        setLoading(true);
        (async () => {
            let args = `?EasyStorageId=${easyStorageId}`;
            const response = await getBookedEasyStorageDetailsByEasyStorageId(args);
            if (response?.success) {
                setData(response?.success);
                setLoading(false);
            } else {
                setLoading(false);
            }
        })();
    }, [easyStorageId]);

    // To handle payments for logistics and balance amount (Step 2 and 3)
    const handlePaymentCharge = async (id, type) => {
        // console.log("data", data);
        let args = `?PaymentId=${id}&AddType=${type}`;
        const response = await getPaymentGateway(args);
        // console.log("response", response);
        if (response?.success) {
            setPaymentGateway(response?.success);
            setPaynowBtn(true);
        }
    }

    const handleSendEmailForInvoice = async (id, type) => {
        setLoading(true);
        try {
            const args = `?EasyStorageId=${id}`;
            const response = await SendEmailForInvoice(args);
            if (response?.success) {
                setData((prev) => ({
                    ...prev,
                    [type]: {
                        ...prev[type],
                        paymentInvoicePdfPath: response?.success?.data,
                    },
                }));
            }
            console.error(`Error sending email for ${type} invoice:`, error);

        } catch (error) {
            console.error(`Error sending email for ${type} invoice:`, error);
        } finally {
            setLoading(false);
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
                        <div className="w-[120px]  rounded-lg grid place-items-center">
                            <Image height={95} width={95} objectFit="cover" src={imageUrl} alt="image" priority />
                        </div>
                        <div className="flex flex-col items-start justify-between space-y-1">
                            <p className="text-[14px]"><b>#ES-{data?.easyStorage?.easyStorageId || ""}</b></p>
                            <h2 className="text-[18px]"><b>{data?.easyStorage?.storageType || ""} ({data?.easyStorage?.minSqrFeet || ""} - {data?.easyStorage?.maxSqrFeet || ""} Sq Ft.)</b></h2>
                            <p className="text-[12px] text-zinc-500">Type of items that can be stored here</p>
                            {/* <div className="lg:flex hidden items-center justify-between space-x-2">
                                {!!data?.easyStorage?.large && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={18} width={18} alt="icon" className="mr-1" priority /> <b> {data?.easyStorage?.large || ""} Large</b></span>}
                                {!!data?.easyStorage?.medium && <span className="w-[100px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={16} width={16} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.medium || ""} Medium</b></span>}
                                {!!data?.easyStorage?.small && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={14} width={14} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.small || ""} Small</b></span>}
                                {!!data?.easyStorage?.boxes && <span className="w-[164px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={12} width={12} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.boxes || ""} Boxes (Approx.)</b></span>}
                            </div> */}
                            <button className="text-[15px] border-[1px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-6 mt-3" onClick={() => setItemModal(true)} >View Selected Items</button>
                        </div>
                    </div>
                    {/* <div className="lg:hidden flex items-center justify-between flex-wrap space-x-2 space-y-2 my-3">
                        {!!data?.easyStorage?.large && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={18} width={18} alt="icon" className="mr-1" priority /> <b> {data?.easyStorage?.large || ""} Large</b></span>}
                        {!!data?.easyStorage?.medium && <span className="w-[100px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={16} width={16} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.medium || ""} Medium</b></span>}
                        {!!data?.easyStorage?.small && <span className="w-[85px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={14} width={14} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.small || ""} Small</b></span>}
                        {!!data?.easyStorage?.boxes && <span className="w-[164px] py-1 whitespace-nowrap flex items-center justify-center bg-gray-100 rounded-[24px] text-[14px]"><Image src={Box} height={12} width={12} alt="icon" className="mr-1" priority /> <b>{data?.easyStorage?.boxes || ""} Boxes (Approx.)</b></span>}
                    </div> */}
                    <div className="max-w-[474px] flex items-start justify-between flex-col bg-gray-100 py-3 px-3 rounded-lg">
                        <h2 className="text-[14px] mb-3">Storage Pickup Address</h2>
                        <p className="text-[16px]"><b>{data?.easyStorage?.address || ""}</b></p>
                        {(!!(data?.balanceAmount?.status === "Paid") && Number(data?.easyStorage?.duration) > 1) && <Link href={{ pathname: "/profile/warehouse-storage-booking-history", query: { easyStorageId } }} className="text-[15px] border-[1px] border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg py-2 px-6 mt-3">View Bookings History</Link>}
                    </div>
                </div>

                {/* Special offer div */}
                {
                    // !!data?.totalMonthlyAmount && (data?.totalMonthlyAmount?.totalMonth >= 3) && <div className="min-h-[93px] w-full rounded-lg flex lg:flex-row flex-col items-center justify-between lg:px-4 px-8 py-4" style={{ background: "linear-gradient(90deg, #FFBFB7, #EDE3AA, #FEDF8B)" }}>
                    //     <div className="flex flex-col lg:items-start items-center justify-center">
                    //         <span className="">Book For</span>
                    //         <span className="text-[18px] lg:text-start text-center"><b>{data?.totalMonthlyAmount?.totalMonth || "--"} {(data?.totalMonthlyAmount?.totalMonth > 1) ? `Months` : `Month`} & Get {data?.totalMonthlyAmount?.discount}% Discount On Your Total Amount</b></span>
                    //     </div>
                    //     <div className="flex items-center justify-center lg:flex-row flex-col space-x-5">
                    //         <p className="text-[25px] space-x-2 lg:m-0 my-2"><span className="text-red-500 text-[22px]"><strike>₹{data?.totalMonthlyAmount?.totalAmountWithoutDiscount || ""}</strike></span><b>₹{data?.totalMonthlyAmount?.totalAmountWithDiscount || ""}</b></p>
                    //         <button className={`text-white bg-blue-500 rounded-lg py-2 px-14 text-[15px] ${data?.totalMonthlyAmount?.status === "Paid" && `bg-blue-500 cursor-not-allowed`}`} onClick={() => {data?.totalMonthlyAmount?.status !== `Paid` && handlePaymentCharge(data?.totalMonthlyAmount?.id, 'GrandTotal')}} disabled={data?.totalMonthlyAmount?.status === `Paid` ? true : false}>{data?.totalMonthlyAmount?.status === "Paid" ? <span className="flex items-center justify-center"><IoMdCheckmarkCircle className="text-white mr-1" size={20} /> Paid</span> : "Pay Now"}</button>
                    //         {!!payBtn && <PaymentGateway setPaynowBtn={setPaynowBtn} paymentGatewayData={paymentGateway} />}
                    //     </div>
                    // </div>
                }

                {/* bookings container | apply  */}
                <div className="my-6">
                    {/* Use .map function loop here for dynamic bookings */}
                    <div className="border-zinc-300 border-[1px] rounded-lg min-h-[73px] p-3 transition-all">
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center justify-center">
                                <p className="text-[18px] flex lg:flex-row flex-col lg:items-center items-start justify-center"> <span className="flex items-center justify-center"><LuCalendarDays className="text-blue-500 mr-1" size={18} />Booking Duration </span> <span className="font-[500] lg:ml-2">{data?.bookingDuration?.startMonthDuration} - {data?.bookingDuration?.endMonthDuration}</span></p>
                            </div>
                            <button className="outline-none border-none flex items-center justify-center" onClick={() => setShowRenewDiv(!showRenewDiv)}>{showRenewDiv ? <IoIosArrowUp size={25} /> : <><IoMdCheckmarkCircle className="text-green-500 mr-1" size={20} /> <span className="mr-2">Booked</span><IoIosArrowDown size={25} /></>} </button>
                        </div>
                        {/* Token Money */}
                        <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center lg:flex-row flex-col justify-between mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                            <div className="flex items-center justify-between space-x-3">
                                <p className="flex items-center justify-center"><Image height={30} width={30} src={tokenmoney} alt="icon" className="mr-2" priority /> <b>Token Money</b></p>
                            </div>
                            {
                                data?.tokenMoney?.status === "Paid" ?
                                    <div className="flex flex-col lg:items-end items-center justify-between">
                                        <span className="text-[20px]"><b>₹{data?.tokenMoney?.amount || ""}</b></span>
                                        <p className="flex items-center justify-center">{data?.tokenMoney?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.tokenMoney?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.tokenMoney?.status || ""}</b></span> <span className="text-[14px]"> {data?.tokenMoney?.paymentDate ? `on ${data?.tokenMoney?.paymentDate}` : ""}</span> </p>
                                        <Link href={data?.tokenMoney?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt </Link>
                                        {/* <Link href={data?.tokenMoney?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Invoice </Link> */}
                                        {data?.tokenMoney?.status === "Paid" && (
                                            <div>
                                                {!!data?.tokenMoney?.paymentInvoicePdfPath ? (
                                                    <Link
                                                        href={data?.tokenMoney?.paymentInvoicePdfPath || ""}
                                                        target="_blank"
                                                        download
                                                        className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                                    >
                                                        <GoDownload className="mr-1" size={15} /> Download Invoice
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSendEmailForInvoice(data?.tokenMoney?.id, 'tokenMoney')}
                                                        className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Sending Invoice..." : "Request Invoice"}
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    :
                                    <button onClick={() => handlePaymentCharge(data?.tokenMoney?.id, 'TokenMoney')} className="text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2">Pay Now ₹{data?.tokenMoney?.amount || ""}</button>
                            }

                        </div>
                        {/* 50% Logistics */}
                        {
                            data?.isLogistics && <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                                <div className="flex flex-col lg:items-start justify-center gap-2">
                                    <p className="flex items-center justify-center"><Image height={30} width={30} src={logistics} alt="icon" className="mr-2" priority /> <b>50% Logistics & Insurance</b>{data?.logisticsCharge?.status === "To be paid within" && <AiFillInfoCircle className="ml-2 text-gray-300" size={20} />}</p>
                                    {data?.logisticsCharge?.status === "To be paid within" && <span className="text-[12px] bg-blue-200 px-1 m-0">NOTE : This payment must be made at least 48 hours prior to your storage date</span>}
                                </div>
                                <div className="flex flex-col lg:items-end items-center justify-between">
                                    {data?.logisticsCharge?.status === "Paid" && <span className="text-[20px]"><b>₹{data?.logisticsCharge?.amount || ""}</b></span>}
                                    {((data?.logisticsCharge?.status === "To be paid within") || (data?.logisticsCharge?.status === "Payment Due on")) && <button onClick={() => handlePaymentCharge(data?.logisticsCharge?.id, 'LogisticsCharges')} className="text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2">Pay Now ₹{data?.logisticsCharge?.amount || ""}</button>}
                                    <p className="flex items-center justify-center">{data?.logisticsCharge?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.logisticsCharge?.status === "Payment Due on" && <AiFillInfoCircle className="text-red-500" size={20} /> || data?.logisticsCharge?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.logisticsCharge?.status || ""}</b></span> <span className="text-[14px]"> {data?.logisticsCharge?.paymentDate ? `on ${data?.logisticsCharge?.paymentDate}` : ""}</span></p>
                                    {!!data?.logisticsCharge?.paymentReceipt && <Link href={data?.logisticsCharge?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}

                                    {data?.logisticsCharge?.status === "Paid" && (
                                        <div>
                                            {!!data?.logisticsCharge?.paymentInvoicePdfPath ? (
                                                <Link
                                                    href={data?.logisticsCharge?.paymentInvoicePdfPath || ""}
                                                    target="_blank"
                                                    download
                                                    className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                                >
                                                    <GoDownload className="mr-1" size={15} /> Download Invoice
                                                </Link>
                                            ) : (
                                                <button
                                                    onClick={() => handleSendEmailForInvoice(data?.logisticsCharge?.id, 'logisticAmount')}
                                                    className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Sending Invoice..." : "Request Invoice"}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {/* {!!data?.logisticsCharge?.paymentInvoicePdfPath && <Link href={data?.logisticsCharge?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Invoice</Link>} */}
                                    {data?.isLogistics && !isLogisticsCharge && <p className="flex items-center justify-center">Team will connect you shortly.</p>
                                    }
                                </div>
                            </div>
                        }

                        {/* Balance Amount */}
                        <div className={`bg-gray-100 py-3 px-3 rounded-xl w-full flex items-center justify-between lg:flex-row flex-col mt-4 transition-all ${!showRenewDiv && `hidden`}`}>
                            <div className="flex flex-col lg:items-start justify-center gap-2">
                                <p className="flex items-center justify-center"><Image height={30} width={30} src={balanceamout} alt="icon" className="mr-2" priority /> <b>Balance Amount</b>{data?.balanceAmount?.status === "To be paid within" && <AiFillInfoCircle className="ml-2 text-gray-300" size={20} />}</p>
                                {data?.balanceAmount?.status === "To be paid within" && (<>{data?.isLogistics && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining logistics and storage amount.</span>)}
                                    {!data?.isLogistics && data?.balanceAmount?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining insurance and storage amount.</span>)}
                                    {!data?.isLogistics && !data?.balanceAmount?.insuranceAmount && (<span className="text-[12px] bg-blue-200 px-1 m-0">NOTE: This payment covers the remaining storage amount.</span>)}</>)}
                            </div>
                            <div className="flex flex-col lg:items-end items-center justify-between">
                                {data?.balanceAmount?.status === "Paid" && <span className="text-[20px]"><b>₹{data?.balanceAmount?.amount || ""}</b></span>}
                                {((data?.balanceAmount?.status === "To be paid within") || (data?.balanceAmount?.status === "Payment Due on")) && <button onClick={() => handlePaymentCharge(data?.balanceAmount?.id, 'BalanceAmount')} title={`${!!data.logisticsCharge && data?.logisticsCharge?.status !== "Paid" ? `Pay the logistics amount first.` : `Balance Amount`}`} className={`${data?.isLogistics && data?.logisticsCharge?.status !== "Paid" && `!cursor-not-allowed !bg-blue-300`} text-white bg-blue-500 py-2 px-12 rounded-lg text-[14px] lg:mb-2 my-2`} disabled={data?.isLogistics && data?.logisticsCharge?.status !== "Paid" ? true : false}>Pay Now ₹{data?.balanceAmount?.amount || ""}</button>}
                                <p className="flex items-center justify-center">{data?.balanceAmount?.status === "To be paid within" && <AiFillInfoCircle className="text-yellow-400 rotate-180" size={20} /> || data?.balanceAmount?.status === "Payment Due on" && <AiFillInfoCircle className="text-red-500" size={20} /> || data?.balanceAmount?.status === "Paid" && <IoMdCheckmarkCircle className="text-green-500" size={20} />}<span className="mx-2"><b>{data?.balanceAmount?.status || ""}</b></span> <span className="text-[14px]"> {(data?.balanceAmount?.paymentDate ? `on ${data?.balanceAmount?.paymentDate}` : "")}</span></p>
                                {!!data?.balanceAmount?.paymentReceipt && <Link href={data?.balanceAmount?.paymentReceipt || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Receipt</Link>}
                                {/* {!!data?.balanceAmount?.paymentInvoicePdfPath && data?.balanceAmount?.status === "Paid" &&  <Link href={data?.balanceAmount?.paymentInvoicePdfPath || ""} target="_blank" download className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"><GoDownload className="mr-1" size={15} /> Download Invoice</Link>} */}
                                {/* Balance Amount Invoice */}
                                {data?.balanceAmount?.status === "Paid" && (
                                    <div>
                                        {!!data?.balanceAmount?.paymentInvoicePdfPath ? (
                                            <Link
                                                href={data?.balanceAmount?.paymentInvoicePdfPath || ""}
                                                target="_blank"
                                                download
                                                className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                            >
                                                <GoDownload className="mr-1" size={15} /> Download Invoice
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => handleSendEmailForInvoice(data?.balanceAmount?.id, 'balanceAmount')}
                                                className="flex items-center justify-center text-[15px] text-blue-500 rounded-lg underline"
                                                disabled={loading}
                                            >
                                                {loading ? "Sending Invoice..." : "Request Invoice"}
                                            </button>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={itemModal}
                onHide={() => setItemModal(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-xl">
                        Your Selected Items
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="bg-white p-4 h-96 overflow-y-scroll">
                        {/* <h2 className="text-lg font-semibold">Selected Items</h2> */}
                        <table className="w-full text-left ">
                            <thead>
                                <tr className="text-gray-800">
                                    <th className="pb-2 px-2">Item</th>
                                    <th>Quantity</th>
                                    {/* <th>CFT</th>
                                    <th>Total CFT</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.relocationSelectedItem?.map((elem, item) => {
                                        return (
                                            <tr className="border-t py-2">
                                                <td className="py-3 text-[16px] text-gray-700 flex items-center font-normal "><span className="px-2"><img src={elem?.itemsIconPath} alt={elem?.itemName} className="w-6 h-6" /></span> {elem?.itemName}</td>
                                                <td className="py-3 text-[16px] text-gray-700 font-medium">{elem?.quantity}</td>
                                                {/* <td className="py-3 text-[16px] text-gray-700 font-medium">{elem?.netCFT}</td> */}
                                                {/* <td className="py-3 text-[16px] text-gray-700 font-medium">{elem?.totalCFT}</td> */}
                                            </tr>
                                        )
                                    })
                                }
                                <tr className="border-t">
                                    <td className="py-2 font-bold">Total Quantity</td>
                                    <td className="py-2 font-bold">{data?.relocationSelectedItem?.map((elem) => elem?.quantity)?.reduce((acc, coll) => acc + coll, 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>

            </Modal>
            {!!payBtn && <PaymentGateway setPaynowBtn={setPaynowBtn} paymentGatewayData={paymentGateway} />}
            <Footer />
            {loading && <Loader />}
        </React.Fragment>
    )
}
export default EasyStorageBookings;