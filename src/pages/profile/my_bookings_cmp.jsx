import LocationImage from "../../../public/images/icon/Location-green.svg";
import Alert from "react-bootstrap/Alert";
import { MdErrorOutline } from "react-icons/md";
import Image from "next/image";
import NoData from "@/components/NoData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserId, localStorageManager } from "@/util/common";
import { getBookingDataByUserId } from "@/service/storageService";
import Loader from "@/components/Loader";
import RateReviewModal from "@/components/Modal/RateReviewModal";


export default function Index() {

  const [bookingData, setBookingData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let args = `?ApplicationUserId=${getUserId()}`;
    setLoader(true);
    (async () => {
      const bookingDataByIdResponse_response = await getBookingDataByUserId(args);
      if (bookingDataByIdResponse_response?.success) {
        setBookingData(bookingDataByIdResponse_response?.success?.data);
        setLoader(false);
      } else {
        setLoader(false);
      }
    })()
    localStorageManager.setValue("subTab", "affordable_storage_bookings");
  }, [])

  return (
    <>
      {bookingData == "" && <NoData />}
      {!!bookingData &&
        bookingData.map((item, index) => {
          return (
            <div
            // href={{ pathname: "/profile/affordable-storage-bookings", query: { requestID: item?.requestId } }} 
            className="flex flex-col shadow-sm !gap-5 space-x-2 border-[1px] border-gray-300 rounded p-3" key={index}>

              <div className="flex md:gap-2 max-w-[450px] min-h-[120px] rounded-lg">
                <div className="w-[130px] md:w-[300px] h-[130px] md:h-[200px] rounded">
                  <img
                    src={item?.propertyImages || ""}
                    alt="image"
                    layout="fill"
                    className="w-[100%] h-[100%] object-cover rounded-lg"
                  />

                </div>
                <div className="flex flex-col gap-y-1 py-2 px-2 w-full">
                <h3 className="font-bold lg:text-[14px] text-[12px]">Property Id: <span className="font-normal">{item?.propertyId || ""}</span></h3>
                  <h1 className="font-bold lg:text-[14px] text-[12px]">{item?.address || ""}</h1>
                  <p className="mt-1 mb-1 flex items-center lg:text-sm text-[12px]">
                    <Image
                      src={LocationImage}
                      alt="logo"
                      height={15}
                      width={15}
                      className="mr-2"
                      priority
                    />
                    {item?.city || ""}
                  </p>
                  <div className="flex items-center gap-1 lg:text-sm text-[12px]">
                    <span className="bg-blue-50 px-2 rounded-lg">{item?.startDate || ""}</span>
                    <p className="lg:ml-1 lg:mr-1">-</p>
                    <span className="bg-blue-50 px-2 rounded-lg">{item?.endDate || ""}</span>
                  </div>
                  <div className="flex justify-between gap-2 items-center">

                    <Link
                      href={{ pathname: "/profile/affordable-storage-bookings", query: { requestID: item?.requestId } }}
                      className="mt-1 bg-[#8DC63F] text-white px-2 md:px-4 text-[10px] md:text-[14px] py-1.5 rounded-lg hover:bg-blue-700 transition-colors w-1/2 text-center"
                    >
                      View details
                    </Link>
                    <RateReviewModal propertyId = {item}/>

                  </div>
                  <div className="">
                    {item?.isRenewNow === false && (
                      <div
                        key="danger"
                        variant="danger"
                        className="flex items-center text-red-500 text-[10px] md:text-[12px] bg-red-200 rounded px-1 py-1"
                      >
                        <MdErrorOutline size={15} /> {item?.message || ""}
                      </div>
                    )}
                  </div>
                </div>
                {/* <Link href="/profile/feedback?type=Affordable-storage" className="text-[12px] uppercase text-blue-500 underline">Rate us</Link> */}
              </div>
            </div>

          );
        })}
      {loader && <Loader />}
    </>
  );
}
