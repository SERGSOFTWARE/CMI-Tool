import React from "react";
import TextBox from "../Atoms/TextBox";

export default function TextFieldsModalBody({
  dropDownOptions,
  onChemicalValueChanges,
}) {
  const valueCleanUP = (event, element) => {
    let newValue = event.target.value;
    if (
      event.target.value.split(".")?.length === 2 &&
      event.target.value.split(".")[1].length >= 2
    ) {
      newValue = parseFloat(event.target.value).toFixed(2);
    }

    const low = element?.limit[0] || 0;
    const high = element?.limit[1] || 400;
    if (newValue >= low && newValue <= high) {
      onChemicalValueChanges(newValue, element);
    } else if (newValue < low) {
      onChemicalValueChanges(low, element);
    } else if (newValue > high) {
      onChemicalValueChanges(high, element);
    }
  };

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
                valueCleanUP(e, ele);
              }}
              disabled={!ele.isEditable}
              id={`text-field-${index}`}
            />
          );
        })}
      </div>
    </>
  );
}
