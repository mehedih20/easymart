import React, { useEffect } from "react";
import "./Notification.css";
import useGlobalContext from "../../hooks/useGlobalContext";

const Notification = () => {
  const { notification, setNotification } = useGlobalContext();
  console.log(notification);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification("");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [notification, setNotification]);

  return (
    <div className={`notification ${notification && "notification-on"}`}>
      <h4>{notification}</h4>
    </div>
  );
};

export default Notification;
