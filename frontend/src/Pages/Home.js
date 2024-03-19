import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderBar from "../Components/Organisms/HeaderBar";
import {
  updateChemicalValue,
  resetState,
  updateChemicalPartValue,
} from "../Redux/Reducers/Slice/chemicalsSlice";
import ModalStepper from "../Components/Organisms/ModalStepper";
import SankeyDiagram from "../Components/Organisms/Graph/SankeyDiagram";
import Loader from "../Components/Atoms/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsModalOpen: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  // On settings modal closed clicked
  settingsModalClose = () => {
    this.setState({
      settingsModalOpen: false,
    });
  };

  // On settings modal open clicked
  settingsModalOpen = () => {
    this.setState({
      settingsModalOpen: true,
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

  // on chemical part value changed
  chemicalPartValueChanged = (element) => {
    this.props.updateChemicalPartValue({ element: element });
  };

  // on finish clicked on chemical settings modal
  chemicalSettingsFinished = (element) => {
    this.settingsModalClose();
    // CALL API HERE
  };

  render() {
    const { settingsModalOpen, isLoading } = this.state;
    const { chemicalData } = this.props;
    console.log("changedFields :", chemicalData.changedFields);
    return (
      <>
        <HeaderBar
          onSettingsClicked={() => this.settingsModalOpen()}
          onResetClicked={() => this.onResetClicked()}
        />
        <div className="home-component">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SankeyDiagram />
          </div>
          <ModalStepper
            modalOpen={settingsModalOpen}
            settingsModalClose={() => this.settingsModalClose()}
            onResetClicked={() => this.onResetClicked()}
            chemicalData={chemicalData}
            onFinishButtonClicked={() => this.chemicalSettingsFinished()}
            onChemicalValueChanges={(value, ele) =>
              this.changeChemicalValue(value, ele)
            }
            chemicalPartValueChanged={(ele) =>
              this.chemicalPartValueChanged(ele)
            }
          />
        </div>
        <Loader
          isOpen={isLoading}
          stopLoader={() => {
            this.setState({ loading: false });
          }}
        />
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
    updateChemicalPartValue: (data) => dispatch(updateChemicalPartValue(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
