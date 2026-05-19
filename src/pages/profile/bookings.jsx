import { localStorageManager } from "@/util/common";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Affordable_Storage_Bookings = dynamic(() => import("./my_bookings_cmp"));
const Bookings_pending_request_cmp = dynamic(() => import("./Bookings_pending_request_cmp"));
const Easy_Storage_Bookings = dynamic(() => import("./easy_storage_cmp"));
const Packers_movers = dynamic(() => import("./packer_movers"));

export default function Index() {

  const option = {
    easy_storage_bookings: false,
    Affordable_Storage_Bookings: false,
    pending_requests: false,
    packers_movers: false
  };

  const [tab, setTab] = useState({
    easy_storage_bookings: true,
    Affordable_Storage_Bookings: false,
    pending_requests: false,
    packers_movers: false
  });

  useEffect(() => {
    const subTab = localStorageManager.getValue('subTab');
    if(subTab === "packermover") {
      setTab({...option, packers_movers: true});
    }
    if(subTab === "affordable_storage_bookings") {
      setTab({...option, Affordable_Storage_Bookings: true});
    }
    if(subTab === "easy_storage_bookings") {
      setTab({...option, easy_storage_bookings: true});
    }
    if(subTab === "pending_requests") {
      setTab({...option, pending_requests: true});
    }
    if(subTab === "packers_movers") {
      setTab({...option, packers_movers: true});
    }
    const timer = setTimeout(() => {
      localStorageManager.setValue("subTab", "");
    }, (500));
    return () => clearTimeout(timer);
  }, [])
 

  return (
    <React.Fragment>
      <div className="flex items-center justify-start gap-x-8 lg:ml-12 mx-3 overflow-x-scroll whitespace-nowrap hideScrollBar">
        <div onClick={() => { setTab({ ...option, easy_storage_bookings: true }); }}
          className={`${tab.easy_storage_bookings && `border-b-2 border-blue-500 text-blue-500 cursor-pointer`} py-2 cursor-pointer`}>
        Store at a warehouse 
        </div>
        <div
          onClick={() => { setTab({ ...option, Affordable_Storage_Bookings: true }); }}
          className={`${tab.Affordable_Storage_Bookings && `border-b-2 border-blue-500 text-blue-500 cursor-pointer`} py-2 cursor-pointer`}>
          Store with a host 
        </div>
        <div
          onClick={() => { setTab({ ...option, pending_requests: true }); }}
          className={`${tab.pending_requests && `border-b-2 border-blue-500 text-blue-500 cursor-pointer`} py-2 cursor-pointer`}>
          Pending Requests
        </div>
        <div
          onClick={() => { setTab({ ...option, packers_movers: true }); }}
          className={`${tab.packers_movers && `border-b-2 border-blue-500 text-blue-500 cursor-pointer`} py-2 cursor-pointer`}>
          Packers & Movers
        </div>
      </div>
      <div className="grid lg:grid-cols-2 lg:ml-12 mx-3 py-3 p-0 md:p-6  gap-6">
        {tab.Affordable_Storage_Bookings && <Affordable_Storage_Bookings />}
        {tab.pending_requests && <Bookings_pending_request_cmp />}
        {tab.easy_storage_bookings && <Easy_Storage_Bookings />}
        {tab.packers_movers && <Packers_movers />}
      </div>
    </React.Fragment>
  );
}
