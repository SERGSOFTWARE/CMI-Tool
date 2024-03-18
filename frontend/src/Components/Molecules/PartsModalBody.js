import React from "react";
import OvalChips from "../Atoms/OvalChips";

export default function PartsModalBody({ options, selected, handleClick }) {
  console.log("selected : ", selected);
  return (
    <>
      <div className="parts-modal-root">
        {options?.map((ele, index) => {
          let isSelected = false;
          if (ele.key === selected.key) isSelected = true;
          return (
            <OvalChips
              label={ele.value}
              id={`oval-chip-field-${index}`}
              className={isSelected ? "oval-chip-Selected" : ""}
              handleClick={() => handleClick(ele)}
            />
          );
        })}
      </div>
    </>
  );
}
