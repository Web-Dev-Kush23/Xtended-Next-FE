import { getPaymentGatewayBooking } from "@/service/storageService";
import { getUserId } from "@/util/common";
import { useEffect } from "react";


const PaymentGateway = ({setPaynowBtn, paymentId = 1312, paymentGatewayData})=>{
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
    
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
    
          document.body.appendChild(script);
        });
      };
      const payNow = async () => {
      
        setPaynowBtn(true);
        const res = await initializeRazorpay();
    
        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }
    
    
        // Make API call to the serverless API
        setPaynowBtn(false);
        var options = {
          key: paymentGatewayData.key, // Enter the Key ID generated from the Dashboard
          name: "Xtended space",
          currency: paymentGatewayData.currency,
          amount: paymentGatewayData.amount,
          order_id: paymentGatewayData.order_id,
          description: "Thankyou for your test donation",
          image: "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
          handler: async function (response) {
            const args = `?razorpayOrderId=${response.razorpay_order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpaySignature=${response.razorpay_signature}`;
           // add thanks page redirection here
            window.location.reload();
          },
          prefill: {
            name: paymentGatewayData.customerName,
            email: paymentGatewayData.customerEmail,
            contact: paymentGatewayData.phoneNumber,
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      };

      useEffect(()=>{
        payNow();
      },[])
    return(
        <span>&nbsp;</span>
    )
}

export default PaymentGateway;