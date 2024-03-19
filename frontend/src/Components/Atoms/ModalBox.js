import * as React from "react";
import Typography from "./Typography";
import Modal from "@mui/material/Modal";
import { Box, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

export default function ModalBox({
  title = "title",
  subBodyTitle = "sub title",
  open,
  handleClose,
  bodyComponent,
  bottomButtonComponent,
  subBodyComponent,
  onResetClicked,
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
              <Typography variant="h3">{title}</Typography>
            </div>
            <div className="modal-header-icon">
              <div className="modal-header-reset-icon">
                <Tooltip title={"Reset All Values"} placement="bottom">
                  <RotateLeftIcon
                    onClick={() => {
                      onResetClicked();
                    }}
                    className="tool-bar-setting-icon icon-curser-pointer"
                  />
                </Tooltip>
              </div>
              <div>
                <Tooltip title={"Close"} placement="bottom">
                  <CloseIcon
                    className="icon-curser-pointer"
                    onClick={handleClose}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="modal-body-root">{bodyComponent}</div>
          <div className="modal-sub-body-main-root">
            <div className="modal-sub-body-title">
              <Typography variant="h3">{subBodyTitle}</Typography>
            </div>
            <div className="modal-sub-body-root">{subBodyComponent}</div>
          </div>
          <div className="modal-button-container">{bottomButtonComponent}</div>
        </Box>
      </Modal>
    </div>
  );
}
