export const HandleLocalStorage = () => {
    if (typeof window === "undefined") return;
  
    const LAST_CLEARED_KEY = "lastClearedEasyData";
    const STORAGE_KEY = "easyStorageData";
  
    const lastCleared = localStorage.getItem(LAST_CLEARED_KEY);
    const now = new Date().getTime();
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; 
    // const THIRTY_DAYS =  60 * 1000; 
  
    if (!lastCleared) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(LAST_CLEARED_KEY, now.toString());
    } else {
      const lastClearedTime = parseInt(lastCleared, 10);
      
      if (now - lastClearedTime > THIRTY_DAYS) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(LAST_CLEARED_KEY, now.toString());
      }
    }
  };
  