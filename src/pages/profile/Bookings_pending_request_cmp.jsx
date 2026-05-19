import LocationImage from "../../../public/images/icon/Location-green.svg";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import NoData from "@/components/NoData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBookingRequestDataByUserId } from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import Loader from "@/components/Loader";

export default function Index() {

  const [bookingRequestData, setBookingRequestData] = useState([]);
  const [loader , setLoader] = useState(false);
  useEffect(() => {
    // let args = `?ApplicationUserId=${}`;
    let args = `?ApplicationUserId=${getUserId()}`;
    setLoader(true);
    (async() => {
      const getBookingRequestDataByUserId_response = await getBookingRequestDataByUserId(args);
      if (getBookingRequestDataByUserId_response?.success) {
        setBookingRequestData(getBookingRequestDataByUserId_response?.success?.data);
        setLoader(false);
      }else{
        setLoader(false);
      }
    })()
    localStorageManager.setValue("subTab", "pending_requests");
  }, [])

  return (
    <>
      {bookingRequestData == "" && <NoData />}
      {!!bookingRequestData && bookingRequestData.map((items, index) => {
          return (
            <div className=" flex flex-col p-3 shadow-sm border-[1px] mb-1 rounded-xl mr-1" key={index}>
              <div className="flex justify-start max-w-[450px] h-[100px] rounded">
                <div className="w-[130px] h-full rounded">
                  <img
                    src={items?.propertyData?.propertyImages}
                    alt="image"
                    className="w-[100%] h-[100%] object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col py-2 px-2">
                  <h1 className="font-bold lg:text-[14px] text-[12px]">
                    {items?.propertyData?.address || ""}
                  </h1>
                  <p className="mt-1 mb-1 flex items-center text-sm flex-wrap">
                    <Image
                      src={LocationImage}
                      alt="logo"
                      height={15}
                      width={15}
                      className="mr-2"
                      priority
                    />
                    {items?.propertyData?.city || ""}
                    {/* {items?.propertyData?.district || ""} */}
                    {items?.status === "Pending" && (
                      <span className="flex items-center justify-between gap-x-1 py-[2px] px-2 bg-yellow-50 text-yellow-500 font-bold rounded-lg text-[10px] ml-2">
                        <FaRegClock size={11} />
                        {items?.status || ""}
                      </span>
                    )}
                    {items?.status === "Declined" && (
                      <span className="flex items-center justify-between gap-x-1 py-[1px] px-1 bg-red-50 text-red-500 font-bold rounded-lg text-[10px] ml-2">
                        <FaRegClock size={11} />
                        {items?.status || ""}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center m1-1 mb-2 flex-wrap lg:text-sm text-[12px]">
                    <span className="bg-blue-50 px-2 rounded-lg">{items?.startDate || ""}</span>
                    <p className="lg:ml-1 lg:mr-1">-</p>
                    <span className="bg-blue-50 px-2 rounded-lg">{items?.endDate || ""}</span>
                  </div>
                  {/* <Link href="/profile/feedback?type=P2P" className="underline text-blue-500 text-[12px] uppercase">
                    Rate us
                  </Link> */}
                </div>
              </div>

              {/* use conditions here to display or hide warning or info alerts */}
              {/* <div>
                    <Alert key="danger" variant="danger" className="mt-3 flex items-center h-[25px] text-red-500 text-[12px] border-0"><MdErrorOutline size={15} /> Your storage duration has been over.</Alert>
                </div> */}
            </div>
          );
        })}
{loader && <Loader/>}
      {/* <div className="flex flex-col ml-12 mt-8">
                <div className="flex justify-start w-[450px] h-[100px] rounded">
                    <div className="w-[130px] h-full rounded">
                        <Image src={temp_image} alt="image" className="w-[100%] h-[100%] object-cover rounded-lg" priority />
                    </div>
                    <div className="flex flex-col py-2 px-2">
                        <h1 className="font-bold">Storage space in mani nagar</h1>
                        <p className="mt-1 mb-1 flex items-center">
                            <Image src={LocationImage} alt="logo" height={15} width={15} className="mr-2" />Delhi NCR
                            <span className="flex items-center justify-between gap-x-2 py-[2px] px-2 bg-red-100 text-red-500 font-bold rounded-lg text-[12px] ml-2">Declined</span>
                        </p>
                        <div className="flex items-center justify-between">
                            <input type="date" className="outline-none rounded pl-2 py-1 bg-blue-100" name="" />
                            <p className="ml-2 mr-2">-</p>
                            <input type="date" className="outline-none rounded pl-2 py-1 bg-blue-100" name="" />
                        </div>
                    </div>
                </div>

                
                <div>
                    <Alert key="danger" variant="danger" className="mt-3 flex items-center h-[25px] text-red-500 text-[12px] border-0"><MdErrorOutline size={15} /> Your storage duration has been over.</Alert>
                </div>
            </div> */}
    </>
  );
}
