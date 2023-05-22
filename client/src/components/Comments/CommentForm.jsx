import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Comment,
  Header,
  Form,
  Button,
  Segment,
  Confirm,
} from "semantic-ui-react";
import moment from "moment";
import LoginText from "../Auth0/LoginText";
import IMAGES from "../../images/IMAGES";

const CommentForm = ({ review_id }) => {
  console.log("this is the review id", review_id);
  const { user, isAuthenticated } = useAuth0();
  const currentUser = user?.sub;

  const [writeComment, setWriteComment] = useState({
    user_id: currentUser,
    review_id: review_id,
    comment_text: "",
  });

  const [comments, setComments] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [confirm, setConfirm] = useState(false);

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

  const handleDelete = async (comment_id) => {
    try {
      const response = await fetch(`/api/comments/${comment_id}`, {
        method: "DELETE",
      });
      console.log(response);
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
        <Button basic floated="right" size="small" onClick={handleCollapse}>
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
                    <Comment.Avatar
                      src={
                        comment.picture ? comment.picture : IMAGES.mooview_logo3
                      }
                    />
                    <Comment.Content>
                      <Comment.Author>{comment.username}</Comment.Author>
                      <Comment.Metadata>
                        Posted:{" "}
                        {moment(comment.posted).format("MMM Do YYYY, h:mm a")}
                      </Comment.Metadata>
                      <Comment.Text>
                        <p>{comment.comment_text}</p>
                      </Comment.Text>
                      {currentUser === comment.user_id && (
                        <Comment.Actions>
                          <Comment.Action
                            style={{ color: "red" }}
                            onClick={() => setConfirm(true)}
                          >
                            Delete Comment
                          </Comment.Action>
                          <Confirm
                            cancelButton="Never mind"
                            confirmButton="Delete Comment"
                            header="Are you sure you want to delete this comment?"
                            content={
                              <img
                                className="w-[50%] m-auto"
                                src={IMAGES.mooviewQuestion}
                              />
                            }
                            size="tiny"
                            open={confirm}
                            onCancel={() => setConfirm(false)}
                            onConfirm={() => handleDelete(comment.comment_id)}
                          />
                        </Comment.Actions>
                      )}
                    </Comment.Content>
                  </Comment>
                ))
              : null}
            <Segment basic>
              {!isAuthenticated && (
                <>
                  <span className="flex justify-end">
                    <LoginText /> to post a comment!
                  </span>
                </>
              )}
              {isAuthenticated && (
                <Form reply onSubmit={onSubmitForm}>
                  <Header as="h3" dividing>
                    Add Comment
                  </Header>
                  <Form.TextArea
                    rows={2}
                    name="comment_text"
                    onChange={handleChange}
                  />
                  <Button
                    size="mini"
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                  />
                </Form>
              )}
            </Segment>
          </Segment>
        </Comment.Group>
      </div>
    </>
  );
};

export default CommentForm;
