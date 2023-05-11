import React from "react";
import { Card } from "semantic-ui-react";

const Reviews = ({ review }) => {
  return (
    <Card centered fluid>
      <Card.Content>
        <Card.Header textAlign="center">{review.title}</Card.Header>
        {/* <Card.Meta>{review.user_id}</Card.Meta> */}
        <Card.Meta>{review.star_rating}</Card.Meta>
        <Card.Description>{review.post}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Reviews;
