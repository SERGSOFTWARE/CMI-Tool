import React, { Component } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../Redux/Reducers/Slice/counterSlice";
import HeaderBar from "../Components/Organisms/HeaderBar";
import DropDown from "../Components/Atoms/DropDown";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  render() {
    return (
      <>
        <HeaderBar onSettingsClicked={() => {}} />
        <div className="home-component">
          <DropDown
            label={"Chem"}
            value={"2"}
            handleChange={() => {}}
            options={[
              { key: "1", value: "hello" },
              { key: "2", value: "world" },
            ]}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
