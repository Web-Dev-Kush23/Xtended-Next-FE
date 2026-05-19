import { localStorageManager } from "@/util/common";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const My_Storage_Listings_cmp = dynamic(() => import("./my_storage_listing_cmp"));
const Listings_bookedspace_cmp = dynamic(() => import("./listings_bookedspace_cmp"));
const Listing_pending_apporoval_cmp = dynamic(() => import("./listing_pending_approvals_cmp"));
// const Pending_listing_cmp = dynamic(() => import("./pending_listing_cmp"));

export default function Index() {

    const IF_ACTIVE_TW = `border-b-2 border-blue-500 text-blue-500 cursor-pointer`;
    const option = {
        Booked_Space: false,
        Pending_Approvals: false,
        My_Storage_Listings: false,
        pending_listings: false
    }

    const [tab, setTab] = useState({
        My_Storage_Listings: true,
        Pending_Approvals: false,
        Booked_Space: false,
        pending_listings: false
    })

    useEffect(() => {
        const getSubTab = localStorageManager.getValue("subTab");
        if (getSubTab === "pending_approvals") setTab({ ...option, Pending_Approvals: true });
        if (getSubTab === "booked_space") setTab({ ...option, Booked_Space: true });
        if (getSubTab === "my_storage_listing") setTab({ ...option, My_Storage_Listings: true });
    }, []);

    return (
        <React.Fragment>
            <div className="flex items-center justify-start gap-x-8 lg:ml-12 mx-3 lg:overflow-visible overflow-x-scroll whitespace-nowrap hideScrollBar">
                <div onClick={() => { setTab({ ...option, My_Storage_Listings: true }) }} className={`${tab.My_Storage_Listings ? IF_ACTIVE_TW : `cursor-pointer`} py-2`}>My Storage Listings</div>
                <div onClick={() => { setTab({ ...option, Pending_Approvals: true }) }} className={`${tab.Pending_Approvals ? IF_ACTIVE_TW : `cursor-pointer`} py-2`}>Pending Approvals</div>
                <div onClick={() => { setTab({ ...option, Booked_Space: true }) }} className={`${tab.Booked_Space ? IF_ACTIVE_TW : `cursor-pointer`} py-2`}>Booked Space</div>
                {/* <div onClick={() => { setTab({ ...option, pending_listings: true }) }} className={`${tab.pending_listings ? IF_ACTIVE_TW : `cursor-pointer`} py-2`}>Pending Listings</div> */}
            </div>
            {tab.My_Storage_Listings && <My_Storage_Listings_cmp />}
            {tab.Pending_Approvals && <Listing_pending_apporoval_cmp />}
            {tab.Booked_Space && <Listings_bookedspace_cmp />}
            {/* {tab.pending_listings && <Pending_listing_cmp />} */}
        </React.Fragment>
    )
}