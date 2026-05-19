import LocationImage from "../../../public/images/icon/Location-green.svg";
import Image from "next/image";
import NoData from "@/components/NoData";
import { useEffect, useState } from "react";
import {
  getListingCurrentUserListing,
  MakeHostPropertyActiveInactive,
} from "@/service/storageService";
import { getUserId, localStorageManager } from "@/util/common";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import Loader from "@/components/Loader";
import { FaEye } from "react-icons/fa";
import { Spin } from "antd";
export default function Index() {
  const [currentListingData, setCurrentListingData] = useState([]);
  const [loader, setLoader] = useState(false);
const [loadingBtnId, setLoadingBtnId] = useState(null);


  useEffect(() => {
    let args = `?ApplicationUserId=${getUserId()}`;
    setLoader(true);
    (async () => {
      const getListingCurrentUserListing_response =
        await getListingCurrentUserListing(args);
      if (getListingCurrentUserListing_response?.success) {
        setCurrentListingData(
          getListingCurrentUserListing_response?.success?.data
        );
        setLoader(false);
      } else {
        setLoader(false);
      }
    })();
    localStorageManager.setValue("subTab", "my_storage_listing");
  }, []);
const handleStatusChange = async (propertyId, currentStatus) => {
  setLoadingBtnId(propertyId);

  const query = `?propertyId=${propertyId}&status=${currentStatus === "Active" ? "Inactive" : "Active"}&ApplicationUserId=${getUserId()}`;
  const res = await MakeHostPropertyActiveInactive(query);

  if (res?.success) {
    const args = `?ApplicationUserId=${getUserId()}`;
    const updated = await getListingCurrentUserListing(args);
    if (updated?.success) {
      setCurrentListingData(updated.success.data);
    }
  } else {
    console.error("Failed to update status:", res?.error);
  }

  setLoadingBtnId(null);
};




  return (
    <>
      {currentListingData == "" && <NoData />}
      <div className="grid px-6 pb-4 lg:grid-cols-2">
        {!!currentListingData &&
          currentListingData.map((items, index) => {
            return (
              <div
                className={`flex shadow-sm flex-col lg:ml-12 mx-3 mt-8 p-2 boder-gray-300 border-[1px] rounded`}
                key={index}
              >
                <div className="flex flex-col sm:flex-row gap-4 w-full rounded py-2">
                  <div className="w-full md:w-[35%] h-[150px] rounded overflow-hidden">
                    <img
                      src={items?.propertyImages[0]?.imageStoragePath || ""}
                      alt="image"
                      loading="lazy"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-grow sm:pl-4 mt-2 sm:mt-0">
                    <h1 className="font-bold lg:text-md text-[16px]">
                      {items?.address || ""}
                    </h1>
                    <p className="mt-1 mb-1 flex items-center lg:text-sm text-[14px]">
                      <Image
                        src={LocationImage}
                        alt="logo"
                        height={15}
                        width={15}
                        className="mr-2"
                        priority
                      />
                      {items?.city || ""}, {items?.state || ""}
                    </p>
                    <div>
                      {items?.status === "WaitingApproval" && (
                        <div>
                          <Link
                            className="flex items-center justify-start text-[12px] text-[#328AFE]"
                            title="Edit listing details"
                            href={{
                              query: {
                                propertyId: items?.propertyId || null,
                                status: items?.status || null,
                              },
                              pathname: "/list-storage/storage-form",
                            }}
                          >
                            <CiEdit className="mr-1" size={16} /> Edit Listing
                          </Link>
                        </div>
                      )}{" "}
                      {items?.status === "Approved" && (
                        <div>
                          <Link
                            className="flex items-center justify-start text-[12px] text-[#328AFE]"
                            title="Preview listing details"
                            href={{
                              query: {
                                propertyId: items?.propertyId || null,
                                status: items?.status || null,
                              },
                              pathname: "/list-storage/storage-form",
                            }}
                          >
                            <FaEye className="mr-1" size={16} /> Preview
                          </Link>
                        </div>
                      )}
                    </div>
   <div className="pt-2">
  <button
    onClick={() => handleStatusChange(items?.propertyId, items?.status)}
    disabled={loadingBtnId === items?.propertyId}
    className={`w-full lg:w-fit px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2
      ${
        items?.isActive === false
          ? "bg-red-500 text-white"
          : "bg-[#8DC63F] text-white"
      }
      ${
        loadingBtnId === items?.propertyId ? "opacity-70 cursor-not-allowed" : ""
      }`}
  >
    {loadingBtnId === items?.propertyId ? (
      <>
        <Spin size="small" />
        <span>Updating...</span>
      </>
    ) : items?.isActive ? (
      "Mark as Inactive"
    ) : (
      "Mark as Active"
    )}
  </button>
</div>

                  </div>
   
                </div>





                {/* use conditions here to display or hide warning or info alerts */}
              </div>
            );
          })}
        {loader && <Loader />}
      </div>
    </>
  );
}
