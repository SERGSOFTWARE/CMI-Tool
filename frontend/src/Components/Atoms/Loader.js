import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

export default function Loader({ isOpen = false, stopLoader }) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 999,
          backdropFilter: "blur(3px)",
        }}
        open={isOpen}
      >
        <div className="loader-root">
          <div className="loader" />
          <p className="loader-text">Loading Results...</p>
        </div>
      </Backdrop>
    </div>
  );
}
