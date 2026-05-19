import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import sticker from "../../../../public/images/storagelisting/birthday.png";
import Image from "next/image";
import { bookingcompleteCheckout, easyStorageGenerateInvoice } from "@/service/storageService";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Index() {
  const [download, setDownload] = useState(false);
  const router = useRouter();

  const downloadReceipt = async()=>{
    const razorpay_order_id = router.query.razorpayOrderId;
    const razorpay_payment_id = router.query.razorpayPaymentId;
    const razorpay_signature = router.query.razorpaySignature;

    setDownload(true)

    const args  = `?razorpayOrderId=${razorpay_order_id}&razorpayPaymentId=${razorpay_payment_id}&razorpaySignature=${razorpay_signature}`;
    const res = await easyStorageGenerateInvoice(args);
    // console.log("res", res);
    setDownload(false);
    if(res.success){
  // console.log("res.success", res.success.message.value.message);
      window.open(res.success.message.value.message, '_blank');
    }
    
  }
  return (
    <>
    <HeaderMenu/>
      <div className="h-[70vh] w-full flex flex-col items-center justify-center text-center">
        <Image src={sticker} alt="image" height={50} width={50} priority/>
        <h1 className="font-bold text-3xl text-blue-900 mt-2">Thankyou!</h1>
        <h3>Your request will be approved within 24hrs</h3>
        <button className="clickto_paybutton w-[80vw] md:w-[38vw] rounded-md md:rounded-xl px-1 md:px-[10px] py-2 md:py-[19px] gap-[6px] bg-[#8DC63F] mt-4" onClick={downloadReceipt} disabled={download}>
                    <div className="font-inter font-bold text-2xl leading-8 text-white">
                   { download?"downloading...": 'Download Receipt'}
                    </div>

                  </button>
      </div>
      <Footer />
    </>

  )
}
