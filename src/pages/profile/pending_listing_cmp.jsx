import { getCurrentUserPendingListing, getCurrentUserPendingListingByPropertyId } from "@/service/storageService";
import { getUserId } from "@/util/common";
import React, { useEffect, useState } from "react";

const index = () => {

  const [currentUserPendingListing, setCurrentUserPendingListing] = useState([]);
  // console.log("currentUserPendingListingByPropertyId========================", currentUserPendingListing);
  useEffect(() => {
    // 819
    let args = `?ApplicationUserId=${getUserId()}`;
    // let args = `?ApplicationUserId=819&PropertyId=`;
    (async () => {
      const getCurrentUserPendingListing_response = await getCurrentUserPendingListing(args);
      if (getCurrentUserPendingListing_response?.success) {
        setCurrentUserPendingListing(getCurrentUserPendingListing_response?.success?.data);
      }
    })();
  }, [])
    return (
        <React.Fragment>
            <div className={`flex flex-col lg:ml-12 mx-3 mt-8 mb-8`}>
                {
                    !!currentUserPendingListing.length && currentUserPendingListing.map((item, index) => {
                        return (
                            <div className="" key={index}>{index}</div>
                             
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default index;