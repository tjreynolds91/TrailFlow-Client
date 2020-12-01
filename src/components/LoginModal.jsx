import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";

const LoginModal = (props) => {
  const { className } = props;
  const [modal, setModal] = useState(false);

  const [toggle2, setToggle2] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button onClick={toggle}>Login</Button>
      </Form>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {toggle2 ? "Login" : "Sign Up"}
        </ModalHeader>
        <ModalBody>
          {toggle2 ? (
            <Login updateToken={props.updateToken} />
          ) : (
            <Register updateToken={props.updateToken} />
          )}
        </ModalBody>
        <ModalFooter>
          <p>
            {toggle2 ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              className="modalFooterLink"
              data-toggle="modal"
              data-dismiss="modal"
              onClick={(e) => setToggle2(!toggle2)}
            >
              {toggle2 ? "Sign Up" : "Login"}{" "}
            </Button>
          </p>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginModal;
