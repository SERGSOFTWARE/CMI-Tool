import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderBar from "../Components/Organisms/HeaderBar";
import {
  updateChemicalValue,
  resetState,
  updateChemicalPartValue,
} from "../Redux/Reducers/Slice/chemicalsSlice";
import {
  updateResults,
  resetResultState,
} from "../Redux/Reducers/Slice/resultSlice";
import ModalStepper from "../Components/Organisms/ModalStepper";
import SankeyDiagram from "../Components/Organisms/Graph/SankeyDiagram";
import Loader from "../Components/Atoms/Loader";
import { getValueChangeResults } from "../Services";
import AlertBar from "../Components/Atoms/AlertBar";
import { getChangedFields } from "../Utils/helpers";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsModalOpen: false,
      isLoading: false,
      sankeyGraphData: [],
      isSuccessAlertOpen: false,
      isResetAlertOpen: false,
      isFailureAlertOpen: false,
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true }, () => {
      this.getDefaultResultsForSankey();
    });
  };

  componentWillUnmount = () => {};

  getDefaultResultsForSankey = () => {
    const { chemicalData } = this.props;
    let formData = {};
    if (chemicalData?.changedFields?.length > 0) {
      formData = getChangedFields(
        chemicalData?.value,
        chemicalData?.changedFields
      );
    }
    const parts = chemicalData?.chemicalPart?.key?.split(",");
    const input1 = parseInt(parts[0]);
    const input2 = parseInt(parts[1]);
    getValueChangeResults({ data: formData, input1: input1, input2: input2 })
      .then((res) => {
        if (res && res.sankeyFig) {
          this.setState({
            sankeyGraphData: {
              linkSource: res.sankeyFig.link.source,
              linkTarget: res.sankeyFig.link.target,
              linkValue: res.sankeyFig.link.value,
              linkColor: res.sankeyFig.link.color,
              nodeLabel: res.sankeyFig.node.label,
              nodePad: res.sankeyFig.node.pad,
              nodeColor: res.sankeyFig.node.color,
              nodeThickness: res.sankeyFig.node.thickness,
            },
          });
        }
        this.setState({ isLoading: false, isSuccessAlertOpen: true });
      })
      .catch((error) => {
        this.setState({ isLoading: false, isFailureAlertOpen: true });
      });
  };

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
    // this.setState({ isLoading: true }, () => {
    //   this.getDefaultResultsForSankey();
    // });
    this.setState({ isResetAlertOpen: true }, () => {
      this.props.resetState();
      this.props.resetResultState();
    });
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
    this.getDefaultResultsForSankey();
  };

  // fun to close snack bar - START
  closeAlertBar = () => {
    this.setState({
      isFailureAlertOpen: false,
      isSuccessAlertOpen: false,
      isResetAlertOpen: false,
    });
  };
  // fun to close snack bar - END

  render() {
    const {
      settingsModalOpen,
      isLoading,
      sankeyGraphData,
      isFailureAlertOpen,
      isResetAlertOpen,
      isSuccessAlertOpen,
    } = this.state;
    const { chemicalData } = this.props;
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
            <SankeyDiagram data={sankeyGraphData} />
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
        <AlertBar
          type="success"
          isOpen={isSuccessAlertOpen}
          message="Results generated successfully!"
          handleClose={() => {
            this.closeAlertBar();
          }}
        />
        <AlertBar
          type="success"
          isOpen={isResetAlertOpen}
          message="All values reset to default."
          handleClose={() => {
            this.closeAlertBar();
          }}
        />
        <AlertBar
          type="error"
          isOpen={isFailureAlertOpen}
          message={"Error fetching results, Please try again!"}
          handleClose={() => {
            this.closeAlertBar();
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chemicalData: state.chemicalData,
    resultData: state.resultData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateChemicalValue: (data) => dispatch(updateChemicalValue(data)),
    resetState: () => dispatch(resetState()),
    resetResultState: () => dispatch(resetResultState()),
    updateChemicalPartValue: (data) => dispatch(updateChemicalPartValue(data)),
    updateResults: (data) => dispatch(updateResults(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
