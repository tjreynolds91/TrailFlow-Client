import React, { Component } from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";

class App extends Component {
  constructor(props) {
    // Constructor and super are just for passing props.
    super(props);
    this.state = {
      color: "red", // const [color, setColor] = useState("red") in functional components
    }; //
  }

  // when you call upon "props", or "state, "this", must be preceding it
  // call props: this.props.color
  // call state variables: this.state.color
  // Functions are not allowed, function helloWorld(){} & const helloWorld = () => {} we instead use methods helloWorld(){}
  // when calling methods, in the constructor this.helloWorld = this.helloWorld.bind(this)
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default App;
