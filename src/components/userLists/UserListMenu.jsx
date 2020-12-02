import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
// import { BrowserRouter as Router } from "react-router-dom";
import ListModals from "./ListModals";
// import APIURL from "../../helpers/environment";

// App component
function UserList(props) {
  return props.token ? (
    <div className="">
      <>
        <ListModals token={props.token} />
      </>
    </div>
  ) : (
    <div>Login to create and view TrailLists!</div>
  );
}

export default UserList;
