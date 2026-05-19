import { completeCheckout, getPaymentGateway } from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const ExternalPayment = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [paymentId, setPaymentId] = useState();

  const paymentData = async (paymentId) => {
    const args = `?PaymentId=${paymentId}`;
    const response = await getPaymentGateway(args,type);
    if (response.success) {
      return response.success;
    }
  };

  const payNow = async (paymentId) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
try {
  const gatewayDetils = await paymentData(paymentId);

  // Make API call to the serverless API
  var options = {
    key: gatewayDetils.key, // Enter the Key ID generated from the Dashboard
    name: "Xtended space",
    currency: gatewayDetils.currency,
    amount: gatewayDetils.amount,
    order_id: gatewayDetils.order_id,
    description: "Thankyou for your test donation",
    image: "https://www.xtendedspace.com/images/logo/XtendedSpace.png",
    handler: async function (response) {
      // Validate payment at server - using webhooks is a better idea.
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      const args = `?razorpayOrderId=${response.razorpay_order_id}&razorpayPaymentId=${response.razorpay_payment_id}&razorpaySignature=${response.razorpay_signature}`;
      const res = await completeCheckout(args);
      if (res.success) {
        if(type=="packers-and-movers"){
          window.location.href = "/services/packers-and-movers/thank-you";
        }else{
          window.location.href = "/store-with-a-host/thankyou";
        }
      }
    },
    prefill: {
      name: gatewayDetils.customerName,
      email: gatewayDetils.customerEmail,
      contact: gatewayDetils.phoneNumber,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
} catch (error) {
  alert("Invalid Payment Url")
}
   
  };

  const paymentIds = searchParams.get("paymentId");

  if (paymentIds) {
    payNow(paymentIds);
  }
  return (
    <>
      {/* <button
        id="paymentBtn"
            className="clickto_paybutton flex   justify-center items-center w-full md:w-[450px] h-[60px] mx-[auto] rounded-lg my-2 bg-[#8DC63F]"
            onClick={()=>payNow(paymentId)}
          >
            <div className="font-inter font-bold text-[20px] md:text-[22px] leading-tight text-white">
              Pay ₹1000
              <div className="font-inter font-normal text-[14px] md:text-[16px] leading-tight text-white ">
                Book with Token Money
              </div>
            </div>
          </button> */}
      <p>&nbsp;</p>
    </>
  );
};

export default ExternalPayment;
