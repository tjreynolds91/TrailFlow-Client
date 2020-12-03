import React, { useState, useEffect } from "react";

import Layout from "./components/Layout";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);

    this.state = {
      token: "",
    };
  }

  updateToken(newToken) {
    this.setState({ token: newToken });

    localStorage.setItem("token", newToken);
    // setToken(newToken);
  }

  clearToken() {
    this.setState({ token: "" });
    localStorage.clear();
    // setToken("");
  }

  render() {
    return (
      <Layout
        updateToken={this.updateToken}
        clearToken={this.clearToken}
        token={this.state.token}
      />
      ///         (1)                       (2)                   (3)   These 3 props are initialized here!!!!!!!
    );
  }
}

// function App() {
// const [token, setToken] = useState("");

// const updateToken = (newToken) => {
//   localStorage.setItem("token", newToken);
//   setToken(newToken);
// };

// const clearToken = () => {
//   localStorage.clear();
//   setToken("");
// };

// useEffect(() => {
//   setToken(localStorage.getItem("token"));
//   // console.log(token);
// }, [token]);

// useEffect(() => {
//   document.title = "TrailFlow";
// }, []);

//   return (
//     <Layout updateToken={updateToken} clearToken={clearToken} token={token} />
//     ///         (1)                       (2)                   (3)   These 3 props are initialized here!!!!!!!
//   );
// }

// export default App;
