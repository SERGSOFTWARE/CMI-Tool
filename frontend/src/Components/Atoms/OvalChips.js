import * as React from "react";
import Chip from "@mui/material/Chip";

export default function OvalChips({ handleClick, label, className }) {
  return (
    <Chip
      className={`oval-chips-root ${className}`}
      label={label}
      variant="outlined"
      onClick={handleClick}
    />
  );
}
