import { route } from "../service/route";
import { callAPI } from "./api";


export const sendPackerMoverData = async (data, parameter) => {
    const response = await callAPI(
      route.sendPackerMoverData,
      route.sendPackerMoverData.endPoint+parameter,
      data
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const fetchpmdata = async (parameter) => {
    const response = await callAPI(
      route.fetchPackerMoverData,
      route.fetchPackerMoverData.endPoint+parameter,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const savepackerMoverDataItem = async (data,arg) => {
    const response = await callAPI(
      route.savePackerMoverDataItemapi,
      route.savePackerMoverDataItemapi.endPoint+arg,
      data
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  // export const fetchCheckoutDetails = async (arg) => {
  //   const response = await callAPI(
  //     route.pmCheckoutDetailsapi,
  //     route.pmCheckoutDetailsapi.endPoint+`?applicationUserId=${arg.userId}&packersAndMoversInfoId=${arg?.pmId}`,
  //   );
  //   if (response?.status === 200) {
  //     return { success: response.data };
  //   } else {
  //     return { error: response?.data };
  //   }
  // };


export const fetchCheckoutDetails = async (arg) => {
  const requestBody = {
    applicationUserId: arg.userId,
    packersAndMoversInfoId: arg.pmId,
    packagingType: arg.packagingType,
    otherServices: arg?.otherServices,
    insuranceAmount: arg?.insuranceAmount,
    isInsuranceAmount: arg?.isInsuranceAmount,
    couponCodeId: arg?.couponCodeId,
    couponCode: arg?.couponCode
  };

  const response = await callAPI(
    route.pmCheckoutDetailsapi,
    route.pmCheckoutDetailsapi.endPoint,
    requestBody 
  );

  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};






  export const fetchDataByCategoryId = async (id,storageItems,type,) => {
    const response = await callAPI(
      route.fetchPackerMoverCategoryData,
      route.fetchPackerMoverCategoryData.endPoint+`CategoryId=${id}&AreaSize=${storageItems}&ServiceType=${type=="packer-mover"?"packer-mover":"area-calculator"}`,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const saveAddress = async (data) => {
    const response = await callAPI(
      route.saveAddressData,
      route.saveAddressData.endPoint,
      data
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };


  export const getAllUserAddress = async (parameter) => {
    const response = await callAPI(
      route.getAddress,
      route.getAddress.endPoint+parameter,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const hitPinCodeApi = async (parameter) => {
    const response = await callAPI(
      route.sendPinCode,
      route.sendPinCode.endPoint+parameter,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const savepackerMoverData = async (data,parameter) => {
    const response = await callAPI(
      route.sendPackerMoverData,
      route.sendPackerMoverData.endPoint+parameter,
      data
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const getPaymentData = async (data) => {
    const response = await callAPI(
      route.paymentData,
      route.paymentData.endPoint+`?PaymentId=${data.paymentId}&PaymentType=${data.paymentType}`
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

  export const getareacalculator = async () => {
    const response = await callAPI(
      route.areacalculator,
      route.areacalculator.endPoint,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };

   export const packersMoversCheckoutDetails = async () => {
    const response = await callAPI(
      route.areacalculator,
      route.areacalculator.endPoint,
    );
    if (response?.status === 200) {
      return { success: response.data };
    } else {
      return { error: response?.data };
    }
  };


  