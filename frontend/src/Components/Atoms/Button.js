import React from "react";

export default function Button({ label = "button" }) {
  return <button className="button-root">{label}</button>;
}
