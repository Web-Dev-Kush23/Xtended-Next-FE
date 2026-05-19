import NoData from "@/components/NoData";
import React, { useEffect, useState } from "react";
import LocationImage from "../../../public/images/icon/Location-green.svg";
import Image from "next/image";
import { LuCalendarDays } from "react-icons/lu";
import GridContainer from "@/components/Grid-container";
import { getUserId, localStorageManager } from "@/util/common";
import { getHostBookedPropertyDataByUserIdApplicationUserId } from "@/service/storageService";
import Loader from "@/components/Loader";
import { CgProfile } from "react-icons/cg";

export default function Index() {
  const [hostBookedPropertyData, setHostBookedPropertyData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // 819
    let args = `?ApplicationUserId=${getUserId()}`;
    setLoader(true);
    // let args = `?ApplicationUserId=819`;
    (async () => {
      const getHostBookedPropertyDataByUserIdApplicationUserId_response =
        await getHostBookedPropertyDataByUserIdApplicationUserId(args);
      if (
        getHostBookedPropertyDataByUserIdApplicationUserId_response?.success
      ) {
        setHostBookedPropertyData(
          getHostBookedPropertyDataByUserIdApplicationUserId_response?.success
            ?.data
        );
        setLoader(false);
      } else {
        setLoader(false);
      }
    })();
    localStorageManager.setValue("subTab", "booked_space");
  }, []);

  return (
    <React.Fragment>
      {hostBookedPropertyData == "" && <NoData />}
      <GridContainer>
        {!!hostBookedPropertyData.length &&
          hostBookedPropertyData.map((items, index) => {
            return (
              <div
                className="max-h-[312px] max-w-[416px] p-4 rounded-[14px] border-[1px] m-4"
                key={index}
              >
                <div className="flex justify-start w-full h-[100px] rounded">
                  <div className="w-[130px] h-full rounded">
                    <img
                      src={items?.propertyImage || ""}
                      alt="image"
                      className="w-[100%] h-[100%] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col py-2 px-2">
                    <p className="text-[#508309] text-sm">
                      Booked on {items?.bookedOn || ""}
                    </p>
                    <p className="font-bold">
                      Storage space in {items?.city || ""}
                    </p>
                    <p className="mt-1 mb-1 flex items-center">
                      <Image
                        src={LocationImage}
                        alt="logo"
                        height={15}
                        width={15}
                        className="mr-2"
                        priority
                      />
                      {items?.city || ""}{" "}
                      {/* {items?.propertyRequest?.state || ""} */}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-start flex-col gap-y-3">
                  <p className="text-zinc-400 mt-2 text-[16px]">Booked by</p>
                  <div className="mt-2 flex items-center justify-center gap-x-6">
                    {/* <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={items?.customerProfileImage || ""}
                      alt=""
                    /> */}
                    {items?.customerProfileImage ? (
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={items.customerProfileImage}
                        alt="Customer"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center">
                        <CgProfile className="text-3xl text-gray-500" />
                      </div>
                    )}

                    <p className="font-bold">{items?.name || ""}</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <p className="bg-blue-50 rounded px-1 flex items-center gap-x-2">
                      <LuCalendarDays />
                      {items?.startDate || ""}
                    </p>{" "}
                    -
                    <p className="bg-blue-50 rounded px-1 flex items-center gap-x-2">
                      <LuCalendarDays />
                      {items?.endDate || ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </GridContainer>
      {loader && <Loader />}
    </React.Fragment>
  );
}
