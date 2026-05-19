import { localStorageManager } from "@/util/common";
import { memo, useEffect, useMemo, useState } from "react";
import { baseURL } from "@/service/leadapi";




const Hubspot = ({ portalId, formId, hubspotFormSubmit, data, utm }) => {



    let iframe;

    useEffect(() => {
      
        

        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.defer=true;
        document.body.appendChild(script);

        script.addEventListener('load', () => {

            if (window.hbspt) {
               
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: portalId,
                    formId: formId,
                    target: '#hubspotForm'
                });
            }
        });
    }, []);


    if (hubspotFormSubmit) {
        localStorageManager.setValue("landing_page_data", JSON.stringify(data));

        const iframeDetails = document.querySelector('iframe.hs-form-iframe');
        iframe = document.getElementById(iframeDetails?.id);



        if (iframe) {
            var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            const selectBoxDetails = iframeDocument.querySelector('select.hs-input');
            var name = iframeDocument.getElementById(`firstname-${formId}`);
            var mobile = iframeDocument.getElementById(`phone-${formId}`);
            var email = iframeDocument.getElementById(`email-${formId}`);
            var pickupLocation = iframeDocument.getElementById(selectBoxDetails?.id);
            if (name) {
                name.value = data?.Name;
              }
              if (mobile) {
                mobile.value = data?.Mobile;
              }
              if (email) {
                email.value = data?.Email;
              }
            //   if (pickupLocation) {
            //     pickupLocation.value = data?.Location;
            //   }
            if (pickupLocation) {
                if (pickupLocation.options) {
                    for (let option of pickupLocation.options) {
                        if (option.value === data?.Location || option.text === data?.Location) {
                            pickupLocation.value = option.value;
                            break;
                        }
                    }
                } else {
                    pickupLocation.value = data?.Location;
                }
            }

            var formElement = iframeDocument.getElementById(`hsForm_${formId}`);
            setTimeout(() => {
                if (formElement) {
                  formElement.submit();
              
                } else {
                  console.error(`Form element with ID hsForm_${formId} not found.`);
                }
              }, 500);

        }



    }
 
  
    
    return (
        <>
            <div id="hubspotForm" className="hubspotForm hidden" >

            </div>
            

        </>
    )
}

export default memo(Hubspot);
