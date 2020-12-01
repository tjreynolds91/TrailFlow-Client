import React, { useState, useEffect } from "react";

import Layout from "./components/Layout";

function App() {
  const [token, setToken] = useState("");

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    // console.log(token);
  }, [token]);

  useEffect(() => {
    document.title = "TrailFlow";
  }, []);

  return (
    <Layout updateToken={updateToken} clearToken={clearToken} token={token} />
    ///         (1)                       (2)                   (3)   These 3 props are initialized here!!!!!!!
  );
}

export default App;
