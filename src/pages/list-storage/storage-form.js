import Link from "next/link";
// import SimpleSlider10 from "@/sharedComponent/slider9"
import SimpleSlider11 from "@/sharedComponent/slider10";
import ListStorageForm from "@/components/liststorageform";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import HeaderMenu from "@/components/header/header";
import { AMENTICS } from "@/util/constant";
import Breadcrumbs from "../profile/Breadcrumb";
import { useSearchParams } from "next/navigation";
import { getCurrentUserPendingListingByPropertyId } from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map"));
export default function Home() {
  const { listStorage: { value } } = useSelector((state) => state);
  const formInputStyle =
    "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-sm font-semibold text-gray-700";
  const formSelectStyle = "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const searchParams = useSearchParams();
  const PID = searchParams.get("propertyId");
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const router = useRouter();
  const Status = searchParams.get("status");
  useEffect(() => {
    (async () => {
      const ApplicationUserId = getUserId();
      if (ApplicationUserId && PID) { // Check if both ApplicationUserId and PropertyId are present
        let args = `?ApplicationUserId=${ApplicationUserId}&PropertyId=${PID}`;
        const resp = await getCurrentUserPendingListingByPropertyId(args);
        console.log(resp, "resp");
        
        if (resp?.success) {
          setData(resp?.success?.data);
          setUser(resp?.success);
        }
      }
    })();
  }, [searchParams, PID]);
  
 // console.log("data=====", data);

  // const [spaceData, setSpaceData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {

  //       const data = await spaceListig();


  //       setSpaceData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //   };
  // }, []);


  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      <HeaderMenu />
      {Status ? (
        // Display Back Button when Status is present
        <div className="flex items-center justify-start mt-3 lg:ml-[100px] ">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-[rgb(33 37 41)] mb-2 rounded flex items-center"
          >
            <span class="mx-1"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
  <path fill="none" d="M0 0h24v24H0z"></path>
  <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
  <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
</svg>
 </span> <span>Back</span>
          </button>
        </div>
      ) : (
        // Display Breadcrumbs when Status is not present
        <div className="md:flex items-center justify-start hidden md:absolute mt-3 ml-12">
          <li key="home" className="flex items-center justify-start">
            <Link href="/" legacyBehavior>
              <a className="">Home</a>
            </Link>
          </li>
          <Breadcrumbs />
        </div>
      )}
 
      <section className="lsform h-[auto] w-full md:px-4 md:pr-0 bg-slate-50  justify-evenly pt-5 flex-col md:flex-row flex">
        <div className={`lsdefault max-w-full  h-[100%] pt-0 p-4 rounded-3xl bg-white overflow-hidden ${Status === "Approved" ? "block md:w-[85%]" : "hidden md:block md:w-[70%]"} md:sticky top-[-70px]`}>
          <h3 className="bg-blue-100 mb-2 p-3 mx-[-22px] text-sm md:text-xl font-semibold text-[#1B1C57] ">
            Preview
          </h3>
          <div className="bg-blue-50 flex items-center gap-2 p-2.5 my-2 rounded-full w-[150px]">
            <img src="/images/icon/ph_house-fill.svg" alt="" />
            <h3 className="text-[15px] font-bold text-[#1B1C57] m-0">{value['stage1.StorageType']}</h3>          </div>
          <div className=" w-full h-[auto] md:mb-[60px] flex-col md:flex-row  flex">
            <div className="max-w-full md:w-1/2 h-[auto] mb-[auto] ">
              <SimpleSlider11 imageData={value} />
            </div>
            <div className="max-w-full md:w-1/2 h-[auto] gap-2 p-3 pt-0 flex-col mt-[50px] md:mt-0 flex justify-between">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1B1C57]">
                Storage space in {!!value['stage2.Address'] && value['stage2.Address']}
                {/* Storage space in Maninagar, Delhi */}
              </h3>
              <div className=" flex gap-2 py-2.5  rounded-full ">
                <img src="/images/icon/Location.svg" alt="" />
                <h3 className="text-[18px] font-normal text-[#1B1C57]">
                  {!!value['stage2.State'] && value['stage2.State']}
                </h3>
              </div>
              <div className="bg-[#F7F9FB]  rounded-2xl p-[10px] h-[60px]">
                <h3 className="text-[18px] font-semibold text-[#1B1C57]">
                  ₹{value['stage3.PerDayRentalAmount']} <span className="font-normal">/ Day</span>
                </h3>
                <p className="text-gray-700 text-[16px]">
                  Minimum {value['stage3.MinimumBookingDays']} Days booking Required
                </p>
              </div>
              <p className="text-gray-700 text-[16px]">
                {value['stage3.Description'] || "Summary"}
              </p>
              {value['stage1.LengthInFeet'] || value['stage1.WidthInFeet'] || value['stage1.HeightInFeet'] ? (
                <div className="flex justify-between">
                  <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                    Length: {!!value['stage1.LengthInFeet'] && value['stage1.LengthInFeet'] + " ft"}
                  </h4>
                  <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                    Width: {!!value['stage1.WidthInFeet'] && value['stage1.WidthInFeet'] + " ft"}
                  </h4>
                  <h4 className="text-[16px] font-semibold text-[#1B1C57]">
                    {!!value['stage1.HeightInFeet'] && "Height:" + value['stage1.HeightInFeet'] + " ft"}
                  </h4>

                </div>

              ) : (
                <h3 className="text-[20px] py-3 px-2 rounded-2xl font-semibold bg-slate-50 ">
                  Space size
                </h3>
              )}
              <h3 className="text-[20px] py-3 px-2 rounded-2xl  font-semibold bg-slate-50 text-blue-400">
                {/* Sq.Ft:{!!value['stage1.LengthInFeet'] && ((Number(value['stage1.LengthInFeet'])) * (Number(value['stage1.WidthInFeet'])) )+ 'ft'} */}
                Sq.Ft: {value['stage1.LengthInFeet'] && value['stage1.WidthInFeet'] ? ((Number(value['stage1.LengthInFeet'])) * (Number(value['stage1.WidthInFeet']))) + ' ft' : '0 ft'}

              </h3>
            </div>
          </div>
          {Status === "Approved" && (
            <div>
           <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-zinc-600 text-center bg-white py-4 rounded">
                <div className="border-r px-2 ">
                  <span class=" text-zinc-800 py-2 leading-loose ">
                  First Month Discount
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px] ">
                    {/* 1BHK (300-400 sq ft) */}
                    {/* {data?.propertyStorageType?.propertySize} ( 
                    {data?.propertyStorageType?.minimumSquareFeet} - 
                    {data?.propertyStorageType?.maximumSquareFeet} sq.ft.) */}
                    {data?.stage3?.isFirstMonthDiscount ? "Yes" : "No"}
                  </p>
                </div>

                {data?.stage1?.entranceWidthInFeet > 0 && data?.stage1?.entranceHeightInFeet > 0 && (
                  <div className="border-r px-2">
                    <span className="text-zinc-800 py-2 leading-loose">
                      Entrance
                    </span>
                    <p className="text-blue-400 font-semibold text-[17px]">
                      {data?.stage1?.entranceWidthInFeet}X{data?.stage1?.entranceHeightInFeet} ft
                    </p>
                  </div>
                )}

                <div className="border-r px-2">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Storage Type
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data?.stage1?.propertyType}
                  </p>
                </div>
                <div className="px-2 xl:px-4">
                  <span class=" text-zinc-800 py-2 leading-loose">
                    Access Flexibility
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data?.stage1?.tenantVisitFrequency}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
            <img
              src="/images/icon/Avatar Base.svg"
              alt="User Avatar"
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.hostFullName}</h2>
              <p>Joined {user.customerCreatedDate}</p>
              <p>{user.totalCustomerSpace} Spaces</p>
            </div>
          </div>
          </div>
          )}
          <section className="w-[100%] h-[auto] max-h-auto bg-[#F7F9FB] mt-10 max-w-auto ">
            <div className="">
              <h2 className="text-xl md:text-2xl py-3  p-3 md:text-left font-semibold text-[#1B1C57]">
                Amenities
              </h2>

              <div class="flex flex-wrap md:gap-[0px] justify-between  max-w-[90vw]  md:border-black rounded-3xl ">
                {
                  !!value['stage1.Amenities'] && value['stage1.Amenities'].map((item) => {
                    return (
                      <>
                        <div class="h-[110px] w-full md:w-1/3 px-2 items-start gap-1  flex   ">
                          <div
                            className=" text-[20px] md:text-[34px] text-[#1B1C57]">
                            {AMENTICS[item]?.icon}

                          </div>

                          <div className="w-[300px] pl-[20px]">
                            <h2 class="text-[14px] md:text-[18px] font-semibold text-[#1B1C57]">
                              {AMENTICS[item]?.title}

                            </h2>
                            <p className="text-gray-600 text-[14px]">
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
          </section>
<div className={`${Status === "Approved" ? "block" : "hidden"} py-4`}>
<Map lat={data?.stage2?.latitude} lng={data?.stage2?.longitude} type="P2P" />
</div>
        </div>
        
        <div className={`listspaceform w-full md:w-[25%] h-[auto] px-2 ${
    Status === "Approved" ? "hidden" : ""
  }`}>
          <div class="col-md-12">
            <div class="list-space-form bg-white p-2">
              <div class="row align-items-center my-4">
                <div class="col-md-10">
                  <h2 class="text-[25px] ml-3 font-semibold text-[#1B1C57]">
                    List your space
                  </h2>
                </div>
                <div class=" text-end">
                  <a href="#" class="link f">
                    <i class="fa fa-times" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div class="row d-flex justify-content-center">
                <div class="">
                  <div class="wizard">
                    <ListStorageForm data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
