import React from "react";
import APIURL from "../../helpers/environment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  CardImg,
} from "reactstrap";

export default class DisplayListModal extends React.Component {
  constructor(props) {
    super(props);
    this.bookUpdater = this.bookUpdater.bind(this);
    this.listUpdater = this.listUpdater.bind(this);
    this.listDeleter = this.listDeleter.bind(this);
    this.toggle = this.toggle.bind(this);
    this.buttonTitleUpdater = this.buttonTitleUpdater.bind(this);

    this.state = {
      modal: false,
      btnTitle: "",
      books: [],
      newListTitle: "",
    };
  }

  toggle() {
    this.setState({ modal: !this.modal });
  }

  buttonTitleUpdater() {
    this.setState({ btnTitle: !this.btnTitle });
  }

  listDeleter() {
    fetch(`${APIURL}/list/deletelist/${this.props.list.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.setDeleteResponse(res.message);
        this.toggle();
      })
      .catch((err) => {
        this.props.setDeleteResponse(err);
      });
  }

  listUpdater() {
    fetch(`${APIURL}/list/update/${this.props.list.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
      body: JSON.stringify({ title: this.state.newListTitle }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.props.setUpdateListRes(res.message);
        console.log(res.message);
        this.toggle();
      })
      .catch((err) => {
        this.props.setUpdateListRes(err);
      });
  }

  bookUpdater(trail) {
    fetch(`${APIURL}/trail/update/${trail.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
      body: JSON.stringify({ ridden: !trail.ridden }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        this.props.setErr(err);
        console.log(err);
      });
  }

  componentDidMount() {
    fetch(`${APIURL}/trail/listTrails/${this.props.list.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((booksData) => {
        console.log(booksData);
        this.setState({ books: booksData.data });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <div>
        <p className="displayListModal" onClick={this.toggle}>
          {this.props.list.title}
        </p>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="{className}"
        >
          <ModalHeader toggle={this.toggle}>
            {this.props.list.title}
          </ModalHeader>
          <ModalBody>
            {this.state.btnTitle ? (
              <>
                <Label for="newListTitle" className="sr-only" />
                <Input
                  onChange={(e) => this.setNewListTitle(e.target.value)}
                  type="text"
                  className="form-control"
                  id="newListTitle"
                  placeholder={this.props.list.title}
                />
                <Button onClick={(e) => this.listUpdater()} color="warning">
                  Submit Update
                </Button>
              </>
            ) : this.state.books.length > 0 ? (
              this.state.books.map((book, index) => {
                return (
                  <div>
                    <Card key={index} style={{ display: "flex" }}>
                      <CardImg
                        top
                        width="100%"
                        src={this.state.book.smallThumbnailURL}
                        alt="Card image cap"
                        style={{ width: "10em", height: "15em" }}
                      />
                      <CardBody>
                        <CardTitle tag="h5">{this.state.book.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {this.state.book.subtitle ? (
                            this.state.book.subtitle
                          ) : (
                            <></>
                          )}
                        </CardSubtitle>
                        <CardText>{`Author: ${this.state.book.author}`}</CardText>
                        {this.state.book.read ? (
                          <div>
                            <Input
                              type="checkbox"
                              onClick={(e) => this.bookUpdater(book)}
                              value="Ridden?"
                            ></Input>
                            <span>Ridden?</span>
                          </div>
                        ) : (
                          <div>
                            <Input
                              type="checkbox"
                              onClick={(e) => this.bookUpdater(book)}
                              value="Ridden?"
                              defaultChecked
                            ></Input>
                            <span>Ridden?</span>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                );
              })
            ) : this.props.err ? (
              <p>{this.props.err}</p>
            ) : (
              <p>
                No trails on your list yet. Search some trails and add the ones
                you find interesting!
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={(e) => this.listDeleter()}>
              Delete TrailList
            </Button>
            <Button color="primary" onClick={this.buttonTitleUpdater}>
              {this.state.btnTitle ? (
                <>Cancel Update</>
              ) : (
                <>Update TrailList Title?</>
              )}
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

// const DisplayListModal = (props) => {
//   const [books, setBooks] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [btnTitle, setBtnTitle] = useState("");
//   const [newListTitle, setNewListTitle] = useState("");

//   const toggle = () => {
//     setModal(!modal);
//   };

//   const buttonTitleUpdater = () => {
//     setBtnTitle(!btnTitle);
//   };

// useEffect(() => {
//   fetch(`${APIURL}/trail/listTrails/${props.list.id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: props.token,
//     },
//   })
//     .then((res) => res.json())
//     .then((booksData) => {
//       console.log(booksData);
//       setBooks(booksData.data);
//     })
//     .catch((err) => {});
// }, [modal]);

// const listDeleter = () => {
//   fetch(`${APIURL}/list/deletelist/${props.list.id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: props.token,
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       props.setDeleteResponse(res.message);
//       toggle();
//     })
//     .catch((err) => {
//       props.setDeleteResponse(err);
//     });
// };

// const listUpdater = () => {
//   fetch(`${APIURL}/list/update/${props.list.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: props.token,
//     },
//     body: JSON.stringify({ title: newListTitle }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       props.setUpdateListRes(res.message);
//       console.log(res.message);
//       toggle();
//     })
//     .catch((err) => {
//       props.setUpdateListRes(err);
//     });
// };

// const bookUpdater = (trail) => {
//   fetch(`${APIURL}/trail/update/${trail.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: props.token,
//     },
//     body: JSON.stringify({ ridden: !trail.ridden }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res.message);
//     })
//     .catch((err) => {
//       props.setErr(err);
//       console.log(err);
//     });
// };

// return (
// <div>
//   <p className="displayListModal" onClick={toggle}>
//     {props.list.title}
//   </p>
//   <Modal isOpen={modal} toggle={toggle} className="{className}">
//     <ModalHeader toggle={toggle}>{props.list.title}</ModalHeader>
//     <ModalBody>
//       {btnTitle ? (
//         <>
//           <Label for="newListTitle" className="sr-only" />
//           <Input
//             onChange={(e) => setNewListTitle(e.target.value)}
//             type="text"
//             className="form-control"
//             id="newListTitle"
//             placeholder={props.list.title}
//           />
//           <Button onClick={(e) => listUpdater()} color="warning">
//             Submit Update
//           </Button>
//         </>
//       ) : books.length > 0 ? (
//         books.map((book, index) => {
//           return (
//             <div>
//               <Card key={index} style={{ display: "flex" }}>
//                 <CardImg
//                   top
//                   width="100%"
//                   src={book.smallThumbnailURL}
//                   alt="Card image cap"
//                   style={{ width: "10em", height: "15em" }}
//                 />
//                 <CardBody>
//                   <CardTitle tag="h5">{book.title}</CardTitle>
//                   <CardSubtitle tag="h6" className="mb-2 text-muted">
//                     {book.subtitle ? book.subtitle : <></>}
//                   </CardSubtitle>
//                   <CardText>{`Author: ${book.author}`}</CardText>
//                   {book.read ? (
//                     <div>
//                       <Input
//                         type="checkbox"
//                         onClick={(e) => bookUpdater(book)}
//                         value="Ridden?"
//                       ></Input>
//                       <span>Ridden?</span>
//                     </div>
//                   ) : (
//                     <div>
//                       <Input
//                         type="checkbox"
//                         onClick={(e) => bookUpdater(book)}
//                         value="Ridden?"
//                         defaultChecked
//                       ></Input>
//                       <span>Ridden?</span>
//                     </div>
//                   )}
//                 </CardBody>
//               </Card>
//             </div>
//           );
//         })
//       ) : props.err ? (
//         <p>{props.err}</p>
//       ) : (
//         <p>
//           No trails on your list yet. Search some trails and add the ones
//           you find interesting!
//         </p>
//       )}
//     </ModalBody>
//     <ModalFooter>
//       <Button color="danger" onClick={(e) => listDeleter()}>
//         Delete TrailList
//       </Button>
//       <Button color="primary" onClick={buttonTitleUpdater}>
//         {btnTitle ? <>Cancel Update</> : <>Update TrailList Title?</>}
//       </Button>
//       <Button color="secondary" onClick={toggle}>
//         Close
//       </Button>
//     </ModalFooter>
//   </Modal>
// </div>
//   );
// };

// export default DisplayListModal;
