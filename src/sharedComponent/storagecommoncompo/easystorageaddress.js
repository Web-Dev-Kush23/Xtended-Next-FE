import React, { useState, useEffect } from "react";
import { easyStorageModalAddress, GetEasyStoragePincode } from "@/service/storageService";
import { getUserId } from "@/util/common";
// import { servivePinCode } from "@/util/constant";

const easystorageaddress = ({ fetchUserAddress }) => {
  const [multipleError, setMultipleError] = useState();
  const [error, setError] = useState();

  const [nearbyCities, setNearbyCities] = useState();
  const [addressNearby, setAddressNearby] = useState()
  const [data, setData] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    District: "",
    State: "",
    Pincode: "",
    IsLiftAvailable:"",
    Floor:"",
    IsDefault: true
  });
  const onChange = (e) => {
    // setError()
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data.Pincode}`;
      const response = await GetEasyStoragePincode(args)

      
      if (response.success) {
        setAddressNearby(response.success)
        setError()
        setData((prevData) => ({
          ...prevData,
          "City": response?.success?.city, "State": response?.success?.state
        }));

        
      } else {
        console.error("Failed to fetch nearby cities", response.error);
        setError(response.error?.error)
      }
    } catch (error) {
      console.error("Error fetching nearby cities", error);
    }
  };
  useEffect(() => {
    if (data.Pincode.length === 6) {
      if (data.Pincode) {
        fetchNearbyCities();
      }
      else {
        setError("Sorry, Service not available")
      }
    }
  }, [data.Pincode]);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (error || !addressNearby) {
      return;
    }
    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    formData.append("UserId", getUserId());
    const response = await easyStorageModalAddress(formData);
    
    if (response.success) {
      document.getElementById("myform").reset();
      fetchUserAddress()
      // alert("address updated successfully!");
    } else {
      {
        if (
          response?.error?.title === "One or more validation errors occurred."
        ) {
          setMultipleError(response?.error?.errors);
        }
        // setError(response.error);
      }
    }
  };

  const handleLiftAvailability = (availability) => {
    setData((prevData) => ({
      ...prevData,
      IsLiftAvailable: availability,
    }));
  };

  return (
    <>
      <div className="bookyourspace_address w-full md:w-[609px] h-[auto] md:h-[auto]  ">
        {/* <div className="w-[154px] h-[29px] font-medium text-[14px] md:text-[24px] leading-7 mt-3 mb-3 text-[#1B1C57]">
                Your Address
              </div> */}
        <form className="" id="myform" onSubmit={onsubmitHandler}>
          <div className="enteryouraddress w-full md:w-[609px] h-[auto] ">
            <div className="w-[136px]  font-medium text-[14px]  md:text-sm leading-8 md:leading-9">
              Enter your Address
              <span className="font-medium text-sm leading-8 text-[#C60909]">
                *
              </span>
            </div>
            <div className="enteryouraddressinputsec flex  w-full md:w-[609px] h-[auto] gap-2 flex-col md:flex-row mb-2 md:mb-0">
            <div className="">
            <input
                type="text"
                name="AddressLine1"
                placeholder="Address Line 1"
                required=""
                onChange={onChange}
                className="flex  w-full md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB] mb-2 md:mb-0"
              />
                {multipleError?.AddressLine1 && (
                  <p className="text-base text-red-500">
                    {multipleError?.AddressLine1}
                  </p>
                )}
            </div>
              
            <div className="">
            <input
                type="text"
                name="AddressLine2"
                placeholder="Address Line 2"
                required=""
                onChange={onChange}
                className="flex w-full  md:w-[298px] h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB] mb-2 md:mb-0"
              />
                {multipleError?.AddressLine2 && (
                  <p className="text-base text-red-500">
                    {multipleError?.AddressLine2}
                  </p>
                )}
              
            </div>
            </div>
          </div>
          <div className="flex w-full h-[auto] mt-2  gap-2">
            <div className="statepin  w-full md:w-[609px] ">

              <div className="pincode w-full md:w-[298px] h-auto  text-[14px] leading-8      md:mt-0  ">
                Pincode
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className=" w-full  md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                  <input
                    type="text"
                    name="Pincode"
                    placeholder="Enter Pincode"
                    onChange={onChange}
                    className="bookyourstorage w-[160px] md:w-full h-full outline-none"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  {multipleError && multipleError.Pincode && (
                    <p className="text-base text-red-500">
                      {multipleError.Pincode[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="citydissec w-full  md:w-[609px] h-[81px]">

              <div className="citysec w-full md:w-[298px] h-auto text-[14px] leading-8     md:h-[81px]  md:mt-0">
                City
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className="flex justify-between w-full md:w-[298px] h-[44px] rounded-lg  px-[10px] py-1 outline-none border border-solid border-[#D1D5DB]">
                  <div>
                  <input
                  type="text"
                  name="City"
                  className="w-[160px] md:w-[270px]"
                  placeholder="City"
                  value={addressNearby?.city}
                  onChange={onChange}
                  required
                />
                   
                    {multipleError && multipleError.City && (
                      <p className="text-base text-red-500">
                        {multipleError.City[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
     
          <div className="flex  gap-2">
      
            <div className="statepin  w-full  h-[81px] mt-3 ">
              <div className="citysec w-full  h-auto text-[14px]">
                State
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className=" flex w-full h-[44px] rounded-lg  p-[10px] border border-solid border-[#D1D5DB]">
                  <div>
                    <input
                      className="w-full "
                      name="State"
                      onChange={onChange}
                      value={addressNearby && addressNearby?.state} />

                    {multipleError && multipleError.State && (
                      <p className="text-base text-red-500">
                        {multipleError.State[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="flex-1 ">
              <label class="block  text-black mb-1 ">
                Lift Available
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <div class="flex ">
                <button
                  type="button"
                  className={`w-[290px] mr-1 px-4 py-2 rounded ${
                    data.IsLiftAvailable === true
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`w-[290px] ml-6 px-4 py-2 rounded ${
                    data.IsLiftAvailable === false
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-200 text-zinc-800"
                  }`}
                  onClick={() => handleLiftAvailability(false)}
                >
                  No
                </button>
                
              </div>
            </div>

              <div class="flex-1 pb-4">
              <label class="block   text-black mb-1">
                Floors
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
              </label>
              <input
                type="tel"
                name="Floor"
                value={data.Floor || ""}
                onChange={onChange}
                placeholder="Enter Floors"
                class="form-input w-full  px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                min="1"
                max="20"
              />
            </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
        {/* <div className="default-details w-[auto] h-auto  text-[#1B1C57] font-inter font-medium text-[18px] leading-8 ">
         {data.AddressLine1} {data.AddressLine2} {data.City} {data.District} {data.State} {data.Pincode}
      
        </div> */}
      </div>
    </>
  );
};

export default easystorageaddress;
