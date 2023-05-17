import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import UpdateReview from "./UpdateReview";
import CommentForm from "./CommentForm";

const Reviews = ({ review, movieName }) => {
  const { user } = useAuth0();
  const currentUser = user?.sub;
  return (
    <Card centered>
      <Card.Content>
        <Card.Header textAlign="center">{review.title}</Card.Header>
        {/* <Card.Meta>{review.user_id}</Card.Meta> */}
        <Card.Meta>
          {review.star_rating} stars for {movieName}!
        </Card.Meta>
        <Card.Description>{review.post}</Card.Description>
      </Card.Content>
      {user?.sub === review.user_id && (
        <Card.Content extra>
          <Button.Group size="tiny">
            <UpdateReview review={review} movieName={movieName} />
            <Button color="red">Delete</Button>
          </Button.Group>
        </Card.Content>
      )}
      <CommentForm review_id={review.review_id} user_id={currentUser} />
    </Card>
  );
};

export default Reviews;
