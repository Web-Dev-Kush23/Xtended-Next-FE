import { useState,useEffect } from "react";
import { contact_us } from "@/service/homePageService";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Hubspot from "../pages/popupform/hubspotpopup";
import { sendDataToAPI } from "@/service/leads";
export default function Index() {
    const [formData, setFormData] = useState({
        subject: "Emtpy",
        source: "storage space",
        city: "Emtpy",
        message: "Empty",
        name: "",
        phoneNumber: "",
        email: "",

      });
  const [utm, setUtm] = useState({});

      const [error, setError] = useState();
  const [hubspotFormSubmit, setHubspotFormSubmit] = useState(false);

  const [errors, setErrors] = useState({})
      const [showSuccessMessage, setShowSuccessMessage] = useState(false);
      const [multipleError, setMultipleError] = useState();
      const [isChecked, setIsChecked] = useState(true);
      const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        if (isChecked) {setErrors((prevErrors) => ({...prevErrors,checkError: "",}));}};
        
      const [isSubmitting, setIsSubmitting] = useState(false);
      function trimNumber(s) {
        while (s.substr(0, 1) == "0" && s.length > 1) {
          s = s.substr(1, 9999);
        }
        return s;
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
          setFormData({ ...formData, [name]: trimNumber(value) });
        } else {
          setFormData({ ...formData, [name]: value });
        }
        setError();
        setMultipleError();
      };
      
  const searchParams = useSearchParams();
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");
  const gclid = searchParams.get("gclid");
  const referrer = searchParams.get("referrer");
  useEffect(() => {
    const utmParams = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
      utm_content: searchParams.get("utm_content"),
      utm_term: searchParams.get("utm_term"),
      gclid: searchParams.get("gclid"),
      referrer: searchParams.get("referrer"),
    };
    setUtm(utmParams);
  }, [searchParams]);
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {setErrors((prevErrors) => ({...prevErrors, checkError: "Please agree to the terms and conditions before submitting.",})); return;}
  
        if (isSubmitting) return;
        setIsSubmitting(true);
        if (utm_source) {
          formData.append("UTM_Source", utm_source);
          formData.append("UTM_Medium", utm_medium);
          formData.append("UTM_Campaign", utm_campaign);
          formData.append("UTM_Content", utm_content);
          formData.append("UTM_Term", utm_term);
          formData.append("Gclid", gclid);
          formData.append("Referrer", referrer);
        }
        const response = await contact_us(formData);
        if (response.success) {
          await sendDataToAPI(formData, utm); 
          setHubspotFormSubmit(true);

          // alert("we will get you soon!");
          setShowSuccessMessage(true);
    
          document.getElementById("myform3").reset();
          
        } else {
          // setError(response.error);
    
          if (
            response?.error?.title === "One or more validation errors occurred."
          ) {
            setMultipleError(response?.error?.errors);
    
            setError(response.error);
          }
          setIsSubmitting(false);
        }
      };
    

    return (
        <>
         <Hubspot 
        portalId="45810273"
        formId="468c83bf-682f-46f1-82c5-e9896d260460"
        hubspotFormSubmit={hubspotFormSubmit}
        data={ formData }
        utm={utm}
      />
              <section id="third" class="third px-8">
        
        <div class="ht1 md:w-1/2 flex-col mx-[auto] items-center md:items-start flex gap-[30px]">
         
          <h2 className="my-2 text-[22px] md:text-[34px] font-bold text-[#1B1C57]">
          Want to Connect with us?
          </h2>
          <p className=" my-2  text-[17px] md:text-[20px] font-[400] text-[#2a3137bb]">
          Please fill your contact details & we <br /> will reach out to you soon! <br />  <a href="tel:+919009000798">
                            <span class=""><i class="ri-phone-fill"></i></span>
                            <span class="flex items-center md:py-[30px] justify-center md:justify-start gap-2"><BiSolidPhoneCall /> +(91) 900 900 0798</span>
                        </a>
          </p>
        </div>
       
        
        <div class="about-img mx-[auto]">
          <div className="container">
         
            <form id="myform3" onSubmit={handleSubmit}  >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    Name<span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter"
                    name="name"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.Name && (
                    <p className="text-sm text-red-500">
                      {multipleError?.Name[0]}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    Phone<span class="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Enter"
                    name="phoneNumber"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.PhoneNumber && (
                    <p className="text-sm text-red-500">
                      {multipleError?.PhoneNumber[0]}
                    </p>
                  )}
                </div>
              
              </div>
              <div className="form-row">
              <div className="form-group">
                  <label htmlFor="email">
                    Email<span class="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter"
                    name="email"
                    // required
                    onChange={handleChange}
                  />
                  {multipleError && multipleError.Email && (
                    <p className="text-base text-red-500">
                      {multipleError.Email[0]}
                    </p>
                  )}
                </div>
               
              </div>
              <div className="form-checkbox py-2">
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
<span className="error text-[12px] mb-2 text-red-500">{errors.checkError}</span>

</div>
              
              <div className="form-row">
                <button type="submit" disabled={isSubmitting}>Submit</button>
              </div>
              <div>
                {showSuccessMessage && (
                  <p className="success-message text-green-500 font-semibold py-2 px-2">Thank you for contacting us! Our Team will contact you soon!!</p>
                )}</div>
            
            </form>
          </div>
        </div>
     
      </section>
        </>
    )
}


