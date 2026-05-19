import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header/header"));
const Footer = dynamic(() => import("@/components/footer"));
import Image from "next/image";
import vectorLogo from "../../../public/images/icon/vectorIcon.png";
import { getUserId } from "@/util/common";
import {
  postApprovePropertyBookingRequestByHost,
  postRejectedPropertyBookingRequestByHost,
  getPendingBookingRequestDataByRequestId,
} from "@/service/storageService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Alert from 'react-bootstrap/Alert';

export default function ViewDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("ID") || null;
  const [data, setData] = useState([]);
  const cols = data?.bookingImage?.length;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showApprove, setShowApprove] = useState(false);

  useEffect(() => {
    let args = `?RequestId=${id}`;
    (async () => {
      const getPendingBookingRequestDataByRequestId_response = await getPendingBookingRequestDataByRequestId(args);
      if (getPendingBookingRequestDataByRequestId_response?.success) {
        setData(getPendingBookingRequestDataByRequestId_response?.success?.data);
      }
    })()
  }, [searchParams])

  function handleApproveListing() {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${id}`;
      const response = await postApprovePropertyBookingRequestByHost(args);
      if (response?.success) {
        setShowApprove(true);
        const timer = setTimeout(() => {
          setShowApprove(false);
          router.push("/profile")
        }, 2000);
        return () => clearTimeout(timer);
      }
    })();
  }

  function handleDeclineListing() {
    (async () => {
      let args = `?ApplicationUserId=${getUserId()}&propertyBookingRequestId=${id}`;
      const response = await postRejectedPropertyBookingRequestByHost(args);
      if (response?.success) {
        setShow(true);
        const timer = setTimeout(() => {
          setShow(false);
          router.push("/profile")
        }, 2000);
        return () => clearTimeout(timer);
      }
    })();
  }

  return (
    <>
      <Header />
      {!!show && <div className="px-12 z-[9999] fixed top-[100px]">
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Request Declined Successfully!
        </Alert>
      </div>
      }

      {!!showApprove && <div className="px-12 z-[9999] fixed top-[100px]">
        <Alert variant="success" onClose={() => setShowApprove(false)} dismissible>
          Request Approved Successfully!
        </Alert>
      </div>
      }
      <div className="grid place-items-center">
        <div className="flex flex-col items-center justify-center">
          <Image src={vectorLogo} alt="image" height={60} width={60} priority />
          <p className="font-bold text-xl mt-2">{data?.customerName || ""}</p>
        </div>

        <div className="w-[90%] min-h-[300px] border border-slate-[1px] rounded flex flex-col items-center mt-8 mb-12">
          <div className="w-[100%] min-h-[100px] bg-gray-100 flex lg:flex-row flex-col items-center justify-between px-4 py-4">
            <div className="flex flex-col items-start justify-between">
              <div className="mt-2 mb-2">
                <p className="text-zinc-400">Storage place</p>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <div className="">
                  <img
                    src={data?.property?.propertyImage || ""}
                    alt="image"
                    height={80}
                    width={100}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col items-start justify-around">
                  <p className="lg:text-md text-[14px] font-bold">
                    Storage space in {data?.property?.address1}
                  </p>
                  <p className="lg:text-md text-[14px] flex items-center justify-center">
                    <img
                      src="/images/icon/Location-green.svg"
                      alt="icon"
                      width={15}
                      className="mr-2"
                    />
                    {data?.property?.city}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-start justify-center">
                <p className="lg:text-md text-[14px] text-zinc-400">Booking for:- </p>
                <p className="lg:text-md text-[14px] flex items-center justify-center">
                  {data?.startDate + " - " + data?.endDate}
                </p>
              </div>
              <p className="lg:text-md text-[14px] text-zinc-400">Area Selected:- <span className="text-black">{data?.selectedSquareFeet || "--"} SqFt</span></p>
              <p className="text-zinc-400 lg:text-md text-[14px]">Address:- <span> </span>
                <span className="lg:text-md text-[14px] text-black space-x-1">
                  <span>{data?.renterAddress?.address1},</span>
                  <span>{data?.renterAddress?.address2},</span>
                  <span>{data?.renterAddress?.city},</span>
                  <span>{data?.renterAddress?.pinCode},</span>
                  <span>{data?.renterAddress?.state}</span>
                </span>
              </p>
            </div>
          </div>
          <div className="h-[100%] w-[100%] flex flex-col justify-between">
            <div className="flex flex-col items-start px-4">
              <p className="mb-4 mt-2 text-zinc-400">Storage Images</p>
              <div
                className={`flex items-center justify-center flex-wrap lg:grid lg:grid-cols-${cols} place-items-center gap-x-4`}
              >
                {!!data?.bookingImage &&
                  data?.bookingImage.map((images, index) => {
                    return (
                      <img
                        key={index}
                        src={images}
                        alt="image"
                        height={200}
                        width={200}
                        className="object-contain"
                      />
                    );
                  })}
              </div>
            </div>
            <div className="grid place-items-center">
              <div className="flex items-center justify-center gap-x-4 text-center w-full py-4">
                <button
                  className="px-14 py-2 bg-[#8DC63F] text-white rounded-lg"
                  onClick={() => {
                    handleApproveListing(id);
                  }}
                >
                  Approve
                </button>
                <button
                  className="px-14 py-2 bg-none border-[1px] border-red-500 text-red-500 font-bold rounded-lg"
                  onClick={() => {
                    handleDeclineListing(id);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
