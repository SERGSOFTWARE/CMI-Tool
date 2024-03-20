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
import { getDefaultResults } from "../Services";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsModalOpen: false,
      isLoading: true,
      sankeyGraphData: [],
    };
  }

  componentDidMount = () => {
    const { resultData, chemicalData } = this.props;
    if (chemicalData?.changedFields?.length > 0) {
      // CALL POST API
    } else {
      this.setState({ isLoading: true }, () => {
        this.getDefaultResultsForSankey();
      });
    }
  };
  componentWillUnmount = () => {};

  getDefaultResultsForSankey = () => {
    getDefaultResults(0, 1)
      .then((res) => {
        if (res && res.sankeyFig) {
          // this.props.updateResults(res.sankeyFig);
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
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
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
    this.setState({ isLoading: true }, () => {
      this.getDefaultResultsForSankey();
    });
    this.props.resetState();
    this.props.resetResultState();
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
    // CALL POST API HERE
  };

  render() {
    const { settingsModalOpen, isLoading, sankeyGraphData } = this.state;
    const { chemicalData, resultData } = this.props;
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
