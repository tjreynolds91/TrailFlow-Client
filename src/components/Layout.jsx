import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import UserListMenu from "./userLists/UserListMenu";
import BookCard from "./BookCard";

import {
  Input,
  InputGroup,
  Button,
  InputGroupAddon,
  Container,
  Row,
  Col,
  Form,
} from "reactstrap";

function Layout(props) {
  ///Props (1)&(2)&(3) are brought in here

  const [results, showResults] = useState([]);

  function searchAll(e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value;

    fetch(
      // `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=40&printType=books`
      `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200971144-3154da4391861b1faaaf7f1c8d1134a4`
    )
      .then((response) => response.json())
      .then((res) => {
        showResults(res.items);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function filterBook(filter) {
    console.log(filter);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${filter}&maxResults=40&printType=books`
      // ``
    )
      .then((response) => response.json())
      .then((res) => {
        showResults(res.items);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Container className="masterContainer rb bsb" fluid="?">
      <div className="bookRibbon" />
      <Row className="navRow">
        <NavbarComponent
          updateToken={props.updateToken} ///Props (1) is renamed here!!!!!!!!!
          clearToken={props.clearToken} ///Props (2) is renamed here!!!!!!!!!
          token={props.token} ///Props (3) is renamed here!!!!!!!!!
        />
      </Row>
      <Container className="mainContainer rb" fluid="?">
        <Row className="topRow row rb">
          <Col className="colOne col rb" xs="2">
            {/*blank_space*/}
          </Col>
          <Col className="colTwo colColor rb bsb">
            <Form onSubmit={searchAll}>
              <InputGroup>
                <Input
                  className="form-control"
                  id="searchInput"
                  placeholder="Search trail, difficulty, or location . . ."
                />
                <InputGroupAddon addonType="append">
                  <Button onClick={(e) => searchAll()}>Search</Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
          <Col className="colThree col rb" xs="2">
            {/*blank_space*/}
          </Col>
        </Row>
        <Row className="rowOne row rb">
          {/* <Col
            className="colOne col colColor rb bsb"
            xs="2"
            style={{ zIndex: "2" }}
          >
            <div className="categoryScrollContainer">
              <h4>Categories</h4>
              <hr />
              <div className="categoryScroll">
                <h5>Featured</h5>
                <hr />
                <p>Staff List</p>
                <p>Popular</p>
                <br />
                <h5 onClick={(e) => filterBook("subject:fiction")}>Fiction</h5>
                <hr />
                <p onClick={(e) => filterBook("subject:'young adult'")}>
                  Young Adult
                </p>
                <p onClick={(e) => filterBook("subject:fantasy")}>Fantasy</p>
                <p onClick={(e) => filterBook("subject:children")}>
                  Children’s
                </p>
                <p onClick={(e) => filterBook("subject:'science fiction'")}>
                  Science Fiction
                </p>
                <p onClick={(e) => filterBook("subject:thriller")}>
                  Thrillers/Suspense
                </p>
                <p onClick={(e) => filterBook("subject:horror")}>Horror</p>
                <p onClick={(e) => filterBook("subject:romance")}>Romance</p>
                <br />
                <h5 onClick={(e) => filterBook("subject:nonfiction")}>
                  Non-Fiction
                </h5>
                <hr />
                <p onClick={(e) => filterBook("subject:art")}>Art</p>
                <p onClick={(e) => filterBook("subject:education")}>
                  Educational
                </p>
                <p onClick={(e) => filterBook("subject:'self help'")}>
                  Self-help
                </p>
                <p onClick={(e) => filterBook("subject:religion")}>
                  Religion/Spirituality
                </p>
                <p onClick={(e) => filterBook("subject:biography")}>
                  Biography
                </p>
                <p onClick={(e) => filterBook("subject:history")}>History</p>
                <p onClick={(e) => filterBook("subject:health")}>
                  Health and Fitness
                </p>
              </div>
            </div>
          </Col> */}
          <Col className="colTwo brownBG rb">
            <Row className="popBookCarousel rb">
              <Col
                id="displaySearchContent"
                className="displayBooks colColor rb bsb"
                style={{
                  margin: "25px",
                  padding: "10px",
                  msOverflowY: "scroll",
                }}
              >
                {results.length > 0 ? (
                  results.map((book, index) => {
                    /// Here map()is mapping the results.length > 0 results to the key index number and then to the book card/card named book.
                    return (
                      <div key={index}>
                        <BookCard book={book} token={props.token} />
                      </div>
                    );
                  })
                ) : (
                  <p style={{ margin: "auto" }}>
                    <i>Complete a search for results . . .</i>
                  </p>
                )}
              </Col>
            </Row>
          </Col>
          <Col className="colThree col colColor rb bsb" xs="2">
            <UserListMenu token={props.token} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default Layout;
