import { useEffect, useState } from "react";

const localStorageManager = {
  getValue: (key) => {
    return localStorage.getItem(key);
  },
  setValue: (key, value) => {
    localStorage.setItem(key, value);
  },
};

const isMobile = () => {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width < 700) {
      return true;
    } else {
      return false;
    }
  }
};

const getUserId = () => {
  const userData =
    localStorageManager.getValue("userDetails") &&
    JSON.parse(localStorageManager.getValue("userDetails"));
  if (userData?.userId) {
    return userData?.userId;
  } else {
    return false;
  }
};

const getFormateddate = (currentDate) => {
  const today = new Date(currentDate);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;

  return formattedToday;
};

const getFormateddateForStage2 = (currentDate) => {
  const today = new Date(currentDate);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;

  return formattedToday;
};

const getFormateddateForEndDate = (startDate) => {
  const date = new Date(startDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

function submitForm(formData) {
  formData.get("email");
  const name = formData.get("Name");
  const mobile = formData.get("Mobile");
  const location = formData.get("Location");
  const AddType = formData.get("AddType");
  formData.append("name", name);
  formData.append("mobile", mobile);
  formData.append("location", location);
  formData.append("pageUrl", window.location.href);

  var scriptURL =
    "https://script.google.com/macros/s/AKfycbzJkZ9rtRMR0dQQdFfwWsqjuAuhReojTosJutWI89T5EMQ3-8CTBhcs6y1yYs5djeebHQ/exec";
  // fetch(scriptURL, { method: "POST", body: formData });
}

function getTokenAmount(payment) {
  if (payment <= 500) {
    return payment;
  } else if (payment <= 5000) {
    return 500;
  } else {
    return 1000;
  }
}

 const findAuthorById = (posts, authorId) => {
  for (const post of posts) {
    if (Array.isArray(post.AuthorContent)) {
      const author = post.AuthorContent.find(author => author.authorid === authorId);
      if (author) {
        return author;
      }
    }
  }
  return null; 
};
const utmSaveSession= ()=> {
  const params = new URLSearchParams(window.location.search);
  const utms = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content')
  };

  if (utms.source || utms.campaign) {
    sessionStorage.setItem('utm_data', JSON.stringify(utms));
  }
};

function DisplayName (firstName, lastName){
  if (!firstName && !lastName) return "--";
   if (firstName?.trim().toLowerCase() === lastName?.trim().toLowerCase()) {
    return firstName.trim();
  }
   return `${firstName || ""} ${lastName || ""}`.trim();
}

function safeValue(val, fallback = "") {
  return val === undefined || val === null ? fallback : val;
}


export {
  getTokenAmount,
  localStorageManager,
  isMobile,
  getUserId,
  getFormateddate,
  getFormateddateForEndDate,
  getFormateddateForStage2,
  submitForm,
  findAuthorById,
  utmSaveSession,
  DisplayName,
safeValue,
};