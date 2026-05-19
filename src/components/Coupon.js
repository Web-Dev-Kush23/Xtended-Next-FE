import Image from "next/image";
import { useEffect, useState } from "react";

const Coupon = ({
  couponData = [],
  setPayload,
  payload,
  showErrorMessage,
  setShowErrorMessage,
}) => {
  const [customCoupon, setCustomCoupon] = useState();
  const [data, setData] = useState();
  const removeCoupon = (e) => {
    e?.preventDefault();
    setData({ ...data, CouponId: 0 });
    setCustomCoupon("");
  };

  useEffect(() => {
    setPayload({
      ...payload,
      ["CouponId"]: data?.CouponId ? data.CouponId : "",
    });
  }, [data]);

  useEffect(() => {
    if (showErrorMessage?.text && showErrorMessage?.text.includes("coupon")) {
      setCustomCoupon("");
      setData({ ...data, CouponId: 0 });
    }
  }, [showErrorMessage]);

  return (
    <>
      <div className="coupon flex items-center justify-between bg-white rounded-lg px-3  w-full overflow-x-auto overflow-y-hidden">
        {!!couponData?.length && (
          <div className="flex justify-between w-[400px] h-[70px] bg-gray-100 p-2 mx-2  gap-2 rounded  items-center ">
            <div className="w-[250px]">
              <input
                type="text"
                value={
                  customCoupon || (isNaN(data?.CouponId) ? data?.CouponId : "")
                }
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (!inputValue) {
                    setCustomCoupon(""); // Clear customCoupon state if input is empty
                  } else {
                    setCustomCoupon(inputValue);
                  }
                }}
                placeholder="Enter the coupon Code"
                className="p-1"
              />
            </div>
            <div className="grid">
              <button
                className="text-sm font-semibold text-green-600"
                onClick={(e) => {
                  e.preventDefault();
                  customCoupon && setData({ ...data, CouponId: customCoupon }); // Ensure the correct coupon ID is set
                }}
              >
                {data?.CouponId === customCoupon && !!customCoupon
                  ? "Applied"
                  : "Apply"}
                {/* {preData?.allCoupons.some(coupon => coupon.id === data.CouponId && coupon.couponCode === customCoupon) ? "Applied" : "Apply"} */}
              </button>
              <button
                className="text-sm font-semibold text-gray-600"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeCoupon();
                  setData({ ...data, CouponId: 0 });
                }}
              >
                Remove
              </button>
              {/* <button className="text-sm font-semibold text-green-600" onClick={()=>!!customCoupon && setData({...data,CouponId:customCoupon})}>{data?.CouponId === customCoupon ? "Applied":"Apply"}</button>
<button className="text-sm font-semibold text-gray-600" onClick={()=>{removeCoupon;setData({...data,CouponId:0})}} >Remove</button> */}
            </div>
          </div>
        )}

        {couponData?.map((item) => (
          <div
            className="flex justify-between w-[400px]  mx-2 bg-gray-100 p-2 rounded  items-center"
            key={item?.couponCode}
          >
            <div className="w-[190px] md:w-full mr-4">
              <div className=" flex items-center  gap-2">
                <Image
                  src="https://xtendedspace.s3.ap-south-1.amazonaws.com/static/coupon1.svg"
                  alt="coupan"
                  width={30}
                  height={30}
                />

                <p className="text-lg font-semibold text-gray-800">
                  <span className="c-name text-yellow-300">{item?.couponCode}</span>
                </p>
                <p className="text-[8px] md:text-[10px] text-gray-600 w-[150px] m-0">
                  Use Coupon code
                </p>
              </div>
              <div className="mt-2">
                <p className=" text-[8px] md:text-[12px] text-[#1B1C57]">
                  Get cashback upto{" "}
                  {item.amountType === "Percent"
                    ? `${item?.amount}%`
                    : `₹${item?.amount}`}
                </p>
              </div>
            </div>
            <div className="">
              <button
                className="text-sm font-semibold text-green-600"
                onClick={(e) => {
                  e.preventDefault();
                  setCustomCoupon("");
                  setData({ ...data, CouponId: item?.id });
                  setShowErrorMessage();
                }}
              >
                {item?.id === data?.CouponId ? "Applied" : "Apply"}
              </button>
              <button
                className="text-sm font-semibold text-gray-600"
                onClick={removeCoupon}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Coupon;
