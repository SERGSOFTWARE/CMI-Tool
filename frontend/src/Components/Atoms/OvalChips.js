import * as React from "react";
import Chip from "@mui/material/Chip";

export default function OvalChips({ handleClick, label }) {
  return (
    <Chip
      className="oval-chips-root"
      label={label}
      variant="outlined"
      onClick={handleClick}
    />
  );
}
