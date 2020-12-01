import React from "react";
import { Row } from "reactstrap";

const FooterComponent = (props) => {
  return (
    <Row className="footer">&copy;{new Date().getFullYear()} TrailFlow</Row>
  );
};

export default FooterComponent;
