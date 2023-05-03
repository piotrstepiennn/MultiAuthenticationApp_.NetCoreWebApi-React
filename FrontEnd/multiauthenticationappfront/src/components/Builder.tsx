import React from "react";
import "../../public/styles.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { getColor, getCubeDimensions, getCubes } from "../selectors";
import { addCube, removeCube, setScene } from "../actions";
import Scene from "./Scene";
import Topbar from "./Topbar";

class Builder extends React.Component {
  props: any;
  componentDidMount(): void {
    let canvas = document.getElementById("canvas").childNodes;
    if (canvas.length > 1) {
      canvas[0].remove();
    }
  }
  render() {
    const { color, dimensions, removeCube, addCube, cubes, setScene } =
      this.props;
    return (
      <div className="builder">
        <Topbar
          color={color}
          cubeSize={dimensions}
          objects={cubes}
          importScene={setScene}
        ></Topbar>
        <Scene
          cubeColor={color}
          objects={cubes}
          dimensions={dimensions}
          removeObject={removeCube}
          addObject={addCube}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  color: getColor(state),
  dimensions: getCubeDimensions(state),
  cubes: getCubes(state),
});

const mapDispatchToProps = {
  removeCube,
  addCube,
  setScene,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Builder);
