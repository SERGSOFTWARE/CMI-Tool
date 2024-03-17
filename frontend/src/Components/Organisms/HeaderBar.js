import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "../Atoms/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Tooltip } from "@mui/material";

function HeaderBar({ onSettingsClicked, onResetClicked }) {
  return (
    <AppBar className="tool-bar-root">
      <Toolbar className="tool-bar-sub-root">
        <div className="tool-bar-heading-container">
          <div className="tool-bar-app-icon">
            <EqualizerIcon className="tool-bar-setting-icon" />
          </div>
          <div>
            <Typography variant="h2" className="tool-bar-heading">
              MAPPING CHEMICAL PRODUCT SYSTEMS
            </Typography>
          </div>
        </div>
        <div className="tool-bar-icon-container">
          <div className="tool-bar-icon-setting-container">
            <Tooltip title={"Settings"} placement="bottom">
              <TuneIcon
                onClick={() => {
                  onSettingsClicked();
                }}
                className="tool-bar-setting-icon icon-curser-pointer"
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title={"Reset"} placement="bottom">
              <RotateLeftIcon
                onClick={() => {
                  onResetClicked();
                }}
                className="tool-bar-setting-icon icon-curser-pointer"
              />
            </Tooltip>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
