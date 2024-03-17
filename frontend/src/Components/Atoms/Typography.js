import React from "react";

function Typography({
  variant = "h1",
  label,
  onClick,
  customStyle = { margin: 0 },
  children,
  className = "",
}) {
  if (variant === "h2") {
    return (
      <h2 className={className} style={customStyle}>
        {children}
      </h2>
    );
  } else if (variant === "h3") {
    return (
      <h3 className={className} style={customStyle}>
        {children}
      </h3>
    );
  } else if (variant === "h4") {
    return (
      <h4 className={className} style={customStyle}>
        {children}
      </h4>
    );
  } else if (variant === "h5") {
    return (
      <h5 className={className} style={customStyle}>
        {children}
      </h5>
    );
  } else if (variant === "p") {
    return (
      <p className={className} style={customStyle}>
        {children}
      </p>
    );
  } else {
    return (
      <h1 className={className} style={customStyle}>
        {children}
      </h1>
    );
  }
}

export default Typography;
