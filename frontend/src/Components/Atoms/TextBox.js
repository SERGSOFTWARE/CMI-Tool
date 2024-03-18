import * as React from "react";
import TextField from "@mui/material/TextField";
import { Tooltip } from "@mui/material";

export default function TextBox({
  type = "number",
  variant = "outlined",
  label,
  id,
  onChange,
  value,
  disabled = false,
}) {
  return (
    <Tooltip title={label} placement="top">
      <TextField
        className="text-field-root"
        type={type}
        id={id}
        value={value}
        label={label}
        variant={variant}
        onChange={onChange}
        disabled={disabled}
        size="small"
      />
    </Tooltip>
  );
}
