import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LocationImage from "../../../public/images/icon/Location-green.svg";
import { getUserId, localStorageManager } from "@/util/common";
import {
  getPendingApprovalsRequestData,
  postApprovePropertyBookingRequestByHost,
  postRejectedPropertyBookingRequestByHost,
} from "@/service/storageService";
import NoData from "@/components/NoData";
import Loader from "@/components/Loader";

export default function Index() {

  const [pendingApprovalsRequestData, setPendingApprovalsRequestData] = useState([]);
  const [loader , setLoader] = useState(false);
  useEffect(() => {
    // let args = `?ApplicationUserId=${819}`;
    let args = `?ApplicationUserId=${getUserId()}`;
    setLoader(true);
    (async() => {
      const getPendingApprovalsRequestData_response = await getPendingApprovalsRequestData(args);
      if (getPendingApprovalsRequestData_response?.success) {
        setPendingApprovalsRequestData(getPendingApprovalsRequestData_response?.success?.data);
        setLoader(false);
      }else{
        setLoader(false);
      }
    })()
    localStorageManager.setValue("subTab", "pending_approvals");
  }, [])

  
  const [showText, setShowText] = useState(false);

  function handleApproveListing(propertyBookingRequestId) {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postApprovePropertyBookingRequestByHost(args);
      if (response?.success) {
        setShowText(true);

         const updatedData = pendingApprovalsRequestData.filter(
        (item) => item.propertyBookingRequestId !== propertyBookingRequestId
      );
      setPendingApprovalsRequestData(updatedData);


        const timer = setTimeout(() => {
          setShowText(false);
        }, 2000);
        // const refresh = setTimeout(() => {window.location.reload()}, 500);
        return () => clearTimeout(timer);
      }
    })();
  }

  function handleDeclineListing(propertyBookingRequestId) {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${propertyBookingRequestId}`;
      const response = await postRejectedPropertyBookingRequestByHost(args);
      if (response?.success) {
        // alert("Request Declined!");

         const updatedData = pendingApprovalsRequestData.filter(
        (item) => item.propertyBookingRequestId !== propertyBookingRequestId
      );
      setPendingApprovalsRequestData(updatedData);

        // const refresh = setTimeout(() => {window.location.reload()}, 500);
        // return () => clearTimeout(refresh);
      }
    })();
  }

  return (
    <React.Fragment>
      {showText && (<p className={`text-green-500 ml-12 text-xl pt-6`}>Request Approved!</p>)}
      {pendingApprovalsRequestData == "" && <NoData />}
      <div className="grid lg:grid-cols-2">
        {!!pendingApprovalsRequestData &&
          pendingApprovalsRequestData.map((items, index) => {
            // Object to send in params for view-details.jsx page.
            return (
              <div
                className={`flex flex-col lg:ml-12 mx-3 mt-8 mb-8`} key={index}>
                <div className="flex flex-col items-start justify-around flex-wrap border-[1px] rounded-lg border-[#ddd] min-h-[280px] max-w-[461px]">
                  <div className="flex items-center justify-between w-full px-4 py-3">
                    <div className="flex items-center justify-center gap-x-2">
                      <img
                        src="/images/icon/vectorIcon.png"
                        alt="Image"
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                      <h1 className="font-bold lg:text-md text-sm">{items?.customerName || ""}</h1>
                    </div>
                    <div>
                      <Link
                        href={{
                          pathname: "/profile/view-details",
                          query: {ID: items?.propertyBookingRequestId},
                        }}
                        className="underline lg:text-md text-sm whitespace-nowrap"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-slate-400">
                      <p className="ml-8">Booking for</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between pl-7 ml-1">
                        {items?.startDate || ""}
                        <p className="ml-2 mr-2">-</p>
                        {items?.endDate || ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-slate-400">
                      <p className="ml-8">Storage Place</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="ml-8 mr-2">
                        <img
                          src={items?.propertyImage[0]}
                          width={50}
                          height={50}
                          alt="image"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="mb-1 mt-1 ml-1">
                          <h6 className="font-[500]">
                            Storage space in {items?.address1 || ""}
                          </h6>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src={LocationImage}
                            height={15}
                            width={15}
                            alt="icon"
                            className="mr-1"
                            priority
                          />{" "}
                          {items?.city || ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:grid lg:grid-cols-2 place-items-center flex items-center justify-around text-center w-full pb-3 pt-3">
                    <button
                      className="px-14 py-2 bg-[#8DC63F] text-white rounded-lg"
                      onClick={() => {handleApproveListing(items?.propertyBookingRequestId);}}>
                      Approve
                    </button>
                    <button
                      className="px-14 py-2 bg-none border-[1px] border-red-500 text-red-500 font-bold rounded-lg"
                      onClick={() => {handleDeclineListing(items?.propertyBookingRequestId);}}>
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {loader && <Loader/>}
    </React.Fragment>
  );
}
