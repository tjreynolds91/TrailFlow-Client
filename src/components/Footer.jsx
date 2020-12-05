import React from "react";
import { Row } from "reactstrap";

export default class FooterComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className="footer">
        &copy;{new Date().getFullYear()} Timothy Reynolds
      </Row>
    );
  }
}

// const FooterComponent = (props) => {
//   return (
//     <Row className="footer">&copy;{new Date().getFullYear()} TrailFlow</Row>
//   );
// };

// export default FooterComponent;
