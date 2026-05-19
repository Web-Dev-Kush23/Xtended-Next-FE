import React, { useState } from 'react';
import {
  easyStorageModalAddress,
  
} from "@/service/storageService";
const Addresscomponent = () => {
  const [data, setData] = useState({
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    District: "",
    State: "",
    Pincode: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name.trim()]: value,
    }));
   
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    const allKeys = Object.keys(data);
    const formData = new FormData();
    allKeys.forEach((item) => {
      formData.append(item, data[item]);
    });
    const response = await easyStorageModalAddress(formData);
    
    if (response.success) {
      alert("address updated successfully!");
    } else {
      if (
        response?.error?.title === "One or more validation errors occurred."
      ) {
        // setMultipleError(response?.error?.errors);
      }
      // setError(response.error.errors);
    }

   
  };

  return (
    <React.Fragment>
      <div className="bookyourspace_address w-full md:w-[609px] h-[auto] md:h-[326px] ">
        <form onSubmit={onsubmitHandler}>
          <div className="w-[154px] h-[29px] font-medium text-[14px] md:text-[24px] leading-7 mt-3 mb-3 text-[#1B1C57]">
            Your Address
          </div>
          <div className="enteryouraddress w-full md:w-[609px] h-[80px] ">
            <div className="w-[136px] h-[32px] font-medium text-[14px]  md:text-sm leading-8 md:leading-9">
              Enter your Address
              <span className="font-medium text-sm leading-8 text-[#C60909]">
                *
              </span>
            </div>
            <div className="enteryouraddressinputsec flex w-full md:w-[609px] h-[44px] gap-2 flex-col md:flex-row mb-2 md:mb-0">
              <input
                type="text"
                name="AddressLine1"
                placeholder="Address Line 1"
                onChange={onChange}
                className="flex w-[390px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB] mb-2 md:mb-0"
              />
              <input
                type="text"
                name="AddressLine2"
                placeholder="Address Line 2"
                onChange={onChange}
                className="flex w-[390px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]"
              />
            </div>
          </div>
          <div className="flex w-full h-[auto] mt-2 mb-3">
            <div className="citydissec w-full md:w-[609px] h-[81px]">
              <div className="citysec w-full md:w-[298px] h-auto text-[14px] leading-8 md:h-[81px] mt-5 md:mt-0">
                City
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className="flex justify-between w-full md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                  <select name="City" className="w-[160px] md:w-[270px]" onChange={onChange}>
                    <option value="">Select</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="dissec w-full md:w-[609px] h-[81px] mb-3">
              <div className="citysec w-full md:w-[298px] h-[auto] md:h-[81px] text-[14px] mt-5 md:mt-0">
                District
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className=" flex w-[200px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                  <select name="District" className="w-[160px] md:w-[270px]" onChange={onChange}>
                    <option value="">Select</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="statepin  w-full md:w-[609px] h-[81px] mt-3">
              <div className="citysec w-full md:w-[298px] h-[81px] text-[14px]">
                State
                <span className="font-medium text-sm leading-8 text-[#C60909]">
                  *
                </span>
                <div className=" flex w-[170px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                  <select name="State" className="w-[150px] md:w-[270px]" onChange={onChange}>
                    <option value="">Select</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pincode w-full md:w-[298px] h-[81px] text-[14px] mt-3">
              Pincode
              <span className="font-medium text-sm leading-8 text-[#C60909]">
                *
              </span>
              <div className="flex w-[150px] md:w-[298px] h-[44px] rounded-lg p-[10px] border border-solid border-[#D1D5DB]">
                <input
                  type="text"
                  name="Pincode"
                  className="bookyourstorage w-[150px] md:w-full h-full outline-none"
                  placeholder="Enter Pincode"
                  onChange={onChange}
                />
              </div>
              <button type="submit">Submit</button>
            </div>
          </div>
          
        </form>
      </div>
      <div className="entered-data   mt-6 ">
       
      <div>  <p> {data.AddressLine1} </p>
        <p>{data.AddressLine2} </p></div>
        <div className='flex gap-4'><p>{data.City} </p>
        <p>{data.District} </p></div>
        <div className='flex gap-4'><p>{data.State} </p>
        <p>{data.Pincode} </p></div>
      </div>
    </React.Fragment>
  );
};

export default Addresscomponent;
