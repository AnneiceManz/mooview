import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Comment, Header, Form, Button, Segment } from "semantic-ui-react";
import { useLocation, Link } from "react-router-dom";

const CommentForm = ({ review_id, user_id }) => {
  console.log("this is the review id", review_id);
  console.log("this is the user id", user_id);

  const [writeComment, setWriteComment] = useState({
    user_id: user_id,
    review_id: review_id,
    comment_text: "",
  });

  const [comments, setComments] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const handleChange = (e) => {
    setWriteComment({ ...writeComment, [e.target.name]: e.target.value });
  };

  const handleCollapse = (e) => {
    setCollapsed(!collapsed);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(writeComment),
      });
      console.log("New Comment Added", response);
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
    <>
      <div>
        <Button onClick={handleCollapse}>
          {collapsed ? "Show Comments" : "Collapse Comments"}
        </Button>
      </div>
<div>

      <Comment.Group collapsed={collapsed}>
      <Segment>
        <Header as="h3" dividing>
          Comments
        </Header>
        {comments
          ? comments.map((comment) => (
              <Comment key={comment.comment_id}>
                <Comment.Avatar src={comment.picture} />
                <Comment.Content>
                  <Comment.Author>{comment.username}</Comment.Author>
                  <Comment.Metadata>Posted: {comment.posted}</Comment.Metadata>
                  <Comment.Text>
                    <p>{comment.comment_text}</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            ))
          : null}
        <Form reply onSubmit={onSubmitForm} size="mini">
            <Header as="h3" dividing>Add Comment</Header>
          <Form.TextArea rows={2} name="comment_text" onChange={handleChange} />
          <Button
            size="mini"
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Segment>
      </Comment.Group>
</div>
    </>
  );
};

export default CommentForm;
