import React from "react";
import ModalBox from "../Atoms/ModalBox";
import PartsModalBody from "../Molecules/PartsModalBody";
import TextFieldsModalBody from "../Molecules/TextFieldsModalBody";
import Button from "../Atoms/Button";

export default function ModalStepper({
  modalOpen,
  settingsModalClose,
  chemicalData,
  onFinishButtonClicked,
  onChemicalValueChanges,
  chemicalPartValueChanged,
  onResetClicked,
}) {
  return (
    <div>
      <ModalBox
        title={"CHEMICAL VALUES"}
        subBodyTitle={"SELECT CHEMICAL PART"}
        open={modalOpen}
        handleClose={() => settingsModalClose()}
        onResetClicked={() => onResetClicked()}
        bodyComponent={
          <TextFieldsModalBody
            onChemicalValueChanges={(event, ele) =>
              onChemicalValueChanges(event, ele)
            }
            dropDownOptions={chemicalData.value}
          />
        }
        subBodyComponent={
          <PartsModalBody
            selected={chemicalData.chemicalPart}
            options={chemicalData.chemicalPartsOptions}
            handleClick={(ele) => chemicalPartValueChanged(ele)}
          />
        }
        bottomButtonComponent={
          <>
            <Button
              onClick={() => {
                onFinishButtonClicked();
              }}
              label="GET RESULTS"
            />
          </>
        }
      />
    </div>
  );
}
