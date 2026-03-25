import React from "react";

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "green",
        color: "white",
        padding: "10px 20px",
        borderRadius: 6,
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
