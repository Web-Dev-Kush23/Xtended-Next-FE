import axios from "axios";
import { localStorageManager } from "../util/common";
import { STORAGE_KEY } from "../util/constant";
import { getApiToken } from "../service/authService";
const callAPI = async (
  route,
  endPoint,
  body = {},
  recaptcha,
  externalUrl = false
) => {
  const baseUrls = {
    prod: "https://xtendedspace-web-api.azurewebsites.net",
    stage: "https://xtendedspace-stage-gagphyexhxh5hjdj.centralindia-01.azurewebsites.net",
    dev: "https://xtendedspace-apinew.azurewebsites.net",
  };

  let url = baseUrls.prod;
  const href = window.location.href;

  if (href.includes("stage.xtendedspace.com")) {
    url = baseUrls.stage;
  } else if (
    href.includes("localhost") ||
    href.includes("main.d2kyc") ||
    href.includes("devlopment.d3fsm")
  ) {
    url = baseUrls.dev;
  }

  url = `${url}${endPoint}`;
  const responseType = route.responseType;

  // This function builds axios request
  const makeRequest = async (token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (route.verb === "get") {
      return axios[route.verb](url, { headers, responseType });
    }

    return axios[route.verb](url, body, { headers });
  };

  return new Promise(async (resolve) => {
    const jwt = localStorageManager.getValue(STORAGE_KEY.JWT_TOKEN) || "";

    try {
      const response = await makeRequest(jwt);
      resolve(response);
    } catch (err) {
      if (err?.response?.status === 401) {
        // Token expired - fetch new one
        try {
          const newTokenResponse = await getApiToken();
          const newToken = newTokenResponse?.success?.token;

          if (newToken) {
            localStorageManager.setValue(STORAGE_KEY.JWT_TOKEN, newToken);

            // Retry the original request with new token
            const retryResponse = await makeRequest(newToken);
            return resolve(retryResponse);
          }
        } catch (tokenError) {
          console.error("Token refresh failed:", tokenError);
        }
      }

      // Final fallback
      resolve(err.response || { error: true, message: "Unknown error" });
    }
  });
};

const setAuthToken = async () => {
  const newToken = await getApiToken();
  if (newToken.success) {
    // console.log("newToken", newToken.success);
    localStorageManager.setValue(
      STORAGE_KEY.JWT_TOKEN,
      newToken.success.token
    );
    const retryResponse = await axios({
      method: route.verb,
      url: url,
      headers: {
        Authorization: `Bearer ${newToken}`,
        Recaptcha: `Recaptcha ${recaptcha}`,
      },
      responseType: responseType,
      data: body,
    });
    resolve(retryResponse);
  } else {
    // console.log("newToken.error", newToken.error);
  }
}

export { callAPI };
