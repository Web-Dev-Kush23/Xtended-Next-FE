import React, { useState, useEffect } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  GetUserNotification,
  UnreadUserNotification,
  UnreadAllUserNotification,
} from "@/service/storageService";
import { getUserId } from "@/util/common";
import HeaderMenu from "@/components/header/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Loader from "@/components/Loader";
import { Pagination } from "antd";
import { Spin } from "antd";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);

  const notificationsPerPage = 10;

  const startIndex = (currentPage - 1) * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const displayedNotifications = notifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const applicationUserId = getUserId();
      if (applicationUserId) {
        setLoader(true);
        try {
          const args = `?ApplicationUserId=${applicationUserId}`;

          const response = await GetUserNotification(args);
          if (response.success) {
            setNotifications(response?.success.data);
          }
        } catch (error) {
          console.error("Error fetching notifications", error);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    const applicationUserId = getUserId();
    if (applicationUserId) {
      setLoadingId(notificationId);
      try {
        const args = `?ApplicationUserId=${applicationUserId}&NotificationId=${notificationId}`;

        const response = await UnreadUserNotification(args);
        if (response.success) {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.notificationId !== notificationId)
          );
        }
      } catch (error) {
        console.error("Error marking notification as read", error);
      } finally {
        setLoadingId(null);
      }
    }
  };
  const handleMarkAllAsRead = async () => {
    const applicationUserId = getUserId();
    if (applicationUserId) {
      try {
        const args = `?ApplicationUserId=${applicationUserId}`;
        const response = await UnreadAllUserNotification(args);
        if (response.success) {
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error marking all notifications as read", error);
      }
    }
  };

  return (
    <div className="max-w-[1550px] mx-[auto] w-[100%]">
      {loader && <Loader />}
      <HeaderMenu />
      <div className="w-full bg-gray-50 p-8 lg:px-[100px] min-h-[100vh]">
        <div className="flex justify-between ">
          <h1 className="text-[20px] lg:text-[38px] font-bold lg:py-[30px] text-[#1b1c57]">
            Notifications
          </h1>
          <button
            onClick={handleMarkAllAsRead}
            className="bg-blue-500 rounded w-[80px] lg:w-[150px] p-2 lg:h-[50px] text-white flex items-center justify-center"
          >
            Clear All
          </button>
          {/* <div className="bg-blue-500 rounded w-[80px] lg:w-[150px] p-2 lg:h-[50px] text-white flex items-center justify-center">Clear All</div> */}
        </div>
        <div>
          {displayedNotifications.length > 0 ? (
            displayedNotifications.map((notification, index) => {
              const urlPath =
                notification.url?.split("https://xtendedspace.com")[1] || "";
              return (
                <div
                  key={index}
                  className="flex justify-between items-center border-b-2 mb-4"
                >
                  <div className="flex gap-4 w-full lg:px-8">
                    <div className="w-[50px] h-[50px] bg-blue-50 rounded flex justify-center items-center">
                      <IoNotificationsOutline className="text-20px lg:text-[30px] text-blue-700" />
                    </div>
                    <div className="w-[90%]">
                      <h2 className="text-[16px] lg:text-[22px] font-semibold leading-10">
                        {notification.title || "Notification Title"}
                      </h2>
                      <p className="text-[14px] lg:text-[18px] text-gray-400">
                        {notification.message || "No description available."}
                      </p>
                      <div className="flex gap-4 items-center">
                        <p className="text-[14px] lg:text-[18px] text-gray-400 leading-10">
                          {notification.notificationTime || "Just now"}
                        </p>
                        {urlPath && (
                          <Link href={urlPath ? `/${urlPath}` : "/"} passHref>
                            <span className="  text-blue-500 rounded underline ">
                              View
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleMarkAsRead(notification.notificationId)
                    }
                    className="bg-blue-400 rounded w-[80px] lg:w-[100px] h-[40px] lg:h-[50px] text-white"
                  >
                    {loadingId === notification.notificationId ? (
                      <Spin size="small" />
                    ) : (
                      "Clear"
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No notifications available</p>
          )}
        </div>
      </div>

      <Pagination
        current={currentPage}
        pageSize={notificationsPerPage}
        total={notifications.length}
        onChange={handlePageChange}
        className="py-4 flex justify-center items-center gap-4 text-lg w-full font-semibold"
      />
      <Footer />
    </div>
  );
};

export default Notifications;
