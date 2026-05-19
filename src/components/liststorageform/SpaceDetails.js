"use client";

import { useState, useRef } from "react";
import { Select } from "antd";
import { spaceListig } from "@/service/storageService";
import { useDispatch, useSelector } from "react-redux";
import TooltipIcon from "@/components/TooltipIcon";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";

const { Option } = Select;
const formInputStyle =
  "w-full px-2 py-2 mt-0  border rounded-md focus:outline-none focus:bg-white";
const formLabelStyle = "block  text-[#1B1C57] text-sm font-normal mt-4 ";
const formSelectStyle =
  "w-full  px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";
const options = [
  {
    label: "Select All",
    value: "SelectAll",
  },
  {
    label: "Fire Extinguisher",
    value: "FireExtinguisher",
  },
  {
    label: "Flexible Timings",
    value: "FlexibleTimings",
  },
  {
    label: "Camera Surveillance",
    value: "CameraSurveillance",
  },
  {
    label: "Lock Enabled",
    value: "LockEnabled",
  },
  {
    label: "Guarded Society",
    value: "GuardedSociety",
  },
  {
    label: "Moisture Free",
    value: "MoistureFree",
  },
  {
    label: "Pest Control",
    value: "PestControl",
  },
  {
    label: "Separate Access",
    value: "SeparateAccess",
  },
  {
    label: "Smoke Detector",
    value: "SmokeDetector",
  },
  {
    label: "House Keeping",
    value: "HouseKeeping",
  },
  {
    label: "Lock & Key",
    value: "IsLockAndKey",
  },
];

const SpaceDetails = ({
  setPropertyId,
  setCurrentItem,
  userId,
  setBankDetails,
}) => {
  const [multipleError, setMultipleError] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const dispatch = useDispatch();
  
  const {
    listStorage: { value: reduxData },
  } = useSelector((state) => state);
  const formRef = useRef(null);

  const onChange = (e) => {
    setError();
    setMultipleError({});
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    dispatch(setListStorage({ ...data, ...reduxData, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const allKeys = Object.keys(reduxData);
    const formData = new FormData();
    allKeys.forEach((item) => {
      if (item === "stage1.Amenities") {
        reduxData[item]?.length && formData.append(item, reduxData[item]);
      } else {
        formData.append(item, reduxData[item]);
      }
    });

    const parameter = `?ApplicationUserId=${userId}&stage=1`;
    const response = await spaceListig(formData, parameter);
    if (response.success) {
      setPropertyId(response.success.data.propertyId);
      dispatch(
        setListStorage({
          ...reduxData,
          ["propertyId"]: response.success.data.propertyId,
        })
      );
      setBankDetails(response.success?.customerBankAccount);
      setCurrentItem("spaceAddress");
    } else {
      setMultipleError(response?.error?.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(
        `[data-error=${firstErrorKey}]`
      );
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };
  const [selectedItems, setSelectedItems] = useState(
    reduxData["stage1.Category"] || []
  );

  const handleChange = (value) => {
    if (value.length > 2) {
      return; // Prevent selecting more than 2 options
    }
    setSelectedItems(value);
    onChange({ target: { name: "stage1.Category", value } });
  };

 
  return (
    <>
      <form ref={formRef} onSubmit={onsubmitHandler}>
        <div class="tab-pane mx-2 z-2 " role="tabpanel" id="step1">
          <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 ">
            Space Details
          </h4>

          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storageType" className={formLabelStyle}>
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              id="storageType"
              className={formSelectStyle}
              name="stage1.PropertyType"
              onChange={onChange}
              defaultValue={reduxData["stage1.PropertyType"] }
              required=""
              data-error="PropertyType"
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {multipleError?.PropertyType && (
              <p className="text-sm text-red-500">
                {multipleError.PropertyType}
              </p>
            )}
          </div>
          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storageType" className={formLabelStyle}>
            Storage Space Type <span className="text-red-500">*</span>
            </label>
            <select
              id="propertyType"
              className={formSelectStyle}
              name="stage1.StorageType"
              onChange={onChange}
              defaultValue={reduxData["stage1.StorageType"]}
              data-error="StorageType"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="Independent">Independent</option>
              <option value="Shared">Shared</option>
            </select>
            {multipleError?.StorageType && (
              <p className="text-sm text-red-500">
                {multipleError.StorageType}
              </p>
            )}
          </div>
          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storagePurpose" className={formLabelStyle}>
              What would you like to store? 
              <span className="text-red-500">*</span>
            </label>
            <Select
      mode="multiple"
    
      value={selectedItems}
      className="w-full  mt-0 multipleSelect"
      onChange={handleChange}
      placeholder="Select"
      style={{ width: "100%" }}
      maxTagCount={2} // Display up to 2 selected tags; others will be shown as a count
    >
      <Option value="Household Storage">Household Storage</Option>
      <Option value="Business Storage">Business Storage</Option>
      <Option value="Car Storage">Vehicle Storage </Option>
      <Option value="Document Storage">Document Storage  </Option>

      {/* Add more options here as needed */}
    </Select>
           
            {multipleError?.Category && (
              <p className="text-sm text-red-500">{multipleError?.Category}</p>
            )}
          </div>
          <div className="flex-col items-center justify-between my-2">
            <label htmlFor="storageType" className={formLabelStyle}>
            Your storage space is in a...?  <span className="text-red-500">*</span>
            </label>
            <select
              id="propertyType"
              className={formSelectStyle}
              name="stage1.StorageIn"
              onChange={onChange}
              defaultValue={reduxData["stage1.StorageIn"]}
              data-error="StorageIn"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="Room">Room</option>
              <option value="Garage">Garage</option>
              <option value="Basement">Basement</option>
              <option value="Warehouse">Warehouse</option>
            </select>
            {multipleError?.StorageIn && (
              <p className="text-sm text-red-500">
                {multipleError.StorageIn}
              </p>
            )}
          </div>
          {/* Space Description */}
          <div className="group-select mb-6 ">
            <label htmlFor="spaceDescription" className={formLabelStyle}>
            How much secure your space?
              <span className="text-red-500">*</span>
            </label>
            <select
              id="spaceDescription"
              className={formSelectStyle}
              name="stage1.PropertySpace"
              onChange={onChange}
              defaultValue={reduxData["stage1.PropertySpace"]}
              data-error="propertySpace"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="IsIndoor">Indoor</option>
              <option value="IsCovered">Covered</option>
              {/* <option value={"IsUnCovered"}>UnCovered</option> */}
            </select>

            {(multipleError?.PropertySpace || multipleError?.propertySpace) && (
  <p className="text-sm text-red-500">
    {multipleError?.PropertySpace || multipleError?.propertySpace}
  </p>
)}

          </div>

          {/* Amenities */}
          <div className="relative mb-6 ">
            <label htmlFor="amenities " className={formLabelStyle}>
              Amenities of your space <span className="text-red-500">*</span>
              <span><TooltipIcon text="Picking CCTV  Gain trust, Attract bookings, Considered a secure storage option " /></span>

            </label>
            <Select
  mode="multiple"
  className="w-full mt-0 multipleSelect"
  placeholder="Select Amenities"
  name="stage1.Amenities"
  value={data["stage1.Amenities"] || reduxData["stage1.Amenities"] || []} 
  data-error="Amenities"
  onChange={(value) => {
    setMultipleError();
    if (value.includes("SelectAll")) {
      const allValues = options.map(option => option.value).filter(val => val !== "SelectAll");
      setData({ ...data, "stage1.Amenities": allValues });
      dispatch(
        setListStorage({
          ...data,
          ...reduxData,
          "stage1.Amenities": allValues,
        })
      );
    } else if (!value.includes("SelectAll") && data["stage1.Amenities"]?.includes("SelectAll")) {
      setData({ ...data, "stage1.Amenities": [] });
      dispatch(
        setListStorage({
          ...data,
          ...reduxData,
          "stage1.Amenities": [],
        })
      );
    } else {
      setData({ ...data, "stage1.Amenities": value });
      dispatch(
        setListStorage({
          ...data,
          ...reduxData,
          "stage1.Amenities": value,
        })
      );
    }
  }}
  options={options}
/>
            {/* {multipleError?.errors["stage1.Amenities"] &&  (
  <p className="text-sm text-red-500">
    {multipleError?.errors["stage1.Amenities"][0] }
  </p>
)} */}

            {multipleError?.Amenities && (
              <p className="text-sm text-red-500">{multipleError?.Amenities}</p>
            )}
          </div>

          {/* Access Frequency */}
          <div className="group-select mb-6">
            <label htmlFor="accessFrequency" className={formLabelStyle}>
              How frequently can renters access their items? 
              <span className="text-red-500">*</span>
            </label>
            <select
              id="accessFrequency"
              className={formSelectStyle}
              name="stage1.TenantVisitFrequency"
              defaultValue={reduxData["stage1.TenantVisitFrequency"]}
              onChange={onChange}
              data-error="TenantVisitFrequency"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="Daily">Daily</option>
              <option value="Onceaweek">Once a week</option>
              <option value="Monthly">Monthly</option>
              <option value="askBeforeCome">Ask Before Come</option>
            </select>

            {multipleError?.TenantVisitFrequency && (
              <p className="text-sm text-red-500">
                {multipleError?.TenantVisitFrequency}
              </p>
            )}
          </div>

          {/* Preferred Time */}
          <div className="group-select mb-6">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Which time suits best for you? 
              <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              className={formSelectStyle}
              name="stage1.TenantVisitTiming"
              onChange={onChange}
              defaultValue={reduxData["stage1.TenantVisitTiming"]}
              data-error="TenantVisitTiming"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value="StandardTiming">
                Standard Timing (9 AM to 6 PM)
              </option>
              <option value="EveningTiming">
                Evening Timing (6 PM to 9 PM)
              </option>
              <option value="AnyTiming">Any Timing (24 X 7)</option>
            </select>
            {multipleError?.TenantVisitTiming && (
              <p className="text-sm text-red-500">
                {multipleError?.TenantVisitTiming}
              </p>
            )}
          </div>
       
          <h4 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4">
            Space Dimensions
          </h4>

          <div class="row relative">
            <div class="col-6">
              <fieldset class="name-wrap ">
                <label className={formLabelStyle}>
                  Length (ft) <span class="text-danger">*</span>
                  <span><TooltipIcon text="Measure the longest side of the space, from end to end." /></span>
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.LengthInFeet"
                  placeholder="Enter Length "
                  required=""
                   onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                  value={reduxData["stage1.LengthInFeet"]}
                  data-error="LengthInFeet"
                />
                {multipleError?.LengthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.LengthInFeet}
                  </p>
                )}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap ">
                <label className={formLabelStyle}>
                  Width (ft) <span class="text-danger">*</span>
                  <span><TooltipIcon text="Measure side-to-side across the opening of the space. " /></span>
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.WidthInFeet"
                  placeholder="Enter Width"
                  required=""
                   onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                  value={reduxData["stage1.WidthInFeet"]}
                />
                {multipleError?.WidthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.WidthInFeet}
                  </p>
                )}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap ">
                <label className={formLabelStyle}>
                  Height (ft)
                  {/* <span class="text-danger">*</span> */}
                  <span><TooltipIcon text="Measure from the floor to the ceiling or the highest point inside." /></span>

                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.HeightInFeet"
                  placeholder="Enter Height "
                  required=""
                  value={reduxData["stage1.HeightInFeet"]}
                   onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                />
                {multipleError?.HeightInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.HeightInFeet}
                  </p>
                )}
              </fieldset>
            </div>
          </div>

          <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4 relative">
            Space Entrance Dimensions
            <span><TooltipIcon text="These dimensions help renters know what items fit through this door. " /></span>
          </h4>
          <div class="row">
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Width (ft)
                  {/* <span class="text-danger">*</span> */}
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.EntranceWidthInFeet"
                  placeholder="Enter Width "
                  required=""
                  value={reduxData["stage1.EntranceWidthInFeet"]}
                   onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                  data-error="EntranceWidthInFeet"
                />
                {/* {multipleError?.WidthInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.WidthInFeet}
                  </p>
                )} */}
              </fieldset>
            </div>
            <div class="col-6">
              <fieldset class="name-wrap">
                <label className={formLabelStyle}>
                  Height (ft)
                  {/* <span class="text-danger">*</span> */}
                </label>
                <input
                  type="number"
                  className={formInputStyle}
                  name="stage1.EntranceHeightInFeet"
                  placeholder="Enter Height"
                  required=""
                  value={reduxData["stage1.EntranceHeightInFeet"]}
                   onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                  data-error="EntranceHeightInFeet"
                />
                {multipleError?.EntranceHeightInFeet && (
                  <p className="text-sm text-red-500">
                    {multipleError?.EntranceHeightInFeet}
                  </p>
                )}
              </fieldset>
            </div>
          </div>
          
     


          <div className="wizard-footer my-5 w-[100%]">
            <ul className="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                {/* <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                >
                  Cancel
                </button> */}
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  class=" w-full default-btn next-step btn !bg-blue-500 btn-full p-2 text-white"
                >
                  Next
                </button>
              </li>
            </ul>
            {error?.text && (
              <p className="text-sm text-red-500">{error?.text}</p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SpaceDetails;
