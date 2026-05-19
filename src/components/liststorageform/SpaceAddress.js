import React, { useEffect, useState, useRef } from "react";
// import { servivePinCode } from "@/util/constant";
import { spaceListig, getCityNameByPincode } from "@/service/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";
import Map from "@/components/map";
import { useGeoLocation } from "@/util/useHooks";
const SpaceAddress = ({ PropertyId, setCurrentItem, userId }) => {
  const formInputStyle = "w-full px-2 py-2 mt-2 bg-gray-100 rounded-md border focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-[#1B1C57] text-sm font-normal mt-4";
  const formSelectStyle = "w-full px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";

  const [data, setData] = useState({ PropertyId, "stage2.PinCode": "" });
  const [error, setError] = useState(null);
  const [addressNearby, setAddressNearby] = useState([]);
  const [multipleError, setMultipleError] = useState({});
  const dispatch = useDispatch();
  const { listStorage: { value:reduxData } } = useSelector((state) => state);
  const formRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const cords = useGeoLocation() || { latitude: null, longitude: null };
  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };
  const onChange = (e) => {
    const { name, value, type, files } = e.target;
    setError(null);
    setMultipleError({});

    if (type === "file") {
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
    
    dispatch(setListStorage({ ...data,...reduxData, [name]: value }))
  };
  const handleLocationSelect = (location) => {
    setData({
      ...data,
      "stage2.Address": location.address,
      "stage2.Address2": location.sublocalityLevel2,
      "stage2.PinCode": location.postalCode,
      "stage2.latitude": location.lat,
      "stage2.Longitude": location.lng,
    });
  
    // Dispatch to Redux
    dispatch(
      setListStorage({
        ...reduxData,
       "stage2.Address": location.address,
      "stage2.Address2": location.sublocalityLevel2,
      "stage2.PinCode": location.postalCode,
        "stage2.latitude": location.lat,
        "stage2.longitude": location.lng,
      }));
       cords.latitude = location.lat;
  cords.longitude = location.lng;
  };
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if(reduxData && reduxData['stage2.PinCode']){

    }
    else{
      setMultipleError({PinCode: "Service not available at this location."});
      setError()
      return
    }

    const formData = new FormData();
    Object.keys(reduxData).forEach((key) => {
      formData.append(key, reduxData[key]);
    });

    const parameter = `?ApplicationUserId=${userId}&stage=2`;
    const response = await spaceListig(formData, parameter);

    if (response.success) {
      dispatch(setListStorage({ ...data,...reduxData, ['stage3.PerDayRentalAmount']: reduxData['stage3.PerDayRentalAmount'] ? reduxData['stage3.PerDayRentalAmount'] : response.success.data.stage2.originalAmount, ['stage3.annualEarningPotential']: response.success.data.stage2.annualEarningPotential  }))
      setCurrentItem("spacephoto");
    } else {
      setMultipleError(response.error.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(`[data-error=${firstErrorKey}]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  const fetchNearbyCities = async () => {
    try {
      const args = `?pinCode=${data["stage2.PinCode"]}`;
      const response = await getCityNameByPincode(args);

      if (response.success) {
        setAddressNearby(response.success);

        dispatch(setListStorage({ ...data,...reduxData,
        "stage2.City": response?.success?.city,
        "stage2.State": response?.success?.state,addressNearby: response.success}))
        setData((prevData) => ({
          ...prevData,
          // "stage2.District": response.success[0].district,
          "stage2.City": response?.success?.city,
          "stage2.State": response?.success?.state,
        }));
      } else {
        setError(response.error?.error);
        
      }
    } catch (error) {
      setError("Error fetching nearby cities");
    }
  };

  useEffect(() => {
    if (data["stage2.PinCode"]?.length === 6) {
      fetchNearbyCities();
    } else if (data["stage2.PinCode"] === "") {
      
      setData((prevData) => ({
        ...prevData,
        "stage2.City": "",
        "stage2.State": "",
      }));
  
      if (reduxData["stage2.PinCode"] === "") {
      dispatch(setListStorage({
        ...reduxData,
        "stage2.City": "",
        "stage2.State": "",
      }));}
    }
  }, [data["stage2.PinCode"]]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const mapLat = reduxData["stage2.latitude"] || data["stage2.latitude"] || (cords && cords.latitude) || 20.5937 ;
  const mapLng = reduxData["stage2.longitude"] || data["stage2.longitude"] || (cords && cords.longitude) || 78.9629 ;
  
  // console.log('reduxData space address', reduxData,data);
  return (
    <form ref={formRef}  onSubmit={onsubmitHandler}>
      

      <div className="tab-pane mx-2 z-2" role="tabpanel" id="step2">
        <h4 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">Space Address</h4>
    
        <div className="row">
        <div className="mt-4">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded shadow border w-full"
          onClick={toggleMapVisibility}
        >
          {showMap ? "Hide Map" : "Select Location from Map"}
        </button>
      </div>
        {showMap && (
        <div>
          <Map
            lat={mapLat} 
            lng={mapLng}
            onLocationSelect={handleLocationSelect}
            type="listing"
          />
        </div>
      )}
          <div className="col-md-12">
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Enter your Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage2.Address"
                placeholder="Address Line 1"
                required
                value={reduxData['stage2.Address']}
                onChange={onChange}
                data-error="Address"
              />
              {multipleError?.Address && (
                // <p className="text-sm text-red-500">{multipleError.Address}</p>
                <p className="text-sm text-red-500">{multipleError?.Address}</p>

              )}
            </fieldset>
          </div>
          <div className="col-md-12">
            <fieldset className="name-wrap">
              <input
                type="text"
                className={formInputStyle}
                name="stage2.Address2"
                placeholder="Landmark"
                // required
                onChange={onChange}
                value={reduxData['stage2.Address2']}
              />
              {multipleError?.Address2 && (
                <p className="text-sm text-red-500">{multipleError?.Address2}</p>
              )}
            </fieldset>
          </div>
        </div>
        <fieldset className="name-wrap">
          <label className={formLabelStyle}>
            Pincode <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={formInputStyle}
            name="stage2.PinCode"
            placeholder="Enter Pincode"
            required
            onChange={onChange}
            defaultValue={reduxData['stage2.PinCode']}
            value={reduxData['stage2.PinCode']}

          />
          {error &&  <p className="text-sm text-red-500">{error}</p>}
          {multipleError?.PinCode && (
            <p className="text-sm text-red-500">{multipleError?.PinCode}</p>
          )}
        </fieldset>

        <div className="row">
          <div className="col-md-6">
            <div className="group-select">
              <label htmlFor="city" className={formLabelStyle}>
                City<span className="text-red-500">*</span>
              </label>
              <input
                  type="text"
                  name="stage2.City"
                  className={formSelectStyle}
                  placeholder="City"
                  disabled
                  defaultValue={reduxData["stage2.City"] || ""}
                  value={reduxData["stage2.City"] || ""}
                  onChange={onChange}
                  required
                />
             
              {multipleError?.City && (
                <p className="text-sm text-red-500">{multipleError?.City}</p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="group-select">
              <label htmlFor="state" className={formLabelStyle}>
                State<span className="text-red-500">*</span>
              </label>
              <input
                id="state"
                name="stage2.State"
                disabled
                className={formSelectStyle}
                onChange={onChange}
                // value={addressNearby?.state}
                defaultValue={reduxData["stage2.State"] || ""}
                value={reduxData["stage2.State"] || ""}
              />
              {multipleError?.State && (
                <p className="text-sm text-red-500">{multipleError?.State}</p>
              )}
            </div>
          </div>
        </div>
      
        <div className="group-select">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Floor <span className="text-red-500">*</span>
            </label>
            <input
              type="Number"
              className={formInputStyle}
              name="stage2.Floor"
              placeholder="Enter Floor"
              required=""
              min="0"
              max="100"
              value={reduxData["stage2.Floor"]}
              onChange={onChange}
              data-error="Floor"
            />
            {multipleError?.Floor && (
              <p className="text-sm text-red-500">{multipleError?.Floor}</p>
            )}
          </div>
          <div className="group-select mb-6">
            <label htmlFor="preferredTime" className={formLabelStyle}>
              Is Lift Available? <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              className={formSelectStyle}
              name="stage2.IsLiftAvailable"
              onChange={onChange}
              defaultValue={reduxData["stage2.IsLiftAvailable"]}
              data-error="IsLiftAvailable"
            >
              <option className="text-gray-500" value="" disabled selected>
                Select
              </option>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {multipleError?.IsLiftAvailable && (
              <p className="text-sm text-red-500">
                {multipleError?.IsLiftAvailable}
              </p>
            )}
          </div>
      

       <div className="hidden">
       <Map
        lat={mapLat} 
        lng={mapLng} 
        onLocationSelect={handleLocationSelect}
        type="listing"
      />
       </div>
      

        <div class="wizard-footer my-5 w-[100%]">
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                  onClick={()=>{setCurrentItem("spaceDetails")}}
                >
                  Previous 
                </button>
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  class=" w-full default-btn next-step btn !bg-blue-500 btn-full p-2"
                >
                  Next
                </button>


              </li>
            </ul>
            {error?.text &&
  <p className="text-sm text-red-500">
    {error?.text}
  </p>
}
          </div>
      </div>
    </form>
  );
};

export default SpaceAddress;
