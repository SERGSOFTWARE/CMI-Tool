import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({ label, value, handleChange, options }) {
  return (
    <FormControl className="dropdown-root" size="small">
      <InputLabel id="demo-select-small-label">label</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options?.map((ele, index) => (
          <MenuItem key={index} value={ele.key}>
            {ele.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
