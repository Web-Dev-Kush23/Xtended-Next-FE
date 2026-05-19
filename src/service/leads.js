// utils/apiUtils.js
import { baseURL } from "../service/leadapi";
export const sendDataToAPI = async (formData, utmData) => {
  const utmSession = JSON.parse(sessionStorage.getItem("utm_data"));

    try {
      const payload = {
        firstName: formData?.firstname || formData?.firstName || formData?.Name ||  formData?.name || "N/A",
        // lastName: "",
          lastName: formData?.lastName || formData?.LastName || formData?.lastname || "",
        email: formData?.Email || formData?.email || "N/A",
        phone: formData?.Mobile || formData?.phoneNumber ||formData?.Phone || formData?.PhoneNumber || "N/A",
        serviceType: formData?.AddType || formData?.ServiceType || "N/A",
      source: formData?.source || "N/A",
        location: formData?.Location || "N/A",
        utm: {
          utmSource: utmData?.utm_source || utmData?.source  || utmSession?.source ||"",
          utmMedium: utmData?.utm_medium || utmData?.medium || utmSession?.medium || "",
          utmCampaign: utmData?.utm_campaign || utmData?.campaign || utmSession?.campaign || "",  
          utmContent: utmData?.utm_content || utmData?.content || utmSession?.content || "",
          utmTerm: utmData?.utm_term || utmData?.term ||   utmSession?.term || "",  
          gclId: utmData?.gclId || utmData?.gclId ||  utmSession?.gclId || "",
        },
      };
  
      const response = await fetch(`${baseURL}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
       
        return result; // Return the result for further usage
      } else {
        console.error("Failed to send data to API:", response.statusText);
        throw new Error(`API Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error while sending data to API:", error);
      throw error;
    }
  };
  