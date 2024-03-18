import * as React from "react";
import Typography from "./Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalBox({
  title = "title",
  open,
  handleClose,
  bodyComponent,
  bottomButtonComponent,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <div className="modal-containter-root">
            <div>
              <Typography variant="h2">{title}</Typography>
            </div>
            <div>
              <CloseIcon
                className="icon-curser-pointer"
                onClick={handleClose}
              />
            </div>
          </div>
          <div className="modal-body-root">{bodyComponent}</div>
          <div className="modal-button-container">{bottomButtonComponent}</div>
        </Box>
      </Modal>
    </div>
  );
}
