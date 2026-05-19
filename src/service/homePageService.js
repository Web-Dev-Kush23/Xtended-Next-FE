const { callAPI } = require("./api");
const { route } = require("./route");

const contact_us = async(data)=>{
    const response = await callAPI(
        route.contact_us,
        route.contact_us.endPoint,
        data);
    
      if (response.status === 200) {
       return { success: response.data };
        }
      else{
        return { error: response.data };
      }
}
const SaveMumbai = async(data)=>{
  const response = await callAPI(
      route.SaveMumbai,
      route.SaveMumbai.endPoint,
      data);
  
    if (response.status === 200) {
     return { success: response.data };
      }
    else{
      return { error: response.data };
    }
}
const SaveRelocationSevices = async(data)=>{
  const response = await callAPI(
      route.SaveRelocationSevices,
      route.SaveRelocationSevices.endPoint,
      data);
  
    if (response.status === 200) {
     return { success: response.data };
      }
    else{
      return { error: response.data };
    }
}

const fetchFeedbackData = async(data)=>{
  const response = await callAPI(
      route.GetFeedbackDetails,
      route.GetFeedbackDetails.endPoint,
      data);
  
    if (response.status === 200) {
     return { success: response.data };
      }
    else{
      return { error: response.data };
    }
}
const saveFeedbackForm = async(data)=>{
  const response = await callAPI(
      route.saveFeedbackDetails,
      route.saveFeedbackDetails.endPoint,
      data);
  
    if (response.status === 200) {
     return { success: response.data };
      }
    else{
      return { error: response.data };
    }
}



export {contact_us,SaveMumbai,SaveRelocationSevices,fetchFeedbackData,saveFeedbackForm}