import "./navbar.css";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">Cheme App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <IoMdNotifications />
          {notifications.length > 0 && (
            <span className="counter">{notifications.length}</span>
          )}
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <AiOutlineMail />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <FiSettings />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
