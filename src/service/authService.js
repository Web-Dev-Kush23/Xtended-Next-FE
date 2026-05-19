import { route } from "../service/route";
import { callAPI } from "./api";

const getApiToken = async () => {
  const data = {
    key: "C2D956D0-95A1-4184-9D1F-D51466506EC4",
    val: "E0C6FD46-50F9-49BA-A0E4-88F7DC0FFE65",
  };
  const response = await callAPI(
    route.getApiToken,
    route.getApiToken.endPoint,
    data
  );
  if (response) {
    if (response.data) {
      return { success: response.data };
    }
    return { error: response.data };
  }
};

const newUserRegister = async (data) => {
  const response = await callAPI(
    route.newUserRegister,
    route.newUserRegister.endPoint,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const login = async (data) => {
  const response = await callAPI(
    route.loginWithmobile,
    route.loginWithmobile.endPoint +
      `?PhoneNumber=${data.PhoneNumber}&userType=User`,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const authUserOtpVerify = async (getArgs) => {
  const response = await callAPI(
    route.authOtpVerify,
    route.authOtpVerify.endPoint + getArgs
  );

  
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const brokerRegister = async (data) => {
  const userData = Object.assign({}, data);
  const response = await callAPI(
    route.brokersignUP,
    route.brokersignUP.endPoint,
    userData
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const brokerRegisterOtpVerify = async (getArgs) => {
  const response = await callAPI(
    route.brokerRegisterOtpVerify,
    route.brokerRegisterOtpVerify.endPoint + getArgs
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const brokerlogin = async (data) => {
  const userData = Object.assign({}, data);
  const response = await callAPI(
    route.loginWithPassword,
    route.loginWithPassword.endPoint,
    userData
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const registerAuthUserOtpVerify = async (getArgs) => {
  const response = await callAPI(
    route.registerAuthOtpVerify,
    route.registerAuthOtpVerify.endPoint + getArgs
  );

  
  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const resetpassword = async (data) => {
  const response = await callAPI(
    route.resetPassword,
    route.resetPassword.endPoint,
    data
  );

  
  if (response.status === 200) {
    return { success: response.data };
  } else {
    return { error: response.data };
  }
};

const spaceListigStage1 = async (data) => {
  const response = await callAPI(
    route.spaceListig,
    route.spaceListig.endPoint,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const authResendOtp = async (args) => {
  const response = await callAPI(
    route.authResendOtp,
    route.authResendOtp.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const registerResendOtp = async (args) => {
  const response = await callAPI(
    route.resendAuthOtp,
    route.resendAuthOtp.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const emailPhoneOtpVerify = async (data) => {
  const response = await callAPI(
    route.emailPhoneOtpVerify,
    route.emailPhoneOtpVerify.endPoint,
    data
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
const resendEmailOtp = async (args) => {
  const response = await callAPI(
    route.resendEmailOtp,
    route.resendEmailOtp.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};

const facebookLogin = async (args) => {
  const response = await callAPI(
    route.facebookLogin,
    route.facebookLogin.endPoint + args
  );
  if (response?.status === 200) {
    return { success: response.data };
  } else {
    return { error: response?.data };
  }
};
export {
  resendEmailOtp,
  getApiToken,
  newUserRegister,
  login,
  brokerRegister,
  brokerlogin,
  authUserOtpVerify,
  registerAuthUserOtpVerify,
  brokerRegisterOtpVerify,
  resetpassword,
  spaceListigStage1,
  authResendOtp,
  registerResendOtp,
  emailPhoneOtpVerify,
  facebookLogin

};
