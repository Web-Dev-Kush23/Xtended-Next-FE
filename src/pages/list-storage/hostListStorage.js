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
import { MdOutlineShare } from "react-icons/md";
import { FaHeart } from "react-icons/fa";


const hostListStorage = () => {
  const { listStorage: { value } } = useSelector((state) => state);
  const formInputStyle =
    "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-sm font-semibold text-gray-700";
  const formSelectStyle = "w-full px-4 py-2 mt-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white";
  const searchParams = useSearchParams();
  const PID = searchParams.get("propertyId");
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
    <HeaderMenu />

    <div className="section w-full h-auto  md:bg-white">
      <div class=" w-full mx-auto px-4 ">

        <div class="flex flex-col lg:flex-row gap-4 md:px-[50px]  ">
          <div class="  lg:w-3/5">
            <div class="flex items-center gap-2 md:px-4">
              <div className="middle_seccalculatorstorage flex justify-between   w-full py-3 ">
                {/* <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#FEF2DB] px-2 py-2 rounded-full">
              <img
                src="/images/calculator/ph_house-fill.svg"
                alt="household1"
                className="w-full md:w-15"
              />
              <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                {data.propertyType}
              </div>
            </div> */}

              </div>

            </div>

            <div className="w-full h-[auto] py-2 md:p-4 mx-auto md:px-[50px] ">
            <SimpleSlider11 imageData={value} />

            </div>
            {/* {data.description && data.description.split(' ').length >= 3 ? ( */}
            <div className=" w-full flex items-center mt-[80px] md:mt-[150px] mb-4">
              <div className="w-[80%]">
                <p className="text-zinc-600   text-[16px]">
                  {/* {truncateDescription(data.description, 15)} */}

                  {`Affordable ${data.propertyType} Storage Space Near ${data.address2} in ${data.city}.`}
                </p>
              </div>
              <div className="w-[20%]">
                <div className="flex gap-2 md:gap-4">      <span
                  className="p-[10px] bg-[#0000002a] rounded-full cursor-pointer relative"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <MdOutlineShare />


                  {showDropdown && (
                    <div className="absolute top-[40px] left-0  rounded-md w-10 z-10 bg-white shadow">
                      <div
                        className=" items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer  "
                        onClick={() => handleShare("whatsapp")}
                      >
                        <FaWhatsapp className="text-green-500 text-[20px]" />

                      </div>
                      <div
                        className=" items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer "
                        onClick={() => handleShare("facebook")}
                      >
                        <FaFacebook className="text-blue-500 text-[20px]" />

                      </div>
                      <div
                        className="items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleShare("email")}
                      >
                        <IoMdMailUnread className="text-red-600 text-[20px]" />
                      </div>


                      <div
                        className="items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer md:hidden"
                        onClick={() => handleShare("message")}
                      >
                        <FaSms className="text-blue-600 text-[20px]" />
                      </div>
                    </div>

                  )}
                </span>

                  <div
                    className={`p-[10px] bg-[#0000002a] rounded-full`}
                    // onClick={handleHeartClick}
                  >
                    {/* <FaHeart className={wishinglist[data.propertyId] ? 'text-red-600' : 'text-gray-400'} /> */}
                  </div></div>
              </div>
            </div>

            {/* ) : (
<p className="text-zinc-600 mb-4 mt-[80px] md:mt-[150px] text-[16px]">
  {`A ${data.sqrFeet ?? 0} sq ft ${data.spaceType} storage in ${data.city}, ${data.state}. It rents for ₹${data.perDayRentalAmount ?? 0} per day and is ideal for ${data.propertyType.toLowerCase()}.`}
</p>
)} */}

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-zinc-600 text-center bg-white py-4 rounded">
              <div className="border-r px-2 ">
                <span class=" text-zinc-800 py-2 leading-loose ">
                  Property Size
                </span>
                <p className="text-blue-400 font-semibold text-[17px] ">
                  {/* 1BHK (300-400 sq ft) */}
                  {/* {data?.propertyStorageType?.propertySize} ( 
                  {data?.propertyStorageType?.minimumSquareFeet} - 
                  {data?.propertyStorageType?.maximumSquareFeet} sq.ft.) */}
                  {data?.sqrFeet} sq.ft.
                </p>
              </div>

              {data.entranceWidthInFeet > 0 && data.entranceHeightInFeet > 0 && (
                <div className="border-r px-2">
                  <span className="text-zinc-800 py-2 leading-loose">
                    Entrance
                  </span>
                  <p className="text-blue-400 font-semibold text-[17px]">
                    {data.entranceWidthInFeet}X{data.entranceHeightInFeet} ft
                  </p>
                </div>
              )}

              <div className="border-r px-2">
                <span class=" text-zinc-800 py-2 leading-loose">
                  Storage Type
                </span>
                <p className="text-blue-400 font-semibold text-[17px]">
                  {data.propertyType}
                </p>
              </div>
              <div className="px-2 xl:px-4">
                <span class=" text-zinc-800 py-2 leading-loose">
                  Access Flexibility
                </span>
                <p className="text-blue-400 font-semibold text-[17px]">
                  {data.tenantVisitFrequency}
                </p>
              </div>
            </div>
            <div class=" col-span-2 flex flex-col md:flex-row items-center bg-[#F7F9FC] rounded  bg-gray-10 p-[20px]  justify-between">
              <img
                className="w-[250px] h-[250px]"
                src="/images/product/Floor-Plan.png"
                alt=""
              />

              <div className="ht1 md:px-2">
                <div className=" ht1 items-center md:max-w-[100%]">
                  <h1 className="text-[#1B1C57] font-semibold text-2xl leading-7 ">
                    {data?.propertyStorageType?.propertySize}

                    <span className="text-[#1B1C57] leading-5 text-xl font-normal ">
                      ( {data?.propertyStorageType?.minimumSquareFeet}-
                      {data?.propertyStorageType?.maximumSquareFeet} sq ft.)
                      {/* (500-700 sq ft.) */}
                    </span>
                  </h1>
                </div>
                <div className="md:max-w-[100%] ht1  ">
                  <h3 className="text-[#626687] font-normal leading-6 text-xs">
                    Type of items that can be stored here
                  </h3>
                </div>

                <div class="flex flex-wrap gap-[10px] lg:gap-[15px] justify-evenly md:justify-start mt-4   max-w-[100%]   rounded-3xl mx-auto">
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px]  items-center justify-between  flex    rounded-2xl bg-white">
                    <img
                      className="w-[35px] h-[35px]"
                      src="/images/icon/Box (1).svg"
                      alt=""
                    />

                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">
                        {/* {preData?.easyStorageType.largeItem}  Large */}
                        {data?.propertyStorageType?.smallItem} Small
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center  justify-between  flex   rounded-2xl bg-white">
                    <img
                      className="w-[30px] h-[30px]"
                      src="/images/icon/Box (1).svg"
                      alt=""
                    />
                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">

                        {data?.propertyStorageType?.mediumItem} Medium
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                    <img
                      className="w-[25px] h-[25px]"
                      src="/images/icon/Box (1).svg"
                      alt=""
                    />

                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">
                        {data?.propertyStorageType?.largeItem} Large
                      </h2>
                    </div>
                  </div>
                  <div class="gap-3 h-[50px] w-[auto] md:w-[auto] p-[10px] items-center justify-between  flex    rounded-2xl bg-white">
                    <img
                      className="w-[20px] h-[20px]"
                      src="/images/icon/Box (1).svg"
                      alt=""
                    />
                    <div className="w-[auto]">
                      <h2 class="text-[14px] md:text-[18px] ">

                        {data?.propertyStorageType?.box} Boxes(approx)
                      </h2>
                    </div>
                  </div>
                </div>
                {/* <div class="flex items-center justify-center  mt-30">
                  <a
                    class="link font-bold text-center text-blue-600 text-[16px] md:text-[18px] mt-[20px]"
                    href="/images/home/xtended price list.pdf"
                    target="blank"
                  >
                    See Pricing List
                  </a>


                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5  lg:mt-[50px]">
            <div className="storagespace-right-heading ">
              <div className="inline-flex justify-center items-center md:justify-start gap-1 bg-[#FEF2DB] px-4 py-2 rounded-full ">
                <img
                  src="/images/calculator/ph_house-fill.svg"
                  alt="household1"
                  className=" md:w-[20px]"
                />
                <div className="text-lg whitespace-nowrap text-blue-600  w-auto"> For {" "}
                  {data.propertyType}
                </div>
              </div>
              <div className="text-[#000000] font-medium text-lg text-wrap md:text-2xl py-2">
                Storage space in {data?.city}, {data?.state}
              </div>
              <div className="text-lg whitespace-nowrap w-auto font-semibold">Dimensions  - {data.lengthInFeet}' X {data.widthInFeet}'
              </div>

            
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ml-[100px] p-4 md:max-w-[900px]">
        <div className="flex items-center space-x-4">
          <img
            src="/images/icon/Avatar Base.svg"
            alt="User Avatar"
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{data.hostFullName}</h2>
            <p>Joined {data.customerCreatedDate}</p>
            <p>{data.totalCustomerSpace} Spaces</p>
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4 text-[20px] md:text-[30px]">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!!value['stage1.Amenities'] && value['stage1.Amenities'].map((item) => (
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 text-xl">
                {AMENTICS[item]?.icon}
                </div>
                <div>
                  <h4 className="capitalize text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
                  {AMENTICS[item]?.title}
                  </h4>
                  <p className="text-[16px]">{AMENTICS[item]?.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <button className="mt-4 text-blue-500">Show more &gt;</button> */}
        </div>
        <div className="virtualclass mt-6 p-6 rounded-lg shadow md:flex items-center">
          <img
            src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Easy-Storage.webp"
            alt="VR Image"
            className="mr-4"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">
              Easy Storage Services at Xtended Space.
            </h3>
            <p className="text-zinc-500">
              Xtended Space simplifies your warehousing challenges with
              convenient storage solutions for household and business needs.
            </p>
            <div className="">
              <Link
                href="/easy-storage"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Easy Storage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="otherplace mt-3 mb-3">
        {/* <MultipleItems /> */}
      </section>

      <div class="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md max-w-[1240px] mx-auto my-6 ">
        <h2 class="text-xl font-semibold mb-4 dark:text-white">
          Things to Know
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 class="font-semibold mb-2 dark:text-zinc-300">
              Property Rules
            </h3>
            <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
              <li>
                <img
                  src="/images/icon/clock (1).svg"
                  alt="clock"
                  class="inline mr-2 w-6 h-6"
                />
                Check-in: After 4:00 PM
              </li>
              <li>
                <img
                  src="/images/icon/clock (1).svg"
                  alt="clock"
                  class="inline mr-2 w-6 h-6"
                />
                Checkout: 10:00 AM
              </li>
              <li>
                <img
                  src="/images/icon/Cart Vector (3).svg"
                  alt="baby"
                  class="inline mr-2 w-6 h-6"
                />
                Not suitable for infants (under 2 years)
              </li>
              <li>
                <img
                  src="/images/icon/pets.svg"
                  alt="no pets"
                  class="inline mr-2 w-6 h-6"
                />
                No pets
              </li>
              <li>
                <img
                  src="/images/icon/party (1).svg"
                  alt="no parties"
                  class="inline mr-2 w-6 h-6"
                />
                No parties or events
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2 dark:text-zinc-300">Safety</h3>
            <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
              <li>
                <img
                  src="/images/icon/wind (1).svg"
                  alt="alarm"
                  class="inline mr-2 w-6 h-6"
                />
                Carbon monoxide alarm
              </li>
              <li>
                <img
                  src="/images/icon/smoke1.svg"
                  alt="alarm"
                  class="inline mr-2 w-6 h-6"
                />
                Smoke alarm
              </li>
              <li>
                <img
                  src="/images/icon/credit-card (1).svg"
                  alt="security deposit"
                  class="inline mr-2 w-6 h-6"
                />
                Security Deposit - If you damage the property, you may be
                charged up to ₹15000
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2 dark:text-zinc-300">Insurance</h3>
            <ul class="space-y-2 text-zinc-700 dark:text-zinc-400">
              <li>
                <Link href="https://xtendedspace.s3.ap-south-1.amazonaws.com/Xtended+Space+Insurance+Policy.pdf" target="blank" class="text-black">
                  Check the Insurance Policies
                </Link>
              </li>
              <li>
                <Link
                  href="https://xtendedspace.s3.ap-south-1.amazonaws.com/Xtended+Space+Insurance+Policy.pdf"
                  target="blank"
                  class="text-blue-500 dark:text-blue-400 font-bold"
                >
                  Insurance ›
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="simplyfy_storage flex flex-col md:flex-row items-center justify-between p-8 ">
        <div class="md:w-1/2 pl-2">
          <h1 class="text-[22px] md:text-[48px]   font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Simplify Your Storage Experience with Easy Storage
          </h1>
          <p class="text-zinc-700 text-[17px] md:text-[18px]  mb-6">
            Everything you need about finding the best, safe and affordable
            storage space near you.
          </p>
          <Link
            href="/easy-storage"
            class="flex justify-center items-center  w-[18rem] h-[3rem] px-3 py-4 bg-[#FFFFFF] shadow-custom rounded-lg"
          >
            Explore Easy Storage
          </Link>
        </div>
        <div class="md:w-1/2 flex justify-center">
          <img
            src="/images/list-storage/storage-solutionimg.png"
            alt="Storage Boxes"
            class="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
    {/* <LoginModal
  show={loginModal}
  onHide={() => setLoginModal(false)}
  setLoginModal={setLoginModal}
  setRegisterModal={setRegisterModal}
  navigateTo={"/affordable-storage"}
  p2p={true}
  saveBooking={saveBooking}

/> */}


{/* <RegisterModal
  show={registerModal}
  onHide={() => setRegisterModal(false)}
  setRegisterModal={setRegisterModal}
  navigateTo={"/affordable-storage"}
  p2p={true}
  saveBooking={saveBooking}
/> */}
    {/* <Footer /> */}
    {/* {loader && <Loader />} */}
  </div>
  )
}

export default hostListStorage