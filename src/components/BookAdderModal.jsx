import React, { useEffect, useState } from "react";
import APIURL from "../helpers/environment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Label,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Form,
} from "reactstrap";

const BookAdderModal = (props) => {
  const [bookAddRes, setBookAddRes] = useState("");
  const [err, setErr] = useState("");
  const [lists, setLists] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const toggle2 = () => setDropdownOpen((prevState) => !prevState);

  const bookAddFetch = (listTitle) => {
    console.log(listTitle);
    fetch(`${APIURL}/trail/addTrail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
      body: JSON.stringify({
        book: {
          listTitle: listTitle,
          title: props.book.volumeInfo.title,
          subTitle: props.book.volumeInfo.subtitle,
          author: props.book.volumeInfo.authors,
          read: false,
          description: props.book.volumeInfo.description,
          costRetail: null,
          length: props.book.volumeInfo.pageCount,
          category: props.book.volumeInfo.categories,
          publisher: props.book.volumeInfo.publisher,
          publicationDate: props.book.volumeInfo.publishedDate,
          ISBN: props.book.volumeInfo.industryIdentifiers[0].identifier,
          smallThumbnailURL: props.book.volumeInfo.imageLinks.smallThumbnail,
          thumbnailURL: props.book.volumeInfo.imageLinks.thumbnail,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBookAddRes(data.message);
        console.log(data.message);
      })
      .catch((err) => {
        setErr(err);
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`${APIURL}/list/allLists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    })
      .then((res) => res.json())
      .then((listData) => {
        setLists(listData);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [modal]);

  return (
    <div>
      <Form inline onSubmit={(e) => e.preventDefault()}>
        <Button onClick={toggle} style={{ margin: "0 auto" }}>
          Add to TrailList
        </Button>
      </Form>
      <Modal isOpen={modal} toggle={toggle} className="yoyo">
        {props.token ? (
          <>
            <ModalHeader toggle={toggle}>
              Would you like to add this Trail to your TrailList?{" "}
            </ModalHeader>
            <ModalBody>
              <Dropdown isOpen={dropdownOpen} toggle={toggle2}>
                <DropdownToggle caret>Trail Lists</DropdownToggle>
                <DropdownMenu>
                  {lists.length > 0 ? (
                    lists.map((list) => {
                      return (
                        <DropdownItem
                          onClick={(e) => bookAddFetch(e.target.innerText)}
                        >
                          {list.title}
                        </DropdownItem>
                      );
                    })
                  ) : err ? (
                    <DropdownItem>{err.message}</DropdownItem>
                  ) : (
                    <></>
                  )}
                </DropdownMenu>
              </Dropdown>
            </ModalBody>
          </>
        ) : (
          <ModalHeader toggle={toggle}>
            Must have an account to add to TrailLists.
          </ModalHeader>
        )}
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default BookAdderModal;
