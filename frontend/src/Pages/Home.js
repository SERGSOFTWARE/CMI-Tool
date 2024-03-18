import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderBar from "../Components/Organisms/HeaderBar";
import {
  updateChemicalValue,
  resetState,
} from "../Redux/Reducers/Slice/chemicalsSlice";
import ModalStepper from "../Components/Organisms/ModalStepper";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsModalOpen: false,
      modalStepperStep: 1,
    };
  }

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  // On settings modal closed clicked
  settingsModalClose = () => {
    this.setState({
      settingsModalOpen: false,
      modalStepperStep: 1,
    });
  };

  // On settings modal open clicked
  settingsModalOpen = () => {
    this.setState({
      settingsModalOpen: true,
    });
  };

  // On Next button clicked from modal
  onNextClicked = (step) => {
    this.setState({
      modalStepperStep: step + 1,
    });
  };

  // On Prev button clicked from modal
  onPrevClicked = (step) => {
    this.setState({
      modalStepperStep: step - 1,
    });
  };

  // On App reset button clicked from toolbar
  onResetClicked = () => {
    this.props.resetState();
  };

  // on chemical value Changed
  changeChemicalValue = (value, element) => {
    this.props.updateChemicalValue({ value: value, element: element });
  };

  render() {
    const { settingsModalOpen, modalStepperStep } = this.state;
    const { chemicalData } = this.props;
    return (
      <>
        <HeaderBar
          onSettingsClicked={() => this.settingsModalOpen()}
          onResetClicked={() => this.onResetClicked()}
        />
        <div className="home-component">
          <ModalStepper
            modalOpen={settingsModalOpen}
            settingsModalClose={() => this.settingsModalClose()}
            chemicalData={chemicalData}
            step={modalStepperStep}
            onNextButtonClicked={(step) => this.onNextClicked(step)}
            onPreviousButtonClicked={(step) => this.onPrevClicked(step)}
            onFinishButtonClicked={() => this.settingsModalClose()}
            onChemicalValueChanges={(event, ele) =>
              this.changeChemicalValue(event.target.value, ele)
            }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chemicalData: state.chemicalData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChemicalValue: (data) => dispatch(updateChemicalValue(data)),
    resetState: () => dispatch(resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
