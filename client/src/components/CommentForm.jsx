import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Comment, Header, Form, Button } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

const CommentForm = ({ review_id, user }) => {
 const reviewId= review_id
    console.log('this is the review id', reviewId)
    
    const state = useLocation().state;
  const [writeComment, setWriteComment] = useState(
    state || {
      user_id: user,
      review_id: review_id,
      comment_text: "",
    }
  );

  const [comments, setComments] = useState(null);

  const handleChange = (e) => {
    setWriteComment({ ...writeComment, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(writeComment),
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(`/api/comments/${review_id}`);
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, [review_id]);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments ? comments.map((comment) => (
        <Comment>
          <Comment.Content>
            <Comment.Metadata>Posted: {comment.time_stamp}</Comment.Metadata>
            <Comment.Text>
              <p>{comment.comment_text}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      ) ) : null}
      <Form reply onSubmit={onSubmitForm}>
        <Form.TextArea name="comment_text" onChange={handleChange} />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  );
};

export default CommentForm;
