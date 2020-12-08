import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";
import UserListMenu from "./userLists/UserListMenu";
import TrailCard from "./TrailCard";

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

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.searchAll = this.searchAll.bind(this);

    this.state = {
      results: [],
    };
  }

  searchAll(e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value;

    fetch(
      // `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=40&printType=books`
      `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&key=200971144-3154da4391861b1faaaf7f1c8d1134a4`
    )
      .then((response) => response.json())
      .then((res) => {
        this.setState({ results: res.trails }); //?
        console.log(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //

  render() {
    return (
      <Container className="masterContainer rb bsb" fluid="?">
        <div className="bookRibbon" />
        <Row className="navRow">
          <NavbarComponent
            updateToken={this.props.updateToken} ///Props (1) is renamed here!!!!!!!!!
            clearToken={this.props.clearToken} ///Props (2) is renamed here!!!!!!!!!
            token={this.props.token} ///Props (3) is renamed here!!!!!!!!!
          />
        </Row>
        <Container className="mainContainer rb" fluid="?">
          <Row className="topRow row rb">
            <Col className="colOne col rb" xs="2">
              {/*blank_space*/}
            </Col>
            <Col className="colTwo colColor rb bsb">
              <Form onSubmit={this.searchAll}>
                <InputGroup>
                  <Input
                    className="form-control"
                    id="searchInput"
                    placeholder="Search trails near your vicinity . . ."
                  />
                  <InputGroupAddon addonType="append">
                    <Button onClick={(e) => this.searchAll(e)}>Search</Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </Col>
            <Col className="colThree col rb" xs="2">
              {/*blank_space*/}
            </Col>
          </Row>
          <Row className="rowOne row rb">
            {
              <Col
                className="colOne col colColor rb bsb"
                xs="2"
                style={{ zIndex: "2" }}
              >
                <div className="categoryScrollContainer">
                  {/* <h4>Categories</h4>
                <hr />
                <div className="categoryScroll">
                  <h5>Featured</h5>
                  <hr />
                  <p>Staff List</p>
                  <p>Popular</p>
                  <br />
                  <h5 onClick={(e) => filtertrail("subject:fiction")}>Fiction</h5>
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
                  </p> */}
                  {/* </div> */}
                </div>
              </Col>
            }
            <Col className="colTwo brownBG rb">
              <Row className="popBookCarousel rb">
                <Col
                  id="displaySearchContent"
                  className="displayTrails colColor rb bsb"
                  style={{
                    margin: "25px",
                    padding: "10px",
                    msOverflowY: "scroll",
                  }}
                >
                  {this.state.results.length > 0 ? (
                    this.state.results.map((trail, index) => {
                      /// Here map()is mapping the results.length > 0 results to the key index number and then to the book card/card named book.
                      return (
                        // <p>{trail.id}</p>
                        <div key={index}>
                          <TrailCard trail={trail} token={this.props.token} />
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
              {this.props.isAuth ? (
                <UserListMenu token={this.props.token} />
              ) : (
                <h1>Sorry, user must login to crud</h1>
              )}
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    );
  }
}

// function Layout(props) {
///Props (1)&(2)&(3) are brought in here

// const [results, showResults] = useState([]);

// function searchAll(e) {
//   e.preventDefault();
//   const searchInput = document.getElementById("searchInput").value;

//   fetch(
//     // `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=40&printType=books`
//     `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&key=200971144-3154da4391861b1faaaf7f1c8d1134a4`
//   )
//     .then((response) => response.json())
//     .then((res) => {
//       showResults(res.trails);
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// function filterTrail(filter) {
//   console.log(filter);
//   fetch(
//     // `https://www.googleapis.com/books/v1/volumes?q=${filter}&maxResults=40&printType=books`
//     `https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&key=200971144-3154da4391861b1faaaf7f1c8d1134a4`
//   )
//     .then((response) => response.json())
//     .then((res) => {
//       showResults(res.trails);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

//   return (
//     <Container className="masterContainer rb bsb" fluid="?">
//       <div className="bookRibbon" />
//       <Row className="navRow">
//         <NavbarComponent
//           updateToken={props.updateToken} ///Props (1) is renamed here!!!!!!!!!
//           clearToken={props.clearToken} ///Props (2) is renamed here!!!!!!!!!
//           token={props.token} ///Props (3) is renamed here!!!!!!!!!
//         />
//       </Row>
//       <Container className="mainContainer rb" fluid="?">
//         <Row className="topRow row rb">
//           <Col className="colOne col rb" xs="2">
//             {/*blank_space*/}
//           </Col>
//           <Col className="colTwo colColor rb bsb">
//             <Form onSubmit={searchAll}>
//               <InputGroup>
//                 <Input
//                   className="form-control"
//                   id="searchInput"
//                   placeholder="Search trails near your vicinity . . ."
//                 />
//                 <InputGroupAddon addonType="append">
//                   <Button onClick={(e) => searchAll(e)}>Search</Button>
//                 </InputGroupAddon>
//               </InputGroup>
//             </Form>
//           </Col>
//           <Col className="colThree col rb" xs="2">
//             {/*blank_space*/}
//           </Col>
//         </Row>
//         <Row className="rowOne row rb">
//           {/* <Col
//             className="colOne col colColor rb bsb"
//             xs="2"
//             style={{ zIndex: "2" }}
//           >
//             <div className="categoryScrollContainer">
//               <h4>Categories</h4>
//               <hr />
//               <div className="categoryScroll">
//                 <h5>Featured</h5>
//                 <hr />
//                 <p>Staff List</p>
//                 <p>Popular</p>
//                 <br />
//                 <h5 onClick={(e) => filtertrail("subject:fiction")}>Fiction</h5>
//                 <hr />
//                 <p onClick={(e) => filterBook("subject:'young adult'")}>
//                   Young Adult
//                 </p>
//                 <p onClick={(e) => filterBook("subject:fantasy")}>Fantasy</p>
//                 <p onClick={(e) => filterBook("subject:children")}>
//                   Children’s
//                 </p>
//                 <p onClick={(e) => filterBook("subject:'science fiction'")}>
//                   Science Fiction
//                 </p>
//                 <p onClick={(e) => filterBook("subject:thriller")}>
//                   Thrillers/Suspense
//                 </p>
//                 <p onClick={(e) => filterBook("subject:horror")}>Horror</p>
//                 <p onClick={(e) => filterBook("subject:romance")}>Romance</p>
//                 <br />
//                 <h5 onClick={(e) => filterBook("subject:nonfiction")}>
//                   Non-Fiction
//                 </h5>
//                 <hr />
//                 <p onClick={(e) => filterBook("subject:art")}>Art</p>
//                 <p onClick={(e) => filterBook("subject:education")}>
//                   Educational
//                 </p>
//                 <p onClick={(e) => filterBook("subject:'self help'")}>
//                   Self-help
//                 </p>
//                 <p onClick={(e) => filterBook("subject:religion")}>
//                   Religion/Spirituality
//                 </p>
//                 <p onClick={(e) => filterBook("subject:biography")}>
//                   Biography
//                 </p>
//                 <p onClick={(e) => filterBook("subject:history")}>History</p>
//                 <p onClick={(e) => filterBook("subject:health")}>
//                   Health and Fitness
//                 </p>
//               </div>
//             </div>
//           </Col> */}
//           <Col className="colTwo brownBG rb">
//             <Row className="popBookCarousel rb">
//               <Col
//                 id="displaySearchContent"
//                 className="displayBooks colColor rb bsb"
//                 style={{
//                   margin: "25px",
//                   padding: "10px",
//                   msOverflowY: "scroll",
//                 }}
//               >
//                 {results.length > 0 ? (
//                   results.map((trail, index) => {
//                     /// Here map()is mapping the results.length > 0 results to the key index number and then to the book card/card named book.
//                     return (
//                       // <p>{trail.id}</p>
//                       <div key={index}>
//                         <TrailCard trail={trail} token={props.token} />
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <p style={{ margin: "auto" }}>
//                     <i>Complete a search for results . . .</i>
//                   </p>
//                 )}
//               </Col>
//             </Row>
//           </Col>
//           <Col className="colThree col colColor rb bsb" xs="2">
//             <UserListMenu token={props.token} />
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </Container>
//   );
// }

// export default Layout;
