import React, { useState } from "react";
import APIURL from "../../helpers/environment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Alert,
} from "reactstrap";

export default class CreateListModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.createList = this.createList.bind(this);

    this.state = {
      modal: false,
      listTitle: "",
    };
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
    this.props.setListResponse("listResponse", "");
  }

  createList() {
    // event.preventDefault();
    fetch(`${APIURL}/list/newList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
      body: JSON.stringify({ title: this.state.listTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.setListResponse("listResponse", data.message);
        this.toggle();
      });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {"Create a TrailList!"}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="{className}"
        >
          <ModalHeader toggle={this.toggle}>Create List</ModalHeader>
          <ModalBody>
            <p>
              TrailFlow's TrailLists are a great way to store and organize
              trails that you have ridden, wish to ride, and any other way you
              see fit!
            </p>
            <Label for="listTitle" className="sr-only" />
            <Input
              onChange={(e) => this.setState({ listTitle: e.target.value })}
              type="text"
              className="form-control"
              id="listTitle"
              placeholder="e.g. Wish List"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.createList()}>
              {/* <Button color="primary" onClick={this.createList.bind(this)}> */}
              Create TrailList
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// const CreateListModal = (props) => {
//   const [modal, setModal] = useState(false);
//   const [listTitle, setListTitle] = useState("");
//   const [listResponse, setListResponse] = useState("");

//   const toggle = () => {
//     setModal(!modal);
//     props.setListResponse("listResponse","");
//   };

//   const createList = () => {
//     fetch(`${APIURL}/list/newList`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: props.token,
//       },
//       body: JSON.stringify({ title: listTitle }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         props.setListResponse(data.message);
//         toggle();
//       });
//   };

//   return (
//     <div>
//       <Button color="danger" onClick={toggle}>
//         {"Create a TrailList!"}
//       </Button>
//       <Modal isOpen={modal} toggle={toggle} className="{className}">
//         <ModalHeader toggle={toggle}>Create List</ModalHeader>
//         <ModalBody>
//           <p>
//             TrailFlow's TrailLists are a great way to store and organize trails
//             that you have ridden, wish to ride, and any other way you see fit!
//           </p>
//           <Label for="listTitle" className="sr-only" />
//           <Input
//             onChange={(e) => setListTitle(e.target.value)}
//             type="text"
//             className="form-control"
//             id="listTitle"
//             placeholder="e.g. Wish List"
//           />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={(e) => createList()}>
//             Create TrailList
//           </Button>
//           <Button color="secondary" onClick={toggle}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// export default CreateListModal;
