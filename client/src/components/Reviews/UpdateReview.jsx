import React, { useState } from "react";
import { Modal, Button, Form, Rating } from "semantic-ui-react";

const UpdateReview = ({ review, movieName }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: review.title,
    post: review.post,
    star_rating: review.star_rating,
    movie_id: review.movie_id,
    review_id: review.review_id,
    user_id: review.user_id,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRate = (e, { rating }) => {
    setRating(rating);
    setFormData({
      ...formData,
      star_rating: rating,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/reviews/${review.review_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      window.location.reload();
      const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal
      centered
      onClose={() => setShowModal(false)}
      onOpen={() => setShowModal(true)}
      open={showModal}
      trigger={<Button color="blue">Update</Button>}
      size="small"
      style={{ height: "auto", margin: "20%" }}
      data-testid="updateReviewModal"
    >
      <Modal.Header>Update your review of {movieName}</Modal.Header>
      <Modal.Content>
        <Form
          id="postSubmission"
          action="#postSubmission"
          onSubmit={onSubmitForm}
        >
          <span>Rating: {formData.star_rating ? formData.star_rating : rating} stars </span>
          <Rating
            icon="star"
            size="huge"
            defaultRating={formData.star_rating}
            maxRating={10}
            name="star_rating"
            onRate={handleRate}
          />
          <Form.Input
            fluid
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Form.TextArea
            placeholder="Review Post"
            name="post"
            value={formData.post}
            onChange={handleChange}
          />
          <Button.Group>
            <Button color="blue" id="submitPost">
              Post
            </Button>
            <Button color="red" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Button.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateReview;
