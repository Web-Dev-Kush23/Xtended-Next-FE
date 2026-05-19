import React, { useState, useEffect } from "react";
import { getEasyStorageBookingData } from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import Image from "next/image";
import LocationImage from "../../../public/images/icon/Location-green.svg";
import rupee_icon from "../../../public/images/icon/rupee_icon.png";
import prof_easy_storage from "../../../public/images/prof_easy_storage.png";
import { LuCalendarDays } from "react-icons/lu";
import Link from "next/link";
import NoData from "@/components/NoData";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const AffordableStorageBookings = () => {
    const router = useRouter()
    const [easyStorageData, setEasyStorageData] = useState([]);
    const [loader , setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        (async () => {
            const args = `?ApplicationUserId=${getUserId()}`
            const res = await getEasyStorageBookingData(args);
            // console.log("res", res);

            if (res.success) {
                setEasyStorageData(res.success.data)
                setLoader(false);
            }else{
                setLoader(false);
              }
        })()
        localStorageManager.setValue("subTab", "easy_storage_bookings");
    }, [])

    return (
        <React.Fragment >
            {easyStorageData.length === 0 && <NoData />}
            {
                !!easyStorageData.length && easyStorageData.map((items, index) => {
                    return (
                        <>
                            <Link key={index} href={{ pathname: "/profile/warehouse-storage-bookings", query: { easyStorageId: items?.easyStorageId } }} className="flex flex-col p-3 shadow-sm border-[1px] mb-1 rounded-xl mr-1">
                                <div className="flex justify-between md:flex-grow  max-w-[450px] min-h-[120px] rounded">
                                    <div className="w-[130px] relative h-full rounded">
                                        <img
                                            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/Group+1171275616.png"
                                            alt="image"
                                            layout="fill"
                                            className="w-[100%] h-[100%] object-cover rounded-lg"
                                        />
                                     <div className={`absolute w-full bottom-2 ${items?.isActive?" bg-[#8DC63F]":"bg-[#348cff]"} text-white text-[14px] m-0.5 font-semibold rounded-lg text-center py-1`}>{items?.isActive?"Active":"InActive"}</div>
                                    </div>
                                    <div className="flex flex-col gap-y-1 py-2 px-2">
                                        {/* <h1 className="font-bold">{items?.address || ""}</h1> */}
                                        <p className="mt-1 mb-1 flex justify-between items-center text-sm">
                                            <div className="">
                                                <p className="font-bold text-xl">{items?.storageType || ""}
                                                    <span className="text-sm font-[400] pl-2">
                                                        ({items?.minSqrFeet || ""} - {items?.maxSqrFeet || ""} Sq Ft.)
                                                    </span>
                                                </p>
                                            </div>
                                            {/* <div className="flex items-center justify-center">
                                                <Image
                                                    src={LocationImage}
                                                    alt="logo"
                                                    height={15}
                                                    width={15}
                                                    className="mr-2"
                                                    priority
                                                />
                                                {items?.state || ""}
                                            </div> */}
                                        </p>
                                        {/* <div className="flex items-center justify-between">
                                            <p className="flex items-center justify-center text-[15px]">
                                                <Image height={20} width={20} src={rupee_icon} alt="rupee icon" priority className="mr-1" /> {items?.status || ""}</p>
                                            <Link href="#" download className="text-blue-500 underline">Download Receipt</Link>
                                        </div> */}
                                        <div className="flex items-center gap-1">
                                            <p className="bg-blue-50 px-2 rounded-lg flex items-center justify-center text-[10px] md:text-[12px]"><LuCalendarDays className="lg:mr-1 mr-[1px]" /> {items?.startDate || ""}</p>
                                            <p className="lg:ml-1 lg:mr-1">-</p>
                                            <p className="bg-blue-50 px-2 rounded-lg flex items-center justify-center text-[10px] md:text-[12px]"><LuCalendarDays className="lg:mr-1 mr-[1px]" /> {items?.endDate || ""}</p>
                                        </div>
                                        {/* <Link href="/profile/feedback?type=Affordable-storage" className="text-sm uppercase text-blue-500 underline">Rate us</Link> */}
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                })
            }
            {loader && <Loader/>}
        </React.Fragment>
    )
}

export default AffordableStorageBookings;
