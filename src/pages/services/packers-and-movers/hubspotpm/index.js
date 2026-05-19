import { localStorageManager } from "@/util/common";
import { memo, useEffect, useMemo, useState } from "react";

const Hubspot = ({ portalId, formId, hubspotFormSubmit, data }) => {


  let iframe;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.defer=true;
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        
        window.hbspt.forms.create({
          region: "na1",
          portalId: portalId,
          formId: formId,
          target: "#hubspotForm",
        });
      }
    });
  }, []);

  if (hubspotFormSubmit) {
    localStorageManager.setValue("landing_page_data", JSON.stringify(data));

    const iframeDetails = document.querySelector("iframe.hs-form-iframe");
    
    iframe = document.getElementById(iframeDetails?.id);

    if (iframe) {
      
      var iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;

      // const selectBoxDetails = iframeDocument.querySelector('select.hs-input');
      
      var name = iframeDocument.getElementById(`firstname-${formId}`);
      var mobile = iframeDocument.getElementById(`phone-${formId}`);
      var email = iframeDocument.getElementById(`email-${formId}`);
      var pickup_date = iframeDocument.getElementById(`pickup_date_-${formId}`);
      var location = iframeDocument.getElementById(`pickuplocation-${formId}`);

      // var pickupLocation = iframeDocument.getElementById(selectBoxDetails?.id);
      name.value = data?.Name;
      mobile.value = data?.Phone;
      email.value = data?.Email;
      pickup_date.value = data?.PickupDate;
      location.value = data?.PickupLocation;

      // pickupLocation.value = data.Location;

      var formElement = iframeDocument.getElementById(`hsForm_${formId}`);
      formElement.submit();
    }
  }

  return (
    <>
      <div id="hubspotForm" className="hubspotForm hidden"></div>
    </>
  );
};

export default memo(Hubspot);
