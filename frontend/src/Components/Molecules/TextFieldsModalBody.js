import React from "react";
import TextBox from "../Atoms/TextBox";

export default function TextFieldsModalBody({
  dropDownOptions,
  onChemicalValueChanges,
}) {
  return (
    <>
      <div className="drop-down-modal-root">
        {dropDownOptions?.map((ele, index) => {
          return (
            <TextBox
              key={index}
              label={ele.label}
              value={ele.value}
              onChange={(e) => {
                onChemicalValueChanges(e, ele);
              }}
              id={`text-field-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
