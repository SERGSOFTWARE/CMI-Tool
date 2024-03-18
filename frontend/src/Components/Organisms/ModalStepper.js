import React from "react";
import ModalBox from "../Atoms/ModalBox";
import PartsModalBody from "../Molecules/PartsModalBody";
import TextFieldsModalBody from "../Molecules/TextFieldsModalBody";
import Button from "../Atoms/Button";

export default function ModalStepper({
  modalOpen,
  settingsModalClose,
  chemicalData,
  step,
  onNextButtonClicked,
  onPreviousButtonClicked,
  totalSteps = 2,
  onFinishButtonClicked,
  onChemicalValueChanges,
}) {
  return (
    <div>
      <ModalBox
        title={"Chemical Values"}
        open={modalOpen}
        handleClose={() => settingsModalClose()}
        step={step}
        bodyComponent={
          step === 1 ? (
            <TextFieldsModalBody
              onChemicalValueChanges={(event, ele) =>
                onChemicalValueChanges(event, ele)
              }
              dropDownOptions={chemicalData.value}
            />
          ) : (
            <PartsModalBody options={chemicalData.chemicalPartsOptions} />
          )
        }
        bottomButtonComponent={
          <>
            {step !== 1 && (
              <Button
                onClick={() => {
                  onPreviousButtonClicked(step);
                }}
                label="Previous"
                className="modal-previos-button-style"
              />
            )}
            {step !== totalSteps && (
              <Button
                onClick={() => {
                  onNextButtonClicked(step);
                }}
                label="Next"
              />
            )}
            {step === totalSteps && (
              <Button
                onClick={() => {
                  onFinishButtonClicked(step);
                }}
                label="Finish"
              />
            )}
          </>
        }
      />
    </div>
  );
}
