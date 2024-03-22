import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertBar({
  type = "success",
  message = "",
  isOpen = false,
  handleClose,
  autoHideDuration = 7000,
}) {
  return (
    <Stack spacing={2}>
      <Snackbar
        className="snack-bar-root"
        sx={{ marginTop: 2.2 }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
