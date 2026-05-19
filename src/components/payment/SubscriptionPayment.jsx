import { cancelSubscriptionPayment, getSubscriptionPayment } from "@/service/storageService";
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

const SubscriptionPayment = ({ easyStorageId, status, setTimer,timer }) => {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  let btnName = status == "Active" ? "Cancel Subscription" : status == "Pending" ? "Start Auto Payment" : "Reactivate Payment"

  // Load Razorpay SDK
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Open Razorpay payment modal
  const payNow = (data) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK is not initialized properly.");
      return;
    }

    const options = {
      key: data.key,
      name: "Xtended Space",
      subscription_id: data.subscriptionId,
      description: "Thank you for choosing us",
      image: "https://www.xtendedspace.com/images/logo/XtendedSpace.webp",
      subscription_card_change: 1,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_subscription_id);
        // alert(response.razorpay_signature);
        if (response.razorpay_payment_id) {
          setModalShow(true)
        }
      },
      prefill: {
        name: data.customerName,
        email: data.customerEmail,
        contact: data.phoneNumber,
      },
      theme: {
        color: "#3b82f6",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePaymentCharge = async () => {
    setLoading(true);
    if (status == "Active") {
      const args = `?EasyStorageId=${easyStorageId}`
      let res = await cancelSubscriptionPayment(args)
      if (res?.success) {
        setLoading(false)
        setTimer(true)
        // window.location.reload()
      } else {
        setLoading(false)
      }
    } else {
      const isRazorpayLoaded = await initializeRazorpay();

      if (!isRazorpayLoaded) {
        alert("Razorpay SDK Failed to load");
        setLoading(false);
        return;
      }

      try {
        const args = `?EasyStorageId=${easyStorageId}`;
        const response = await getSubscriptionPayment(args);

        if (response?.success) {
          const paymentData = response.success;
          payNow(paymentData);
        } else {
          alert("Failed to fetch payment data");
        }
      } catch (error) {
        console.error("Payment error:", error);
        alert("An error occurred while processing payment");
      } finally {
        setLoading(false);
      }
    }

  };

 

  const hideModal = () => {
    setModalShow(false)
    setTimer(true)
  }

  return (
    <><button
      onClick={handlePaymentCharge}
      disabled={loading || timer} // Disable button while loading
      className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
    >
      {loading ? "Processing..." : btnName}
    </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => hideModal()}
      />
    </>
  );
};

export default SubscriptionPayment;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <section className="w-full mt-10 flex flex-col items-center px-6 md:px-0 pb-[20px]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-3xl text-center"
          >
            {/* Animated Checkbox (EXACT like Image) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex justify-center"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(59 130 246)"  // Bright Blue Color
                strokeWidth="3"   // Bold Stroke to Match Image
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-24 md:w-32"
              >
                {/* Circular Outline */}
                <motion.circle
                  cx="12" cy="12" r="10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Checkmark */}
                <motion.polyline
                  points="8 12 11 15 17 9"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                />
              </motion.svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#1B1C57] font-bold text-3xl md:text-4xl mt-4"
            >
              Thank You for Choosing Subscription Based Payment!
            </motion.h1>
            {/* <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-[#374151] text-base md:text-lg leading-relaxed mt-4"
                    >
                        We’ve received your relocation details. Our team will review your request and get in touch with you soon to assist with the next steps.
                    </motion.p> */}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-[#5eb3fe2e] rounded-lg px-6 py-4 mt-6 flex flex-col md:flex-row items-center justify-center text-[#106BE0] text-sm md:text-lg shadow-sm"
            >
              <p className="text-center md:text-left">
                Have questions? Contact us at
                <a href="tel:+919009000798" className="font-semibold"> 📞 +91 900 900 0798</a>.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-[#374151] text-base md:text-lg leading-relaxed mt-6"
            >
              We appreciate your trust and look forward to making your storage hassle-free!
            </motion.p>
          </motion.div>
        </section>
      </Modal.Body>
    </Modal>
  );
}