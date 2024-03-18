import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderBar from "../Components/Organisms/HeaderBar";
import ModalBox from "../Components/Atoms/ModalBox";
import {
  updateChemicalValue,
  resetState,
} from "../Redux/Reducers/Slice/chemicalsSlice";
import TextFieldsModalBody from "../Components/Molecules/TextFieldsModalBody";
import TextBox from "../Components/Atoms/TextBox";
import PartsModalBody from "../Components/Molecules/PartsModalBody";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsModalOpen: false,
    };
  }

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  settingsModalClose = () => {
    this.setState({
      settingsModalOpen: false,
    });
  };

  settingsModalOpen = () => {
    this.setState({
      settingsModalOpen: true,
    });
  };

  onResetClicked = () => {
    this.props.resetState();
  };

  render() {
    const { settingsModalOpen } = this.state;
    const { chemicalData } = this.props;
    return (
      <>
        <HeaderBar
          onSettingsClicked={() => this.settingsModalOpen()}
          onResetClicked={() => this.onResetClicked()}
        />
        <div className="home-component">
          <ModalBox
            title={"Chemical Values"}
            open={settingsModalOpen}
            handleClose={() => this.settingsModalClose()}
            // bodyComponent={
            //   <TextFieldsModalBody dropDownOptions={chemicalData.value} />
            // }
            bodyComponent={
              <PartsModalBody options={chemicalData.chemicalPartsOptions} />
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
