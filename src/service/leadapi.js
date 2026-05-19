const getBaseURL = () => {
  if (typeof window !== "undefined") {
    const currentURL = window.location.href;

    if (
      currentURL.includes("localhost") ||
      currentURL.includes("main.d2kyc") ||
      currentURL.includes("devlopment.d3fsm")
    ) {
      return "https://stagecrmapi.xtendedspace.com/api"; 
    } else {
      return "https://apiproduction.xtendedspace.com/api";
    }
  }

 return "https://apiproduction.xtendedspace.com/api";
};

export const baseURL = getBaseURL();
