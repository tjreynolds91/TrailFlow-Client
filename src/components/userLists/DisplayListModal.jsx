import React, { useEffect, useState } from "react";
import {
  Alert,
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

const DisplayListModal = (props) => {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState(false);
  const [btnTitle, setBtnTitle] = useState("");
  const [newListTitle, setNewListTitle] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const buttonTitleUpdater = () => {
    setBtnTitle(!btnTitle);
  };

  useEffect(() => {
    fetch(`https://biblioquest.herokuapp.com/book/listBooks/${props.list.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
      .then((res) => res.json())
      .then((booksData) => {
        console.log(booksData);
        setBooks(booksData.data);
      })
      .catch((err) => {});
  }, [modal]);

  const listDeleter = () => {
    fetch(
      `https://biblioquest.herokuapp.com/list/deletelist/${props.list.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: props.token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        props.setDeleteResponse(res.message);
        toggle();
      })
      .catch((err) => {
        props.setDeleteResponse(err);
      });
  };

  const listUpdater = () => {
    fetch(`https://biblioquest.herokuapp.com/list/update/${props.list.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
      body: JSON.stringify({ title: newListTitle }),
    })
      .then((res) => res.json())
      .then((res) => {
        props.setUpdateListRes(res.message);
        console.log(res.message);
        toggle();
      })
      .catch((err) => {
        props.setUpdateListRes(err);
      });
  };

  const bookUpdater = (book) => {
    fetch(`https://biblioquest.herokuapp.com/book/update/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
      body: JSON.stringify({ read: !book.read }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        props.setErr(err);
        console.log(err);
      });
  };

  return (
    <div>
      <p className="displayListModal" onClick={toggle}>
        {props.list.title}
      </p>
      <Modal isOpen={modal} toggle={toggle} className="{className}">
        <ModalHeader toggle={toggle}>{props.list.title}</ModalHeader>
        <ModalBody>
          {btnTitle ? (
            <>
              <Label for="newListTitle" className="sr-only" />
              <Input
                onChange={(e) => setNewListTitle(e.target.value)}
                type="text"
                className="form-control"
                id="newListTitle"
                placeholder={props.list.title}
              />
              <Button onClick={(e) => listUpdater()} color="warning">
                Submit Update
              </Button>
            </>
          ) : books.length > 0 ? (
            books.map((book, index) => {
              return (
                <div>
                  <Card key={index} style={{ display: "flex" }}>
                    <CardImg
                      top
                      width="100%"
                      src={book.smallThumbnailURL}
                      alt="Card image cap"
                      style={{ width: "10em", height: "15em" }}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{book.title}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {book.subtitle ? book.subtitle : <></>}
                      </CardSubtitle>
                      <CardText>{`Author: ${book.author}`}</CardText>
                      {book.read ? (
                        <div>
                          <Input
                            type="checkbox"
                            onClick={(e) => bookUpdater(book)}
                            value="Riden?"
                          ></Input>
                          <span>Read?</span>
                        </div>
                      ) : (
                        <div>
                          <Input
                            type="checkbox"
                            onClick={(e) => bookUpdater(book)}
                            value="Riden?"
                            defaultChecked
                          ></Input>
                          <span>Riden?</span>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              );
            })
          ) : props.err ? (
            <p>{props.err}</p>
          ) : (
            <p>
              No trails on your list yet. Search some trails and add the ones
              you find interesting!
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={(e) => listDeleter()}>
            Delete TrailList
          </Button>
          <Button color="primary" onClick={buttonTitleUpdater}>
            {btnTitle ? <>Cancel Update</> : <>Update TrailList Title?</>}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DisplayListModal;
