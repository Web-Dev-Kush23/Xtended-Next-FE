import React, { useEffect, useState } from "react";
import { getBookedPackersAndMoversDetailsByUserId } from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import NoData from "@/components/NoData";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
import Loader from "@/components/Loader";

const Index = () => {

    const [data, setData] = useState([]);
    const [loader , setLoader] = useState(false);
    useEffect(() => {
        let args = `?ApplicationUserId=${getUserId()}`;
        setLoader(true);
        (async () => {
            const response = await getBookedPackersAndMoversDetailsByUserId(args);
            if (response?.success) {
                setData(response?.success?.data);
                setLoader(false);
            }else{
                setLoader(false);
              }
        })()
        localStorageManager.setValue("subTab", "packers_movers");
    }, [])
   
    return (
        <React.Fragment>
            {!data.length && <NoData />}
            {
                !!data.length && data.map((items, index) => {
                    return (
                        <Link key={index} href={{ pathname: "/profile/packers-movers-booking-details", query: { infoId: items?.infoId } }} >
                        <div  key={index} className="min-h-[150px] w-[98%] mb-4 flex lg:flex-row flex-col items-center gap-2 lg:justify-between rounded-lg border-[1px] py-2">
                            <div className="lg:h-full lg:w-[250px] w-full h-[150px] rounded-lg">
                                <img src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/WhatsApp+Image+2024-12-12+at+14.54.05_dda3958f.jpg" alt="image" className="object-cover h-full w-full px-2 rounded-lg" />
                            </div>
                            <div className="w-full h-full flex flex-col items-start justify-center lg:ml-0 ml-4 space-y-1">
                                <span><b>Storage Requirement</b> - {items?.storageRequirement && items?.storageRequirement.includes("moreThan4bhk") ? "More Than 4 BHK" : items?.storageRequirement || ""}</span>
                                {/* <div className="flex items-center justify-center lg:text-[16px] text-[14px] font-bold">
                                    <span>From {items?.cityFrom || ""}</span> <span className="mx-1">To</span> <span>{items?.cityTo || ""}</span>
                                </div> */}
                                <span className="lg:text-[16px] text-[12px]"><b>Moving Date</b> - {items?.pickupDate || ""}</span>
                                <span className="lg:text-[16px] text-[12px]"><b>Shifting Type</b> - {items?.storageType || ""}</span>

                                {/* <span className="lg:text-[16px] text-[12px]"><b>Pickup Address</b> - {items?.pickupAddress || ""}</span>
                                <span className="lg:text-[16px] text-[12px]"><b>Delivery Address</b> - {items?.deliveryAddress || ""}</span> */}
                                <div className="flex items-center justify-between w-full lg:pr-3 pr-6 lg:text-[16px] text-[12px]">
                                    {!!items?.paymentReceipt && <Link href={items?.paymentReceipt || ""} className="text-blue-500 underline flex items-center justify-center" target="_blank"><IoMdDownload className="mr-2" /> Download Receipt</Link>}
                                    {/* <Link href="/profile/feedback?type=P2P" className="underline text-blue-500 lg:text-[12px] text-[10px] uppercase">Rate us</Link> */}
                                </div>
                            </div>
                        </div>
                        </Link>
                    )
                })
            }
            {loader && <Loader/>}
        </React.Fragment>
    )
}

export default Index;