import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Breadcrumbs from "../profile/Breadcrumb";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { getareacalculator } from "@/service/packermover";
import { getStorageType } from "@/service/storageService";
import { useRouter } from "next/navigation";
import { localStorageManager } from "@/util/common";
import MobileViewFilter from "./MobileViewFilter";
import Loader from "@/components/Loader";
import Head from "next/head";

const index = () => {
  const router = useRouter();
  const getStoredItems = () => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("areaCalculator");
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  };

  const [data, setData] = useState();
  const [items, setItems] = useState(getStoredItems());
  const [size, setSize] = useState(0);
  const [totalArea, setTotalArea] = useState();
  const [mobileFilter, setMobileFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [overError,setOverError] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const areaCal = localStorageManager?.getValue("areaCalculator")
        ? JSON.parse(localStorageManager.getValue("areaCalculator"))
        : [];
      setItems(areaCal);
    }
  }, []);

  const fetchData = async () => {
    setLoader(true);
    let res = await getareacalculator();
    if (res?.success) {
      setData(res?.success);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRemove = (id) => {
    let updateItem = items.filter((i) => i?.item?.itemId != id);
    setItems(updateItem);
  };

  // const areaOccupied = (items?.reduce((acc, elem) => acc + parseFloat(elem.count) * parseFloat(elem.item.squareFeet || 0), 0) * 100) / (size?.maximumSquareFeet || 1)

  const handleClick = (type, item) => {
    setError(false);
    if (size == 0) setSize(100);
    const existingItem = items.some(
      (elm) => elm?.item?.itemId === item?.itemId
    );
    if (type == "add") {
      if (existingItem) {
        const updateItem = items.map((elem) =>
          elem.item.itemId == item.itemId
            ? { ...elem, count: 1 + Number(elem.count) }
            : elem
        );
        setItems(updateItem);
      } else {
        setItems((prev) => [...prev, { item, count: 1 }]);
      }
    } else if (type == "sub") {
      let currentitem = items.find((elem) => elem.item.itemId == item.itemId);
      if (existingItem && currentitem.count > 1) {
        const updateItem = items.map((elem) =>
          elem.item?.itemId == item?.itemId
            ? { ...elem, count: Number(elem.count) - 1 }
            : elem
        );
        setItems(updateItem);
      } else {
        const updatedArr = items.filter(
          (elem) => elem?.item.itemId !== item.itemId
        );
        setItems(updatedArr);
      }
    }
  };

  let SearchArr = data?.categoryItemList
    ?.flatMap((elem) => elem.subCategory || [])
    ?.flatMap((item) => item.storageItems || [])
    ?.map((i) => i);

  const checkArea = () => {
    setTotalArea(
      (items?.reduce(
        (acc, elem) =>
          acc + parseFloat(elem.count) * parseFloat(elem.item.squareFeet || 0),
        0
      ) *
        100) /
        size
    );
  };

  useEffect(() => {
    checkArea();
    const sizeMap = [
      { limit: 100, size: 100 },
      { limit: 300, size: 300 },
      { limit: 500, size: 500 },
      { limit: 700, size: 700 },
      { limit: 1000, size: 1000 },
      { limit: 1500, size: 1500 },
      { limit: 2000, size: 2000 },
      { limit: 3000, size: 3000 }
    ];
    const selectedSize = sizeMap.find(entry => totalItemArea < entry.limit)?.size || Math.round(totalItemArea);
    setSize(selectedSize);
    setOverError(totalItemArea > 3000);
  }, [items, totalArea]);
  

  let totalItemArea = items?.reduce(
    (acc, elem) =>
      acc + parseFloat(elem.count) * parseFloat(elem.item.squareFeet || 0),
    0
  );

  const handleStorage = async (type) => {
    if (items.length > 0) {
      setError(false);
      let args = `?SquareFeet=${Math.round(totalItemArea)}`;
      let res = await getStorageType(args);
      if (type === "Easy") {
        try {
          if (res?.success?.storageType) {
            let data = {
              StorageType: res?.success?.storageType?.propertySize,
              DurationInMonth: "1",
              //  IsUserSelectedItems:true,
              IsLogisticsCharge: false,
              PerLakh: 100000,
              CouponId: "",
              // CouponCode:0,
              IsInsuranceAmount: true,
              City: "Noida",
              Floor: "",
              StorageRequirement: res?.success?.storageType?.propertySize,
              SquareFeet:Math.round(totalItemArea)
            };
            if(res?.success?.storageType?.propertySize=="More Than 4 BHK"){
              router.push("/services/business-storage")
              }else{
                localStorageManager.setValue(
                  "easyStorageData",
                  JSON.stringify(data)
                );
                router.push(`/store-at-a-warehouse?selectedItem=true`);
              }
              }
           
        } catch (error) {
          console.error("Error fetching storage data:", error);
          alert(
            "An error occurred while fetching storage data. Please try again."
          );
        }
      } else {
        try {
          if (res?.success?.storageType) {
            router.push({
              pathname: "/store-with-a-host",
              query: {
                minSquarefeet: res?.success?.storageType?.minimumSquareFeet,
                maxSquarefeet: res?.success?.storageType?.maximumSquareFeet,
              },
            });
          }
        } catch (error) {
          console.error("Error fetching storage data:", error);
          alert(
            "An error occurred while fetching storage data. Please try again."
          );
        }
      }
    } else {
      setError(true);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined" && items.length >= 0) {
      localStorage.setItem("areaCalculator", JSON.stringify(items));
    }
  }, [items]);

  return (
   <>
  <Head>

        <title>Area Calculator for Storage Space - Xtended Space</title>
        <meta
          name="description"
          content="Easily calculate your storage space needs with our free area calculator. Plan your move or storage efficiently with Xtended Space. Quick, accurate & simple!"
        />

        <link
          rel="canonical"
          href="https://www.xtendedspace.com/area-calculator"
        />

        <meta name="robots" content="index, follow" />

        <link
          rel="alternate"
          href="https://www.xtendedspace.com/area-calculator"
          hreflang="en-in"
        />
      </Head>

    <div className="relative">
      <HeaderMenu />
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2">
          <div className="md:block hidden col-span-1 bg-slate-100">
            <Filter
              data={data}
              items={items}
              setItems={setItems}
              size={size}
              setSize={setSize}
              setTotalArea={setTotalArea}
              totalArea={totalArea}
              setError={setError}
            />
          </div>
          <div className="col-span-3 mx-4">
            <div className="flex px-4 py-2">
              <a
                href="/"
                className="font-medium leading-8 text-[#1B1C57] text-sm"
              >
                Home
              </a>

              <Breadcrumbs />
            </div>
            <div className="max-w-xl mx-auto">
              <p className="md:text-3xl text-2xl mx-3 font-semibold text-blue-900 text-center">
                Need Help In Calculating Your Storage Area Type ?
              </p>
            </div>
            <form className="m-3 block md:hidden">
              <label
                for="default-search"
                className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  style={{ color: "#000" }}
                  className="block w-full px-10 py-2.5 text-lg text-gray-900 border border-gray-300 rounded-2xl bg-white"
                  placeholder="Search & Add Items..."
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
            {search.length > 0 && (
              <div className="absolute top-64 p-4 rounded-md left-8 shadow-xl overflow-y-scroll max-w-xl h-96 bg-white">
                {SearchArr?.filter((elem) =>
                  elem?.itemName.toLowerCase().includes(search.toLowerCase())
                ).length > 0 ? (
                  SearchArr?.filter((elem) =>
                    elem?.itemName.toLowerCase().includes(search.toLowerCase())
                  ).map((item, id) => (
                    <div
                      key={id}
                      className="flex justify-between items-center px-4 py-2"
                    >
                      <p className="pr-2">{item?.itemName}</p>
                      <div>
                        <span
                          onMouseDown={() => handleClick("add", item)}
                          className="mr-2 px-1.5 pb-[2px] text-xl font-semibold text-white rounded cursor-pointer bg-gray-400"
                        >
                          +
                        </span>
                        {items?.map((elem) =>
                          elem.item.itemId === item?.itemId ? elem.count : ""
                        )}
                        <span
                          onMouseDown={() => handleClick("sub", item)}
                          className="ml-2 px-2 pb-[2px] cursor-pointer text-xl font-semibold text-white rounded bg-gray-400"
                        >
                          -
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    This item is not found , try other
                  </p>
                )}
              </div>
            )}
            <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 rounded-lg  lg:h-80">
              <div className="w-full rounded-tl-lg rounded-bl-lg bg-gray-50 h-full">
                <div className="flex justify-center items-center my-2">
                  <Image
                    className="w-[220px] h-[250px]"
                    src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/Floor-Plan.webp"
                    alt="floorplan"
                    width={220}
                    height={250}
                  />
                </div>
                <div
                  className={`progress mb-3 md:mb-0 h-8 bg-yellow-100 mx-6 ${
                    size == 0 ? "flex justify-center items-center" : ""
                  } `}
                >
                  <div
                    style={{
                      width: `${size == 0 ? 0 : Math.round(totalArea)}%`,
                    }}
                    className="progress-bar bg-warning"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {size == 0 ? 0 : Math.round(totalArea)}% Full
                  </div>
                  {size == 0 && <p className="font-semibold">0% Full</p>}
                </div>
              </div>
              <div className="w-full px-4 py-4 rounded-tr-lg rounded-br-lg bg-blue-100  lg:h-80">
                <p className="py-2 text-lg font-semibold text-gray-800">
                  Analyzed Results
                </p>
                <p className="pb-2">
                  Est. Area Type :{" "}
                  <span className="ml-1 text-blue-600">{size} sq ft</span>
                </p>
                <p className="pb-2">
                  Your Items Size :{" "}
                  <span className="ml-1 text-blue-600">
                    {" "}
                    {Math.round(totalItemArea)} sq ft
                  </span>
                </p>

                <p className="pb-2">
                  Find the best storage space easily!
                  <br /> Select a category on the left to open a popup with
                  categories, subcategories, and items. Choose Easy or
                  Affordable Storage.
                </p>
                <div className="grid grid-cols-2  gap-2 mt-2">
                  <button
                    onClick={() => handleStorage("Affordable")}
                    // disabled={overError}
                    className="bg-blue-500 hover:bg-blue-700 transition-all duration-500 transform hover:scale-105 cursor-pointer rounded text-white text-[14px] font-medium py-2 text-center"
                  >
                    <p className="text-lg md:text-xl font-semibold">
                      {" "}
                      Get Price
                    </p>
                    Store with a host{" "}
                  </button>
                  <button
                    onClick={() => handleStorage("Easy")}
                    disabled={overError}
                    className="bg-blue-500 md:bg-[#8DC63F] md:hover:bg-green-500 text-center 
                     hover:bg-blue-700 transition-all duration-500 transform hover:scale-105 hover:shadow-lg 
                     cursor-pointer rounded text-white text-[14px] font-medium py-2"
                  >
                    <p className="text-lg md:text-xl text-center font-semibold">
                      Get Price
                    </p>
                    Store at a warehouse{" "}
                  </button>
                </div>
                {error && (
                  <p className="text-lg text-red-500 mt-2">
                    Please select some items{" "}
                  </p>
                )}
                {overError && (
                  <p className="text-[11px] font-medium text-blue-500 mt-2 pt-2">
                   Storage areas above 3000 sq.ft. are eligible for the "Store with Host" option only.
                  </p>
                )}
                <div className="w-full block md:hidden rounded-md my-3 p-2 bg-[#8DC63F] ">
                  <button
                    className="w-full text-2xl font-medium text-white"
                    onClick={() => setMobileFilter(true)}
                  >
                    Start Calculation
                  </button>
                </div>
              </div>
            </div>
            <div className="my-6 ">
              <div className="flex justify-between items-center border bg-gray-200 p-3 rounded-tl-xl rounded-tr-xl">
                <p className="text-lg font-semibold text-gray-800">
                  Total Items
                </p>
                <p className="text-lg font-semibold text-gray-800"></p>
                <p className="text-lg font-semibold text-gray-800">
                  {items
                    ?.map((elem) => elem.count)
                    .reduce((acc, curr) => acc + curr, 0)}
                </p>
              </div>
              <div className="max-h-96 overflow-y-scroll">
                {items?.map((elem, id) => {
                  return (
                    <div
                      key={id}
                      className="flex justify-between items-center border px-3 py-2"
                    >
                      <p className="text-lg font-medium text-gray-800 w-72">
                        {elem?.item?.itemName}
                      </p>
                      <div className='text-lg flex justify-between font-semibold text-gray-800'>
                                        <div onClick={() => handleClick("sub", elem?.item)} className=' px-2 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>-</div>
                                        <div className='w-[25px] text-center'>{elem?.count}</div>
                                        <div onClick={() => handleClick("add", elem?.item)} className=' px-1.5 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer'>+</div>
                                    </div>
                      {/* <p className="text-lg font-semibold text-gray-800">
                        <span
                          onClick={() => handleClick("sub", elem?.item)}
                          className="mr-2 px-2 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer"
                        >
                          -
                        </span>
                        {elem?.count}
                        <span
                          onClick={() => handleClick("add", elem?.item)}
                          className="ml-2 px-1.5 pb-[2px] md:text-xl text-lg font-semibold text-white rounded bg-[#8DC63F] cursor-pointer"
                        >
                          +
                        </span>
                      </p> */}
                      <p
                        onClick={() => handleRemove(elem?.item?.itemId)}
                        className="text-lg cursor-pointer ml-2 md:ml-0 font-semibold text-gray-800"
                      >
                        <MdDelete className="text-lg text-red-600" />
                      </p>
                    </div>
                  );
                })}
              </div>
              {items?.length == 0 ? (
                <div className="flex justify-between items-center border  p-3 ">
                  <p className="text-lg font-semibold text-gray-800"></p>
                  <p className="text-lg font-semibold text-gray-800">
                    No items added
                  </p>
                  <p className="text-lg font-semibold text-gray-800"></p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <div className='w-full block md:hidden fixed p-4 bg-[#8DC63F] bottom-0 left-0 right-0'>
                <button className='w-full text-2xl font-medium text-white' onClick={() => setMobileFilter(true)} >Start Calculation</button>
            </div> */}
      {mobileFilter && (
        <MobileViewFilter
          data={data}
          items={items}
          setItems={setItems}
          size={size}
          setSize={setSize}
          totalArea={totalArea}
          mobileFilter={mobileFilter}
          setMobileFilter={setMobileFilter}
          setError={setError}
        />
      )}
      {loader && <Loader />}
    </div>
   </>
  );
};

export default index;
