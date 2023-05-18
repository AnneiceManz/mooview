import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import UpdateReview from "./UpdateReview";
import CommentForm from "../Comments/CommentForm";

const Reviews = ({ review, movieName }) => {
  const { user } = useAuth0();
  const currentUser = user?.sub;

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${review.review_id}`, {
        method: "DELETE",
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
    <Card centered>
      <Card.Content>
        <Card.Header textAlign="center">{review.title}</Card.Header>
        <Card.Meta textAlign="center" style={{color: "red", fontWeight: "bold"}}><span style={{color: "#3977C9"}}>{'Written by: '}</span> {review.username}</Card.Meta>
        <Card.Meta>
          {review.star_rating} <Icon name="star" color="yellow"/>'s for {movieName}!
        </Card.Meta>
        <Card.Description>{review.post}</Card.Description>
      </Card.Content>
      {user?.sub === review.user_id && (
        <Card.Content extra>
          <Button.Group size="tiny">
            <UpdateReview review={review} movieName={movieName} />
            <Button color="red" onClick={handleDelete}>Delete</Button>
          </Button.Group>
        </Card.Content>
      )}
    </Card>
      <CommentForm review_id={review.review_id} user_id={currentUser} />
    </>
  );
};

export default Reviews;
