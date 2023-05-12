import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";

const PostReview = ({ user, movie_id }) => {
  const [showModal, setShowModal] = useState(false);
  const state = useLocation().state
  const userId = user
  const movieId = parseInt(movie_id.replace('/movie/', ''));
  const navigate = useNavigate()

  const [writeReview, setWriteReview] = useState(
    state || {
        user_id: userId,
        movie_id: movieId,
        title: "",
        post: "",
        star_rating: null
    }
  )

  const handleChange = (e) => {
    setWriteReview ({ ...writeReview, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(writeReview),
      });
      navigate(`/`)
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
        trigger={<Button>Post Review</Button>}
        size="small"
        style={{ height: "auto", margin: "20%" }}
      >
        <Modal.Header>Write a Review</Modal.Header>
        <Modal.Content>
          <Form
          id='postSubmission'
          action="#postSubmission"
          onSubmit={onSubmitForm}
          >
            <Form.Input
              fluid
              placeholder="Title"
              name="title"
              value={writeReview.title}
              onChange={handleChange}
            />
            <Form.TextArea 
            placeholder="Review Post"
              name="post"
              value={writeReview.post}
              onChange={handleChange}
            />
            <Button.Group>
              <Button 
              color="blue"
              id="submitPost"
              >Post</Button>
              <Button color="red" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Button.Group>
          </Form>
        </Modal.Content>
      </Modal>

  );
};

export default PostReview;
