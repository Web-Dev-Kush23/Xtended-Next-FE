import { spaceListig } from "@/service/storageService"; 
import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";
import { RxCrossCircled } from "react-icons/rx";
const formInputStyle =
  "w-full px-2 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:bg-white";
const formLabelStyle = "block  text-[#1B1C57] text-sm font-normal mt-4 ";
const formSelectStyle =
  "w-full  px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";
  
const SpacePhoto = ({ PropertyId, setCurrentItem, userId }) => {
  const [data, setData] = useState({ PropertyId });
  const [error, setError] = useState({});
  const [multipleError, setMultipleError] = useState({});
 const dispatch = useDispatch();
 const [currentImages, setCurrentImages] = useState([]);
 const [charCount, setCharCount] = useState(0);
 const [text, setText] = useState('');
 const formRef = useRef(null);
  const { listStorage: { value:reduxData } } = useSelector((state) => state);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    setCharCount(reduxData['stage3.Description']?.length || 0);
  }, [reduxData]);
  useEffect(() => {
    
    if (!reduxData['stage3.IsFirstMonthDiscount']) {
      dispatch(setListStorage({ ...reduxData, 'stage3.IsFirstMonthDiscount': "false" }));
    }
    if (!reduxData['stage3.IsAutoApproval']) {
      dispatch(setListStorage({ ...reduxData, 'stage3.IsAutoApproval': "true" }));
    }
   
  }, [reduxData, dispatch]);
  
  const onChange = (e) => {
 
    const { name, type, files } = e.target;
    
    setError({});
    setMultipleError({});
    if (name === "stage3.Description") {
      const newText = e.target.value;
      setText(newText);
      setCharCount(newText.length);
    }

    if (type === "file") {
      if (name === "stage3.PropertyImages") {
        let valid = true;
        const updatedValue = [...currentImages, ...Array.from(files)];
        const newErrors = {};
        if (updatedValue.length > 4) {
          // alert("Max 4 images allowed!");
          newErrors['PropertyImages'] = "Max 4 images allowed!";
          valid = false;
        }

        updatedValue.forEach(file => {
          if (file.size / (1024 * 1024) > 2) {
            // alert("Image size must be less than 2MB");
            newErrors['PropertyImages'] = "Image size must be less than 2MB";
            valid = false;
          }
        });

          if (!valid) {
          setError(newErrors);
          return;
        }

        setCurrentImages(updatedValue);
        dispatch(setListStorage({ ...reduxData, ...data, [name]: updatedValue }));
      } else {
        const file = files[0];
        if (file.size / (1024 * 1024) > 5) {
          setError({ 'PropertyVideo': "Video size must be less than 5MB" });
          return;
        }
        setData({ ...data, [name]: file });
        const videoUrl = URL?.createObjectURL(file);
        dispatch(setListStorage({ ...reduxData, ...data, videoUrl, [name]: file }));

      }
    } else {
      setData({ ...data, [name]: e.target.value });
      if (name === "stage3.PerDayRentalAmount") {
        const perDayRentalAmount = parseFloat(e.target.value) || 0;
        const annualEarningPotential = perDayRentalAmount * 365;
        dispatch(setListStorage({ 
          ...reduxData, 
          ...data, 
          [name]: perDayRentalAmount,
          'stage3.annualEarningPotential': annualEarningPotential 
        }));
      } else {
      dispatch(setListStorage({ ...reduxData, ...data, [name]: e.target.value }));
      
    }
  }
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if(reduxData && reduxData['stage3.PropertyVideo'] && (reduxData['stage3.PropertyVideo'].size/(1024 * 1024)>5)){
      setMultipleError({'stage3.PropertyVideo':"Video size is too large"});
      return
    }
    const allKeys = Object.keys(reduxData);
    const formData = new FormData();
    reduxData['stage3.PropertyImages']?.forEach((image) => {
      formData.append('stage3.PropertyImages', image);
    });
    allKeys.forEach((item) => {
      formData.append(item, reduxData[item]);
    });

    const parameter = `?ApplicationUserId=${userId}&stage=3`;
    const response = await spaceListig(formData, parameter);
    if (response.success) {
      setCurrentItem("bankdetails");
    } else {
      setMultipleError(response.error.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(`[data-error=${firstErrorKey}]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };


 const removeImage = (index)=>{
  const updatedValue = currentImages.filter((_, i) => i !== index);
  setCurrentImages(updatedValue);
  dispatch(setListStorage({ ...reduxData, ['stage3.PropertyImages']: updatedValue }))
  setMultipleError({...multipleError,
    PropertyImages:"",
    PropertyImagesExtension:"",
    PropertyImagesFile:""
   })
 }

 const removeVideo = (key)=>{
  const { [key]: _, ...newState } = reduxData;
  dispatch(setListStorage(newState))
 }

 useEffect(()=>{
  if(reduxData['stage3.PropertyImages'])
    setCurrentImages(reduxData['stage3.PropertyImages']);
},[])
const handleFocus = () => {
  setIsFocused(true);
};

const handleBlur = () => {
  if (!reduxData['stage3.PerDayRentalAmount']) {
    setIsFocused(false);
  }
};
const drag = (event, index) => {
  event.dataTransfer.setData("draggedIndex", index);
};

const drop = (event, targetIndex) => {
  event.preventDefault(); // Prevent default behavior
  const draggedIndex = event.dataTransfer.getData("draggedIndex");
  if (draggedIndex === null || draggedIndex === undefined) return;

  const updatedImages = [...currentImages];
  const [draggedImage] = updatedImages.splice(draggedIndex, 1); // Remove dragged image
  updatedImages.splice(targetIndex, 0, draggedImage); // Insert at drop position

  setCurrentImages(updatedImages);
  dispatch(setListStorage({ ...reduxData, ['stage3.PropertyImages']: updatedImages }));
};

const allowDrop = (event) => {
  event.preventDefault(); // Allow dropping
};

  return (
    <form ref={formRef}  onSubmit={onsubmitHandler}>
      <div class="tab-pane mx-2 z-2 active" role="tabpanel" id="step3">
      <div className="space-visuals bg-white rounded-md p-4 shadow-md">
 
  <h2 className="text-[16px] font-semibold mb-1">
    Add Space Photos<span className="text-red-500">*</span>
  </h2>
  <p className="text-gray-500 text-[14px] mb-2">Upload the first photo from the front view</p>

  <div
    className="mb-4"
    draggable
    onDragStart={(event) => drag(event, 0)}
    onDragOver={allowDrop}
    onDrop={(event) => drop(event, 0)}
  >
    {currentImages[0] ? (
      <div className="relative w-full h-[160px] border border-gray-300 rounded overflow-hidden">
        <img
          src={URL.createObjectURL(currentImages[0])}
          className="w-full h-full object-cover"
          alt="Cover"
        />
        <div className="absolute bottom-0 left-0 bg-lime-600 text-white text-xs px-2 py-1 rounded-sm">
          COVER PHOTO
        </div>
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={() => removeImage(0)}
        >
          <RxCrossCircled className="text-[20px]" />
        </button>
      </div>
    ) : (
      <label
        htmlFor="coverUpload"
        className="flex items-center justify-center border border-dashed border-gray-300 rounded h-[160px] w-full cursor-pointer relative"
      >
        <span className="text-blue-500 text-sm font-medium text-center">Click to upload <br /> front view</span>
        <div className="absolute bottom-0 left-0 bg-lime-600 text-white text-xs px-2 py-1 rounded-sm">
          COVER PHOTO
        </div>
        <input
          id="coverUpload"
          type="file"
          accept="image/png,image/jpg,image/jpeg,image/webp"
          className="hidden"
          data-error={"PropertyImage"||"PropertyImagesFile"||"PropertyImagesExtension"}
          onChange={(e) => {
            const files = Array.from(e.target.files);
            if (files.length) {
              const updated = [...currentImages];
              updated[0] = files[0]; 
              setCurrentImages(updated);
              dispatch(setListStorage({ ...reduxData, ['stage3.PropertyImages']: updated }));
             setMultipleError({...multipleError,
              PropertyImages:"",
              PropertyImagesExtension:"",
              PropertyImagesFile:""
             })
            }
          }}
        />
      </label>
    )}
  </div>

  <p className="text-gray-500 text-[12px] mb-2">
  Upload HD pictures of additional space and property (only in png,jpg,jpeg,webp allow)
</p>

<div className="grid grid-cols-3 gap-3 mb-4">
  {Array.from({ length: 3 }).map((_, i) => {
    const index = i + 1;

    const image = currentImages[index];
    const imageUrl =
      typeof image === "string" ? image :
      image instanceof File ? URL.createObjectURL(image) :
      null;

    return (
      <div
        key={index}
        draggable={!!image}
        onDragStart={(event) => drag(event, index)}
        onDragOver={allowDrop}
        onDrop={(event) => drop(event, index)}
      >
        {imageUrl ? (
          <div className="relative w-full h-[100px] border border-gray-300 rounded overflow-hidden">
            <img
              src={imageUrl}
              className="w-full h-full object-cover"
              alt="Other"
            />
            <button
              className="absolute top-1 right-1 text-red-500"
              onClick={() => removeImage(index)}
            >
              <RxCrossCircled className="text-[20px]" />
            </button>
          </div>
        ) : (
          <label
            htmlFor={`upload-${index}`}
            className="flex items-center justify-center border border-dashed border-gray-300 rounded h-[100px] w-full cursor-pointer"
          >
            <span className="text-blue-500 text-lg font-medium">+</span>
            <input
              id={`upload-${index}`}
              type="file"
              multiple
              accept="image/png,image/jpg,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (!files.length) return;

                const updated = [...currentImages];
                if (!updated[index]) {
                  updated[index] = files.shift();
                }
                
                for (let j = 1; j < 4 && files.length > 0; j++) {
                  if (!updated[j]) {
                    updated[j] = files.shift();
                  }
                }

                setCurrentImages(updated);
                dispatch(
                  setListStorage({
                    ...reduxData,
                    ['stage3.PropertyImages']: updated,
                  })
                );
              }}
            />
          </label>
        )}
      </div>
    );
  })}
</div>
</div>

{multipleError?.PropertyImage && (
            <p className="text-sm text-red-500">{multipleError?.PropertyImage}</p>
          )}
          {multipleError?.PropertyImagesFile && (
            <p className="text-sm text-red-500">{multipleError?.PropertyImagesFile}</p>
            
          )}
           {multipleError?.PropertyImagesExtension && (
            <p className="text-sm text-red-500">{multipleError?.PropertyImagesExtension}</p>
          )}
        <h4 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mt-3 ">
          Add Space Video<span class="text-danger"></span>
        </h4>
        <p className="text-[14px] text-gray-500 py-2">
          Renters prioritize photos when selecting a space to reserve.
        </p>
        <div class="upload-section border-2 border-dashed border-gray-300 rounded-lg  text-center font-normal text-base text-gray-600 cursor-pointer -webkit-text-size-adjust: 100%; -webkit-tap-highlight-color: transparent; cursor: pointer; text-align: center; box-sizing: border-box; margin: 0; padding: 0; outline: 0; vertical-align: baseline; -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; font-family: 'Font Awesome 5 Pro'; font-weight: 900; color: #1e80e8; font-size: 18px;">
        <div class="my-2 file-upload-container relative">
              <label
                for="multiplefileupload"
                class="upload-button  text-blue-500 px-4 rounded cursor-pointer inline-block"
              >
                <img
                  className="m-auto"
                  src="/images/icon/Upload Image Icon.svg"
                  alt=""
                /> 
                Upload videos
              </label>
              <div class="file-upload-contain">
                <input
                  id="multiplefileuploadvideo"
                  name="stage3.PropertyVideo"
                  onChange={onChange}
                  type="file"
                  accept=".mp4, .avi, .mov, .wmv, .mkv, .flv, .m4v, .webm, .mpeg, .mpg, .3gp"
                  multiple
                   data-error="PropertyVideo"
                  class="opacity-0 absolute inset-0 cursor-pointer"
                />
        
                <span class="file-size-limit text-gray-500 text-sm block ">
                  Max size: 5MB
                </span>
            
              </div>
            </div>
          

        </div>
        {reduxData["stage3.PropertyVideo"] && (
            <div className="relative pt-3">
              <video
                src={reduxData["stage3.PropertyVideo"] && reduxData['videoUrl']}
                className="preview-image w-['338px']"
              />
              <div className="">
               
                          {multipleError?.PropertyImage && (
            <p className="text-sm text-red-500">{multipleError?.PropertyImage}</p>
          )}
                <p className=" absolute inset-0 cursor-pointer text-right mr-1" onClick={()=>{removeVideo('stage3.PropertyVideo')}}>
                <RxCrossCircled className="text-red-600 float-right text-[25px]" />
                </p>
              </div>
            </div>
          )}
             {multipleError?.PropertyVideo && (
            <p className="text-sm text-red-500">{multipleError?.PropertyVideo}</p>
          )}
                {error?.PropertyVideo && (
                <p className="text-sm text-red-500">{error.PropertyVideo}</p>
              )}
                                 {multipleError?.PropertyVideoExtension && (
            <p className="text-sm text-red-500">{multipleError?.PropertyVideoExtension}</p>
          )}
        <div class="row">
          <div class="col-md-12">
            <fieldset class="name-wrap">
              <label className={formLabelStyle}>
                Daily Rental Price <span class="text-danger">*</span>
              </label>
        <div className="w-full pl-1  mt-2  border rounded-md focus:outline-none bg-white flex justify-center items-center">
        <span className="px-1">₹</span>
              <input
            type="text"
            className="w-full px-2 py-2 rounded-md bg-gray-100  focus:outline-none "
            name="stage3.PerDayRentalAmount"
            placeholder={isFocused ? "" : `${reduxData['stage3.PerDayRentalAmount']} (Recommended)`}
            
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={isFocused ? reduxData['stage3.PerDayRentalAmount'] : ""}
            data-error="PerDayRentalAmount"
          />
        </div>
              <label className="mt-1  text-green-600">
                Annual Earning Potential ₹ {reduxData['stage3.annualEarningPotential']}
              </label>
                                 {multipleError?.PerDayRentalAmount && (
            <p className="text-sm text-red-500">{multipleError?.PerDayRentalAmount}</p>
          )}
            </fieldset>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="bookingDays" className={formLabelStyle}>
                Minimum Number of Booking days
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className={formInputStyle}
                name="stage3.MinimumBookingDays"
                placeholder="Enter days"
                // required
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Accept only positive integers
                    onChange(e);
                  }
                }}
                value={reduxData['stage3.MinimumBookingDays']}
                 data-error="MinimumBookingDays"
                 
              />
              {multipleError?.MinimumBookingDays && (
            <p className="text-sm text-red-500">{multipleError?.MinimumBookingDays}</p>
          )}
               {multipleError?.IsFirstMonthDiscount && (
            <p className="text-sm text-red-500">{multipleError?.IsFirstMonthDiscount}</p>
          )}
            </div>
          </div>
        </div>

        <fieldset class="message-wrap">
          <label className={formLabelStyle}>Description</label>
          <textarea
            className="pl-15 border w-full rounded p-2"
            id="comment-message"
            name="stage3.Description"
            rows="4"
            tabindex="4"
            onChange={onChange}
            placeholder="Type a small summary"
            oninput="countCharacters()"
            value={reduxData['stage3.Description']}
             data-error="Description"
            maxLength="100"
          ></textarea>
          <div id="char-count" class="char-count text-right">
          {charCount}/100
          </div>
          {multipleError?.Description && (
            <p className="text-sm text-red-500">{multipleError?.Description}</p>
          )}
        </fieldset>
        <div className="gap-4 w-full" role="radiogroup" aria-label="First Month Discount">
  <h3 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4">
    Would you like to offer a 50% discount for the first month?
  </h3>
  {/* <p className="text-[14px] text-gray-500 py-2">This will help you get renters faster</p> */}
  
  {["Yes, discount the first month 50%", "No, keep it full price"].map((label, index) => (
    <label key={index} className="flex items-center cursor-pointer transition hover:shadow-md rounded  px-2">
      <input 
        type="radio" 
        name="stage3.IsFirstMonthDiscount" 
        value={index === 0 ? "true" : "false"} 
        className=" peer" 
        checked={reduxData["stage3.IsFirstMonthDiscount"]?.toString() === (index === 0 ? "true" : "false")}
        // defaultChecked={index === 0}
        onChange={onChange}
      />
      <span className="peer-checked:text-blue-500 text-[14px]  p-2 w-full rounded">
        {label}
      </span>
    </label>
  ))}
</div>
<div class="mt-4">
  <h3 class="text-[16px] md:text-[20px] font-semibold text-[#1B1C57] mb-2 mt-4">
    Would you like to review booking requests for this listing? <span class="text-red-500"></span>
  </h3>
  <div class="gap-4">
    {["Customers can proceed with booking after I have reviewed and approved the booking request.", "Customers can book the space directly without my approval, allowing for a seamless and convenient booking process."].map((label, index) => (
      <label
        key={index}
        class="flex gap-1 items-start w-full rounded-lg p-2 cursor-pointer transition hover:shadow-md "
      >
        <input
          type="radio"
          name="stage3.IsAutoApproval"
          value={index === 1 ? "false" : "true"}
          checked={reduxData["stage3.IsAutoApproval"]?.toString() === (index === 0 ? "true" : "false")}
          class="peer my-1 p-2"
          onChange={onChange}
          // defaultChecked={index === 0}
        />
        <div className="peer-checked:text-blue-500 w-full text-[14px]">
          <span class="font-semibold peer-checked:text-blue-500 text">{index === 0
              ? "Yes"
              : "No"} <br /> </span>
          <span class="">
            {label}
          </span>
        </div>
      </label>
    ))}
  </div>
</div>
<div class="wizard-footer my-5 w-[100%]">
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                  onClick={()=>{setCurrentItem("spaceAddress")}}
                >
                  Previous
                </button>
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  className="w-full default-btn next-step btn text-white !bg-blue-500 btn-full p-2"
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
{
              Object.entries(multipleError)?.[0]?.[1] && <p className="text-sm text-red-500">{Object.entries(multipleError)?.[0]?.[1]}</p>
            }
          </div>
      </div>
    </form>
  );
};

export default SpacePhoto;
