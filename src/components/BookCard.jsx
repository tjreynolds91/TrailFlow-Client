import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import BookAdderModal from "./BookAdderModal";

const UserCard = (props) => {
  return (
    <div className="bookCardContainer">
      <Card className="bookCard">
        <CardImg
          top
          width="100%"
          src={
            props.book.volumeInfo.imageLinks === undefined /// Here is a line of ternary that states if the fetched image links is strictly equal to undefined then the the nocover png image in assets will be displayed instead.
              ? "../assets/nocover.png"
              : props.book.volumeInfo.imageLinks.thumbnail
          }
          alt="Card image cap"
          style={{
            width: "10em",
            height: "15em",
            margin: "auto",
            paddingTop: "10px",
          }}
        />
        <CardBody className="bookCardBody">
          <CardTitle className="bookCardBodyTitle" tag="h5">
            {props.book.volumeInfo.title}
          </CardTitle>
          <CardSubtitle
            tag="h6"
            className="bookCardBodySubTitle mb-2 text-muted"
          >
            {props.book.volumeInfo.subtitle ? (
              props.book.volumeInfo.subtitle
            ) : (
              <></>
            )}
          </CardSubtitle>
          <CardText>{`Author(s): ${props.book.volumeInfo.authors}`}</CardText>
        </CardBody>
        <BookAdderModal token={props.token} book={props.book} />
      </Card>
    </div>
  );
};

export default UserCard;
