import React from "react";
import OvalChips from "../Atoms/OvalChips";

export default function PartsModalBody({ options, selected, handleClick }) {
  return (
    <>
      <div className="parts-modal-root">
        {options?.map((ele, index) => {
          let isSelected = false;
          if (ele.key === selected.key) isSelected = true;
          return (
            <OvalChips
              label={ele.value}
              key={index}
              id={`oval-chip-field-${index}`}
              className={
                isSelected
                  ? "oval-chip-Selected oval-chip-margin-rigth"
                  : "oval-chip-margin-rigth"
              }
              handleClick={() => handleClick(ele)}
            />
          );
        })}
      </div>
    </>
  );
}
