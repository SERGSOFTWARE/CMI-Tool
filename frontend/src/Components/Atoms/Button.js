import React from "react";

export default function Button({ label = "button", onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`button-root ${className}`}>
      {label}
    </button>
  );
}
