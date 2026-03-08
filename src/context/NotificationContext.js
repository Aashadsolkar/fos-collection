import React, { createContext, useContext, useState } from "react";
import {
  getNotificationsApi,
  markNotificationReadApi,
} from "../api/notificationApi";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [lastPage, setLastPage] = useState(1);

  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async (pageNumber = 1, refresh = false) => {
    try {

      const res = await getNotificationsApi(pageNumber);
      console.log(res, "resresres");


      const data = res.data.data;

      if (refresh) {
        setItems(data.items);
      } else {
        setItems((prev) =>
          pageNumber === 1
            ? data.items
            : [...prev, ...data.items]
        );
      }

      setPage(data.pagination.current_page);
      setLastPage(data.pagination.last_page);
      setUnreadCount(data.unread_count);

    } catch (error) {
      console.log("Notification Error:", error);
    }
  };

  const loadMore = () => {
    if (page < lastPage) {
      fetchNotifications(page + 1);
    }
  };

  const markAsRead = async (id) => {
    try {

      await markNotificationReadApi(id);

      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, read_at: new Date().toISOString() }
            : item
        )
      );

      setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));

    } catch (error) {
      console.log("Mark Read Error:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        items,
        unreadCount,
        fetchNotifications,
        loadMore,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);