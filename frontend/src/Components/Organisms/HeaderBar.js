import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "../Atoms/Typography";
import TuneIcon from "@mui/icons-material/Tune";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Tooltip } from "@mui/material";

function HeaderBar({ onSettingsClicked }) {
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
        <div>
          <Tooltip title={"Settings"} placement="bottom">
            <TuneIcon
              onClick={() => {
                onSettingsClicked();
              }}
              className="tool-bar-setting-icon"
            />
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderBar;
