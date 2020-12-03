import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import TrailAdderModal from "./TrailAdderModal";

const TrailCard = (props) => {
  return (
    <div className="bookCardContainer">
      <Card className="bookCard">
        <CardImg
          top
          width="100%"
          src={
            props.trail.imgMedium === undefined /// Here is a line of ternary that states if the fetched image links is strictly equal to undefined then the the nocover png image in assets will be displayed instead.
              ? "../assets/nocover.png"
              : props.trail.imgMedium
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
            {props.trail.name}
          </CardTitle>
          <CardSubtitle></CardSubtitle>
          <CardText>{`Summary: ${props.trail.summary}`}</CardText>
          <CardText>{`Location: ${props.trail.location}`}</CardText>
          <CardText>{`Difficulty: ${props.trail.difficulty}`}</CardText>
          <CardText>{`Length in Miles: ${props.trail.length}`}</CardText>
          <CardText>{`Star Rating: ${props.trail.stars}`}</CardText>
        </CardBody>
        <TrailAdderModal token={props.token} trail={props.trail} />
      </Card>
    </div>
  );
};

export default TrailCard;
