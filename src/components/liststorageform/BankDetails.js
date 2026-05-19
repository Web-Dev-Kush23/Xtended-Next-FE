import { getProfileBank, spaceListig } from "@/service/storageService";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setListStorage } from "@/app/globalRedux/Feature/ListStorage";
import { getUserId } from "@/util/common";


const BankDetails = ({ PropertyId, setCurrentItem, userId, bankdetails }) => {
  const formInputStyle =
    "w-full px-2 py-2 mt-2 bg-gray-100 border rounded-md focus:outline-none focus:bg-white";
  const formLabelStyle = "block text-[#1B1C57] text-sm font-normal mt-4";
  const formSelectStyle =
    "w-full px-2 py-2 mt-0 border rounded-md focus:outline-none focus:bg-white";
    const formRef = useRef(null);
  const [data, setData] = useState({ PropertyId });
  const [error, setError] = useState();
  const [multipleError, setMultipleError] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [addressProofType, setAddressProofType] = useState("");
  const router = useRouter();
  const { listStorage: { value:reduxData } } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [errors, setErrors] = useState({})
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "", })); }
  };
  const [apiAdhaarFrontImage, setApiAdhaarFrontImage] = useState("");
  const [apiAdhaarBackImage, setApiAdhaarBackImage] = useState("");
  const [apiAddressProofImage, setApiAddressProofImage] = useState("");
  const [apiPanCardImage, setApiPanCardImage] = useState("");
  const [apiAddressProofType, setApiAddressProofType] = useState("");

  


  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setData({ ...data, [name]: files[0] });
      dispatch(setListStorage({ ...data,...reduxData, [name]: files[0]  }))
    } else {
      setData({ ...data, [name]: value });
      dispatch(setListStorage({ ...data,...reduxData, [name]: value }))
    }
    setError();
    setMultipleError({});
  };

  const onOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setData({
      ...data,
      "stage4.PaymentType": e.target.value,
    });
    dispatch(setListStorage({ ...data,...reduxData, "stage4.PaymentType": e.target.value}))
  };

  const onAddressProofChange = (e) => {
    setAddressProofType(e.target.value);
    setData({
      ...data,
      "stage4.AddressProofType": e.target.value,
      "stage4.AdhaarFrontImage": null,
      "stage4.AdhaarBackImage": null,
      "stage4.AdressProofImage": null,
    });
  
    dispatch(setListStorage({ ...data,...reduxData,  "stage4.AddressProofType": e.target.value,
    "stage4.AdhaarFrontImage": null,
    "stage4.AdhaarBackImage": null,
    "stage4.AdressProofImage": null,}))
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    if (!isChecked) { setErrors((prevErrors) => ({ ...prevErrors, checkError: "Please agree to the terms and conditions before submitting.", })); return; }

    const formData = new FormData();
    for (let key in reduxData) {
      formData.append(key, reduxData[key]);
    }
    if(bankdetails?.id){
      formData.append("hostBankAccountId", bankdetails.id);
    }
    const parameter = `?ApplicationUserId=${userId}&stage=4`;
    const response = await spaceListig(formData, parameter);
    if (response.success) {
      setData({});
      dispatch(setListStorage({}))
      // Handle success
      router.push("/list-storage/thankyou");
    } else {
      setMultipleError(response.error.text);
      const firstErrorKey = Object.keys(response?.error?.text)[0];
      const firstErrorElement = formRef.current.querySelector(`[data-error=${firstErrorKey}]`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }; const isFile = (file) => file instanceof File;

  const getImageSrc = (fileOrUrl) => {
    return isFile(fileOrUrl) ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
  };

  useEffect(() => {
    (async () => {
      try {
        const args = `?ApplicationUserId=${getUserId()}`;
        const response = await getProfileBank(args);
  
        if (response.success) {
          const data = response.success?.data || {};
          // const {
          //   panCardImage,
          //   addressProofType,
          //   addressProofImage,
          //   adhaarFrontImage,
          //   adhaarBackImage,
          //   bankAccountId: {
          //     accountNumber = "",
          //     accountName = "",
          //     bankAccountId = "",
          //     bankAddress = "",
          //     bankName = "",
          //     ifscCode = "",
          //     paymentType = "",
          //     upiid = ""
          //   } = {}
          // } = data;
          const {
            panCardImage,
            addressProofType,
            addressProofImage,
            adhaarFrontImage,
            adhaarBackImage,
            bankAccountId
          } = data;
  
          const {
            accountNumber = "",
            accountName = "",
            bankAccountId: id = "",
            bankAddress = "",
            bankName = "",
            ifscCode = "",
            paymentType = "",
            upiid = ""
          } = bankAccountId || {}; // ✅ Safely destructure
  
          setApiPanCardImage(panCardImage);
          setApiAdhaarFrontImage(adhaarFrontImage);
          setApiAdhaarBackImage(adhaarBackImage);
          setApiAddressProofImage(addressProofImage);
          setApiAddressProofType(addressProofType);


          dispatch(
            setListStorage({
              ...data,
              ...reduxData,
              "stage4.PaymentType": paymentType,
              "stage4.UPIId": upiid,
              "stage4.AccountHolderName": accountName,
              "stage4.AccountNumber": accountNumber,
              "stage4.BankIFSC": ifscCode,
              "stage4.BankName": bankName,
              "stage4.BankBranch": bankAddress,
              "stage4.PanCardProofImage": panCardImage,
              "stage4.AdhaarFrontImage": adhaarFrontImage,
              "stage4.AdhaarBackImage": adhaarBackImage,
              "stage4.AddressProofType": addressProofType,
              "stage4.AdressProofImage": addressProofImage

            })
          );
        }
      } catch (error) {
        console.error("Error fetching profile bank details:", error);
      }
    })();
  }, []);
  const isImageUploaded = Boolean(apiPanCardImage);
  const isAdhaarFrontUploaded = Boolean(apiAdhaarFrontImage);
  const isAdhaarBackUploaded = Boolean(apiAdhaarBackImage);
  const isAddressProofUploaded = Boolean(apiAddressProofImage);

  return (
  <div className="">
      <form onSubmit={onsubmitHandler} ref={formRef}>
      <div className="tab-pane mx-2" role="tabpanel" id="step4">
        <div className="flex-col items-center justify-between my-2">
          <label htmlFor="storageType" className={formLabelStyle}>
            Select Any One <span className="text-red-500">*</span>
          </label>
          <select
            id="Bank"
            className={formSelectStyle}
            name="stage4.PaymentType"
            onChange={onOptionChange}
            required
            value={reduxData['stage4.PaymentType'] ? reduxData['stage4.PaymentType'] : ""}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="UPIID">UPI ID</option>
            <option value="BankAccount">Bank Account</option>
          </select>
          {multipleError?.PaymentType && (
            <p className="text-sm text-red-500">{multipleError.PaymentType}</p>
          )}
        </div>

        {reduxData['stage4.PaymentType'] === "UPIID" && (
          <fieldset className="name-wrap">
            <label className={formLabelStyle}>
              UPI ID <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={formInputStyle}
              name="stage4.UPIId"
              onChange={onChange}
              placeholder="UPI ID"
              value={reduxData['stage4.UPIId']}
              required
            />
                {multipleError?.UPIId && (
            <p className="text-sm text-red-500">{multipleError.UPIId}</p>
          )}
          </fieldset>
        )}

        {reduxData['stage4.PaymentType'] === "BankAccount" && (
          <div className="bankdetails">
            <h4 className="text-[16px] md:text-[20px] font-semibold text-[#1B1C57]">
              Add Bank Details
            </h4>
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Account Holder Name
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage4.AccountHolderName"
                onChange={onChange}
                placeholder="Enter Name"
                value={reduxData['stage4.AccountHolderName']}
                required
                onKeyDown={(event) => {
                  if (!/[a-zA-Z]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
              {multipleError?.AccountHolderName && (
                <p className="text-sm text-red-500">{multipleError?.AccountHolderName}</p>
              )}
            </fieldset>
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Account Number
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage4.AccountNumber"
                onChange={onChange}
                placeholder="Enter Number"
                value={reduxData['stage4.AccountNumber']}
                required
              />
              
            </fieldset>
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                IFSC Code
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage4.BankIFSC"
                onChange={onChange}
                placeholder="Enter IFSC Code"
                value={reduxData['stage4.BankIFSC']}
                required
              />
            </fieldset>
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Bank Name
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage4.BankName"
                onChange={onChange}
                placeholder="Enter Name"
                value={reduxData['stage4.BankName']}
                required
                onKeyDown={(event) => {
                  if (!/[a-zA-Z]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </fieldset>
            <fieldset className="name-wrap">
              <label className={formLabelStyle}>
                Bank Address
              </label>
              <input
                type="text"
                className={formInputStyle}
                name="stage4.BankBranch"
                onChange={onChange}
                placeholder="Enter Bank Address"
                value={reduxData['stage4.BankBranch']}
                required
              />
            </fieldset>
          </div>
        )}
        <div className="">
          <h4 className={formLabelStyle}>
            PAN Card<span className="text-red-500">*</span>
          </h4>
          <div className="upload-section border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer">
            {reduxData["stage4.PanCardProofImage"] ? (
              <div className="relative">
                <img
                 
                  src={String(reduxData["stage4.PanCardProofImage"])?.includes('https://') ? reduxData["stage4.PanCardProofImage"] :URL.createObjectURL(reduxData["stage4.PanCardProofImage"])}
                  className="preview-image w-['338px']"
                />
                <div className="">
                  <input
                    id="multiplefileuploadvideo"
                    onChange={onChange}
                    name="stage4.PanCardProofImage"
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/webp" 
                    multiple
                    className={`opacity-0 absolute inset-0 cursor-pointer z-20 ${
                      isImageUploaded  ? "pointer-events-none" : ""
                    }`}
                    disabled={isImageUploaded}
                  />
                  <p
                    className={`absolute inset-0 cursor-pointer text-right mr-1 ${
                      isImageUploaded ? "text-gray-400 cursor-not-allowed opacity-0" : "text-blue-500 opacity-1"
                    }`}
                  >
                    Edit
                  </p>
                </div>
                {isImageUploaded ? (
                  <p className="text-green-600 text-sm">Already Uploaded</p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="file-upload-container relative">
                <label
                  htmlFor="multiplefileupload"
                  className="upload-button text-blue-500 px-4 rounded cursor-pointer inline-block"
                >
                  <img
                    className="m-auto"
                    src="/images/icon/Upload Image Icon.svg"
                    alt=""
                  /> 
                  Upload Photos
                </label>
                <input
                  id="multiplefileupload"
                  type="file"
                  name="stage4.PanCardProofImage"
                  accept="image/png,image/jpg,image/jpeg,image/webp" 
                  multiple
                  className="opacity-0 absolute inset-0 cursor-pointer"
                  onChange={onChange}
                  data-error="PanCardProofImageExtension"
                />
                <span className="file-size-limit text-gray-500 text-sm block">
                  Max size: 2MB (only png,jpg,jpeg,webp format allow)
                </span>
              </div>
            )}
            {multipleError?.PanCardProofImageExtension && (
            <p className="text-sm text-red-500">{multipleError?.PanCardProofImageExtension}</p>
          )}
          {multipleError?.PanCardProofImageFileSize && (
            <p className="text-sm text-red-500">{multipleError?.PanCardProofImageFileSize}</p>
          )}
          </div>
        </div>
        { isAddressProofUploaded || isAdhaarFrontUploaded || isAdhaarBackUploaded ? (""):(
        <div className="flex-col items-center justify-between my-2">
          <label htmlFor="addressProof" className={formLabelStyle}>
            Address Proof <span className="text-red-500">*</span>
          </label>
          <select
            id="addressProof"
            className={formSelectStyle}
            name="stage4.AddressProofType"
            onChange={onAddressProofChange}

            // required
            defaultValue={reduxData['stage4.AddressProofType'] ? reduxData['stage4.AddressProofType']:""}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="AdhaarCard">Adhaar Card</option>
            <option value="ElectricityBill">Electricity Bill</option>
            <option value="DrivingLicense">Driving License</option>
          </select>
          {multipleError?.AddressProofType && (
            <p className="text-sm text-red-500">{multipleError?.AddressProofType}</p>
          )}
          {multipleError?.AddressProofImageExtension && (
            <p className="text-sm text-red-500">{multipleError?.AddressProofImageExtension}</p>
          )}
        </div>)}
    
        

        {reduxData['stage4.AddressProofType'] && (
          <div className="">
            <h4 className={formLabelStyle}>
              Address proof<span className="text-red-500">*</span>
            </h4>
            <div className="upload-section border-2 border-dashed border-gray-300 rounded-lg p-6 text-center font-normal text-base text-gray-600 cursor-pointer">
              {(reduxData['stage4.AddressProofType'] === "ElectricityBill" ||
                reduxData['stage4.AddressProofType'] === "DrivingLicense") && (
                <>
                  {reduxData["stage4.AdressProofImage"] ? (
                    <div className="relative">
                      <img
                      src={getImageSrc(reduxData["stage4.AdressProofImage"])}
                      alt=""
                      className="mt-2"
                      />
                      <div className="">
                        <input
                          id="multiplefileuploadvideo"
                          onChange={onChange}
                          name="stage4.AdressProofImage"
                          type="file"
                          accept="image/png,image/jpg,image/jpeg,image/webp" 
                          multiple
                          className={`opacity-0 absolute inset-0 cursor-pointer z-20 ${
                            isAddressProofUploaded  ? "pointer-events-none" : ""
                          }`}
                          disabled={isAddressProofUploaded}
                        />
                        <p
                    className={`absolute inset-0 cursor-pointer text-right mr-1 ${
                      isAddressProofUploaded ? "text-gray-400 cursor-not-allowed opacity-0" : "text-blue-500 opacity-1"
                    }`}
                  >
                    Edit
                  </p>
                      </div>
                    </div>
                  ) : (
                    <div className="file-upload-container relative">
                      <label
                        htmlFor="multiplefileupload"
                        className="upload-button text-blue-500 px-4 rounded cursor-pointer inline-block"
                      >
                        <img
                          className="m-auto"
                          src="/images/icon/Upload Image Icon.svg"
                          alt=""
                        /> 
                        Upload Photos
                      </label>
                      <input
                        id="multiplefileupload"
                        type="file"
                        name="stage4.AdressProofImage"
                        accept="image/png,image/jpg,image/jpeg,image/webp" 
                        multiple
                        className="opacity-0 absolute inset-0 cursor-pointer"
                        onChange={onChange}
                      />
                      <span className="file-size-limit text-gray-500 text-sm block">
                        Max size: 2MB
                      </span>
                    </div>
                  )}
                </>
              )}
                {reduxData['stage4.AddressProofType'] === "AdhaarCard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  {reduxData["stage4.AdhaarFrontImage"] && (
                    <img
                      src={getImageSrc(reduxData["stage4.AdhaarFrontImage"])}
                      className="preview-image w-['338px']"
                    />
                  )}
                  <div className="file-upload-container relative">
                    <label
                      htmlFor="fileuploadadhaarfront"
                      className="upload-button text-blue-500 px-4 rounded cursor-pointer inline-block"
                    >
                      {reduxData["stage4.AdhaarFrontImage"] ? (
                         <span  className={`absolute inset-0 cursor-pointer text-right mr-1 ${
                          isAdhaarFrontUploaded && isAdhaarBackUploaded ? "text-gray-400 cursor-not-allowed opacity-0" : "text-blue-500 opacity-1"
                        }`}>Edit</span>
                      ) : (
                        <>
                         <img
                          className="m-auto"
                          src="/images/icon/Upload Image Icon.svg"
                          alt=""
                        /> 
                          Upload Front
                        </>
                      )}
                    </label>
                    <input
                      id="fileuploadadhaarfront"
                      type="file"
                      name="stage4.AdhaarFrontImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      multiple
                      className="opacity-0 absolute inset-0 cursor-pointer"
                      disabled={isAdhaarFrontUploaded && isAdhaarBackUploaded }
                      onChange={onChange}
                    />
                    <span className="file-size-limit text-gray-500 text-sm block">
                      Max size: 2MB
                    </span>
                  </div>
                </div>
                <div className="relative">
                  {reduxData["stage4.AdhaarBackImage"] && (
                    <img
                      src={getImageSrc(reduxData["stage4.AdhaarBackImage"])}
                      className="preview-image w-['338px']"
                    />
                  )}
                  <div className="file-upload-container relative">
                    <label
                      htmlFor="fileuploadadhaarback"
                      className="upload-button text-blue-500 px-4 rounded cursor-pointer inline-block"
                    >
                      {reduxData["stage4.AdhaarBackImage"] ? (
                       
                        <span  className={`absolute inset-0 cursor-pointer text-right mr-1 ${
                          isAdhaarFrontUploaded && isAdhaarBackUploaded ? "text-gray-400 cursor-not-allowed opacity-0" : "text-blue-500 opacity-1"
                        }`}>Edit</span>
                      ) : (
                        <>
                          <img
                          className="m-auto"
                          src="/images/icon/Upload Image Icon.svg"
                          alt=""
                        /> 
                          Upload Back
                        </>
                      )}
                    </label>
                    <input
                      id="fileuploadadhaarback"
                      type="file"
                      name="stage4.AdhaarBackImage"
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      multiple
                      className="opacity-0 absolute inset-0 cursor-pointer"
                      disabled={isAdhaarFrontUploaded && isAdhaarBackUploaded }
                      onChange={onChange}
                    />
                    <span className="file-size-limit text-gray-500 text-sm block">
                      Max size: 2MB
                    </span>
                  </div>
                </div>
           
              </div>
              
            )}
                 { isAddressProofUploaded || isAdhaarFrontUploaded || isAdhaarBackUploaded ? (
      <p className="text-green-600 text-sm">{reduxData["stage4.AddressProofType"]} Already Uploaded</p>
    ) : ""}
            </div>
          </div>
        )}

<div class="wizard-footer mb-5 w-[100%]">
<div className="form-checkbox py-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="form-checkbox-input"
                    />
                    <div className="">
                      <p className="text-[12px] text-[#374151]">
                        By continuing, you agree to our
                        <a href="/terms-and-conditions" target="_blank">
                          <span className="text-blue-500 underline ml-1 mr-1">
                            Terms & Conditions
                          </span>
                        </a>
                        and
                        <a href="/privacy-policy" target="_blank">
                          <span className="text-blue-500 underline ml-1">
                            Privacy Policy
                          </span>
                        </a>
                      </p>
                    </div>
                  </div>
                  <span className="error text-[12px] mb-2 text-red-500">{errors?.checkError}</span>
                  <div
          className="mt-8 flex rounded items-center p-2"
          style={{ backgroundImage: "url('/images/Rectangle.png')" }}
        >
          <img
            src="/images/icon/address icon.svg"
            alt="Uploaded Address Proof"
            className="mr-4"
            onChange={onChange}
          />
          <p className="text-gray-500 text-[14px]  ">
             
            More than 15k people have uploaded address proof before
          </p>
        </div>
                </div>
           
            <ul class="d-flex justify-content-between w-full gap-2">
              <li className="w-1/2">
                <button
                  type="button"
                  class=" w-full default-btn prev-step btn btn-outline-primary p-2"
                  onClick={()=>{setCurrentItem("spacephoto")}}
                >
                  Previous 
                </button>
              </li>
              <li className="w-1/2">
                <button
                  type="submit"
                  class=" w-full default-btn next-step btn !bg-blue-500 btn-full p-2"
                >
                  Save
                </button>


              </li>
            </ul>
            {error?.text &&
  <p className="text-sm text-red-500">
    {error?.text}
  </p>
}
{
              Object.entries(multipleError)?.[0]?.[1] && <p className="text-sm text-red-500">{Object.entries(multipleError)?.[0] }</p>
            }
          </div>
      </div>
  
    </form>
       
  </div>
  );
};

export default BankDetails;