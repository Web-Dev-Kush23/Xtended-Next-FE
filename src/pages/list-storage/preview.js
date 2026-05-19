import Link from "next/link";
// import SimpleSlider10 from "@/sharedComponent/slider9"
import SimpleSlider11 from "@/sharedComponent/slider10";
import ListStorageForm from "@/components/liststorageform";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { AMENTICS } from "@/util/constant";

import { useSearchParams } from "next/navigation";
import { getCurrentUserPendingListingByPropertyId } from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useRouter } from "next/router";

export default function CustomModalBody({setModalShow}) {
    
  const { listStorage: { value } } = useSelector((state) => state);
  const formInputStyle =
    "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-sm font-semibold text-gray-700";
  const formSelectStyle = "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const searchParams = useSearchParams();
  const PID = searchParams.get("propertyId");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&PropertyId=${PID}`;
      const resp = await getCurrentUserPendingListingByPropertyId(args);
      console.log(resp , "resp");
      
      if (resp?.success) {
        setData(resp?.success?.data);
      }
    })()
  }, [searchParams]);



  return (
    <div className="max-w-[1550px] mx-auto w-full">
    

 
    <div class="w-full mx-auto p-2 lg:p-4 space-y-6">
    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 flex items-center justify-between border-b">
            <h2 class="text-lg font-semibold">Property Details</h2>
            {/* <button class="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
            </button> */}
        </div>
        <div class="p-6">
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Property Type</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.PropertyType"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Storage Type</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.StorageType"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">What would you like to store?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.Category"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">What best describes your space?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.propertySpace"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">How frequently can renters access their items? </p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.TenantVisitFrequency"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Which time suits best for you?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage1.TenantVisitTiming"] || ""}</p>
            </div>
           
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Amenities of your space</p>

        <div className="flex items-center flex-wrap flex-col md:flex-row gap-2">
        {
                  !!value['stage1.Amenities'] && value['stage1.Amenities'].map((item) => {
                    return (
                      <>
                        <div class="max-h-[120px] w-full lg:w-1/2 px-2 items-start gap-2  flex   ">
                          <div
                            className=" text-[20px] md:text-[20px] text-[#1B1C57]">
                            {AMENTICS[item]?.icon}

                          </div>

                          <div className="w-[300px] pl-[10px]">
                            <h2 class="text-sm font-semibold text-[#1B1C57]">
                              {AMENTICS[item]?.title}

                            </h2>
                            <p className="text-xs font-semibold text-[14px]">
                              {AMENTICS[item]?.desc}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
        </div>
            </div>
            
        </div>
       
    </div>
    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 flex items-center justify-between border-b">
            <h2 class="text-lg font-semibold">Address</h2>
           
        </div>
        <div class="p-6">
        <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Floor</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.Floor"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Is Lift Available?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.IsLiftAvailable"] || ""}</p>
            </div>
        <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Enter your Address</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.Address"] || ""}</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.Address2"] || ""}</p>

            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Pincode</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.PinCode"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">City</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.City"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">State</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage2.State"] || ""}</p>
            </div>
            </div>
    </div>
    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 flex items-center justify-between border-b">
            <h2 class="text-lg font-semibold">Space Photo</h2>
           
        </div>
        <div class="p-6">
        <div className="mt-4 border rounded-lg p-4">
        <p className="text-base font-semibold">Photos</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="photoGrid">
            {value['stage3.PropertyImages']?.map((image, index) => (
            <img key={index} className="w-24 h-24 rounded-lg" src={URL.createObjectURL(image)} alt={`Photo ${index + 1}`} />
          ))}
            </div>
            
        </div>
          <div className="mt-4 border rounded-lg p-4">
    <p className="text-base font-semibold">Uploaded Video</p>
    {value['stage3.PropertyVideo'] ? (
      <video
        className="w-[300px] h-[200px] rounded-lg mt-2"
        controls
        src={URL.createObjectURL(value['stage3.PropertyVideo'])}
      >
        Your browser does not support the video tag.
      </video>
    ) : (
      <p className="text-gray-500 mt-2">No video uploaded</p>
    )}
  </div>
  <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Daily Rental Price</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.PerDayRentalAmount"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold"> Annual Earning Potential</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.annualEarningPotential"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Minimum Number of Booking days</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.MinimumBookingDays"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Describe your space</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.Description"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Would you like to offer a 50% discount for the first month?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.IsFirstMonthDiscount"] || ""}</p>
            </div>
            <div class="mt-4 border rounded-lg p-4">
            <p class="text-base font-semibold">Would you like to review booking requests for this listing?</p>
                <p class="text-[1.125rem] text-gray-500">{value["stage3.IsAutoApproval"] || ""}</p>
            </div>
</div>

    </div>

    {/* <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 flex items-center justify-between border-b">
            <h2 class="text-lg font-semibold">Description</h2>
           
        </div>
        <div class="p-6">
            <p class="text-base font-semibold mb-4">{value['stage3.Description'] || ""}</p>
            <div class="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
                <p class="text-yellow-600">Double check that your listing has at least one complete sentence describing the space.</p>
            </div>
        </div>
    </div>

    <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 flex items-center justify-between border-b">
            <h2 class="text-lg font-semibold">1st month discount</h2>
           
        </div>
        <div class="p-6">
            <p class="text-base font-semibold">Offer discount</p>
        </div>
    </div> */}

    <div class="flex gap-4 justify-center">
        <Link href="/list-storage/hostListStorage" class="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview listing
        </Link>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit for Review
        </button>
    </div>
</div>
  </div>
  );
}
