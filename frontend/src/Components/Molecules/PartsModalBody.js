import React from "react";
import OvalChips from "../Atoms/OvalChips";

export default function PartsModalBody({ options }) {
    console.log("options : ",options)
  return (
    <>
      <div className="parts-modal-root">
        {options?.map((ele, index) => {
          return (
            <OvalChips
              label={ele.value}
              handleClick={() => {}}
              id={`oval-chip-field-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
