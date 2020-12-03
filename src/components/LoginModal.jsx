import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import APIURL from "../helpers/environment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    // this.setToggle2 = this.setToggle2(this);

    this.state = {
      modal: false,
      toggle2: true,
      className: this.props.className,
    };
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <Button onClick={this.toggle}>Login</Button>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.state.className}
        >
          <ModalHeader toggle={this.toggle}>
            {this.state.toggle2 ? "Login" : "Sign Up"}
          </ModalHeader>
          <ModalBody>
            {this.state.toggle2 ? (
              <Login updateToken={this.props.updateToken} />
            ) : (
              <Register updateToken={this.props.updateToken} />
            )}
          </ModalBody>
          <ModalFooter>
            <p>
              {this.state.toggle2
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <Button
                className="modalFooterLink"
                data-toggle="modal"
                data-dismiss="modal"
                onClick={(e) => this.setState({ toggle2: !this.state.toggle2 })}
              >
                {this.state.toggle2 ? "Sign Up" : "Login"}{" "}
              </Button>
            </p>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// const LoginModal = (props) => {
// const { className } = props;
// const [modal, setModal] = useState(false);

// const [toggle2, setToggle2] = useState(true);

// const toggle = () => setModal(!modal);

// return (
//   <div>
//     <Form inline onSubmit={(e) => e.preventDefault()}>
//       <Button onClick={toggle}>Login</Button>
//     </Form>
//     <Modal isOpen={modal} toggle={toggle} className={className}>
//       <ModalHeader toggle={toggle}>
//         {toggle2 ? "Login" : "Sign Up"}
//       </ModalHeader>
//       <ModalBody>
//         {toggle2 ? (
//           <Login updateToken={props.updateToken} />
//         ) : (
//           <Register updateToken={props.updateToken} />
//         )}
//       </ModalBody>
//       <ModalFooter>
//         <p>
//           {toggle2 ? "Don't have an account?" : "Already have an account?"}{" "}
//           <Button
//             className="modalFooterLink"
//             data-toggle="modal"
//             data-dismiss="modal"
//             onClick={(e) => setToggle2(!toggle2)}
//           >
//             {toggle2 ? "Sign Up" : "Login"}{" "}
//           </Button>
//         </p>
//       </ModalFooter>
//     </Modal>
//   </div>
// );
// };

// export default LoginModal;
