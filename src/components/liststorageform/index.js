import React, { useEffect, useState } from "react";
import SpacePhoto from "./SpacePhoto";
import BankDetails from "./BankDetails";
import SpaceDetails from "./SpaceDetails";
import SpaceAddress from "./SpaceAddress";
import { getUserId, localStorageManager } from "@/util/common";
import { useRouter } from "next/router";
import { getCurrentUserPendingListingByPropertyId } from "@/service/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";
import { useSearchParams } from "next/navigation";


const ListStorageForm = ({data}) => {
  console.log(data , "data")
  const [currentItem, setCurrentItem] = useState("spaceDetails");
  const [PropertyId, setPropertyId] = useState(1468);
  const [userId, setUserId] = useState();
  const [completedSteps, setCompletedSteps] = useState({
    spaceDetails: false,
    spaceAddress: false,
    spacePhoto: false,
    bankDetails: false,
  });
  const router = useRouter();
  const [bankDetails, setBankDetails] = useState();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const PID = searchParams.get("propertyId");
  const [loader, setLoader] = useState(false);

  const handleItemClick = (item) => {
    // Prevent clicking on the next step if the previous form is not completed
    if (
      (item === "spaceAddress" && !completedSteps.spaceDetails) ||
      (item === "spacephoto" && !completedSteps.spaceDetails) ||
      (item === "spacephoto" && !completedSteps.spaceAddress) ||
      (item === "bankdetails" && !completedSteps.spaceDetails) ||
      (item === "bankdetails" && !completedSteps.spaceAddress) ||
      (item === "bankdetails" && !completedSteps.spacePhoto)
    ) {
      return;
    }
    setCurrentItem(item);
  };

  useEffect(() => {
    const userData =
      localStorageManager.getValue("userDetails") &&
      JSON.parse(localStorageManager.getValue("userDetails"));
    setUserId(userData?.userId);
    if (!userData?.userId) {
      router.push('/login?callback=list-storage/storage-form'); // Navigate to the login page
    }
    !!PID && getDataById(PID)
  }, [router, searchParams]);

  function flattenObjectWithCapitalizedKeys(obj, parentKey = '', result = {}) {
    for (const [key, value] of Object.entries(obj)) {
        // Capitalize the last key in the path
        if (value === null) continue;
        const isNested = typeof value === 'object' && value !== null && !Array.isArray(value);
        const newKey = parentKey
            ? `${parentKey}.${key.charAt(0).toUpperCase() + key.slice(1)}`
            : key;

        if (isNested) {
          flattenObjectWithCapitalizedKeys(value, parentKey ? `${parentKey}.${key}` : key, result);
        } else {
            const lastKeyCapitalized = parentKey
                ? `${parentKey}.${key.charAt(0).toUpperCase() + key.slice(1)}`
                : key.charAt(0).toUpperCase() + key.slice(1);
            result[lastKeyCapitalized] = value;
        }
    }
    return result;
}

const getDataById = async(PID)=>{
  console.log("wwww", window.location.href)
  setLoader(true)
  let args = `?ApplicationUserId=${getUserId()}&PropertyId=${PID}`;
  const resp = await getCurrentUserPendingListingByPropertyId(args);
  console.log(resp , "resp");
  
  if (resp?.success) {
    console.log("new data", resp?.success);
    setLoader(false)
    dispatch(setListStorage(flattenObjectWithCapitalizedKeys(resp?.success?.data)));
   // setData(resp?.success?.data);
  }
}
  const markStepComplete = (step) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: true }));
  };
 if(PID && loader)  return   <p>Loding...</p> 
  return (
    <>
    
    <div className="flex justify-center items-center my-5">
  <ul className="flex items-center p-0 m-0">
    <li
      className={`flex items-center ${completedSteps.spaceDetails ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spaceDetails")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spaceDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        1
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.spaceAddress || completedSteps.spacePhoto || completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
       <span className={`h-1 w-10 ${currentItem === "spaceAddress" || currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceDetails ? "bg-lime-500" : "bg-gray-300")}`} />
    </li>
    <li
      className={`flex items-center ${completedSteps.spaceAddress ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spaceAddress")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spaceAddress ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        2
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.spacePhoto || completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
      <span className={`h-1 w-10 ${currentItem === "spacephoto" || currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spaceAddress ? "bg-lime-500" : "bg-gray-300")}`} />
       
    </li>
    <li
      className={`flex items-center ${completedSteps.spacePhoto ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("spacephoto")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.spacePhoto ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        3
      </div>
      {/* <span className={`h-1 w-10 ${completedSteps.bankDetails ? "bg-lime-500" : "bg-gray-300"}`} /> */}
      <span className={`h-1 w-10 ${currentItem === "bankdetails" ? "bg-lime-500" : (completedSteps.spacePhoto ? "bg-lime-500" : "bg-gray-300")}`} />
        
    </li>
    <li
      className={`flex items-center ${completedSteps.bankDetails ? "text-lime-500" : "text-gray-300"}`}
      onClick={() => handleItemClick("bankdetails")}
    >
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${completedSteps.bankDetails ? "bg-lime-500 text-white" : "bg-gray-300 text-gray-500"}`}>
        4
      </div>
    </li>
  </ul>
</div>

   
      {currentItem === "spaceDetails" && (
        <SpaceDetails
          setPropertyId={setPropertyId}
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spaceDetails"); }}
          userId={userId}
          setBankDetails={setBankDetails}
          data={data?.stage1}
        />
      )}
      {currentItem === "spaceAddress" && PropertyId && (
        <SpaceAddress
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spaceAddress"); }}
          PropertyId={PropertyId}
          userId={userId}
        />
      )}
      {currentItem === "spacephoto" && PropertyId && (
        <SpacePhoto
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("spacePhoto"); }}
          PropertyId={PropertyId}
          userId={userId}
        />
      )}
      {currentItem === "bankdetails" && PropertyId && (
        <BankDetails
          PropertyId={PropertyId}
          userId={userId}
          setCurrentItem={(item) => { setCurrentItem(item); markStepComplete("bankDetails"); }}
          bankdetails={bankDetails}
        />
      )}
    </>
  );
};

export default ListStorageForm;
