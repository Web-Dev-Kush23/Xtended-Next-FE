import { useState, useEffect } from "react";
import { GetPropertyWishlist, AddPropertyToWishlist, RemoveWishlist, GetUserWishlistData } from "@/service/storageService";
import { getUserId } from "@/util/common";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [wishinglist, setWishinglist] = useState({})

  useEffect(() => { if (typeof window !== "undefined") { setCurrentUrl(window.location.href); } }, []);

  const allWishlistData = async () => {
    try {
      const dataArgs = `?ApplicationUserId=${getUserId()}`;
      const response = await GetPropertyWishlist(dataArgs);
      if (response.success) { setWishlistData(response.success.data); }
    } catch (error) { console.error("Error fetching wishlist data:", error); }
  };

  useEffect(() => { allWishlistData(); }, []);
  const handleAddToWishlist = async (propertyId) => {
    const args = `UserId=${getUserId()}&PropertyId=${propertyId}`;
    const response = await AddPropertyToWishlist(args);
    if (response.success) { allWishlistData(); }
  };

  const handleRemoveFromWishlist = async (wishListId) => {
    setWishlistData((prev) =>
      prev.filter((item) => item.wishListId !== wishListId)
    );
  
    try {
      const args = `?WishListId=${wishListId}`;
      const response = await RemoveWishlist(args);
      if (!response.success) {
        await allWishlistData();
      } else {
        getWishListData();
      }
    } catch (error) {
      await allWishlistData();
    }
  };
  

  const getWishListData = async () => {
    const args = `?ApplicationUserId=${getUserId()}`;
    const wishResult = await GetUserWishlistData(args)
    if (wishResult.success) { const mappedData = wishResult.success.reduce((acc, item) => { acc[item.propertyId] = item.wishListId; return acc; }, {}); setWishinglist(mappedData) }
  }

  useEffect(() => { getWishListData(); }, [])
  // if (!wishlistData || wishlistData.length === 0) {
  //   return <div class="flex items-center justify-center h-screen"><div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div></div>
  // }

  return (
    <div className="">
      {wishlistData.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {wishlistData.map((item) => {
            const urlPath = item.url?.split("https://xtendedspace.com")[1] || ""; 
            const imageUrl = `https://${currentUrl?.includes("stage.xtendedspace.com") || currentUrl?.includes("localhost") || currentUrl?.includes("main.d2kyc") ? "xtendedspacedev" : "xtendedspace"}.blob.core.windows.net/public/${item.propertyImage}`;
           
          return (
            <Link key={item.wishListId} href={urlPath} passHref>
            <div className="bg-white border-[1px] border-[#E5E5E5] rounded-[12px] shadow-md p-4 max-w-[350px] min-w-[300px]">
              <div className="relative">
                {item?.propertyImage && (<img src={item.propertyImage} alt="Room" className="w-full h-[200px] object-cover rounded-[12px]" />)}
                <div className={`absolute bottom-2 left-2 bg-[#0000004e] text-red-500 rounded-full p-2 text-sm cursor-pointer shadow-md`} onClick={(e) => { e.preventDefault(); (wishinglist[item.propertyId]) ? handleRemoveFromWishlist(wishinglist[item.propertyId]) : handleAddToWishlist(item.propertyId); }}><FaHeart className={(wishinglist[item.propertyId]) ? "text-red-600" : "text-gray-400"} />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex gap-2"><span className="bg-[#FFF4E6] text-[#FF9900] text-[12px] font-medium  rounded-full flex gap-2 p-2 items-center"> <img src="/images/calculator/ph_house-fill.svg" alt="household1" className=" " /> {item.propertyType}</span></div>
                <p className="text-[#4A4A4A] text-[14px] mt-3">{`Affordable ${item.propertyType} Storage Space Near ${item.addressLine2} in ${item?.city?.trim()}.`} </p>
                <div className="flex items-center mt-3"><img src="/images/icon/delhincrlocation.jpg" alt="Delhi1" className="w-6 h-6" /><span className="text-[#4A4A4A] text-[14px] ml-2">{item.addressLine1 || "Location not available"}</span></div>
                <div className="flex items-center mt-2"><img src="/images/calculator/distance_vector.svg" alt="distance1" className="text-[#4CAF50] text-[16px]" /><span className="text-[#4A4A4A] text-[14px] ml-2">{item.squareFeet} sqft </span></div>
                <div className="flex justify-between items-center mt-4">
                  <Link href={urlPath ? `/${urlPath}` : "/"}><button className="bg-[#007BFF] text-white text-[14px] font-medium px-6 py-2 rounded-[8px]">Book Now</button></Link>
                  <div className="text-right">{item.discountPercentage > 0 && (<span className="text-[#FF4D4D] text-[14px] line-through">₹{item.originalAmount}</span>)}<span className="text-[#4A4A4A] text-[16px] font-bold ml-2">₹{item.rentalAmountPerDay}</span><span className="text-[#4A4A4A] text-[14px]">/Day</span></div>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
      ):(<div className="text-center p-4 flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No items in your wishlist.
        </h2>
      </div>)}
    </div>
  );
};

export default Wishlist;
