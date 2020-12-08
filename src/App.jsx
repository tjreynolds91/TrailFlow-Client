import React, { useState, useEffect } from "react";
import "./css/components.css";
import Layout from "./components/Layout";
console.log("heroku");
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);

    this.state = {
      token: "",
      isAuth: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        this.setState({
          token: token,
          isAuth: true,
        });
      } else {
        console.log("you goofed");
      }
    } else {
      this.setState({
        token: "",
      });
    }
  }

  updateToken(newToken) {
    this.setState({ token: newToken });
    this.setState({ isAuth: true });
    console.log("tokenUpdated");

    localStorage.setItem("token", newToken);
    // setToken(newToken);
  }

  clearToken() {
    this.setState({ token: "" });
    localStorage.clear();
    console.log("tokenCleared");
    // setToken("");
  }

  render() {
    return (
      <Layout
        isAuth={this.state.isAuth}
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
