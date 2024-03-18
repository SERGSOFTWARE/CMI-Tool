import React from "react";
import TextBox from "../Atoms/TextBox";

export default function TextFieldsModalBody({ dropDownOptions }) {
  return (
    <>
      <div className="drop-down-modal-root">
        {dropDownOptions?.map((ele, index) => {
          return (
            <TextBox
              label={ele.label}
              value={ele.value}
              handleChange={() => {}}
              id={`text-field-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
