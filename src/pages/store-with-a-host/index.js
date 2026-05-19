import {
  getAllStorage,
  AddPropertyToWishlist,
  RemoveWishlist,
  GetUserWishlistData,
} from "@/service/storageService";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import FormModal from "@/sharedComponent/modal/shortby";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { Pagination } from "antd";
import { DatePicker } from "antd";
import moment from "moment";
import HeaderMenu from "@/components/header/header";
import Head from "next/head";
import Footer from "@/components/footer";
import { useDebounce, useGeoLocation } from "@/util/useHooks";
import { useRouter } from "next/router";
import { getUserId, localStorageManager } from "@/util/common";
import dayjs from "dayjs";
import { DecryptUserId } from "@/service/storageService";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import banner_1 from "../../../public/images/home/liststorage-banner.jpg";
import Skelton from "@/components/Skelton";
import { useSearchParams } from "next/navigation";
import AutocompleteInput from "@/components/Autocompletep2p";
import { BiCalendarEvent } from "react-icons/bi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import ThreeSixtyModal from "@/components/threesixty/ThreeSixtyModal";
import { Md360 } from "react-icons/md";
import MobileViewFilter from "@/components/MobileViewFilter";
import DesktopViewFilter from "@/components/DesktopViewFilter";


const Homepage = () => {
  const searchParams = useSearchParams();
  const minSquarefeet = searchParams.get("minSquarefeet");
  const maxSquarefeet = searchParams.get("maxSquarefeet");
  const [isOpen, setIsOpen] = useState(null);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState();

  const initialFilterState = {
    propertyType: "",
    pricerange: "",
    StorageType: "",
    space_dimension: "",
    rating: "",
    FromDate: "",
    ToDate: "",
  };
  const [filter, setFilter] = useState({
    distance: 50,
  });
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [tripStart, setTripStart] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const distanceVal = useDebounce(filter.distance, 300);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const autocompleteRef = useRef();
  const [isInputActive, setIsInputActive] = useState(true);
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");
  const [page, setPage] = useState(15);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishinglist, setWishinglist] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [refreshHeader, setRefreshHeader] = useState(false);
  const [show360Modal, setShow360Modal] = useState(false);
  const [current360Image, setCurrent360Image] = useState(null);
  const [panoramicImageIndex, setPanoramicImageIndex] = useState(null);
  const [tab, setTab] = useState({
    sort_by: false,
    prop_type: false,
    price_range: false,
    distance: false,
    storage: false,
    time_duration: false,
    space_dimension: false,
    rating: false,
  });
  const options = {
    sort_by: false,
    prop_type: false,
    price_range: false,
    distance: false,
    storage: false,
    time_duration: false,
    space_dimension: false,
    rating: false,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const queryUserId = new URLSearchParams(window.location.search).get(
          "userId"
        );

        if (queryUserId) {
          setUserId(queryUserId);
          try {
            const response = await DecryptUserId(`?userId=${queryUserId}`);
            if (response?.success) {
              localStorageManager?.setValue(
                "userDetails",
                JSON.stringify(response.success.data)
              );
              const userData = JSON.parse(
                localStorageManager?.getValue("userDetails") || "{}"
              );
              setUserId(userData?.userId);
              setRefreshHeader(true);
            } else {
              console.error("Error decrypting User ID:", response?.error);
            }
          } catch (error) {
            console.error("Error in DecryptUser Id API call:", error);
          }
        } else {
          const userData = JSON.parse(
            localStorageManager?.getValue("userDetails") || "{}"
          );
          setUserId(userData?.userId);
        }
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const userData =
      localStorageManager.getValue("userDetails") &&
      JSON.parse(localStorageManager.getValue("userDetails"));
    setUserId(userData?.userId);
    if (!userData?.userId) {
    }
  }, [router]);
  const handleAddToWishlist = async (id) => {
    const args = `UserId=${userId}&PropertyId=${id}`;
    const response = await AddPropertyToWishlist(args);
    if (response.success) {
      getWishlistData();
    }
  };

  const handleRemoveFromWishlist = async (wishListId) => {
    const args = `?WishListId=${wishListId}`;
    const response = await RemoveWishlist(args);
    if (response.success) {
      getWishlistData();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      setCurrentUrl(url);
    }
  }, [router]);

  const handleToggle = (filterType) => {
    setIsOpen(isOpen === filterType ? null : filterType);
  };

  const getStorage = async (filterString) => {
    setLoading(true);
    let args = `?filterString=${filterString}`;

    if (userId !== undefined) {
      args += `&ApplicationUserId=${userId}`;
    }

    const response = await getAllStorage(args);

    setLoading(false);
    if (response.success) {
      setData(response.success);
    }
  };
  const getWishlistData = async () => {
    const args = `?ApplicationUserId=${getUserId()}`;
    const wishResult = await GetUserWishlistData(args);
    if (wishResult.success) {
      const mappedData = wishResult.success.reduce((acc, item) => {
        acc[item.propertyId] = item.wishListId;
        return acc;
      }, {});
      setWishinglist(mappedData);
    }
  };

  useEffect(() => {
    getWishlistData();
  }, []);

  const cords = useGeoLocation();
  let currentFilter = `&pageNo=${pageNo}&pageSize=${page}`;
  let newFilter = "";

  useEffect(() => {
    let updatedFilter = currentFilter;
    if (searchedLocation) {
      updatedFilter += `&userLatitude=${searchedLocation.latitude}&userLongitude=${searchedLocation.longitude}&cityName=${searchedLocation.cityName}`;
      setIsFilterChanged(true);
    } else if (cords?.latitude) {
      updatedFilter += `&userLatitude=${cords.latitude}&userLongitude=${cords.longitude}`;
    }

    if (filter) {
      Object.keys(filter).forEach((item) => {
        if (filter[item]) {
          updatedFilter += `&${item}=${filter[item]}`;
        }
      });
    }
    getStorage(updatedFilter);
  }, [filter, cords, page, pageNo, searchedLocation]);

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setIsFilterChanged(true);
    let formattedDate = "";
    if (name === "FromDate" || name === "ToDate") {
      if (value && value.isValid()) {
        // Check if value is a valid moment object
        formattedDate = value.format("DD/MM/YYYY");
      }
    } else {
      formattedDate = value;
    }

    if (name === "FromDate" || name === "ToDate") {
      setTripStart((prevTripStart) => ({
        ...prevTripStart,
        [name]: formattedDate,
      }));
      setFilter((prevFilter) => ({ ...prevFilter, [name]: formattedDate }));
    } else if (name === "space_dimension") {
      setTab({ ...tab, space_dimension: true });
      const dimentionArr = value?.split("-");
      setFilter({
        ...filter,
        MinSqrFeet: dimentionArr[0],
        MaxSqrFeet: dimentionArr[1],
      });
    } else if (name === "pricerange") {
      const dimentionArr = value?.split("-");
      setFilter({
        ...filter,
        MinPrice: dimentionArr[0],
        MaxPrice: dimentionArr[1],
      });
    } else if (name === "distance") {
      setFilter({ ...filter, distance: value });
      // setRangeVal(value);
    } else {
      setFilter({ ...filter, [name]: value });
    }

    if (name === "rating") {
      setTab({ ...tab, rating: true });
    }
    // setTab('');
  };

  const [contentDiv, setContentDiv] = useState(false);
  const divRef = useRef(null);

  const handleTabToggle = (tabName) => {
    setTab((prevState) => ({ ...options, [tabName]: !prevState[tabName] }));
    setContentDiv(true);
  };

  const clearFilter = () => {
    setFilter(initialFilterState);
    setTripStart({});
    setInputValue("");
    setFromDate(null);
    setToDate(null);
    setSearchedLocation(null);
    setIsFilterChanged(false);
    document.querySelectorAll("input[type=radio]").forEach((radio) => {
      radio.checked = false;
    });
    document.querySelectorAll("input[type=text]").forEach((input) => {
      input.value = "";
    });
    document.querySelectorAll("input[type=range]").forEach((input) => {
      input.value = input.min || "0";
    });
    autocompleteRef.current.clearValue();
  };

  function clearPropertyDetails() {
    const propertyDetailsKey = "propertyDetails";

    if (localStorage.getItem(propertyDetailsKey)) {
      localStorage.removeItem(propertyDetailsKey);
    }
  }
  useEffect(() => {
    clearPropertyDetails();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (minSquarefeet) {
        setFilter((prev) => ({
          ...prev,
          MinSqrFeet: minSquarefeet,
          MaxSqrFeet: maxSquarefeet,
        }));
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [minSquarefeet, maxSquarefeet]);

  const handleClick360 = (e, item, index) => {
    e.preventDefault();
    const proxyImageURL = `/api/image-proxy?url=${encodeURIComponent(
      item.propertyImage
    )}`;
    setCurrent360Image(proxyImageURL);
    setPanoramicImageIndex(index);
    setShow360Modal(true);
  };

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="images/logo/XtendedSpace.png"
          type="image/x-icon"
        />
        <link
          rel="alternate"
          href="https://www.xtendedspace.com/store-with-a-host"
          hreflang="en-in"
        />
        <title>Store with a Host - Affordable Storage Near You</title>
        <meta
          name="description"
          content="Looking for nearby storage space? Store with a trusted host through Xtended Space. Safe, flexible, and affordable storage solutions for all your needs."
        />
        <meta name="author" content="Xtended Space" />
        <meta
          name="keywords"
          content="Storage space listings, Find storage near me, Affordable storage units, Rent storage space, Secure storage options, Storage space for rent, Compare storage prices, Filter storage options, Available storage units, Nearby storage solutions"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.xtendedspace.com/store-with-a-host"
        />
        <meta property="og:title" content="Discover Nearby Storage Units" />
        <meta
          property="og:description"
          content="Browse affordable storage listings on Xtended Space. Use filters to customize your search for the perfect storage unit."
        />
        <meta
          property="og:image"
          content="/images/storagelisting/affordable-storage-space-xs.avif"
        />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Browse Storage Spaces - Xtended Space"
        />
        <meta
          property="og:url"
          content="https://www.xtendedspace.com/storagelisting"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Xtended Space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Find Storage Spaces - Xtended Space"
        />
        <meta
          name="twitter:description"
          content="Discover storage spaces tailored to your needs. Filter by size, price, and location for the best storage options around!"
        />
        <meta
          name="twitter:image"
          content="/images/storagelisting/affordable-storage-space-xs.avif"
        />
        <meta
          name="twitter:image:alt"
          content="Explore Storage Options Near You"
        />
      </Head>

      <div className="max-w-[1550px] mx-[auto] w-[100%]">
        <FormModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          ModalBody={() => (
            <ModalBody setModalShow={setModalShow} onChangeFilter={onChangeFilter} />
          )}
          className="addressAdd"
          size={"mm"}
          title=""
          onChangeFilter={onChangeFilter}
        />
        <HeaderMenu refresh={refreshHeader} />
        <div className="section w-full md:w-full h-auto md:h-auto">
          <div className="listing_bannersec w-full md:w-full min-h-10 h-auto">
            <div className="background_image flex flex-col md:flex-row items-start md:justify-evenly">
              <Image className="" src={banner_1} alt="image" priority />
            </div>
          </div>
        </div>

        <div className="storage_middlesection md:flex md:mt-[50px]">
          <MobileViewFilter
            isFilterChanged={isFilterChanged}
            clearFilter={clearFilter}
            tab={tab}
            handleTabToggle={handleTabToggle}
            onChangeFilter={onChangeFilter}
            filter={filter}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            distanceVal={distanceVal}
            autocompleteRef={autocompleteRef}
            setSearchedLocation={setSearchedLocation}
          />
          <DesktopViewFilter
            isFilterChanged={isFilterChanged}
            clearFilter={clearFilter}
            isOpen={isOpen}
            handleToggle={handleToggle}
            onChangeFilter={onChangeFilter}
            filter={filter}
            isInputActive={isInputActive}
            setIsInputActive={setIsInputActive}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            distanceVal={distanceVal}
            autocompleteRef={autocompleteRef}
            setSearchedLocation={setSearchedLocation}
          />
          <div className="wraper_right w-full md:w-3/4 h-[auto] md:h-[825px] scrollbar-width-none overflow-y-scroll ml-2 flex flex-wrap">
            {loading ? (
              <p className="loaderWrapper w-full flex m-1">
                {/* <span className="m-auto">Loading...</span> */}
                <Skelton />
              </p>
            ) : data?.data?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {data?.data?.map((item, index) => {
                  const isInWishlist = !!item.wishListId;
                  const url = item.url.split("https://xtendedspace.com/store-with-a-host");
                  let a = Math.ceil(((item?.squareFeet - item?.remainingSquareFeet) / item?.squareFeet) * 100);
                  return (
                    <>
                      <Link href={`/store-with-a-host/${url[1]}`}>
                        <div className="bg-white border-[1px] relative border-[#E5E5E5] rounded-[12px] shadow-md p-2 max-w-[350px] min-w-[240px]">
                          <div className="relative">

                            {item?.propertyImage && (<><img src={item.propertyImage} alt="Room Image" className="w-full h-[200px] object-cover rounded-[12px]" />{(a !== 0 && a !== 100) && !(item?.status === "Booked" || item?.remainingSquareFeet === 0 || (item?.storageType === "Independent" && item?.remainingSquareFeet !== item?.squareFeet)) &&
                              (<><div className="absolute top-0 left-0 bg-zinc-800 bg-opacity-50 bottom-0" style={{ width: `${a}%` }} /><div className="m-auto absolute top-1/2 text-white font-bold" style={{ left: `${a / 4}%` }}>{a}% Full</div></>)}</>)}


                            {userId && (
                              <div
                                className={`absolute bottom-2 left-2 bg-[#f5f5f5] text-red-500 rounded-full p-2 text-sm cursor-pointer shadow-md z-30`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  wishinglist[item.id]
                                    ? handleRemoveFromWishlist(
                                      wishinglist[item.id]
                                    )
                                    : handleAddToWishlist(item.id);
                                }}
                              >
                                <FaHeart
                                  className={
                                    wishinglist[item.id]
                                      ? "text-red-600"
                                      : "text-gray-400"
                                  }
                                />
                              </div>
                            )}
                            {/* <div
                              className={`absolute bottom-2 left-[50px] bg-[#f5f5f5] text-red-500 rounded-full p-2 text-sm cursor-pointer shadow-md z-30`}
                              onClick={(e) => {
                                e.preventDefault();
                                setShow360Modal(true);
                                setCurrent360Image(item.propertyImage);
                                setPanoramicImageIndex(index);
                              }}
                            >
                              <Md360 className="text-red-600" />
                            </div> */}

                            {/* <div className=" flex justify-center items-center text-center ">
                              <button
                                // onClick={(e) => {
                                //   e.preventDefault(); 
                                //   setShow360Modal(true);
                                //   setCurrent360Image(item.propertyImage); 
                                //   setPanoramicImageIndex(index); 
                                // }}
                                onClick={(e) => handleClick360(e, item, index)}
                                className=" text-white text-xs px-2 py-1 rounded"
                              >
                                <Md360  />
                              </button>
                            </div> */}

                            {item?.isOurProperty && (
                              <div className="absolute bottom-0 right-0 rounded-tl-xl rounded-none flex items-center cursor-pointer shadow-md z-10 bg-[#8DC63F] text-white text-sm font-medium p-1.5 ">
                                <RiVerifiedBadgeFill className="text-white mr-3 text-xl" />{" "}
                                Verified
                              </div>
                            )}
                            {((item?.remainingSquareFeet !== item?.squareFeet && item?.storageType === "Independent") || item?.status === "Booked" || item?.remainingSquareFeet === 0) && (<><div className="absolute inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50 text-white text-xl font-bold rounded-[12px]"><MdOutlineDoNotDisturbAlt className="text-4" />Sold out</div><div className="absolute top-12 inset-0 flex items-center justify-center text-white text-[12px] font-normal rounded-[12px]"><BiCalendarEvent className="text-4" />(available from {item?.availableNextDate})</div></>)}

                          </div>
                          <div className="">
                            <div className="flex absolute top-0 flex-wrap gap-2">
                              <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#eee] p-1.5 rounded-tl-[1px] rounded-br-[12px] rounded-bl-[0] rounded-tr-[0px] mt-2">
                                <img
                                  src="/images/calculator/ph_house-fill.svg"
                                  alt="household1"
                                  className=""
                                />
                                <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                                  <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                                    {item?.propertyType
                                      ?.split(" & ") // split correctly with spaces
                                      ?.slice(0, 2)  // take only first 2
                                      ?.join(" & ")  // join back with &
                                      ?.replace("Car Storage", "Vehicle Storage")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              {item?.isLockAndKey && (

                                <div className="flex absolute top-4 flex-wrap  right-4 bg-[#00000089] rounded-full p-1">
                                  <img
                                    src="\images\padlock.png"
                                    alt="lock and key"
                                    className="w-6 h-6 object-contain"
                                  />
                                </div>
                              )}
                            </div>


                            {/* {item?.propertyReview!==0 && <div className="flex absolute top-2 right-2 flex-wrap gap-2">
                              <div className="flex justify-center items-center text-blue-600 whitespace-nowrap gap-1 bg-[#eee] text-[14px] p-1.5 rounded-tl-[1px] rounded-br-[0px] rounded-bl-[12px] rounded-tr-[0px]">
                               <FaStar className="text-yellow-500 text-[12px]"/> {item?.propertyReview==0?"New":item?.propertyReview}
                              </div>
                            </div>} */}

                            <div className="flex justify-between items-center flex-wrap gap-2 p-2">
                              <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#fef2db] p-1.5 rounded-lg mt-2">
                                <img
                                  src="/images/calculator/ph_house-fill.svg"
                                  alt="household1"
                                  className=""
                                />
                                <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                                  {item?.spaceType}
                                </div>
                              </div>
                              <div className="flex justify-center items-center whitespace-nowrap gap-1 bg-[#fef2db] p-1.5 rounded-lg mt-2">
                                <img
                                  src="/images/calculator/ph_house-fill.svg"
                                  alt="household1"
                                  className=""
                                />
                                <div className="text-sm whitespace-nowrap text-blue-600 mr-2">
                                  {item?.storageType}
                                </div>
                              </div>
                            </div>

                            {/* <p className="text-zinc-700 mx-2 dark:text-zinc-300 text-sm mb-2">
                            <div className="text-sm whitespace-nowrap text-blue-600 mr-2">{item?.spaceType}</div>
                              {`Storage Space Near in ${item?.city?.trim()}.`}
                              Property Type: {item.propertyType}, City: {item.city}, Size: {item.lengthInFeet}*{item.widthInFeet} sqft, Price: ₹{item.rentalAmountPerDay}/Day
                            </p> */}

                            <div className="flex justify-between mb-2 mt-2">
                              <div className="flex ">
                                <img
                                  src="/images/icon/delhincrlocation.jpg"
                                  alt="Delhi1"
                                  className="w-6 h-6"
                                />
                                <span className="font-normal text-sm">
                                  {item?.city} {item?.addressLine2 ? `(${item.addressLine2})` : ""}

                                </span>
                              </div>
                              {/* <div className="flex">
                                <span className="text-sm text-zinc-600 font-bold">₹{parseFloat(item.perSquareFeetAmount).toFixed(2)}</span>
                                <span className="text-zinc-500 dark:text-zinc-400 text-sm">/sq.ft/day</span>
                              </div> */}

                              <div className="flex items-center">
                                {Array.from({ length: Math.floor(item?.propertyReview) }, (_, i) => { return (<div className="flex items-center"><FaStar className="text-yellow-500 mr-1 text-[14px]" /></div>) })}  {!Number.isInteger(item?.propertyReview) && <FaRegStarHalfStroke className="text-yellow-500 mr-1 text-[14px]" />} <span className="tex-[10px] text-yellow-500">({item?.propertyReview == 0 ? "New" : item?.propertyReview})</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center my-2">
                              <div className="flex justify-between w-full">
                                <div className="flex gap-1 item-center">
                                  <img
                                    src="/images/calculator/distance_vector.svg"
                                    alt="distance1"
                                    className="9"
                                  />
                                  <span className="text-sm font-normal">
                                    {item?.squareFeet} sq.ft
                                  </span>

                                </div>

                              </div>

                              {item?.storageType === "Shared" && item?.remainingSquareFeet !== item?.squareFeet &&
                                item?.remainingSquareFeet !== 0 && (
                                  <div className="text-right">
                                    <span className="text-sm text-zinc-600 font-normal">
                                      {item?.remainingSquareFeet}(remaining
                                      sq.ft.){" "}
                                    </span>
                                  </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                              <Link
                                href={`/store-with-a-host/${url[1]}`}
                                className="text-white font-semibold bg-[#338CFF] rounded leading-7  px-3 py-1 mr-5 cursor-pointer"
                              >
                                Book Now
                              </Link>

                              <div className="text-right">
                                {/* {item.discountPercentage > 0 && (
                                  <span className=" dark:text-zinc-400 text-sm text-green-500 px-1">{item.discountPercentage}% OFF </span>
                                )}
                                <div className="">

                                  {item.originalAmount >= item.rentalAmountPerDay && (

                                    <span className="line-through dark:text-zinc-400 text-sm text-red-500 px-1">₹{item.originalAmount}</span>


                                  )}
                                  <span className="text-lg text-zinc-600 font-bold">₹{item.rentalAmountPerDay}</span>
                                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">/Day</span>
                                </div> */}
                                <div className="">
                                  <p className="text-lg text-zinc-600 font-bold">₹{Math.floor(parseFloat(item.perSquareFeetAmount) * 50 * 30)}/Month</p>
                                  <p className="text-zinc-500 dark:text-zinc-400 text-[10px]">(per 50 sqft.)</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}

                {show360Modal && current360Image && (
                  <ThreeSixtyModal
                    imageURL={current360Image}
                    onClose={() => setShow360Modal(false)}
                  />
                )}
              </div>
            ) : (
              <div className="text-center p-4 flex items-center justify-center w-full">
                <h2 className="text-xl font-semibold text-gray-500">
                  No Property Found
                </h2>
              </div>
            )}
          </div>
        </div>
        {data?.data?.length > 0 && (
          <div className="flex justify-end m-6">
            <Pagination
              current={pageNo}
              pageSize={page}
              total={data?.totalCount}
              onChange={(page, size) => {
                setPageNo(page);
                setPage(size);
              }}
              showSizeChanger
            />
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;